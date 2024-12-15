// Abhishek Choudhary / 8939027
$(document).ready(function () {
  var startIndex = 0;
  var endIndex = 9;

  // Loop through the products and create HTML elements to display them
  const displayProducts = (startIndex, endIndex) => {
    const productListDiv = $("#product-list");
    const productsToShow = products.slice(startIndex, endIndex);
    productsToShow.forEach((product) => {
      const productDiv = $(`<div class="product" id=${product.id}>`);
      productDiv.html(`
    <img src="${product.image}" alt="${[product.name]}" id=${product.id}>
     <div class="product-content" id=${product.id}>
      <div class="product-title">${product.name}</div>
     <div class="product-price">$${product.price}</div>
     <button class="btn-add-to-cart" id=${product.id}>Add to Cart</button>
   </div></div>
    `);
      productListDiv.append(productDiv);
      productDiv.fadeIn("slow");
    });
  };

  //loading the initial products and BX slider
  $(".bxslider").bxSlider({
    auto: true,
    pause: 3000,
  });
  displayProducts(startIndex, endIndex);

  $("#product-list").on("click", ".product img", function (e) {
    var selectedProductID = $(this).attr("id");
    window.location.href = `product-page.html?id=${selectedProductID}`;
  });

  // add to cart button event listener
  function handleAddToCartClick(e) {
    e.preventDefault();
    if ($(this).text() === "Proceed to Checkout") {
      window.location.href = "cart.html";
    } else {
      addToCart($(this).attr("id"));
      $(this).css("background-color", "#a33115");
      $(this).text("Proceed to Checkout");
    }
  }
  $("#product-list").on("click", ".btn-add-to-cart", handleAddToCartClick);

  //button event listener for individual product page

  $(".product-container").on("click", ".btn-add-to-cart", function (e) {
    e.preventDefault();

    addToCart($(this).attr("id"));
    $(this).css("background-color", "#a33115");

    window.location.href = "cart.html";
  });

  // event listener for related products

  $("#related-products-slider").on(
    "click",
    ".btn-add-to-cart",
    handleAddToCartClick
  );

  $("#loadProducts").click(() => {
    startIndex = endIndex;
    endIndex = products.length;
    displayProducts(startIndex, endIndex);
  });

  // function to open clicked product in products page
  const productPageDetails = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const productDetails = products.find((product) => product.id == productId);

    $("#accordion").accordion({
      heightStyle: "content",
      collapsible: true,
      active: false,
    });
    // Update the HTML elements on  individual products page
    $("#product_image").attr("src", productDetails.image);
    $(".btn-add-to-cart").attr("id", productDetails.id);
    $("#product_title").text(productDetails.name);
    $("#product_price").text(`$${productDetails.price}`);
    $("#product_description").text(productDetails.description);
  };
  $(".bxslider").bxSlider({
    auto: true,
    pause: 3000,
  });

  // load related products in individual products page
  const relatedProducts = $("#related-products-container");
  const productsToShow = products.slice(0, 8);
  productsToShow.forEach((product) => {
    const productDiv = $(`<div class="product" id=${product.id}>`);
    productDiv.html(`
    <img src="${product.image}" alt="${product.name}">
     <div class="product-content" id=${product.id}>
      <div class="product-title">${product.name}</div>
     <div class="product-price">$${product.price}</div>
     <button class="btn-add-to-cart" id=${product.id}>Add to Cart</button>
   </div></div>
    `);
    relatedProducts.append(productDiv);
  });

  // Initialize Slick Carousel
  $("#related-products-container").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false,
    arrows: false,
  });

  // reviews form event handler

  $("#review-form").submit(function (e) {
    e.preventDefault();
    alert("Thank you for your review!");
  });

  // Call the productPageDetails function in individual products page load
  if (window.location.pathname.includes("product-page.html")) {
    productPageDetails();
  }
});
