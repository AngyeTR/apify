import { useState, useEffect } from "react";

const useNavigatorData = async () => {
  const [userInfo, setUserInfo] = useState({ ip: "", browser: "" });

//   useEffect(() => {
    const getBrowserInfo = () => {
      const userAgent = navigator.userAgent;
        console.log("browising")

      if (userAgent.includes("Chrome") && !userAgent.includes("Edg") && !userAgent.includes("OPR"))
        return "Chrome";
      if (userAgent.includes("Firefox")) return "Firefox";
      if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) return "Safari";
      if (userAgent.includes("Edg")) return "Edge";
      if (userAgent.includes("OPR")) return "Opera";

      return "Desconocido";
    };

   await  fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setUserInfo({ ip: data.ip, browser: getBrowserInfo() });
        console.log("setting")
      })
      .catch((err) => {
        console.error("Error obteniendo IP:", err);
      });
//   }, []);

  console.log(userInfo)
          console.log("finishing")

  return userInfo;
};

export default useNavigatorData;