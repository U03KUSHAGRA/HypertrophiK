document.getElementById("bmiForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const heightCm = parseFloat(document.getElementById("height").value);

  if (!age || !gender || !weight || !heightCm) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  const categories = [
    { max: 16, category: "Severe Thinness" },
    { max: 17, category: "Moderate Thinness" },
    { max: 18.5, category: "Mild Thinness" },
    { max: 25, category: "Normal" },
    { max: 30, category: "Overweight" },
    { max: 35, category: "Obese Class I" },
    { max: 40, category: "Obese Class II" },
    { max: Infinity, category: "Obese Class III" }
  ];

  const category = categories.find(cat => bmi < cat.max).category;

  document.getElementById("bmiValue").textContent = bmi.toFixed(1);
  document.getElementById("bmiCategory").textContent = category;

  // Calculate healthy weight range (BMI 18.5 - 25)
  const healthyWeightMin = (18.5 * heightM * heightM).toFixed(1);
  const healthyWeightMax = (25 * heightM * heightM).toFixed(1);
  document.getElementById("healthyWeightMin").textContent = healthyWeightMin;
  document.getElementById("healthyWeightMax").textContent = healthyWeightMax;

  // Show results section
  document.getElementById("results").classList.remove("hidden");
});
