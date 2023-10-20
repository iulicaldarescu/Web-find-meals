const input = document.querySelector('#input');
const search = document.querySelector('#search-icon');
const searchResults = document.querySelector('#search-results');

const searchResultsText = document.querySelector('#search-results-text');

const instructions = document.querySelector('#instructions');
const mealName = document.querySelector('#meal-name');
const mealCategory = document.querySelector('#meal-category');
const mealInstructionsParent = document.querySelector('#meal-instructions-parent');
const instructionImage = document.querySelector('#instructions-image');

const closeInstructions = document.querySelector('#close-instructions');


const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=`;
const recipeUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;




//add event listener to the search icon
search.addEventListener("click", function () {

checkIfEmpty(input);
checkInputIsNumber(input);

  searchResultsText.classList.remove("hidden");
  searchResultsText.classList.add("block");
  getMeals(input.value);
  input.value = "";
  
});


//generic fetch
async function getFetch(anyUrl) {
    try {
      const response = await fetch(anyUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const getJson = await response.json();
      return getJson;

    } catch (error) {
      console.error('Error:', error.message);
      
      throw error;
    }
  }
  
  

//fetch with the ingredient as parameter
async function getMeals(ingredient) {
  try {
    const mealsJson = await getFetch(url + `${ingredient}`);
    const getMeals = await mealsJson.meals;

    showMealInfo(getMeals);
  } catch (error) {
    console.error("Error", error.message);
  }
}



function showMealInfo(arr) {

  searchResults.innerHTML = '';

  arr.forEach((element) => {
    //create elements needed for displaying the html 
    const mealCard = document.createElement("div");
    const img = document.createElement("img");
    const mealName = document.createElement("h2");
    const getRecipeBtn = document.createElement("button");
    mealCard.classList.add('bg-white','flex', 'justify-center', 'flex-col', 'shadow-xl', 'rounded-b-xl');

    //append image
    img.setAttribute("src", element.strMealThumb);
    searchResults.appendChild(mealCard);
    mealCard.appendChild(img);
    img.classList.add('rounded-t-xl');
    

    //appendmeal name
    mealName.textContent = element.strMeal;
    mealCard.appendChild(mealName);
    mealName.classList.add('font-bold', 'text-center', 'mt-3');

    //append Get Recipe button
    getRecipeBtn.textContent = 'Get Recipe';
    getRecipeBtn.setAttribute('id', element.idMeal);

    mealCard.appendChild(getRecipeBtn);
    getRecipeBtn.classList.add('m-auto','bg-orange-600', 'px-2', 'py-1', 'rounded-full',
                                'text-white', 'text-sm', 'text-center', 'mt-2', 'mb-5', 'mx-20');


    getRecipeBtn.addEventListener("click", function () {
      getRecipe(getRecipeBtn.id);
      openInstructionWindow();
      
    });  
                            
    
  });
}


//fetch the recipe API

async function getRecipe(id){
    const recipeJson = await getFetch(recipeUrl + `${id}`);
   
    const getMeal = await recipeJson.meals;
    
    getMealInstructions(getMeal);
    getMealName(getMeal);
    getMealCategory(getMeal);
    getMealImage(getMeal);
    
    closeInstructionWindow(closeInstructions);

}

//get meal instructions

function getMealInstructions(arr) {
    arr.forEach((element) => {
        instructions.textContent = element.strInstructions ;
        console.log(instructions);
    })
}

//get meal name

function getMealName(arr) {
    arr.forEach((element) => {
        
        mealName.textContent = element.strMeal;
        console.log(mealName);
    })
}

//get meal category

function getMealCategory(arr){
    arr.forEach((element) => {
        
        mealCategory.textContent = element.strCategory;
        console.log(mealCategory);
    })
}

function getMealImage(arr){
    arr.forEach(element => {
        instructionImage.setAttribute('src', element.strMealThumb);
    })
}

//open instruction window

function openInstructionWindow() {
    mealInstructionsParent.classList.remove('hidden');
    mealInstructionsParent.classList.add('flex');
    disableScroll();
}


//close instruction window

function closeInstructionWindow(btn) {
  btn.addEventListener("click", function () {
    mealInstructionsParent.classList.remove("flex");
    mealInstructionsParent.classList.add("hidden");
    enableScroll();
  });
}


//disable scrolling (when instructions are open)

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

//enable scrolling (when instructions are closed)

function enableScroll(){
    document.body.style.overflow = 'auto';
}

//check if input empty
function checkIfEmpty(input){
    if(input.value === ''){
        alert('The input cannot be empty, please insert a valid ingredient name');
        throw new Error('Input is empty');
    }
}


//check if input is a number
function checkInputIsNumber(input) {
    if (isFinite(input.value)) {
        alert('The input cannot be a number, please insert a valid ingredient name');
        input.value = '';
        throw new Error('Input is a number');
      }
}
