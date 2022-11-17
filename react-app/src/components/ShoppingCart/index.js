// ShoppingCart/index.js

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "../ShoppingCart/ShoppingCart.css";

// initializes localStorageCart, if it doesn't exist sets it to an empty array
let localStorageCart = JSON.parse(localStorage.getItem("cart") || "[]");

const ShoppingCart = () => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  let conditionalButtons;

  //  initializes shoppingCart state, defaults to the localStorageCart
  const [shoppingCart, setShoppingCart] = useState(localStorageCart);
  // const [checkoutItemsObj, setCheckoutItemsObj] = useState({});
  // const [checkoutRes, setCheckoutRes] = useState("");
  // console.log("this is checkoutItemsObj", checkoutItemsObj);

  // mounts the shopping cart on initial mount
  useEffect(() => {
    localStorageCart = JSON.parse(localStorage.getItem("cart"));

    if (shoppingCart === [] && localStorageCart === []) {
      setShoppingCart([]);
    } else {
      setShoppingCart(localStorageCart);
    }
    // console.log("mounting localStorage Cart");
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  const postCheckout = async (checkoutItems) => {
    console.log(checkoutItems);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkoutItems)
    };
    const res = await fetch("/api/orders", requestOptions);
    // console.log(requestOptions.body);

    if (res.ok) {
      // setCheckoutRes(
      //   "Your order has been placed, thanks for shopping at Petsy!"
      // );
      console.log("res", res);
      console.log("it worked");
      await emptyCart();
    } else {
      console.log(res);
    }
  };

  function removeFromShoppingCart(removedItem) {
    setShoppingCart(shoppingCart.filter((item) => item !== removedItem));
  }

  function updateQuantity(productInfo, newQty) {
    let cartArray = [...shoppingCart];

    for (let item of cartArray) {
      if (item.itemId === productInfo.itemId) {
        item.quantity = newQty;
      }
    }

    setShoppingCart(cartArray);
  }

  function getTotalQuantity() {
    if (!shoppingCart) return 0;

    let totalQuantity = 0;
    for (let item of shoppingCart) {
      totalQuantity += Number(item.quantity);
    }
    return totalQuantity;
  }

  function getTotalPrice() {
    if (!shoppingCart) return 0.0;

    let totalPrice = 0;
    for (let item of shoppingCart) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice.toFixed(2);
  }

  function emptyCart() {
    // localStorage.removeItem("cart");
    setShoppingCart([]);
  }

  async function handleCheckout() {
    if (!user) {
      history.push("/sign-in");
    }

    let checkoutItems = [];

    // await shoppingCart;

    for (let item of shoppingCart) {
      checkoutItems.push({
        id: Number(item.itemId),
        quantity: item.quantity
      });
    }
    // setCheckoutItemsObj({ checkoutItems });
    console.log("this is checkout items", checkoutItems);

    postCheckout({ checkoutItems });
  }

  // const emptyCart = useCallback(() => {
  //   setShoppingCart([]);
  // }, [shoppingCart]);

  // const shoppingCartMap = (

  // )
  console.log("shoppingCart", shoppingCart);

  if (shoppingCart.length <= 0) {
    conditionalButtons = <></>;
  } else {
    conditionalButtons = (
      <>
        <button
          className='cart-sidebox-emptyShoppingCart-button cart-button'
          onClick={() => emptyCart()}>
          Empty Cart
        </button>
        <button
          className='cart-sidebox-checkout-button cart-button'
          onClick={() => handleCheckout()}>
          Checkout
        </button>
      </>
    );
  }

  return (
    <>
      <div className='cart-container-main'>
        <h1 className='cart-header'>Shopping Cart</h1>
        <div className='cart-items-container'>
          {shoppingCart?.map((item, index) => (
            <div
              className='cart-item-container'
              key={index}>
              <div className='cart-item-img-container'>
                <img
                  src={item.previewImg}
                  alt={item.name}
                  className='cart-item-img'
                />
              </div>
              <div className='cart-item-text-container'>
                <div className='cart-item-name'>{item.name}</div>
                <div className='cart-item-price'>${item.price}</div>
                <div className='cart-item-qty'>{item.quantity} in cart</div>
                <div className='cart-item-qty-input'>
                  <label
                    htmlFor='quantity'
                    className='cart-form-label'>
                    in cart
                  </label>
                  <input
                    className='cart-form-input  '
                    type='number'
                    required
                    min='0'
                    onChange={(e) => {
                      updateQuantity(item, Number(e.target.value));
                    }}
                    value={Number(item.quantity)}
                    name='quantity'
                  />
                </div>
              </div>

              <button
                className='cart-remove-item-button cart-button'
                onClick={() => removeFromShoppingCart(item)}>
                Remove Item
              </button>
            </div>
          ))}
        </div>
        <div className='cart-sidebox-container'>
          <div className='cart-sidebox-header'>Checkout</div>
          <div className='cart-sidebox-totalitems'>
            {getTotalQuantity()} items in your cart
          </div>
          <div className='cart-sidebox-totalprice'>
            Item(s) Total Price ${getTotalPrice()}
          </div>
          <div cart-conditional-buttons-container>{conditionalButtons}</div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
