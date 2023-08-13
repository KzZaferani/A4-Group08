async function fetchCanadianFoods() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian');
  const data = await response.json();

  const foodCombobox = document.getElementById('foodCombobox');
  data.meals.forEach(food => {
      const option = document.createElement('option');
      option.value = food.strMeal;
      option.text = food.strMeal;
      foodCombobox.appendChild(option);
  });
}

fetchCanadianFoods();

async function fetchFoodInfo() {
  const combobox = document.getElementById('foodCombobox');
  const selectedFood = combobox.value;

  if (!selectedFood) {
      return;
  }

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedFood}`);
  const data = await response.json();

  const foodInfoContainer = document.getElementById('foodInfo');
  const food = data.meals[0];

  if (food) {
      const instructions = food.strInstructions;
      const category = food.strCategory;
      const area = food.strArea;

      const output = `
          <h2>${food.strMeal}</h2>
          <img src="${food.strMealThumb}" alt="${food.strMeal}" width="300">
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Area:</strong> ${area}</p>
          <p><strong>Instructions:</strong></p>
          <p>${instructions}</p>
      `;

      foodInfoContainer.innerHTML = output;
      foodInfoContainer.style.display = 'block';
  } else {
      foodInfoContainer.innerHTML = '<p>No information available for the selected Canadian food.</p>';
      foodInfoContainer.style.display = 'block';
  }
}

/* This script API from : https://www.themealdb.com/api.php */

