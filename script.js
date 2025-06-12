document.getElementById("regForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Registration submitted! We'll contact you soon.");
  this.reset();
});
