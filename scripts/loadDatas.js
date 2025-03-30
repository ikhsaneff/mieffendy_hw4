function loadProductData() {
    Papa.parse(`/data/product.csv`, {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function (results) {
            localStorage.setItem("productData", JSON.stringify(results.data));
        }
    });
}

function loadImageData() {
    Papa.parse(`/data/visualcontent.csv`, {
        download: true,
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        newline: "\n",
        delimiter: ",",
        complete: function (results) {
            console.log("Here")
            localStorage.setItem("imageData", JSON.stringify(results.data));
        }
    });
}

addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem("productData")) {
        loadProductData()
    }
    if (!localStorage.getItem("imageData")) {
        loadImageData()
    }
})