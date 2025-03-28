console.log("✅ JavaScript file loaded!");

document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let username = document.getElementById("name").value;
    localStorage.setItem("username", username);
    document.getElementById("signup-section").style.display = "none";
    document.getElementById("home-section").style.display = "block";
    displayWelcomeMessage();
});

function displayWelcomeMessage() {
    let username = localStorage.getItem("username");
    if (username) {
        document.getElementById("welcome-message").textContent = `Hi, ${username}`;
    }
}

// ✅ Add product to favorites
function addToFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavoritesUI();
    }
}

// ✅ Remove a single item from favorites
function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(id => id !== productId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavoritesUI();
}

// ✅ Clear all favorites
function clearFavorites() {
    localStorage.removeItem("favorites");
    updateFavoritesUI();
}

// ✅ Update the UI when favorites change
function updateFavoritesUI() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let preferredItems = document.getElementById("preferred-items");
    preferredItems.innerHTML = ""; // Clear UI

    favorites.forEach(id => {
        let product = document.querySelector(`.products .product[data-id='${id}']`);
        if (product) {
            let clone = product.cloneNode(true);
            let button = clone.querySelector(".favorite-btn");
            if (button) button.remove(); // Remove "Add to Favorites" button

            // ✅ Add "Remove from Favorites" button
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.classList.add("remove-btn");
            removeBtn.classList.add("btn-3");
            removeBtn.onclick = () => removeFromFavorites(id);

            clone.appendChild(removeBtn);
            preferredItems.appendChild(clone);
        }
    });
}

// ✅ Load products dynamically
document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: "1", name: "Laptop" },
        { id: "2", name: "Smartphone" },
        { id: "3", name: "Headphones" },
        { id: "4", name: "Smartwatch" }
    ];

    const productContainer = document.querySelector(".products");

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.setAttribute("draggable", "true");
        productDiv.dataset.id = product.id;
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <button class="favorite-btn btn-3" onclick="addToFavorites('${product.id}')">Add to Favorites</button>
        `;

        productDiv.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("text", product.id);
        });

        productContainer.appendChild(productDiv);
    });

        const favoritesSection = document.getElementById("favorites-section");
        
        if (favoritesSection) { 
            let clearFavoritesBtn = document.createElement("button");
            
            clearFavoritesBtn.textContent = "Clear All";
            clearFavoritesBtn.classList.add("clear-btn");
            clearFavoritesBtn.classList.add("btn-3");
            clearFavoritesBtn.onclick = clearFavorites;
            favoritesSection.appendChild(clearFavoritesBtn);
        }
        
   
    updateFavoritesUI();
});
