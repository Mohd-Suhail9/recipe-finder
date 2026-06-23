function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

async function loadRecipeDetail() {
    const recipeId = parseInt(getQueryParam('id'), 10);
    const container = document.getElementById('recipe_detail_container');

    if (!recipeId) {
        container.innerHTML = '<p>Recipe ID is missing.</p>';
        return;
    }

    let recipe = null;

    try {
        const response = await fetch(`https://dummyjson.com/recipes/${recipeId}`);
        if (response.ok) {
            recipe = await response.json();
        } else {
            throw new Error(`HTTP ${response.status}`);
        }
    } catch (apiError) {
        try {
            const fallbackResponse = await fetch('./data1.json');
            if (!fallbackResponse.ok) throw new Error(`HTTP ${fallbackResponse.status}`);
            const data = await fallbackResponse.json();
            const recipes = Array.isArray(data.recipes) ? data.recipes : [];
            recipe = recipes.find(r => r.id === recipeId);
        } catch (fallbackError) {
            console.error(apiError, fallbackError);
        }
    }

    if (!recipe) {
        container.innerHTML = '<p>Recipe not found.</p>';
        return;
    }

    const imageUrl = recipe.image || (Array.isArray(recipe.images) ? recipe.images[0] : '') || 'images/nature.jpg';
    const ingredientsList = (recipe.ingredients || []).map(item => `<li>${item}</li>`).join('');
    const instructionsList = (recipe.instructions || []).map(step => `<li>${step}</li>`).join('');

    container.innerHTML = `
        <div class="recipe_detail_card">
            <img src="${imageUrl}" alt="${recipe.name || 'Recipe Image'}" class="recipe_detail_image">
            <div class="recipe_detail_info">
                <h2>${recipe.name || ''}</h2>
                <div class="detail_summary">
                    <span><strong>Difficulty:</strong> ${recipe.difficulty || 'Unknown'}</span>
                    <span><strong>Prep:</strong> ${recipe.prepTimeMinutes || 'Unknown'} mins</span>
                    <span><strong>Cook:</strong> ${recipe.cookTimeMinutes || 'Unknown'} mins</span>
                    <span><strong>Servings:</strong> ${recipe.servings || 'Unknown'}</span>
                </div>
                <div class="detail_section">
                    <h3>Ingredients</h3>
                    <ul>${ingredientsList}</ul>
                </div>
                <div class="detail_section">
                    <h3>Instructions</h3>
                    <ol>${instructionsList}</ol>
                </div>
                <a href="index.html" class="back_button">Back to Recipes</a>
            </div>
        </div>
    `;
}

loadRecipeDetail();
