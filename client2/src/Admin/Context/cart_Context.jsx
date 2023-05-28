import React, { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "../Reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData=()=>{
    let newCartData=localStorage.getItem("cart");
    if(newCartData===[])
    {
        return [];
    }
    else{
        return JSON.parse(newCartData);
    }

}
const initialState = {
//   cart: [],
cart:getLocalCartData(),
  total_item: "",
  total_amount: "",
  shipping_fee: 5000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (productId, product, amount) => {
    dispatch({ type: "ADD_TO_CART", payload: { productId, product, amount } });
  };

  const removeItem = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const clearCart=()=>{
    dispatch({ type: "CLEAR_CART" });
  }
  

  // add data in local storage

  useEffect(() => {
  localStorage.setItem("cart",JSON.stringify(state.cart))
  }, [state.cart])
  
  return (
    <CartContext.Provider value={{ ...state, addToCart,removeItem ,clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
