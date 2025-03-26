function loadProductData() {
    Papa.parse('../data/product.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            localStorage.setItem("productData", JSON.stringify(results.data)); // Store the parsed CSV in localStorage
        }
    });
}

function loadImageData() {
    Papa.parse('../data/visualcontent.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            localStorage.setItem("imageData", JSON.stringify(results.data)); // Store the parsed CSV in localStorage
        }
    });
}

function saveSearchHistory(query) {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    searchHistory.unshift(query);

    if (searchHistory.length > 3) {
        searchHistory.pop();
    }

    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function searchProduct(query = "") {
    if (query === "") {
        query = document.querySelector("#search-query").value;
    }

    if (query) {
        cleaned_query = query.toLowerCase().trim();

        const productData = JSON.parse(localStorage.getItem("productData")) 
        const searchResults = productData.filter(data => data.name.toLowerCase().includes(cleaned_query));

        if (searchResults.length > 0) {
            saveSearchHistory(query);
            resultsPage(query, searchResults);
        } else {
            return404();
        }
    } else {
        defaultSearchBar();
    }
};

document.addEventListener("DOMContentLoaded", function () {
    defaultSearchBar();
    loadProductData();
    loadImageData();
});

function defaultSearchBar() {
    document.querySelector('main').innerHTML = `
    <section class="search-area">
        <h1>Search for Products</h1>
        <div class="search-container">
            <div class="search-bar">
                <input type="text" name="query" id="search-query" placeholder="Search for products...">
                <button onclick="searchProduct()"><i class="fas fa-search"></i></button>
            </div>
        </div>
        <div class="search-bottom">
            <div class="search-botom-item">
                <p>Recent Searches:</p>
                <ul class="recent-search-list">
                    ${getRecentSearches()}
                </ul>
            </div>
        </div>
    </section>
    `;

    document.getElementById("search-query").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchProduct();
        }
    });
};

function getRecentSearches() {
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (searchHistory.length > 0) {
        return searchHistory.map(query => `<li onclick="searchProduct('${query}')">${query}</li>`).join("");
    }

    return "";
}

function resultsPage(query, searchResults) {
    document.querySelector('main').innerHTML = `
    <section class="search-area-top">
        <div class="search-container">
            <div class="search-bar">
                <input type="text" name="query" id="search-query" value="${query}" placeholder="Search for products...">
                <button onclick="searchProduct()"><i class="fas fa-search"></i></button>
            </div>
        </div>
        <div class="search-bottom">
            <div class="search-botom-item">
                <p>Recent Searches:</p>
                <ul class="recent-search-list">
                    ${getRecentSearches()}
                </ul>
            </div>
        </div>
    </section>
    <section class="search-results">
        <div class="search-results-header">
            <h2>Search Results for ${query}:</h2>
            <div class="search-botom-item">
                <p>Sort By:</p>
                <div>
                    <select class="select-filter" name="sort" id="sort">
                        <option value="none">None</option>
                        <option value="rating-hilo">Rating: High to Low</option>
                        <option value="ratinglohi">Rating: Low to High</option>
                        <option value="price-lohi">Price: Low to High</option>
                        <option value="price-hilo">Price: High to Low</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="results-grid">
        ${generateResult(searchResults)}
        </div>
    </section>
`;
    document.getElementById("search-query").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            searchProduct();
        }
    });
};

function generateResult(searchResults) {
    let resultHTML = "";

    searchResults.forEach(result => {
        resultHTML += `
            <div class="product-card">
                <a href="product.php?id=${result.id}">
                    ${insertImage(result.id)}
                    <p class="text-bold text-black">${result.name}</p>
                </a>
                <p>\$${result.price.toFixed(2)}</p>
                <div class="rating">
                    ${getRatingStars(result.average_rating)}
                </div>
            </div>
        `;
    });

    return resultHTML;
}

function insertImage(id) {
    const imageData = JSON.parse(localStorage.getItem("imageData"))

    const image = imageData.find(data => data.product_id === id && data.css_class === "featured-image");

    if (image) {
        return `<img src="images/${image.short_name}${image.file_type}" alt="${image.name}" class="${image.css_class}">`;
    }

    return "";
    
}

function getRatingStars(rating) {
    let stars = "";

    for (i = 5; i > 0; i--) {
        if (rating >= 1) {
            stars += "<i class='fas fa-star'></i>";
        } else if (rating >= 0.5) {
            stars += "<i class='fas fa-star-half-alt'></i>";
        } else {
            stars += "<i class='far fa-star'></i>";
        }

        rating--;
    }

    return stars;
}

function return404() {
    document.querySelector('main').innerHTML = `
        <div class="not-found">
            <h1>404 Not Found</h1>
            <p>The product you are looking for does not exist.</p>
            <a href="search.php">Return to Search Page</a>
        </div>
    `;
}