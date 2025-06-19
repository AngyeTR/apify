
import {  convertions, } from "../../../shared/services/API/api";

export function useReport() {
    const url = window.location.href

    const getBrowserInfo = () => {
      const userAgent = navigator.userAgent;
      if (userAgent.includes("Chrome") && !userAgent.includes("Edg") && !userAgent.includes("OPR"))return "Chrome";
      if (userAgent.includes("Firefox")) return "Firefox";
      if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
      if (userAgent.includes("Edg")) return "Edge";
      if (userAgent.includes("OPR")) return "Opera";
      return "Desconocido";
    };
    const browser = getBrowserInfo()
  
    const reportView = async () => {
    try {
        const ip = await fetch("https://api.ipify.org?format=json").then((res) => res.json()).then((data) =>  data.ip)
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const report = {event_name: "PageView", event_time: unixTimestamp, event_source_url: url, userdata:{client_ip_address: ip, client_user_agent:browser}}
      console.log(report)
        const res = await convertions("AddView", {data:[report], test_event_code:""}).then(res=>console.log(res))
      return res;
    } catch (error) {
      console.error("Error adding view", error);
      throw error;
    }};

     const reportAddToCart = async (email, phone, fbc, fbp, amount) => {
    try {
        const ip = await fetch("https://api.ipify.org?format=json").then((res) => res.json()).then((data) =>  data.ip)
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const report = [{event_name: "AddToCart", event_time: unixTimestamp, event_source_url: url, action_source: "string",
        userdata:{client_ip_address: ip, client_user_agent:browser,  em: email, ph: phone,fbc: fbc,fbp: fbp},
       custom_data: {currency: "COP", value: amount,content_type: "product"}}]
        
      console.log(report)
        const res = await convertions("AddToCart", {data:report}).then(res=>console.log(res))
      return res;
    } catch (error) {
      console.error("Error adding to cart", error);
      throw error;
    }};

      const reportPurchase = async (email, phone, fbc, fbp, amount, cartId, quantity ) => {
    try {
        const ip = await fetch("https://api.ipify.org?format=json").then((res) => res.json()).then((data) =>  data.ip)
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const report = [{event_name: "Purchase", event_time: unixTimestamp, event_source_url: url, action_source: "Purchase",
        userdata:{client_ip_address: ip, client_user_agent:browser,  em: email, ph: phone,fbc: fbc,fbp: fbp},
       custom_data: {currency: "COP", value: amount,content_type: "product" , order_id: cartId,
        contents: [{id: cartId ,quantity: quantity,item_price: amount}],
       }}]
        
      console.log(report)
        const res = await convertions("AddPurchase", {data:report}).then(res=>console.log(res))
      return res;
    } catch (error) {
      console.error("Error adding to cart", error);
      throw error;
    }};


  return {
    reportView,
    reportAddToCart,
    reportPurchase
  };
}
