import React from "react";

export default function cartReducer(state, action) {
  // add item to cart
  if (action.type === "ADD_TO_CART") {
    let { productId, product, amount } = action.payload;

    // to check for the existing item in cart
    let existingProduct = state.cart.find((curItem) => curItem.id === productId);
    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === productId) {
          let newAmount = curElem.amount + amount;
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
        id: product.id,
        name: product.productName,
        amount,
        image: product.productImage,
        price: product.productPrice,
      };
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  // to remove one item from the cart
  if (action.type === "REMOVE_ITEM") {
    let updateCart = state.cart.filter((curItem) => curItem.id !== action.payload);
    return {
      ...state,
      cart: updateCart,
    };
  }

  // to clear the data from the cart
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  return state;
}
