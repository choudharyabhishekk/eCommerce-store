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
        <img src="${product.image}" alt="${product.name}" id=${product.id}>
        <div class="product-content" id=${product.id}>
          <div class="product-title">${product.name}</div>
          <div class="product-price">$${product.price}</div>
          <button class="btn-add-to-cart" id=${product.id}>Add to Cart</button>
        </div>
      `);
      productListDiv.append(productDiv);
      productDiv.fadeIn("slow");
    });
  };

  // Search functionality
  function performSearch() {
    const searchTerm = $("#searchbox").val().trim().toLowerCase();

    // Check if the product-list element exists
    if ($("#product-list").length === 0) {
      // Redirect to the index page and pass the search term as a query parameter
      window.location.href = `index.html?search=${encodeURIComponent(
        searchTerm
      )}`;
      return;
    }

    const productListDiv = $("#product-list");

    // Clear existing products
    productListDiv.empty();

    // Filter products based on search term
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    // Display filtered products
    if (filteredProducts.length > 0) {
      filteredProducts.forEach((product) => {
        const productDiv = $(`<div class="product" id=${product.id}>`);
        productDiv.html(`
          <img src="${product.image}" alt="${product.name}" id=${product.id}>
          <div class="product-content" id=${product.id}>
            <div class="product-title">${product.name}</div>
            <div class="product-price">$${product.price}</div>
            <button class="btn-add-to-cart" id=${product.id}>Add to Cart</button>
          </div>
        `);
        productListDiv.append(productDiv);
        productDiv.fadeIn("slow");
      });

      // Hide load more button if all products are shown
      $("#loadProducts").hide();
    } else {
      // No products found
      productListDiv.html(`
        <div class="no-results">
          <p>No products found matching your search.</p>
        </div>
      `);

      // Hide load more button
      $("#loadProducts").hide();
    }
  }

  // Event listener for search icon click
  $("#search").on("click", function (e) {
    e.preventDefault(); // Prevent page reload
    performSearch();
  });

  // Event listener for Enter key in search box
  $("#searchbox").on("keypress", function (e) {
    if (e.which === 13) {
      // Enter key
      e.preventDefault();
      performSearch();
    }
  });

  // Check for search term in URL and perform search if present
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get("search");
  if (searchTerm) {
    $("#searchbox").val(decodeURIComponent(searchTerm));
    performSearch();
  }

  // Loading the initial products and BX slider
  $(".bxslider").bxSlider({
    auto: true,
    pause: 3000,
  });
  displayProducts(startIndex, endIndex);

  // Open clicked product in the products page
  $("#product-list").on("click", ".product img", function (e) {
    var selectedProductID = $(this).attr("id");
    window.location.href = `product-page.html?id=${selectedProductID}`;
  });

  // Add to cart button event listener
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

  // Individual product page handling
  const productPageDetails = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const productDetails = products.find((product) => product.id == productId);

    $("#accordion").accordion({
      heightStyle: "content",
      collapsible: true,
      active: false,
    });

    // Update the HTML elements on the individual products page
    $("#product_image").attr("src", productDetails.image);
    $(".btn-add-to-cart").attr("id", productDetails.id);
    $("#product_title").text(productDetails.name);
    $("#product_price").text(`$${productDetails.price}`);
    $("#product_description").text(productDetails.description);
  };

  // Related products on individual product page
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
      </div>
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

  // Reviews form event handler
  $("#review-form").submit(function (e) {
    e.preventDefault();
    alert("Thank you for your review!");
  });

  // Call the productPageDetails function if on individual product page
  if (window.location.pathname.includes("product-page.html")) {
    productPageDetails();
  }

  // Load more products
  $("#loadProducts").click(() => {
    startIndex = endIndex;
    endIndex = products.length;
    displayProducts(startIndex, endIndex);
  });
});
