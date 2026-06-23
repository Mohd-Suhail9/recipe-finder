const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const dietFilter = document.getElementById('dietFilter');
const mealFilter = document.getElementById('mealFilter');
const recipesContainer = document.getElementById('recipes_container');

/**
 * Normalize text for comparison.
 * @param {string} value
 * @returns {string}
 */
function normalizeString(value) {
    return String(value || '').toLowerCase();
}

/**
 * Check if a recipe should be classified as vegetarian.
 * Uses tags first, then scans ingredients for common non-veg words.
 */
function isVegetarian(recipe) {
    const tags = (recipe.tags || []).map(normalizeString);
    if (tags.includes('vegetarian')) return true;

    const ingredientsText = (recipe.ingredients || []).map(normalizeString).join(' ');
    const nonVegWords = ['chicken', 'beef', 'pork', 'fish', 'shrimp', 'mutton', 'lamb', 'egg', 'bacon', 'sausage', 'turkey', 'seafood'];
    return !nonVegWords.some(word => ingredientsText.includes(word));
}

/**
 * Check if a recipe should be classified as non-vegetarian.
 */
function isNonVegetarian(recipe) {
    const tags = (recipe.tags || []).map(normalizeString);
    if (tags.includes('vegetarian')) return false;
    const ingredientsText = (recipe.ingredients || []).map(normalizeString).join(' ');
    const nonVegWords = ['chicken', 'beef', 'pork', 'fish', 'shrimp', 'mutton', 'lamb', 'egg', 'bacon', 'sausage', 'turkey', 'seafood'];
    return nonVegWords.some(word => ingredientsText.includes(word));
}

/**
 * Check if a recipe matches the selected meal type.
 */
function matchesMealType(recipe, meal) {
    if (meal === 'all') return true;
    const types = (recipe.mealType || []).map(normalizeString);
    return types.includes(normalizeString(meal));
}

/**
 * Filter a list of recipes by diet and meal type.
 */
function filterRecipes(recipes, diet, meal) {
    return recipes.filter(recipe => {
        if (!matchesMealType(recipe, meal)) return false;
        if (diet === 'vegetarian') return isVegetarian(recipe);
        if (diet === 'non-vegetarian') return isNonVegetarian(recipe);
        return true;
    });
}

/**
 * Fetch recipes from the API or fallback to local JSON.
 */
async function fetchRecipes(query = '') {
    const apiUrl = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return Array.isArray(data.recipes) ? data.recipes : [];
    } catch (error) {        console.warn('API failed, using local data fallback', error);
        const fallbackResponse = await fetch('./data1.json');
        if (!fallbackResponse.ok) throw new Error(`HTTP ${fallbackResponse.status}`);
        const fallbackData = await fallbackResponse.json();
        const recipes = Array.isArray(fallbackData.recipes) ? fallbackData.recipes : [];
        return query
            ? recipes.filter(recipe => recipe.name && normalizeString(recipe.name).includes(normalizeString(query)))
            : recipes;
    }
}

/**
 * Create the HTML for a recipe card.
 */
function getRecipeImageUrl(recipe) {
    if (recipe.image) return recipe.image;
    if (Array.isArray(recipe.images) && recipe.images.length > 0) return recipe.images[0];
    const placeholderText = encodeURIComponent(recipe.name || 'Recipe');
    return `https://source.unsplash.com/featured/400x300/?${placeholderText}`;
}

function getYoutubeUrl(recipe) {
    const query = encodeURIComponent(`${recipe.name || 'recipe'} recipe`);
    return `https://www.youtube.com/results?search_query=${query}`;
}

// Embed 
function getYoutubeEmbedUrl(recipe) {
    const recipeName = recipe.name || 'recipe';
    const query = encodeURIComponent(recipeName);
    return `https://www.youtube.com/embed?listType=search&list=${query}`;
}

async function loadVideo(recipeName, divId, button) {

    const videoId = await getYoutubeVideo(recipeName);

    console.log("Video ID:", videoId);

    const container = document.getElementById(divId);

    console.log(container);

    container.innerHTML = `
        <iframe
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allowfullscreen>
        </iframe>
    `;

    button.style.display = "none";
}
// =========================

const API_KEY = "AIzaSyCYvQSoepEN2q_1aN26dMR_o6KJZ6BiY7A";
 
async function getYoutubeVideo(recipeName) {

    const query = encodeURIComponent(recipeName + " recipe");

    const searchUrl =
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${query}&key=${API_KEY}`;

    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    for (const item of searchData.items) {

        const videoId = item.id.videoId;

        const detailsUrl =
            `https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}&key=${API_KEY}`;

        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        if (
            detailsData.items.length > 0 &&
            detailsData.items[0].status.embeddable
        ) {
            return videoId;
        }
    }

    return null;
}

async function loadVideo(recipeName, divId, button) {

    button.innerText = "Loading...";
    button.disabled = true;

    const videoId = await getYoutubeVideo(recipeName);

    const container = document.getElementById(divId);

    if (!videoId) {
        container.innerHTML =
            "<p>No embeddable video found.</p>";

        button.disabled = false;
        button.innerText = "Watch Video";
        return;
    }

    container.innerHTML = `
        <iframe
            width="100%"
            height="250"
            src="https://www.youtube.com/embed/${videoId}"
            title="YouTube player"
            frameborder="0"
            allowfullscreen>
        </iframe>
    `;

    button.style.display = "none";
}
// ==========================

function createRecipeCard(recipe) {

    const imageUrl = getRecipeImageUrl(recipe);

    return `
        <div class="recipe_card">

            <img
                src="${imageUrl}"
                alt="${recipe.name}"
                class="recipe_image"
            >

            <h2>${recipe.name}</h2>

            <p>
                Difficulty:
                ${recipe.difficulty || "Unknown"}
            </p>

            <p>
            
                ${recipe.caloriesPerServing|| "Unknown"}  Calories
            </p>

            <p>
                Cook Time:
                ${recipe.cookTimeMinutes || "Unknown"} mins
            </p>
            <p>
                Rating:
                ${recipe.rating || "Unknown"} 
            </p>

            <div id="video-${recipe.id}"></div>

            <div class="card_actions">

                <button
                    onclick="loadVideo(
                        '${recipe.name.replace(/'/g, "\\'")}',
                        'video-${recipe.id}',
                        this
                    )"
                    class="youtube_button"
                >
                    Watch Video
                </button>

                <a
                    href="recipe-detail.html?id=${recipe.id}"
                    class="detail_button"
                >
                    Show Ingredients
                </a>

            </div>

        </div>
    `;
}

/**
 * Render a list of recipes into the page.
 */
function renderRecipes(recipes) {
    if (!recipesContainer) return;

    if (recipes.length === 0) {
        recipesContainer.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    recipesContainer.innerHTML = recipes.map(createRecipeCard).join('');
}

/**
 * Load recipes, apply filters, and render them.
 */
async function loadRecipe(query = '', diet = 'all', meal = 'all') {
    try {
        const recipes = await fetchRecipes(query);
        const filtered = filterRecipes(recipes, diet, meal);
        renderRecipes(filtered);
    } catch (err) {
        console.error(err);
        if (recipesContainer) recipesContainer.innerHTML = '<p>Could not load recipes.</p>';
    }
}

/**
 * Apply current search and filter values.
 */
function applyFilters() {
    const query = searchInput.value.trim();
    const diet = dietFilter.value;
    const meal = mealFilter.value;
    loadRecipe(query, diet, meal);
}

if (searchButton) searchButton.addEventListener('click', applyFilters);
if (dietFilter) dietFilter.addEventListener('change', applyFilters);
if (mealFilter) mealFilter.addEventListener('change', applyFilters);

loadRecipe();