import { useState } from "react";
import { edit, getByCompanyId, post } from "../../../shared/services/API/api";
import { CartModel } from "../utils/models";
import { adaptAddingCartModel, adaptDeleteCartModel, adaptNewCartModel, adaptquantityChangeCartModel } from "../utils/adaptModels";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { filtercarts } from "../utils/functions";
import { getStoreUser } from "../../../shared/services/cookies";

export function useCart(initialCart = null) {
  const [cart, setCart] = useState(initialCart);
  const [newCart, setNewCart] = useLocalStorage("cart")
  const [stored] = useLocalStorage("data")
  const storeUser = getStoreUser()

  const updateLocalCart = async() =>{
    await getByCompanyId("PreOrders", stored?.company.id).then(response=> setNewCart(filtercarts(response.data, storeUser))) 
  }

  const createCart = async (product, storeUser) => {
    console.log(storeUser)
    try {
        const adaptedProduct = adaptNewCartModel(CartModel, product, storeUser)
      const res = await post("PreOrders", adaptedProduct)
      setCart(res.data);
      updateLocalCart()
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
      updateLocalCart()
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
      updateLocalCart()
      return res.data;
    } catch (error) {
      console.error("Error updating cart", error);
      throw error;
    }};


  const removeProduct = async (cartModel, productId) => {
    try {
       const adaptedProduct = adaptDeleteCartModel(cartModel, productId)
      const res = await post("PreOrders", adaptedProduct)
      setCart(res.data);
      updateLocalCart()
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