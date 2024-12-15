// Abhishek Choudhary
const addToCart = (id) => {
  const cart = loadCartData();

  let product = findItemById(cart, id);

  if (product != null) {
    product.quantity++;
  } else {
    product = {
      id: id,
      quantity: 1,
    };
    cart.push(product);
  }

  saveCartData(cart);
};

const findItemById = (cart, id) => {
  for (const item of cart) {
    if (item.id == id) {
      return item;
    }
  }
  return null;
};

const removeFromCart = (id) => {
  const cart = loadCartData();
  const newCart = cart.filter((item) => item.id !== id);
  saveCartData(newCart);
};

const changeQuantity = (id, quantity) => {
  const cart = loadCartData();
  const product = findItemById(cart, id);
  product.quantity = quantity;
  saveCartData(cart);
};

const loadCartData = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

const saveCartData = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const clearCartData = () => {
  saveCartData([]);
};
