const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// IMC = poids en kg / taille² en m

const form = document.querySelector("form");


form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  
  calculIMC();
}

const inputs = document.querySelectorAll("input");

function calculIMC() {
  const taille = inputs[0].value;
  const poid = inputs[1].value;

  console.dir(typeof taille);
  if (!taille || !poid || taille <= 0 || poid <= 0) {
    handleError();
    return;
  }

  const BMI = (poid / Math.pow(taille / 100, 2)).toFixed(1);
  showResult(BMI);
}

const waitting = document.querySelector(".waiting");
const score = document.querySelector(".score");

function handleError() {
  score.textContent = "Wops";
  score.style.color = "inherit";
  waitting.textContent = "Remplissez correctement les champs.";
}

function showResult(BMI) {
  const rank = BMIData.find((data) => {
    if (BMI >= data.range[0] && BMI < data.range[1]) return data;
    else if (typeof data.range === "number" && BMI >= data.range) return data;
  });

  waitting.textContent = `${rank.name}`;
  score.style.color = `${rank.color}`;
  score.textContent = BMI;
}
