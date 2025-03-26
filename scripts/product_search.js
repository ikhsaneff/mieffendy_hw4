let productData;

Papa.parse('../data/product.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: function (results) {
        productData = results.data;
    }
});

console.log(productData); 