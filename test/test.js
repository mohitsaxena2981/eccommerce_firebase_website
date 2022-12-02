const { checkFormData, filterProduct } = require("../js/script");

describe("Test  Check Form Data", () => {
  test("Check Form Data is Valid", () => {
    expect(checkFormData("name", "price", "category", "image")).toBeTruthy();
    expect(checkFormData("name", "price", "category", "")).toBeFalsy();
    expect(checkFormData("name", "price", "", "image")).toBeFalsy();
    expect(checkFormData("name", "", "category", "image")).toBeFalsy();
    expect(checkFormData("", "price", "category", "image")).toBeFalsy();
    expect(checkFormData("", "", "", "")).toBeFalsy();
  });
});

describe("Filter Function", () => {
  test("should return array with clothes cateogre products", () => {
    const nameCategory = "clothing";
    let products = [
      {
        id: 1,
        name: "first",
        price: 15.18,
        category: "clothing",
        image: "https://ddddddd",
      },
      {
        id: 2,
        name: "second",
        price: 22,
        category: "Games",
        image: "https://ddddddd",
      },
    ];
    const filteredList = [
      {
        id: 1,
        name: "first",
        price: 15.18,
        category: "clothing",
        image: "https://ddddddd",
      },
    ];
    expect(filterProduct(nameCategory, products)).toEqual(filteredList);
  });

  test("should return the same array without any change", () => {
    let nameCategory;
    let products = [
      {
        id: 1,
        name: "first",
        price: 15.18,
        category: "clothing",
        image: "https://ddddddd",
      },
      {
        id: 2,
        name: "second",
        price: 22,
        category: "Games",
        image: "https://ddddddd",
      },
    ];
    expect(filterProduct(nameCategory, products)).toEqual(products);
  });
});
