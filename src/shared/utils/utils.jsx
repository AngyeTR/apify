export const  hexToRgba= (code, alpha = 1) => {
    code = code.replace(/^#/, '');
    if (code.length === 3) {code = code.split('').map(char => char + char).join('')}
    const bigint = parseInt(code, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  export const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? null : "El email no tiene un formato válido"
  };

  export const getProfileName =(id) => {
    const dictionary = {1: "Admin", 2: "Ventas", 3: "Logística"}
    return dictionary[id]
}

export const getBase64= (file)=>{
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = () => {
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      }); 
}