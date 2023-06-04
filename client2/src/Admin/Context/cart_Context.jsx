import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import reducer from "../Reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let newCartData = localStorage.getItem("cart");
  if (newCartData === []) {
    return [];
  } else {
    return JSON.parse(newCartData);
  }
};

const initialState = {
  cart: getLocalCartData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 200,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [userdata, setUserdata] = useState({ fullName: "",
  email: "",
  address: "",
  phoneNumber: "",city:""}); // Add userdata state

  const addToCart = (productId, product, amount) => {
    dispatch({ type: "ADD_TO_CART", payload: { productId, product, amount } });
  };

  const removeItem = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrease = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "CART_TOTAL_PRICE" });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        userData: userdata, // Use userData instead of userdata
        setUserData: setUserdata,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrease,
        totalAmount: state.total_amount,
        shippingFee: state.shipping_fee,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
