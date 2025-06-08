document.getElementById("bodyfatForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const height = parseFloat(document.getElementById("height").value);
  const neck = parseFloat(document.getElementById("neck").value);
  const waist = parseFloat(document.getElementById("waist").value);

  // US Navy Body Fat Formula for men
  const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;

  // Round to 1 decimal place
  const roundedBodyFat = Math.round(bodyFat * 10) / 10;

  // Determine category
  let category;
  if (bodyFat < 6) category = "Essential Fat";
  else if (bodyFat < 14) category = "Athletic";
  else if (bodyFat < 18) category = "Fitness";
  else if (bodyFat < 25) category = "Average";
  else category = "Obese";

  document.getElementById("bodyfat").textContent = roundedBodyFat;
  document.getElementById("category").textContent = category;
  document.getElementById("results").classList.remove("hidden");
});