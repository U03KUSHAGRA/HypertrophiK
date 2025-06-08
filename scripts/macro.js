// Remove Chart.js CDN since we don't need it anymore

document.getElementById("macroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const gender = document.getElementById("gender").value;
  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const activity = parseFloat(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;

  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Calculate TDEE
  const tdee = bmr * activity;

  // Adjust calories based on goal
  let calories;
  switch (goal) {
    case "cut":
      calories = tdee - 500;
      break;
    case "maintain":
      calories = tdee;
      break;
    case "bulk":
      calories = tdee + 500;
      break;
  }

  // Calculate macros
  const protein = Math.round(weight * 2.2); // 2.2g per kg of body weight
  const fats = Math.round((calories * 0.25) / 9); // 25% of calories from fat
  const carbs = Math.round((calories - (protein * 4) - (fats * 9)) / 4); // Remaining calories from carbs

  // Update results
  document.getElementById("calories").textContent = Math.round(calories);
  document.getElementById("protein").textContent = protein;
  document.getElementById("fats").textContent = fats;
  document.getElementById("carbs").textContent = carbs;

  document.getElementById("results").classList.remove("hidden");

  // Update macro bar visualization
  updateMacroBar(protein, fats, carbs, calories);
});

function updateMacroBar(protein, fats, carbs, calories) {
  // Calculate the percentage of calories from each macro
  const proteinCalories = protein * 4; // 4 calories per gram of protein
  const fatsCalories = fats * 9; // 9 calories per gram of fat
  const carbsCalories = carbs * 4; // 4 calories per gram of carbs

  const proteinPercentage = (proteinCalories / calories) * 100;
  const fatsPercentage = (fatsCalories / calories) * 100;
  const carbsPercentage = (carbsCalories / calories) * 100;

  // Update the width of each section in the bar
  document.getElementById('proteinBar').style.width = `${proteinPercentage}%`;
  document.getElementById('fatsBar').style.width = `${fatsPercentage}%`;
  document.getElementById('carbsBar').style.width = `${carbsPercentage}%`;

  // Update tooltips with detailed information
  document.getElementById('proteinBar').title = `Protein: ${protein}g (${proteinCalories} kcal)`;
  document.getElementById('fatsBar').title = `Fats: ${fats}g (${fatsCalories} kcal)`;
  document.getElementById('carbsBar').title = `Carbs: ${carbs}g (${carbsCalories} kcal)`;
}
