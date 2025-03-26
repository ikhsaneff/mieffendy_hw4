function openForm() {
    document.getElementById("add-product-form").style.display = "flex";
}

function closeForm() {
    document.getElementById("add-product-form").style.display = "none";
}

let addProductForm = document.getElementById("add-product-form");

addProductForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const productName = document.getElementById("product-name").value
    const productPrice = document.getElementById("product-price").value
    const productDescription = document.getElementById("product-description").value
    const productImage = document.getElementById("product-image").value
    
    console.log("Form submitted");
    closeForm();
});