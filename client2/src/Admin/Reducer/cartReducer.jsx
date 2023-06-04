import React from "react";

export default function cartReducer(state, action) {
  // add item to cart
  if (action.type === "ADD_TO_CART") {
    let { productId, product, amount } = action.payload;
    console.log("inreducer", productId, product);
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
        id: product._id, // id changed _id
        name: product.productName,
        amount,
        image: product.productImages[0],
        price: product.productPrice,
      };
      console.log("cartProducct", cartProduct);
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  // to remove one item from the cart
  if (action.type === "REMOVE_ITEM") {
    console.log("Removing item with ID:", action.payload);
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

  // to set the increment and decrement

  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let decAmount = curElem.amount - 1;
        if (decAmount <= 1) {
          decAmount = 1;
        }
        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let IncAmount = curElem.amount + 1;
        // if(decAmount<=1){
        //   decAmount=1;
        // }
        return {
          ...curElem,
          amount: IncAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "CART_TOTAL_PRICE") {
    let total_amount = state.cart.reduce((initialValue, curElem) => {
      let { price, amount } = curElem;
      initialValue = initialValue + price * amount;
      return initialValue;
    }, 0);
    return { ...state, total_amount };
  }
  
  return state;
}
