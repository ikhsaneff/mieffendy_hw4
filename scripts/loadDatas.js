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

document.addEventListener("DOMContentLoaded", function () {
    loadProductData();
    loadImageData();
});