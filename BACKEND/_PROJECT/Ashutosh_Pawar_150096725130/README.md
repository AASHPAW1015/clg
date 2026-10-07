# FleetGuard - Fleet Maintenance Tracker API

Assignment 16 (Case Study 57) - Ashutosh Pawar (150096725130)

Backend for a logistics company's fleet servicing. Services like oil changes
and tire rotations are scheduled **by mileage**: every schedule has a `dueAtKm`,
and each vehicle's odometer plus its average km per day turns that into a
prediction ("TR-789 tire rotation due in 13 days"). Drivers log issues,
mechanics book a repair slot, start it and complete it with the parts they used
(stock is taken out atomically), and managers (admins) see cost per km,
downtime hours and a breakdown risk score worked out from repair patterns.
Every alert goes through one helper that pushes it with **Firebase Cloud
Messaging**, saves it in MongoDB and sends it live over **Socket.io** to any
open page. Auth is JWT with three roles (`admin`, `mechanic`, `driver`), and
Firebase Auth users can swap their Firebase ID token for the same JWT.
A plain HTML frontend is served from `public/`, and Swagger UI documents
every endpoint.

## Tech stack

- Node.js, Express 5
- MongoDB + Mongoose
- jsonwebtoken + bcryptjs
- firebase-admin (Cloud Messaging + Auth)
- Socket.io
- swagger-ui-express
- dotenv, cors

## Project structure

```text
Ashutosh_Pawar_150096725130/
├── config/
│   ├── db.js                     # mongoose connection
│   ├── firebase.js               # Firebase Admin init (optional, key file or env var)
│   └── swagger.js                # OpenAPI spec for /api-docs
├── controllers/
│   ├── authController.js         # register, login, firebase login, me, mechanics
│   ├── vehicleController.js      # vehicle CRUD, odometer log + "service due" alert
│   ├── maintenanceController.js  # schedule by mileage, predictions, complete + book next
│   ├── repairController.js       # log issue, assign, schedule, start, complete with parts
│   ├── partController.js         # parts inventory
│   ├── driverController.js       # drivers + vehicle assignment
│   ├── reportController.js       # cost, downtime, breakdown risk
│   └── notificationController.js # send + list notifications
├── middleware/
│   ├── auth.js                   # verifyToken (Bearer JWT), checkRole(...roles)
│   └── validate.js               # requireFields(...fields), validateId
├── models/                       # User, Vehicle, Driver, Maintenance, Repair, Part, Notification
├── routes/                       # one router per resource
├── utils/
│   ├── forecast.js               # km left -> days left -> overdue / due soon / ok
│   └── notify.js                 # FCM push + save + Socket.io emit
├── public/                       # plain HTML pages + app.js
├── seed.js                       # demo data
├── test.http
├── .env.example
├── package.json
└── server.js
```

## Setup

Needs Node.js and MongoDB running locally (or an Atlas URI).

```bash
npm install
cp .env.example .env
npm run seed     # demo trucks, parts, history and 3 logins
npm run dev      # or: npm start
```

- App: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`

Seed logins, all with password `password123`:
`admin@fleetguard.com`, `mechanic@fleetguard.com`, `driver@fleetguard.com`.
`npm run seed` clears the FleetGuard collections first.

**Firebase (optional):** Firebase Console → Project Settings → Service Accounts
→ Generate new private key, save it as `serviceAccountKey.json` in this folder
(git-ignored). Without it the app still runs: notifications are saved and shown
live, `pushed` just stays `false`, and `/api/auth/firebase` returns 503.

## Environment variables

| Variable                   | Required | Notes                                                       |
| -------------------------- | :------: | ----------------------------------------------------------- |
| `PORT`                     |    no    | defaults to 3000                                            |
| `MONGOOSE_URI`             |   yes    | e.g. `mongodb://localhost:27017/fleetguard`                 |
| `JWT_SECRET`               |   yes    | signs the login tokens                                      |
| `FIREBASE_SERVICE_ACCOUNT` |    no    | whole service account JSON on one line, instead of the file |

## Data models

### User

| Field       | Type   | Notes                                  |
| ----------- | ------ | -------------------------------------- |
| name        | String |                                        |
| email       | String | unique, lowercased                     |
| password    | String | bcrypt hash, never returned; empty for Firebase users |
| role        | String | `driver` (default), `mechanic`, `admin` |
| firebaseUid | String | set when created through Firebase login |

### Vehicle

| Field       | Type   | Notes                                          |
| ----------- | ------ | ---------------------------------------------- |
| plateNumber | String | unique, uppercased, e.g. `TR-456`              |
| make, model | String |                                                |
| year        | Number |                                                |
| mileage     | Number | odometer in km, can never go down              |
| avgKmPerDay | Number | used to predict days until a service is due    |
| status      | String | `active`, `in_service`, `out_of_service`       |

### Maintenance

| Field         | Type     | Notes                                                       |
| ------------- | -------- | ----------------------------------------------------------- |
| vehicle       | ObjectId | ref Vehicle                                                 |
| type          | String   | `oil_change` (10,000 km), `tire_rotation` (8,000), `brake_inspection` (20,000), `general_service` (15,000) |
| dueAtKm       | Number   | odometer reading it is due at                               |
| status        | String   | `scheduled` or `completed`                                  |
| cost          | Number   |                                                             |
| completedAt   | Date     |                                                             |
| completedAtKm | Number   | the next service is booked at this + the interval           |

Every read adds a `forecast`: `kmLeft`, `daysLeft`, `alert`
(`overdue` / `due soon` = 14 days or less / `ok` / `done`) and a `message`.

### Repair

| Field                     | Type     | Notes                                               |
| ------------------------- | -------- | --------------------------------------------------- |
| vehicle                   | ObjectId | ref Vehicle                                         |
| issue                     | String   | e.g. "Brake noise when stopping"                    |
| severity                  | String   | `low`, `medium`, `high`                             |
| status                    | String   | `reported` → `scheduled` → `in_progress` → `completed` |
| reportedBy, mechanic      | ObjectId | ref User                                            |
| reportedAt, scheduledAt   | Date     | `scheduledAt` is the workshop slot                  |
| startedAt, completedAt    | Date     | downtime runs between these                         |
| partsUsed                 | Array    | `{ part, quantity, unitPrice }`                     |
| laborCost, partsCost      | Number   | `totalCost` is a virtual of the two                 |
| downtimeHours             | Number   | set on completion                                   |

### Part

| Field        | Type   | Notes                                   |
| ------------ | ------ | --------------------------------------- |
| name         | String |                                         |
| partNumber   | String | unique, uppercased                      |
| category     | String |                                         |
| quantity     | Number | never below 0                           |
| unitPrice    | Number |                                         |
| reorderLevel | Number | `lowStock` virtual = quantity <= this   |

### Driver

| Field         | Type     | Notes                                   |
| ------------- | -------- | --------------------------------------- |
| name, phone   | String   |                                         |
| licenseNumber | String   | unique                                  |
| licenseExpiry | Date     |                                         |
| user          | ObjectId | ref User, their login if they have one  |
| vehicle       | ObjectId | ref Vehicle, one driver per vehicle     |

### Notification

| Field     | Type     | Notes                                         |
| --------- | -------- | --------------------------------------------- |
| title     | String   |                                               |
| body      | String   |                                               |
| audience  | String   | `all`, `drivers`, `mechanics`, `admins`        |
| vehicle   | ObjectId | optional                                      |
| sentBy    | ObjectId | ref User                                      |
| pushed    | Boolean  | true once FCM accepted it                     |
| pushError | String   | FCM error, if any                             |

## Authentication

Log in (or register), then send the token on every protected route:

```
Authorization: Bearer <token>
```

A missing, fake or expired token gets `401`. A valid token with the wrong role
gets `403`. Tokens last 1 day. Registration only creates drivers and mechanics;
the admin account comes from the seed script.

**Firebase Auth:** sign in on the client with Firebase, send the ID token to
`POST /api/auth/firebase` and get the same JWT back. A new email gets a driver
account.

## Endpoints

### Auth

| Method | Route                  | Token             | Description                          |
| ------ | ---------------------- | ----------------- | ------------------------------------ |
| POST   | `/api/auth/register`   | no                | register, `role`: driver / mechanic  |
| POST   | `/api/auth/login`      | no                | returns JWT                          |
| POST   | `/api/auth/firebase`   | no                | Firebase ID token → our JWT          |
| GET    | `/api/auth/me`         | any               | logged in user                       |
| GET    | `/api/auth/mechanics`  | admin, mechanic   | list mechanics (for assigning)       |

### Vehicles

| Method | Route               | Token | Description                                                  |
| ------ | ------------------- | ----- | ------------------------------------------------------------ |
| GET    | `/api/vehicles`     | any   | all vehicles, `?status=`                                     |
| GET    | `/api/vehicles/:id` | any   | vehicle + its driver                                         |
| POST   | `/api/vehicles`     | admin | add vehicle                                                  |
| PUT    | `/api/vehicles/:id` | any   | admin edits all fields, others only `mileage`; passing a service's `dueAtKm` sends a "service due" alert |
| DELETE | `/api/vehicles/:id` | admin | delete with its maintenance and repairs                      |

### Maintenance

| Method | Route                          | Token           | Description                                          |
| ------ | ------------------------------ | --------------- | ---------------------------------------------------- |
| POST   | `/api/maintenance`             | admin, mechanic | schedule; no `dueAtKm` = last service km + interval  |
| GET    | `/api/maintenance`             | any             | all with forecast + `alerts` list, `?status=`        |
| GET    | `/api/maintenance/vehicle/:id` | any             | one vehicle's schedule + alerts                      |
| PUT    | `/api/maintenance/:id`         | admin, mechanic | update; `status: completed` books the next one       |

### Repairs

| Method | Route                      | Token           | Description                                               |
| ------ | -------------------------- | --------------- | --------------------------------------------------------- |
| POST   | `/api/repairs`             | any             | log an issue, mechanics are notified                      |
| GET    | `/api/repairs`             | any             | drivers see their own, `?status=`                         |
| GET    | `/api/repairs/vehicle/:id` | any             | one vehicle's repairs                                     |
| PUT    | `/api/repairs/:id`         | admin, mechanic | `mechanic`, `scheduledAt` (driver notified), `status`, `laborCost`, `partsUsed` |

### Parts

| Method | Route            | Token           | Description               |
| ------ | ---------------- | --------------- | ------------------------- |
| GET    | `/api/parts`     | admin, mechanic | inventory, `?lowStock=true` |
| GET    | `/api/parts/:id` | admin, mechanic | one part                  |
| POST   | `/api/parts`     | admin           | add part                  |
| PUT    | `/api/parts/:id` | admin           | update / restock          |

### Drivers

| Method | Route              | Token           | Description                         |
| ------ | ------------------ | --------------- | ----------------------------------- |
| GET    | `/api/drivers`     | admin, mechanic | all drivers with vehicle            |
| GET    | `/api/drivers/:id` | admin, mechanic | one driver                          |
| POST   | `/api/drivers`     | admin           | add, optional `vehicle`             |
| PUT    | `/api/drivers/:id` | admin           | update, `vehicle: ""` unassigns     |

### Reports

| Method | Route                         | Token | Description                                       |
| ------ | ----------------------------- | ----- | ------------------------------------------------- |
| GET    | `/api/reports/cost`           | admin | spend per vehicle, cost per km, fleet average     |
| GET    | `/api/reports/downtime`       | admin | repair hours per vehicle, vehicles off road now   |
| GET    | `/api/reports/breakdown-risk` | admin | risk score per vehicle with reasons               |

Breakdown risk points: 2 per repair in the last 90 days, 2 per high severity
one, 2 if the same problem keeps coming back (e.g. "brake" twice), 3 per
overdue service. 6+ is high, 3+ medium.

### Notifications

| Method | Route                     | Token | Description                                   |
| ------ | ------------------------- | ----- | --------------------------------------------- |
| POST   | `/api/notifications/send` | admin | push to FCM topic `fleetguard-<audience>`     |
| GET    | `/api/notifications`      | any   | latest 50 for everyone or my role             |

Automatic notifications: service scheduled, odometer passes a due point,
issue logged (mechanics), repair slot booked (drivers), part runs low (admins).

## Example flow (from the brief)

1. `GET /api/maintenance/vehicle/<TR-456>` → `"TR-456 oil change due now at 50000 km"`
2. `POST /api/repairs` as driver → logs "Brake noise when stopping"
3. `PUT /api/repairs/:id` as mechanic with `scheduledAt` 2 PM → status `scheduled`, driver notified
4. `GET /api/reports/cost` → fleet `avgCostPerKm`
5. `GET /api/maintenance` → `"TR-789 tire rotation due in 13 days (1600 km left)"`

## Status codes

| Code | Meaning                                                     |
| ---- | ----------------------------------------------------------- |
| 200  | OK                                                          |
| 201  | created                                                     |
| 400  | missing field, bad id, invalid value, not enough stock      |
| 401  | no token, bad token, wrong login                            |
| 403  | role not allowed                                            |
| 404  | not found                                                   |
| 409  | duplicate email / plate / part number / license             |
| 503  | Firebase login used but Firebase not configured             |

## Testing

- `test.http` has every endpoint (VS Code REST Client): log in, paste the token
  into `@token`, replace the `PUT_..._ID_HERE` placeholders.
- Swagger UI at `/api-docs`: log in, press **Authorize**, paste the token.
- Frontend at `/`: log in as each seed user to see the role-based pages and the
  live alert box.
