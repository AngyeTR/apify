import { useState } from "react";
import { edit, getByCompanyId, post } from "../../../shared/services/API/landingApi";
import { CartModel } from "../utils/models";
import { adaptAddingCartModel, adaptDeleteCartModel, adaptFinishCartModel, adaptNewCartModel, adaptquantityChangeCartModel } from "../utils/adaptModels";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { filtercarts } from "../utils/functions";
import { getStoreUser } from "../../../shared/services/cookies";

export function useCart(initialCart = null) {
  const [cart, setCart] = useState(initialCart);
  const [newCart, setNewCart] = useLocalStorage("cart")
  const [stored] = useLocalStorage("storeCompany")
  const storeUser = getStoreUser()

  const updateLocalCart = async() =>{
    await getByCompanyId("Orders", stored?.company.id).then(response=> setNewCart(filtercarts(response.data, storeUser))) 
  }

  const createCart = async (product, storeUser) => {
    try {
        const adaptedProduct = adaptNewCartModel(CartModel, product, storeUser)
      const res = await post("PreOrder", adaptedProduct)
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
      const res = await edit("PreOrder", adaptedProduct)
      setCart(res.data);
      updateLocalCart()
      return res.data;
    } catch (error) {
      console.error("Error updating cart", error);
      throw error;
    }
  };

    const updateCartAddress = async (cart) => {
    try {
      const res = await edit("PreOrder", cart)
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
      const res = await edit("PreOrder", adaptedProduct)
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
      const res = await post("PreOrder", adaptedProduct)
      setCart(res.data);
      updateLocalCart()
      return res.data;
    } catch (error) {
      console.error("Error removing product", error);
      throw error;
    }
  };

const finishCart = async ()=> {
  try {
         const adaptedProduct = adaptFinishCartModel(cart)
         console.log(JSON.stringify(adaptedProduct))
        const res = await edit("PreOrder", adaptedProduct)
        setCart(res.data);
        return res.data;
      } catch (error) {
        console.error("Error editing cart", error);
        throw error;
      }
}


  return {
    createCart,
    updateCart,
    updateQuantity,
    removeProduct,
    setCart,
    updateCartAddress,
    finishCart
  };
}