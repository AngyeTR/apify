
import {  convertions, } from "../../../shared/services/API/api";
import { getFbp } from "../../../shared/services/cookies";

export function useReport() {
    let url = window.location.href
    const fbc = url.split("?")[1]
    url = url.split("?")[0]
    const fbp = getFbp()

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
  
    const reportView = async (idTunnel) => {
    try {
        const ip = await fetch("https://api.ipify.org?format=json").then((res) => res.json()).then((data) =>  data.ip)
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const report = {event_name: "PageView", event_time: unixTimestamp, event_source_url: url, user_data:{client_ip_address: ip, client_user_agent:browser, 
          fbc: fbc, fbp: fbp}}


        const res = await convertions("AddView", {data:[report], test_event_code:"", "idSalesTunnel": idTunnel}).then(res=>console.log(res))
      return res;
    } catch (error) {
      console.error("Error adding view", error);
      throw error;
    }};

     const reportAddToCart = async (email, phone, amount, idTunnel, name, lastname, city ) => {
    try {
        const ip = await fetch("https://api.ipify.org?format=json").then((res) => res.json()).then((data) =>  data.ip)
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const report = 
        [{event_name: "AddToCart", event_time: unixTimestamp, event_source_url: url,
        user_data:{client_ip_address: ip, client_user_agent:browser,  em: email, ph: phone, fbc: fbc,fbp: fbp, fn:name, ln: lastname, ct:city},
       custom_data: {currency: "COP", value: amount,content_type: "product"}}]
          console.log(JSON.stringify(report))
        const res = await convertions("AddToCart", {data:report, idSalesTunnel: idTunnel}).then(res=>console.log(res))
      return res;
    } catch (error) {
      console.error("Error adding to cart", error);
      throw error;
    }};

      const reportPurchase = async (email, phone,  amount, cartId, quantity, idTunnel, name, lastname, city ) => {
    try {
        const ip = await fetch("https://api.ipify.org?format=json").then((res) => res.json()).then((data) =>  data.ip)
        const unixTimestamp = Math.floor(Date.now() / 1000);
        const report = [{event_name: "Purchase", event_time: unixTimestamp, event_source_url: url,
        user_data:{client_ip_address: ip, client_user_agent:browser,  em: email, ph: phone,fbc: fbc,fbp: fbp, fn:name, ln: lastname, ct:city},
       custom_data: {currency: "COP", value: amount,content_type: "product" , order_id: cartId,
        contents: [{id: cartId ,quantity: quantity,item_price: amount}],
       }}]
        const res = await convertions("AddPurchase", {data:report, idSalesTunnel: idTunnel}).then(res=>console.log(res))
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
