// let productData;

// Papa.parse('../data/product.csv', {
//     download: true,
//     header: true,
//     dynamicTyping: true,
//     complete: function (results) {
//         productData = results.data;
//     }
// });

// console.log(productData); 

// let searchProductForm = document.getElementById("search-product")

// searchProductForm.addEventListener("submit", function (e) {

//     const searchQuery = document.getElementById("search-query").value

//     searchQuery.value = searchQuery

//     console.log(searchQuery.value)
// });
localStorage.setItem("recentSearch", [value]);

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('main').innerHTML = 
    `
    <section class="search-area">
        <h1>Search for Products</h1>
        <div class="search-container">
            <div class="search-bar">
                <input type="text" name="query" id="search-query" placeholder="Search for products...">
                <button onclick="return404()"><i class="fas fa-search"></i></button>
            </div>
        </div>
    </section>
    `;
});

function 

function return404() {
    document.querySelector('main').innerHTML = `
            <div class="not-found">
                <h1>404 Not Found</h1>
                <p>The product you are looking for does not exist.</p>
                <a href="search.php">Return to Search Page</a>
            </div>
    `
}