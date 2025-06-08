document.getElementById("tdeeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const gender = document.getElementById("gender").value;
  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const activity = parseFloat(document.getElementById("activity").value);

  // Mifflin-St Jeor Equation
  let bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const tdee = Math.round(bmr * activity);

  document.getElementById("bmr").textContent = Math.round(bmr);
  document.getElementById("tdee").textContent = tdee;

  document.getElementById("results").classList.remove("hidden");

  updateTdeeMarker(activity);
});

function updateTdeeMarker(activity) {
  const marker = document.getElementById("tdeeMarker");
  
  // Map activity multiplier to percentage (1.2 to 1.9 maps to 0 to 100)
  const minActivity = 1.2;
  const maxActivity = 1.9;
  const percent = ((activity - minActivity) / (maxActivity - minActivity)) * 100;
  
  marker.style.left = `calc(${percent}% - 1px)`;
  marker.style.display = "block";
}
