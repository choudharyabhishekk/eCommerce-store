// Abhishek Choudhary / 8939027
const products = [
  {
    id: 1,
    name: "Milk Chocolate Bar",
    price: 3.99,
    description:
      "Smooth, creamy milk chocolate. Pure indulgence in a bar of velvety richness. Unforgettable delight for chocolate lovers.",
    image: "images/chocolate1.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Dark Chocolate Truffles",
    price: 5.99,
    description:
      "Decadent truffles, rich cocoa perfection. Luxurious treats crafted to captivate your taste buds. A sublime chocolate experience awaits.",
    image: "images/chocolate2.jpg",
    quantity: 1,
  },
  {
    id: 3,
    name: "White Chocolate Assortment",
    price: 7.99,
    description:
      "Sweet white chocolates, a delightful assortment. Irresistible variety for those who crave the delicate sweetness of white chocolate.",
    image: "images/chocolate3.jpg",
    quantity: 1,
  },
  {
    id: 4,
    name: "Hazelnut Praline Bar",
    price: 4.49,
    description:
      "Crunchy hazelnuts, smooth praline in a chocolate bar. Tempting delight for those seeking the perfect blend of crunch and creaminess.",
    image: "images/OREO-BAG.jpg",
    quantity: 1,
  },
  {
    id: 5,
    name: "Caramel-filled Chocolate Hearts",
    price: 6.99,
    description:
      "Heart-shaped chocolates with gooey caramel centers. A romantic and delightful indulgence for those with a sweet tooth.",
    image: "images/ESTA-TRUFFLE.jpg",
    quantity: 1,
  },
  {
    id: 6,
    name: "Orange Zest Dark Chocolate",
    price: 8.99,
    description:
      "Dark chocolate infused with natural orange zest. A citrusy twist adds a refreshing note to this decadent chocolate treat.",
    image: "images/chocolate1.jpg",
    quantity: 1,
  },
  {
    id: 7,
    name: "Almond Crunch Chocolate Bark",
    price: 9.99,
    description:
      "Crunchy almond pieces embedded in delectable chocolate bark. A delightful blend of textures and flavors in every bite.",
    image: "images/chocolate2.jpg",
    quantity: 1,
  },
  {
    id: 8,
    name: "Raspberry Filled Chocolates",
    price: 5.49,
    description:
      "Chocolates filled with raspberry-flavored ganache. An exquisite balance of sweetness and tartness in each luxurious piece.",
    image: "images/chocolate3.jpg",
    quantity: 1,
  },
  {
    id: 9,
    name: "Mint Chocolate Squares",
    price: 4.99,
    description:
      "Refreshing mint-flavored chocolate squares. Cool treat with a perfect balance of minty freshness and rich chocolate goodness.",
    image: "images/chocolatebox1.jpeg",
    quantity: 1,
  },
  {
    id: 10,
    name: "Peanut Butter Cup",
    price: 6.49,
    description:
      "Classic peanut butter filling encased in smooth milk chocolate. Iconic indulgence with a perfect blend of sweet and nutty flavors.",
    image: "images/chocolatebox2.jpeg",
    quantity: 1,
  },
  {
    id: 11,
    name: "Coconut Chocolate Truffles",
    price: 7.49,
    description: "Decadent truffles with a coconut-infused chocolate ganache.",
    image: "images/chocolatebox3.jpeg",
    quantity: 1,
  },
  {
    id: 12,
    name: "Sea Salt Caramel Chocolate",
    price: 8.49,
    description:
      "Sweet and salty caramel-filled chocolates for a delightful contrast.",
    image: "images/chocolatebox4.jpeg",
    quantity: 1,
  },
  {
    id: 13,
    name: "Cherry Almond Chocolate Clusters",
    price: 10.99,
    description:
      "Clusters of cherries and almonds enrobed in smooth milk chocolate.",
    image: "images/CHRISTMAS-BOX.jpeg",
    quantity: 1,
  },
  {
    id: 14,
    name: "Pistachio White Chocolate Bar",
    price: 11.99,
    description: "Creamy white chocolate with the crunch of pistachio nuts.",
    image: "images/CHRISTMAS.jpeg",
    quantity: 1,
  },
  {
    id: 15,
    name: "Irish Cream Chocolate Truffles",
    price: 12.99,
    description:
      "Luxurious truffles infused with the rich flavor of Irish cream.",
    image: "images/ESTA-TRUFBOX.jpeg",
    quantity: 1,
  },
  {
    id: 16,
    name: "Blueberry Cheesecake Chocolates",
    price: 9.49,
    description: "Chocolates inspired by the flavors of blueberry cheesecake.",
    image: "images/ESTA-3BOX-TRUFFLES.jpg",
    quantity: 1,
  },
  {
    id: 17,
    name: "Pomegranate Dark Chocolate Squares",
    price: 7.99,
    description:
      "Dark chocolate squares filled with tangy pomegranate ganache.",
    image: "images/PRETZELS-10717sm.jpeg",
    quantity: 1,
  },
  {
    id: 18,
    name: "Strawberry Champagne Truffles",
    price: 13.49,
    description:
      "Decadent truffles infused with the essence of strawberry and champagne.",
    image: "images/RED-CHRISTMAS-10624sm.jpeg",
    quantity: 1,
  },
  {
    id: 19,
    name: "Chili Mango Chocolate Bar",
    price: 8.99,
    description:
      "A spicy and sweet combination of chili and mango in a chocolate bar.",
    image: "images/vegan-truffles.png",
    quantity: 1,
  },
  {
    id: 20,
    name: "Espresso Bean Dark Chocolate",
    price: 14.99,
    description:
      "Dark chocolate with the intense flavor of espresso beans for coffee lovers.",
    image: "images/RED-CHRISTMAS-10624sm.jpeg",
    quantity: 1,
  },
];

const findProductById = (id) => {
  id = parseInt(id);
  for (const product of products) {
    if (product.id == id) {
      return product;
    }
  }
  return null;
};

const toDollar = (num) => {
  return "$" + num.toFixed(2);
};

const HST = 0.13;
