const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

let users = [];
let hotels = [];

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = users.find((u) => u.username === username);

    if (!user) {
      return done(null, false);
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return done(null, false);
    }

    return done(null, user);
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id == id);
  done(null, user);
});

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({
    message: "WELCOMEE!! to the hotel management apis!!!!",
  });
});

app.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = {
      id: users.length + 1,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    };

    users.push(user);

    res.status(201).json({
      message: "user registered successfully!!!!",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({
    message: "login successful!!! welcome back " + req.user.username,
  });
});

app.post("/hotels", (req, res) => {
  try {
    const existingHotel = hotels.find((h) => h.name === req.body.name);

    if (existingHotel) {
      return res.status(400).json({
        message: "this hotel already exists!!",
      });
    }

    const hotel = {
      id: hotels.length + 1,
      name: req.body.name,
      location: req.body.location,
      rating: req.body.rating,
      pricePerNight: req.body.pricePerNight,
    };

    hotels.push(hotel);

    res.status(201).json({
      message: "hotel added successfully!!!!",
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/hotels", (req, res) => {
  try {
    if (req.query.rating) {
      const filtered = hotels.filter((h) => h.rating == req.query.rating);

      return res.json(filtered);
    }

    res.json(hotels);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/hotels/:id", (req, res) => {
  const hotel = hotels.find((h) => h.id == req.params.id);

  if (!hotel) {
    return res.status(404).json({
      message: "hotel not found!!!",
    });
  }

  res.json(hotel);
});

app.put("/hotels/:id", (req, res) => {
  const hotel = hotels.find((h) => h.id == req.params.id);

  if (!hotel) {
    return res.status(404).json({
      message: "hotel not found!!!",
    });
  }

  hotel.name = req.body.name;
  hotel.location = req.body.location;
  hotel.rating = req.body.rating;
  hotel.pricePerNight = req.body.pricePerNight;

  res.json({
    message: "hotel updated successfully!!!!",
    hotel,
  });
});

app.delete("/hotels/:id", (req, res) => {
  const index = hotels.findIndex((h) => h.id == req.params.id);

  if (index == -1) {
    return res.status(404).json({
      message: "hotel not found!!!",
    });
  }

  hotels.splice(index, 1);

  res.json({
    message: "hotel deleted successfully!!!!",
  });
});

app.listen(PORT, () => {
  console.log("HOTEL SERVER IS UPP!!!!");
  console.log(`server is running on port ${PORT}!!`);
});
