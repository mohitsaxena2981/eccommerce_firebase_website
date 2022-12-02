const checkFormData = (name, price, category, image) => {
  let isValid = false;
  if (name === "" || price === "" || category === "" || image === "") {
    isValid = false;
  } else {
    isValid = true;
  }
  return isValid;
};

// logic For filter Products
const filterProduct = (nameCategory, products) => {
  if (nameCategory === "None" || nameCategory === undefined) {
    return products;
  } else {
    return products.filter((product) => {
      return product.category === nameCategory;
    });
  }
};

if (typeof module !== "undefined") {
  module.exports = {
    checkFormData,
    filterProduct,
  };
}
