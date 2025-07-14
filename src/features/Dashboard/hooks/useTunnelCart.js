import { useState } from "react";
import { edit, getByCompanyId, post } from "../../../shared/services/API/landingApi";
import { CartModel } from "../utils/models";
import { adaptAddingCartModel,  adaptDeleteCartModel,  adaptFinishCartModel,  adaptNewCartModel, adaptquantityChangeCartModel } from "../utils/adaptDataModel"
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";
import { getStoreUser } from "../../../shared/services/cookies";

export function useTunnelCart(initialCart = null) {
  const [cart, setCart] = useState(initialCart);
  const [newCart, setNewCart] = useLocalStorage("cart")
//   const [stored] = {company:{id:1}}
  const storeUser = getStoreUser()

 //Importante: Se debe incorporar el endpoint de obetenr idCompany con el dominio 

//   const updateLocalCart = async() =>{
//     await getByCompanyId("PreOrders", stored?.company.id).then(response=> setNewCart(filtercarts(response.data, storeUser))) 
//   }

  const createCart = async (product, customerData) => {
    try {
       const adaptedProduct = adaptNewCartModel(CartModel, product, customerData)
       console.log(JSON.stringify(adaptedProduct))
      const res = await post("Preorder", adaptedProduct)
      setCart(res.data);
      return res.data;
    } catch (error) {
      console.error("Error creating cart", error);
      throw error;
    }
  };

  const updateCart = async (cart, product, userId, quantity) => {
    console.log( product)
    console.log(cart)
    try {
    const adaptedProduct = adaptAddingCartModel(cart, product, userId, quantity, "salesTunnel")
     console.log(JSON.stringify(adaptedProduct))
      const res = await edit("PreOrder", adaptedProduct)
      setCart(res.data);
      return res.data;
    } catch (error) {
      console.error("Error updating cart", error);
      throw error;
    }
  };

    const updateQuantity = async (cart, productId, quantity, discount) => {
        console.log(productId, quantity, discount)
    console.log(cart)
    try {
      const adaptedProduct = adaptquantityChangeCartModel(cart, productId, quantity, discount)
       console.log(JSON.stringify(adaptedProduct))
      const res = await edit("PreOrder", adaptedProduct)
      setCart(res.data);
      return res.data;
    } catch (error) {
      console.error("Error updating cart", error);
      throw error;
    }};


  const removeProduct = async (cartModel, productId) => {
    try {
       const adaptedProduct = adaptDeleteCartModel(cartModel, productId)
        console.log(JSON.stringify(adaptedProduct))
      const res = await post("PreOrder", adaptedProduct)
      setCart(res.data);
      return res.data;
    } catch (error) {
      console.error("Error removing product", error);
      throw error;
    }
  };


   const finishCart = async (cart) => {
    try {
       const adaptedProduct = adaptFinishCartModel(cart)
       console.log(JSON.stringify(adaptedProduct))
      const res = await edit("PreOrder", adaptedProduct)
      setCart(res.data);
      return res.data;
    } catch (error) {
      console.error("Error creating cart", error);
      throw error;
    }
  };

  return {
    createCart,
    updateCart,
    updateQuantity,
    removeProduct,
    setCart,
    finishCart
  };
}