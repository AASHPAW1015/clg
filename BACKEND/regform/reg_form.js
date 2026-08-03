const name = document.getElementById("name");
const age = document.getElementById("age");
const email = document.getElementById("email");
const button = document.getElementById("submitBtn");

function ALERTT(icon, title, message) {
  Swal.fire({
    icon: icon,
    title: title,
    text: message,
  });
}
button.addEventListener("click", function () {
  if (age.value.trim() && name.value.trim() && email.value.trim()) {
    ALERTT("success", "yayyyy!!", "submitted successfully");
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
  } else {
    ALERTT("error", "oh no!!", "please fill in all boxes");
  }
});
