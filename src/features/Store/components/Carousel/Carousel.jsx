import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useState } from 'react';
import { PromoCard } from '../Promos/PromoCard';
import logo from "../../../../assets/gallery-icon.png"

export const Carousel = ({type, data}) => {
    let items = [
        {url:"https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80", name:"Prueba2", id: 31, colors: [{colorCode: "#db1f1f", nombre: "Rojo"}, {colorCode: "#0000ff", nombre: "Azul"}],
      sizes: ["XS", "S", "M", "L"], score: 3.9, price:25, reviews: 120, isColors:true, isSizes:true},
      {url: null, name:"Prueba2", id: 33, colors: [{colorCode: "#db1f1f", nombre: "Rojo"}, {colorCode: "#0000ff", nombre: "Azul"}],
      sizes: ["XS", "S", "M", "L"], score: 3.2, price:50, reviews: 10, isColors:false, isSizes:true},
      {url:"https://wallpapers.com/images/high/autumn-streets-full-screen-hd-desktop-4pkhsz8q9vwm3g4y.webp", name:"Prueba", id: 37, colors: [{colorCode: "#db1f1f", nombre: "Rojo"}, {colorCode: "#0000ff", nombre: "Azul"}],
      sizes: ["XS", "S", "M", "L"], score: 4.1, price:540, reviews: 1100,  isColors:false, isSizes:false}
        ]
    data && (items = data)
    console.log(items, items.length)
  const [current, setCurrent] = useState(0);
  const prev = () => {setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));};
  const next = () => {setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));};
  return (
    <>
    { items.length == 0 ?  
      <div className="w-full flex  justify-self-center place-content-center "><img src={logo } alt="Image not available" className="h-80 w-80" /></div> :
      <div className={`relative ${type=="card" && "w-screen"} rounded-lg overflow-hidden max-w-6xl mx-auto`}>
      <div className="w-[80%] flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        { items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0 p-4">
        {type == "card" ? <PromoCard data={item}/> : <img src={item?.url ? item?.url : logo } alt={item?.name}
        className="h-full w-full object-cover" />}</div>
        ))}
      </div>
      <button onClick={prev} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"><HiChevronLeft/></button>
      <button onClick={next} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"><HiChevronRight/></button>
    </div>}
  </>
  );
};
