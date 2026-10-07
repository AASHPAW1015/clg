function callApi(path, method, body) {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`/api${path}`, {
    method: method || "GET",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  }).then((response) => response.json().then((data) => ({ response, data })));
}

function showError(text) {
  Swal.fire({ icon: "error", title: "Oops...", text });
}

function showSuccess(text) {
  return Swal.fire({ icon: "success", title: "Success", text });
}

function formatDate(value) {
  return value ? new Date(value).toLocaleString() : "-";
}

function money(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}

function label(text) {
  return String(text).replace(/_/g, " ");
}

function getUser() {
  if (!localStorage.getItem("token")) return Promise.resolve(null);
  return callApi("/auth/me")
    .then(({ response, data }) => {
      if (response.status === 200) return data.user;
      localStorage.removeItem("token");
      return null;
    })
    .catch(() => null);
}

// sends you to login if not logged in, home if your role is not allowed
function requireUser(roles) {
  return getUser().then((user) => {
    if (!user) {
      location.href = "login.html";
      return null;
    }
    if (roles && !roles.includes(user.role)) {
      Swal.fire({ icon: "error", title: "Oops...", text: "you cannot open this page!" }).then(() => {
        location.href = "index.html";
      });
      return null;
    }
    renderNav(user);
    connectLive(user);
    return user;
  });
}

function handleUnauthorized(response, data) {
  if (response.status === 401) {
    localStorage.removeItem("token");
    Swal.fire({ icon: "error", title: "Oops...", text: data.message }).then(() => {
      location.href = "login.html";
    });
    return true;
  }
  return false;
}

function handleLogout() {
  localStorage.removeItem("token");
  location.href = "login.html";
}

function renderNav(user) {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const go = (page, text) => `<button onclick="location.href='${page}'">${text}</button>`;

  let links =
    go("index.html", "VEHICLES") +
    go("maintenance.html", "MAINTENANCE") +
    go("repairs.html", "REPAIRS");
  if (user.role !== "driver") {
    links += go("parts.html", "PARTS") + go("drivers.html", "DRIVERS");
  }
  if (user.role === "admin") {
    links += go("reports.html", "REPORTS");
  }
  links += go("notifications.html", "NOTIFICATIONS");
  links += `<button onclick="handleLogout()">LOGOUT</button>`;
  nav.innerHTML = links;

  const who = document.createElement("span");
  who.textContent = ` logged in as ${user.name} (${user.role})`;
  nav.appendChild(who);
}

// live alerts over Socket.io, shown in a small box in the corner
const liveListeners = [];

function onLive(callback) {
  liveListeners.push(callback);
}

function connectLive(user) {
  if (!window.io) return;
  const socket = io();

  socket.on("notification", (notification) => {
    if (notification.audience !== "all" && notification.audience !== `${user.role}s`) return;

    let box = document.getElementById("live");
    if (!box) {
      box = document.createElement("div");
      box.id = "live";
      box.style.cssText =
        "position:fixed;right:10px;bottom:10px;width:300px;background:white;border:1px solid black;padding:5px";
      document.body.appendChild(box);
    }
    const line = document.createElement("p");
    line.textContent = `NEW - ${notification.title}: ${notification.body}`;
    box.prepend(line);

    liveListeners.forEach((callback) => callback(notification));
  });
}

function makeButton(text, onClick, disabled) {
  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = onClick;
  if (disabled) button.disabled = true;
  return button;
}

function addCells(tr, values) {
  values.forEach((value) => {
    const td = document.createElement("td");
    td.textContent = value;
    tr.appendChild(td);
  });
}

function runAction(path, method, body, successText, after) {
  callApi(path, method, body)
    .then(({ response, data }) => {
      console.log(data);
      if (handleUnauthorized(response, data)) return;
      if (response.status === 200 || response.status === 201) {
        showSuccess(successText).then(after);
      } else {
        showError(data.message || "Something went wrong!");
      }
    })
    .catch((error) => {
      console.log(error);
      showError("could not reach the server!");
    });
}

// fills a <select> with the fleet's vehicles
function fillVehicleSelect(selectId) {
  return callApi("/vehicles").then(({ data }) => {
    const select = document.getElementById(selectId);
    select.innerHTML = "";
    data.vehicles.forEach((vehicle) => {
      const option = document.createElement("option");
      option.value = vehicle._id;
      option.textContent = `${vehicle.plateNumber} (${vehicle.make} ${vehicle.model})`;
      select.appendChild(option);
    });
  });
}
