/*
 * Peng
 */
$(document).ready(function () {
  loadProducts();
  $(".removeItem").click(function () {
    removeFromCart($(this).attr("id"));
    reloadProducts();
  });

  $("#checkout").click(function () {
    window.location.href = "./checkout.html";
  });
});

const reloadProducts = () => {
  // clear the display first then load it.
  $("#cart").empty();
  loadProducts();
};

const loadProducts = () => {
  const cart = loadCartData();
  if (cart.length == 0) {
    // display a message if it's empty
    $("#cart-empty").show();
    $("#checkout").attr("disabled", true);
    return;
  } else {
    $("#cart-empty").hide();
    $("#checkout").attr("disabled", false);
  }

  for (i = 0; i < cart.length; i++) {
    const product = findProductById(cart[i].id);
    const subtotal = toDollar(product.price * cart[i].quantity);
    const spinnerId = `spinner-${product.id}`;
    const subtotalId = `subtotal-${product.id}`;
    const html = `
    <tr>
      <td>
        <button class="removeItem" id=${product.id}>Delete</button>
        <img class="icon" src="${product.image}" alt="${[product.name]}">
        ${product.name}
      </td>
      <td>
        <div class="product-price">$${product.price}</div>
      </td>
      <td><input id="${spinnerId}" value="${cart[i].quantity}"></td>
      <td id="${subtotalId}">${subtotal}</td>
    </tr>
    `;
    $("#cart").append(html);

    // there is a different spinner for each row.
    $("#" + spinnerId).spinner({
      min: 1,
      // change the HST and total value when the spinner value changes.
      spin: function (event, ui) {
        const newQuantity = ui.value;
        changeQuantity(product.id, newQuantity);
        $("#" + subtotalId).text(toDollar(product.price * newQuantity));
        updateTotal();
      },
    });
  }

  updateTotal();
};

const updateTotal = () => {
  const cart = loadCartData();
  let subtotal = 0;
  for (i = 0; i < cart.length; i++) {
    const product = findProductById(cart[i].id);
    subtotal += product.price * cart[i].quantity;
  }

  $("#subtotal").text(toDollar(subtotal));

  const hst = subtotal * HST;
  $("#hst").html(toDollar(hst));

  const total = subtotal * (1 + HST);
  $("#total").text(toDollar(total));
};
