// Universal Search Functionality
$(document).ready(function () {
  // Ensure products are available globally
  if (typeof products === "undefined") {
    console.error(
      "Products array is not defined. Please include the products data before this script."
    );
    return;
  }

  // Function to perform search across all pages
  function performSearch() {
    const searchTerm = $("#searchbox").val().trim().toLowerCase();

    // If on index or product listing page
    if ($("#product-list").length) {
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
    // If on product details page
    else if ($(".product-container").length) {
      // Filter related products
      const relatedProductsContainer = $("#related-products-container");
      relatedProductsContainer.empty();

      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );

      if (filteredProducts.length > 0) {
        filteredProducts.forEach((product) => {
          const productDiv = $(`<div class="product" id=${product.id}>`);
          productDiv.html(`
            <img src="${product.image}" alt="${product.name}">
            <div class="product-content" id=${product.id}>
              <div class="product-title">${product.name}</div>
              <div class="product-price">$${product.price}</div>
              <button class="btn-add-to-cart" id=${product.id}>Add to Cart</button>
            </div>
          `);
          relatedProductsContainer.append(productDiv);
        });

        // Reinitialize slick carousel if it exists
        if (relatedProductsContainer.hasClass("slick-initialized")) {
          relatedProductsContainer.slick("unslick");
        }
        relatedProductsContainer.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false,
          arrows: false,
        });
      } else {
        relatedProductsContainer.html(`
          <div class="no-results">
            <p>No related products found matching your search.</p>
          </div>
        `);
      }
    }
    // If on cart or checkout page, redirect to index with search
    else {
      window.location.href = `index.html?search=${encodeURIComponent(
        searchTerm
      )}`;
    }
  }

  // Function to handle initial page load with search query
  function handleInitialSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");

    if (searchQuery && window.location.pathname.includes("index.html")) {
      $("#searchbox").val(searchQuery);
      performSearch();
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

  // Check for initial search on page load
  handleInitialSearch();
});
