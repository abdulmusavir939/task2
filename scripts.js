// Load recipes from localStorage or use a default empty array
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Function to save recipes to localStorage
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to display recipes on the home page
function displayRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    recipes.forEach((recipe, index) => {
        if (index % 3 === 0) {
            // Start a new row for every three recipes
            const row = document.createElement('div');
            row.classList.add('row', 'mb-3', 'justify-content-center');
            recipeList.appendChild(row);
        }

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('col-md-4', 'recipe-card', 'mb-3', 'text-center', 'rounded', 'border', 'p-3');
        recipeCard.innerHTML = `
            <h2>${recipe.name}</h2>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <img src="${recipe.image}" alt="${recipe.name}" class="img-fluid rounded"><br>
            <button onclick="editRecipe(${index})" class="btn btn-success">Edit</button>
            <button onclick="deleteRecipe(${index})" class="btn btn-danger">Delete</button>
        `;

        const currentRow = recipeList.lastElementChild;
        currentRow.appendChild(recipeCard);
    });

    saveRecipes(); // Save recipes after displaying
}

// Function to show the add recipe modal
function showAddRecipeModal() {
    document.getElementById('add-recipe-form').reset(); // Reset the form
    document.getElementById('add-edit-recipe-modal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('add-edit-recipe-modal').style.display = 'none';
}

// Function to save a new or edited recipe
function saveRecipe() {
    const name = document.getElementById('recipe-name').value;
    const category = document.getElementById('category').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const image = document.getElementById('recipe-image').value;

    if (name && category && ingredients && instructions) {
        const existingRecipeIndex = getEditingIndex();

        if (existingRecipeIndex !== -1) {
            // Editing an existing recipe
            recipes[existingRecipeIndex] = { name, category, ingredients, instructions, image };
        } else {
            // Adding a new recipe
            const recipe = { name, category, ingredients, instructions, image };
            recipes.push(recipe);
        }

        displayRecipes();
        closeModal();
    } else {
        alert('Please fill in all fields');
    }
}

// Function to get the index of the recipe being edited
function getEditingIndex() {
    const editingRecipeName = document.getElementById('recipe-name').value;

    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].name === editingRecipeName) {
            return i;
        }
    }

    return -1; // Return -1 if the recipe is not found
}

// Function to edit an existing recipe
function editRecipe(index) {
    const recipe = recipes[index];
    document.getElementById('recipe-name').value = recipe.name;
    document.getElementById('category').value = recipe.category;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('instructions').value = recipe.instructions;
    document.getElementById('recipe-image').value = recipe.image;

    showAddRecipeModal(); // Show the modal for editing
}

// Function to delete a recipe
function deleteRecipe(index) {
    const confirmDelete = confirm(`Are you sure you want to delete the recipe "${recipes[index].name}"?`);

    if (confirmDelete) {
        recipes.splice(index, 1);
        displayRecipes();
    }
}

// Initial display of recipes
displayRecipes();
