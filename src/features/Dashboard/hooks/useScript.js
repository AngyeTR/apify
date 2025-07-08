// import { useEffect } from "react";
// import { setFbp } from "../../../shared/services/cookies";

// export function useScript(pixelId) {
//   console.log("scxript", pixelId)
//   useEffect(() => {
//     if (!pixelId) return;

//     if (window.fbq) return;

//     !(function (f, b, e, v, n, t, s) {
//       if (f.fbq) return;
//       n = f.fbq = function () {
//         n.callMethod
//           ? n.callMethod.apply(n, arguments)
//           : n.queue.push(arguments);
//       };
//       if (!f._fbq) f._fbq = n;
//       n.push = n;
//       n.loaded = true;
//       n.version = "2.0";
//       n.queue = [];
//       t = b.createElement(e);
//       t.async = true;
//       t.src = "https://connect.facebook.net/en_US/fbevents.js";
//       s = b.getElementsByTagName(e)[0];
//       s.parentNode.insertBefore(t, s);
//     })(window, document, "script");

//     window.fbq("init", pixelId);
//     window.fbq("track", "PageView");

//     const noscript = document.createElement("noscript");
//     noscript.innerHTML = `<img height="1" width="1" style="display:none"
//       src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>`;
//     document.body.appendChild(noscript);
//     console.log(noscript)


//      const getCookie = (name) => {
//       const value = `; ${document.cookie}`;
//       console.log(value)
//       const parts = value.split(`; ${name}=`);
//       if (parts.length === 2) return parts.pop().split(";").shift();
//     };

//     const timeout = setTimeout(async () => {
//       const fbp = getCookie("_fbp");
//       console.log(fbp)

//       try {
//         fbp && await setFbp(fbp)
//         console.log("Reporte de PageView enviado");
//       } catch (err) {
//         console.log(err)
//       }
//     }, 4000); // Esperamos 3s por seguridad

//     return () => clearTimeout(timeout);
//   }, [pixelId]);



  // useEffect(() => {
  //   if (!pixelId) return;

  //   // Inyectar el script solo si no está presente
  //   if (!window.fbq) {
  //     (function (f, b, e, v, n, t, s) {
  //       if (f.fbq) return;
  //       n = f.fbq = function () {
  //         n.callMethod
  //           ? n.callMethod.apply(n, arguments)
  //           : n.queue.push(arguments);
  //       };
  //       if (!f._fbq) f._fbq = n;
  //       n.push = n;
  //       n.loaded = true;
  //       n.version = "2.0";
  //       n.queue = [];
  //       t = b.createElement(e);
  //       t.async = true;
  //       t.src = "https://connect.facebook.net/en_US/fbevents.js";
  //       s = b.getElementsByTagName(e)[0];
  //       s.parentNode.insertBefore(t, s);
  //     })(window, document, "script");

  //     window.fbq("init", pixelId);
  //     window.fbq("track", "PageView");
  //   }

  //   // Función para obtener la cookie _fbp
  //   const getCookie = (name) => {
  //     const value = `; ${document.cookie}`;
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) return parts.pop().split(";").shift();
  //   };

  //   const timeout = setTimeout(async () => {
  //     const fbp = getCookie("_fbp");
  //     console.log(fbp)

  //     try {
  //       fbp && await setFbp(fbp)
  //       console.log("Reporte de PageView enviado");
  //     } catch (err) {
  //     }
  //   }, 4000); // Esperamos 3s por seguridad

  //   return () => clearTimeout(timeout);
  // }, [pixelId]);

// }



import { useEffect } from "react";
import { getFbp } from "../../../shared/services/cookies";

export function useScript(pixelId) {
  useEffect(() => {
    if (!pixelId) return;

    if (window.fbq) return;

    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script");

    window.fbq("init", pixelId);
    window.fbq("track", "PageView");

    const noscript = document.createElement("noscript");
    noscript.innerHTML = `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>`;
    document.body.appendChild(noscript);
  }, [pixelId]);

}