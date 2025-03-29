function openForm() {
    document.getElementById("add-product-form").style.display = "flex";
    const productData = JSON.parse(localStorage.getItem("productData"))
    console.log(productData);
}

function closeForm() {
    document.getElementById("add-product-form").style.display = "none";
}

let addProductForm = document.getElementById("add-product-form");

addProductForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const productName = document.querySelector("#product-name").value.toString()
    const productPrice = document.querySelector("#product-price").value.toString()
    const productDescription = document.querySelector("#product-description").value
    const productImage = document.querySelector("#product-image").value.toString()

    const currentLength = JSON.parse(localStorage.getItem("productData")).length
    const newProductData = {id: currentLength + 1, name: productName, description: productDescription, average_rating: 0, price: parseFloat(productPrice) || 0, num_reviews: 0}

    fetch("/backend/models/addProducts.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({value: newProductData})
    })

    let newProducts = JSON.parse(localStorage.getItem("newProducts")) || [];
    newProducts.unshift(newProductData);
    localStorage.setItem("newProducts", JSON.stringify(newProducts));

    console.log("Form submitted: ", newProducts);
    closeForm();
    displayNewProducts()
});

function displayNewProducts() {
    let newProducts = JSON.parse(localStorage.getItem("newProducts")) || [];
    let resultHTML = "";

    newProducts.forEach(result => {
        console.log("Raw price:", result.price, "Type:", typeof result.price);
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

    document.querySelector("#new-products-list").innerHTML = resultHTML;
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