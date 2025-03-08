function openForm() {
    document.getElementById("add-product-form").style.display = "flex";
}

function closeForm() {
    document.getElementById("add-product-form").style.display = "none";
}

let addProductForm = document.getElementById("add-product-form");

addProductForm.addEventListener("submit", function (e) {
    e.preventDefault()
    
    console.log("Form submitted");
    closeForm();
});