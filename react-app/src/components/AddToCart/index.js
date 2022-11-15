// AddToCart/index.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItemDetailsThunk } from "../../store/itemPage";

import "../AddToCart/AddToCart.css";

const AddToCart = () => {
  let localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");
  let itemId = 5;

  const dispatch = useDispatch();
  const [cart, setCart] = useState(localStorageCart);

  useEffect(() => {
    dispatch(getItemDetailsThunk(itemId)).catch((res) => "error");
  }, [dispatch, itemId]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("useEffect in add item running");
  }, [cart]);

  const item = useSelector((state) => state.itemPage);

  if (!item) return null;

  let productInfo = {
    previewImg: item.imageURLs[0],
    name: item.name,
    shopName: item.shopName,
    price: item.price
  };

  // async function getCartProductInfo(productId) {
  //   const response = await fetch(`/api/items/${productId}`);

  //   if (response.ok) {
  //     const responseData = await response.json();
  //     console.log("rp", responseData);
  //     return responseData;
  //   }
  // }

  // const getCartIndex = (productId) => {
  //   let cartIndex = cart.indexOf(
  //     cart.find((item) => item.productId === productId)
  //   );
  //   console.log("cart index", cartIndex);
  //   return cartIndex;
  // };

  const handleAddToCartClick = (productInfo) => {
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
