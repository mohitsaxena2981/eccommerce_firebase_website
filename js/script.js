// Element (DOM)
// first Modal on First Page
/*
const closeModal = document.getElementById("close-modal");
const modalStarter = document.getElementById("modal-starter");
const btnBuyer = document.querySelector(".btn-modal-buyer");
const btnSeller = document.querySelector(".btn-modal-seller");
*/

// navBar
const navbarContent = document.getElementById("navbar-content");
const btnCloseNav = document.getElementById("btn-close-navbar");
const btnShowCart = document.getElementById("btn-shopping-bag");
const btnBuyerMain = document.querySelector(".btn-buyer");
const loginmod = document.getElementById("login-modal");

const btnSellerMain = document.querySelector(".btn-seller");
const password = document.getElementById("password");
const login = document.querySelector(".submit-btn");
const numberNavbar = document.querySelector(".count-cart");
let searchInput = document.getElementById("search-input");
// Cart
const cartSection = document.getElementById("cart-section");
const btnCloseCart = document.getElementById("btn-close-cart");
const cartContent = document.querySelector(".content-cart");
const minusBtn = document.querySelector(".minus");
const blusBtn = document.querySelector(".plus");
const removeAll = document.querySelector(".remove-all");
const numberItems = document.querySelector(".number-items");

// Add Product
const modalCreateProduct = document.getElementById("modal-create-product");
const btnCloseProductModal = document.getElementById("close-product-modal");
const modalProductOverview = document.getElementById("modal-product-overview");
const productName = document.getElementById("name");
const productCategory = document.getElementById("category");
const productPrice = document.getElementById("product-price");
const productImageUrl = document.getElementById("image-url");
const btnSubmitFormProduct = document.getElementById("btn-submit-form-product");
const addProductTitle = document.getElementById("add-product-title");

// main || content
const btnAddProduct = document.getElementById("btnAddProduct");
const sort = document.getElementById("sort");
const filter = document.getElementById("filter");
let empty = document.querySelector(".empty");

//////

let isCreate = true;
let INDEX_PRODUCT_GLOBAL;
let idProduct;

let productsList;
let isBuyer = true;
let cartItems;

window.addEventListener("load", () => {
  btnSellerMain.classList.add("btn-active");
  cartItems = getProducts("cartItems");
  productsList = getProducts("products");
  userTyper(false);
  render(productsList);
  cartItems = getProducts("cartItems") || [];
  renderCart(cartItems);
  totalPrice();
});

function userTyper(isABuyer) {
  isBuyer = isABuyer;
  // modalStarter.style.display = "none";
}
btnSellerMain.addEventListener("click", () => {
  document.getElementById("product-list").style.display = "none";
  // console.log("click");
});
btnBuyerMain.addEventListener("click", () => {
  btnSellerMain.classList.remove("btn-active");
  btnBuyerMain.classList.add("btn-active");
  btnAddProduct.style.display = "none";
  userTyper(true);
  productsList = getProducts("products");
  render(productsList);
});

login.addEventListener("click", () => {
  if (
    password.value == "abhishek1" ||
    password.value == "bhavay9" ||
    password.value == "mohit11" ||
    password.value == "tushar23"
  ) {
    btnBuyerMain.classList.remove("btn-active");
    btnSellerMain.classList.add("btn-active");
    btnAddProduct.style.display = "block";
    userTyper(false);
    productsList = getProducts("products");
    render(productsList);
  } else {
    alert("Wrong Credentials");
  }
});

btnAddProduct.addEventListener("click", () => {
  cleanInputForm();
  modalCreateProduct.classList.toggle("modal-hidden");
});

const cleanInputForm = () => {
  productName.value = "";
  productCategory.value = "";
  productPrice.value = "";
  productImageUrl.value = "";
  INDEX_PRODUCT_GLOBAL = "";
  idProduct = "";
  modalCreateProduct.classList.add("modal-hidden");
  btnSubmitFormProduct.innerHTML = "Add Product";
  addProductTitle.innerHTML = "Add more products to sell more ";
  isCreate = true;
};

toggleClass(btnCloseProductModal, modalCreateProduct, "modal-hidden");

function toggleClass(element, section, className) {
  element.addEventListener("click", () => {
    section.classList.toggle(className);
  });
}

btnSubmitFormProduct.addEventListener("click", () => {
  SubmitFormToCreateProduct();
});

document.getElementById("submit-btn").addEventListener("click", () => {
  SubmitFormToCreateProduct();
  document.getElementById("product-list").style.display = "";
  document.getElementById("login-modal").style.display = "none";
});

const SubmitFormToCreateProduct = () => {
  // document.getElementById("product-list").style.display = "";
  if (
    checkFormData(
      productName.value,
      productCategory.value,
      productPrice.value,
      productImageUrl.value
    )
  ) {
    let id = idProduct || Math.floor(Math.random() * 999);
    let newProductObject = convertToObject(
      id,
      productName.value,
      productCategory.value,
      productPrice.value,
      productImageUrl.value
    );
    if (isCreate) {
      productsList.push(newProductObject);
      firebase
        .database()
        .ref("student/" + id)
        .set({
          Name: productName.value,
          Cate: productCategory.value,
          Price: productPrice.value,
          URL: productImageUrl.value,
        });
      alert("Data Inserted");
    } else {
      alert("Input is not Valid");
      productsList[INDEX_PRODUCT_GLOBAL] = newProductObject;
    }
    postProducts("products", productsList);
    let products = getProducts("products");

    cleanInputForm();

    render(products);
  }
};

/*
const checkFormData = (name, price, category, image) => {
  let isValid = false;
  if (name === "" || price === "" || category === "" || image === "") {
    isValid = false;
  } else {
    isValid = true;
  }
  return isValid;
};
*/
const convertToObject = (id, name, category, price, image) => {
  return {
    id,
    name,
    category,
    price,
    image,
  };
};

function postProducts(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  getProducts(key);
}

function getProducts(key) {
  data =
    localStorage.getItem(key) == undefined
      ? []
      : JSON.parse(localStorage.getItem(key));
  return data;
}

function hasProduct(productList) {
  if (
    productsList.length == 0 ||
    productsList === undefined ||
    productsList === null
  ) {
    return false;
  }
  return true;
}

function render(productList) {
  if (hasProduct(productList)) {
    empty.style.display = "none";

    let listProducts = document.querySelector(".product-list");
    listProducts.innerHTML = "";
    productList.forEach((product, index) => {
      let list = document.createElement("li");
      let wrapImg = document.createElement("div");
      wrapImg.className = "wrap-img";

      let infoProduct = document.createElement("div");
      infoProduct.className = "info-product";

      let imgProduct = document.createElement("img");
      imgProduct.className = "img";
      imgProduct.setAttribute("src", product.image);

      let category = document.createElement("div");
      category.innerText = product.category;
      category.className = "category";

      let edit = document.createElement("div");
      let iconForEdit = document.createElement("i");

      if (!isBuyer) {
        edit.setAttribute("data-index", index);
        edit.className = "edit";
        edit.addEventListener("click", () => editProductDom(product, index));
        iconForEdit.className = "fa fa-pencil";
        edit.appendChild(iconForEdit);
        wrapImg.appendChild(edit);
      }

      let nameAndPrice = document.createElement("div");
      nameAndPrice.className = "name-price";
      let addCart = document.createElement("div");
      addCart.setAttribute("data-index", index);
      addCart.className = "add-cart";

      let iconForAdd = document.createElement("i");

      if (isBuyer) {
        addCart.addEventListener("click", () => addToCartDom(product));
        iconForAdd.className = "far fa-cart-plus";
      } else {
        addCart.addEventListener("click", () =>
          deleteProductDom(product, index)
        );
        iconForAdd.className = "far fa-trash-alt";
      }

      let name = document.createElement("h3");
      name.innerText = product.name;
      name.className = "name";
      let price = document.createElement("p");
      price.innerText = `$${product.price}`;
      price.className = "price";

      addCart.appendChild(iconForAdd);
      nameAndPrice.appendChild(name);
      nameAndPrice.appendChild(price);

      wrapImg.appendChild(category);
      wrapImg.appendChild(imgProduct);

      infoProduct.appendChild(nameAndPrice);
      infoProduct.appendChild(addCart);

      list.appendChild(wrapImg);
      list.appendChild(infoProduct);

      listProducts.insertBefore(list, listProducts.childNodes[0]);
    });
  } else {
    empty.style.display = "flex";
    // window.location.href = "index.html";
  }
}
function editProductDom({ id, name, category, price, image }, indexProduct) {
  modalCreateProduct.classList.remove("modal-hidden");
  btnSubmitFormProduct.innerHTML = "Update Product";
  addProductTitle.innerHTML = "Update your product";

  idProduct = id;
  productName.value = name;
  productCategory.value = category;
  productPrice.value = price;
  productImageUrl.value = image;
  INDEX_PRODUCT_GLOBAL = indexProduct;

  isCreate = false;
}

function deleteProductDom(object, indexProduct) {
  productsList = getProducts("products");
  productsList.splice(indexProduct, 1);

  postProducts("products", productsList);
  let products = getProducts("products");

  render(products);
}

toggleClass(btnShowCart, cartSection, "cart-hidden");

function addToCartDom(product) {
  cartItems = getProducts("cartItems") || [];
  product.quantity = 1;
  cartItems.push(product);
  postProducts("cartItems", cartItems);
  renderCart(getProducts("cartItems"));
  totalPrice();
  lengthItems();
}

function lengthItems() {
  numberNavbar.textContent = `${getProducts("cartItems").length}`;
  numberItems.textContent = `(${getProducts("cartItems").length} items)`;
}

lengthItems();

function renderCart(cartItems) {
  if (hasProduct(cartItems)) {
    cartContent.innerHTML = "";
    cartItems.forEach((item, i) => {
      cartContent.innerHTML += ` 
      <div class="item" id="index-${i}">
      <img
          src="${item.image}"
          alt="${item.name}"
      />
      <div class="info-item">
          <div class="data">
              <h3 class="name-item">
              ${item.name}
              </h3>
              <h3 class="price-item">$ ${item.price}</h3>
          </div>
          <div class="data">
              <div class="quentity">
                  <button class="minus" onclick="decrement(${i})" >
                      <i class="far fa-minus"></i>
                  </button>
                  <span class="quantity-number">1</span>
                  <button class="plus" onclick="increment(${i})" >
                      <i class="far fa-plus"></i>
                  </button>
              </div>
              <h4 class="remove" onclick="deleteItem(${i})">Remove</h4>
          </div>
      </div>
  </div>`;
    });
  } else {
    cartContent.innerHTML = "there is no items yet";
  }
}

const totalPrice = () => {
  let items = document.querySelectorAll(".item");
  let total = document.getElementById("total-number");
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let priceElement = item.querySelector(".price-item");
    let quantity = item.querySelector(".quantity-number").textContent;
    let price = priceElement.textContent;
    price = parseFloat(price.replace("$", ""));
    sum = sum + price * quantity;
  }
  total.innerText = sum.toFixed(2) + "$";
  postProducts("total", sum);
};
totalPrice();

removeAll.addEventListener("click", () => {
  cartItems = [];
  postProducts("cartItems", cartItems);
  renderCart(getProducts("cartItems"));
  totalPrice();
  lengthItems();
});

function deleteItem(i) {
  cartItems = getProducts("cartItems") || [];
  cartItems.splice(i, 1);
  postProducts("cartItems", cartItems);
  renderCart(getProducts("cartItems"));
  totalPrice();
  lengthItems();
}

toggleClass(btnCloseCart, cartSection, "cart-hidden");

const increment = (i) => {
  let quantity = document.getElementById(`index-${i}`).childNodes[3]
    .childNodes[3].childNodes[1].childNodes[3];
  quantity.textContent = parseInt(quantity.textContent) + 1;
  totalPrice();
};

const decrement = (i) => {
  let quantity = document.getElementById(`index-${i}`).childNodes[3]
    .childNodes[3].childNodes[1].childNodes[3];
  if (parseInt(quantity.textContent) === 1) {
    quantity.textContent = 1;
  } else {
    quantity.textContent = parseInt(quantity.textContent) - 1;
  }
  totalPrice();
};

searchInput.addEventListener("keyup", () => {
  render(searchProduct(searchInput.value, getProducts("products")));
});

const searchProduct = (name, products) => {
  if (name === "" || name === undefined || name === null) {
    return products;
  }

  let arr = [];
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].name.toLowerCase().trim().includes(name.toLowerCase().trim())
    ) {
      arr.push(products[i]);
    }
  }
  return arr;
};

filter.addEventListener("click", () => {
  render(
    filterProduct(
      filter.options[filter.selectedIndex].value,
      getProducts("products")
    )
  );
});

/*
const filterProduct = (nameCategory, products) => {
  if (nameCategory === "None" || nameCategory === undefined) {
    return products;
  } else {
    return products.filter((product) => {
      return product.category === nameCategory;
    });
  }
};
*/

sort.addEventListener("click", () => {
  render(
    sortProduct(sort.options[sort.selectedIndex].value, getProducts("products"))
  );
});

const sortProduct = (sortType, products) => {
  if (sortType === "None" || sortType === undefined) {
    return products;
  } else {
    const newProducts = [...products];
    if (sortType === "Maximum")
      return newProducts.sort((a, b) => (a.price > b.price ? -1 : 1));
    if (sortType === "Minimum")
      return newProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
  }
};

// Create toggle view (grid, list)

const btnList = document.querySelector("#btnList");
const btnGrid = document.querySelector("#btnGrid");

// btnList.style.display = "none";
// btnGrid.style.display = "none";

btnList.addEventListener("click", () => {
  const item1 = document.querySelector(".product-list");
  const item2 = document.querySelector(".wrap-img");
  const item3 = document.querySelector(".img");
  const item4 = document.querySelector(".info-product");
  const item5 = document.querySelector(".name");
  const item6 = document.querySelector(".price");

  item1.classList.remove("product-list");
  item1.classList.add("product-list-list");

  item2.classList.remove("wrap-img");
  item2.classList.add("wrap-img-list");

  item3.classList.remove("img");
  item3.classList.add("img-list");

  item4.classList.remove("info-product");
  item4.classList.add("info-product-list");

  item5.classList.remove("name");
  item5.classList.add("name-list");

  item6.classList.remove("price");
  item6.classList.add("price-list");
});

btnGrid.addEventListener("click", () => {
  const item1 = document.querySelector(".product-list-list");
  const item2 = document.querySelector(".wrap-img-list");
  const item3 = document.querySelector(".img-list");
  const item4 = document.querySelector(".info-product-list");
  const item5 = document.querySelector(".name-list");
  const item6 = document.querySelector(".price-list");

  item1.classList.remove("product-list-list");
  item1.classList.add("product-list");

  item2.classList.remove("wrap-img-list");
  item2.classList.add("wrap-img");

  item3.classList.remove("img-list");
  item3.classList.add("img");

  item4.classList.remove("info-product-list");
  item4.classList.add("info-product");

  item5.classList.remove("name-list");
  item5.classList.add("name");

  item6.classList.remove("price-list");
  item6.classList.add("price");
});
