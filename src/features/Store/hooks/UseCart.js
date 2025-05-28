import { useState } from "react";
import { edit, post } from "../../../shared/services/API/api";
import { CartModel } from "../utils/models";
import { adaptAddingCartModel, adaptDeleteCartModel, adaptNewCartModel, adaptquantityChangeCartModel } from "../utils/adaptModels";

export function useCart(initialCart = null) {
  const [cart, setCart] = useState(initialCart);

  const createCart = async (product, storeUser) => {
    console.log(storeUser)
    try {
        const adaptedProduct = adaptNewCartModel(CartModel, product, storeUser)
      const res = await post("PreOrders", adaptedProduct)
      setCart(res.data);
      return res.data;
    } catch (error) {
      console.error("Error creating cart", error);
      throw error;
    }
  };

  const updateCart = async (cartModel, product, userId) => {
    try {
    const adaptedProduct = adaptAddingCartModel(cartModel, product, userId)
      const res = await edit("PreOrders", adaptedProduct)
      setCart(res.data);
      return res.data;
    } catch (error) {
      console.error("Error updating cart", error);
      throw error;
    }
  };

    const updateQuantity = async (cartModel, productId, quantity) => {
    try {
        const adaptedProduct = adaptquantityChangeCartModel(cartModel, productId, quantity)
      const res = await edit("PreOrders", adaptedProduct)
      setCart(res.data);
      return res.data;
    } catch (error) {
      console.error("Error updating cart", error);
      throw error;
    }
  };


  const removeProduct = async (cartModel, productId) => {
    try {
       const adaptedProduct = adaptDeleteCartModel(cartModel, productId)
      const res = await post("PreOrders", adaptedProduct)
      setCart(res.data);
      return res.data;
    } catch (error) {
      console.error("Error removing product", error);
      throw error;
    }
  };

  return {
    createCart,
    updateCart,
    updateQuantity,
    removeProduct,
    setCart
  };
}