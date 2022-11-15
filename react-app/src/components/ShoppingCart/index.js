// ShoppingCart/index.js

import React, { useEffect, useState } from "react";
import AddToCart from "../AddToCart";

import "../ShoppingCart/ShoppingCart.css";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || "[]";

const ShoppingCart = () => {
  const [cart, setCart] = useState(cartFromLocalStorage);

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   console.log("useEffect in shopping cart running");
  // }, [cart]);

  // function getTotalItemsCart() {
  //   let totalQty = 0;
  //   console.log("cart in get total items cart", cart);

  //   for (let row of cart) {
  //     totalQty += row.quantity;
  //   }

  //   return totalQty;
  // }

  // async function getCartProductInfo(productId) {
  //   const response = await fetch(`/api/items/${productId}`);

  //   if (response.ok) {
  //     const responseData = await response.json();
  //     console.log(responseData);

  //     let cartProductInfo = {
  //       name: responseData.name,
  //       previewImg: responseData.imageURLs[0],
  //       price: 10, // Need Price responseData.price
  //       shopName: responseData.shopName
  //     };

  //     return cartProductInfo;
  //   }
  // }

  return (
    <div className='cart--container'>
      <p> {} </p>
      <p> {} </p>;
      <AddToCart />
    </div>
  );
};

export default ShoppingCart;
