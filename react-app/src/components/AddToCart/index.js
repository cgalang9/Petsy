// AddToCart/index.js

import React, { useEffect, useState } from "react";

import "../AddToCart/AddToCart.css";

let localStorageCart = JSON.parse(localStorage.getItem("cart"));

const AddToCart = ({ propInfo }) => {
  let productInfo = {
    avgShopRating: 2.33,
    description: "The large cozey for large pets!",
    imageURLs: "https://randomfox.ca/images/5.jpg",
    itemReviews: 3,
    name: "Large Cozey for Pets",
    sellerId: 10,
    shopName: "Cozey Critters",
    shopReviews: 15,
    shopSales: 0,
    price: 10.55 // Need Price
  };

  // async function getCartProductInfo(productId) {
  //   const response = await fetch(`/api/items/${productId}`);

  //   if (response.ok) {
  //     const responseData = await response.json();
  //     console.log("rp", responseData);
  //     return responseData;
  //   }
  // }

  const [cart, setCart] = useState(localStorageCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("useEffect in add item running");
  }, [cart]);

  // const getCartIndex = (productId) => {
  //   let cartIndex = cart.indexOf(
  //     cart.find((item) => item.productId === productId)
  //   );
  //   console.log("cart index", cartIndex);
  //   return cartIndex;
  // };

  const handleAddToCartClick = (productInfo) => {
    console.log(productInfo);
    if (!localStorageCart) {
      setCart([productInfo]);
    } else {
      setCart([...cart, productInfo]);
    }
    console.log("cart after add to click", cart);
  };

  return (
    <button
      className='AddToCart--button-component'
      onClick={() => handleAddToCartClick(productInfo)}
      type='button'>
      Add to cart
    </button>
  );
};

export default AddToCart;
