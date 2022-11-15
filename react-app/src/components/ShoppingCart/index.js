// ShoppingCart/index.js

import React, { useEffect, useState } from "react";
import AddToCart from "../AddToCart";

import "../ShoppingCart/ShoppingCart.css";

let localStorageCart = JSON.parse(localStorage.getItem("cart"));

const ShoppingCart = () => {
  console.log("this is localStorageCart in ShoppingCart", localStorageCart);

  const [shoppingCart, setShoppingCart] = useState(localStorageCart);

  useEffect(() => {
    const shoppingCart = JSON.parse(localStorage.getItem("cart"));
    if (shoppingCart) {
      setShoppingCart(shoppingCart);
    }
  }, [shoppingCart, AddToCart, getTotalPrice()]);

  //   return totalQty;
  // }

  console.log("this is shoppingcart in shopping cart", shoppingCart);

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

  // function addToShoppingCart(item) {
  //   setShoppingCart(...shoppingCart, item);
  // }

  function getTotalPrice() {
    let totalPrice = 0;
    for (let item of shoppingCart) {
      totalPrice += item.price;
    }
    return totalPrice.toFixed(2);
  }

  return (
    <>
      <div className='cart-container-main'>
        <h1>Shopping Cart</h1>
        <h3>{shoppingCart.length} items in your cart</h3>
        <div className='cart-items'>
          {shoppingCart.map((item, index) => (
            <div
              className='cart-item'
              key={index}>
              <div className='cart-item-name'>{item.name}</div>
              <div className='cart-item-price'>{item.price}</div>
              <div className='cart-item-img-wrapper'>
                <img
                  src={item.previewImg}
                  alt={item.name}
                  className='cart-item-img'
                />
              </div>
              <div className='cart-item-price'>{item.price}</div>
              <AddToCart />
            </div>
          ))}
        </div>
        <div className='cart-sidebox'>
          {" "}
          Checkout
          <div className='cart-sidebox-totalprice'>
            Item(s) Total Price ${getTotalPrice()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
