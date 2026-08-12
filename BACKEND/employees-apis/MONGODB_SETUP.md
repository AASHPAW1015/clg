# MongoDB Connection Fix — What, Why, How

## What happened

Compass showed:

```
connect ECONNREFUSED 127.0.0.1:27017, connect ECONNREFUSED ::1:27017
```

Same failure would've hit `mongoose.connect("mongodb://localhost:27017/employees")` in `config/db.js`.

## Why it happened

MongoDB Compass and Mongoose are both **clients** — they connect to a database server but don't include one. The actual server process, `mongod`, was never installed. Nothing was listening on port 27017, so the OS refused every connection attempt. The connection string and code were correct the whole time; the server just wasn't there.

## How it was fixed

1. **`brew tap mongodb/brew`**
   Homebrew's default repo doesn't include the official MongoDB formula (licensing). Tapping adds MongoDB's own formula repo.

2. **`brew install mongodb-community`** — failed
   ```
   Error: Refusing to load formula mongodb/brew/mongodb-community from untrusted tap mongodb/brew.
   ```
   Homebrew requires explicit trust for third-party taps before installing from them (security measure).

3. **`brew trust mongodb/brew`**
   Marks the tap as trusted, allowing formulas from it to install.

4. **`brew install mongodb-community`** (retry)
   Installs `mongod` plus `mongosh` (shell client) and `mongodb-database-tools` (import/export utilities).

5. **`brew services start mongodb-community`**
   Registers `mongod` as a background service (via launchd) and starts it — also makes it auto-start on login/reboot.

6. **`mongosh --eval "db.runCommand({ping:1})" --quiet`**
   Health check — confirmed the server responded with `{ ok: 1 }`.

After this, Compass connected successfully to `mongodb://localhost:27017/`, and `config/db.js` will connect the same way.

## Reference

- Installed version: **MongoDB 8.3.7** (check anytime: `mongod --version`)
- Service status: `brew services list`
- Stop server: `brew services stop mongodb-community`
