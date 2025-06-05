import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { Field, Label } from '../../../shared/components/uikit/fieldset';
import { HiOutlineTrash } from "react-icons/hi";
import { useEffect, useRef, useState } from 'react'
import { ImageWidget } from "../components/widgets/ImageWidget" 
import { TextWidget } from "../components/widgets/TextWidget"
import { TitleWidget } from '../components/widgets/TitleWidget';
import { ButtonWidget } from '../components/widgets/ButtonWidget';
import { VideoWidget } from '../components/widgets/VideoWidget';
import { ComparerWidget } from '../components/widgets/ComparerWidget';
import { CarouselWidget } from '../components/widgets/CarouselWidget';
import { BlankWidget } from '../components/widgets/BlankWidget';
import { PaymentButtonWidget } from '../components/widgets/PaymentButtonWidget';

export const GridContainer = ({canEdit, setItems, items, count, layoutColor, setLayoutColor, setGrid})=> { 
  const styles = {backgroundColor: layoutColor["backgroundColor"],  
      backgroundImage: `url('${layoutColor["backgroundImage"]}')`,  backgroundSize: 'cover',
      backgroundPosition: 'center', repeat: "no-repeat",  backgroundBlendMode: 'multiply' }
  const itemsRef = useRef(new Map())
  const width = window.innerWidth;
  console.log(width)
  const getMap = ()=>{return itemsRef.current}
  const [isModalOpen, setModalOpen] =  useState(true)
  const removeWidget = (id) => {setItems((prev) => prev.filter((w) => w.id !== id));
  if (grid) {const el = document.getElementById(id)
      if (el) { grid.removeWidget(el)}}}

  const editWidget = async(id, content, style)=>{
    const newItem = items.filter((item)=> item.id == id )[0]
    const ind = items.findIndex(item => item.id === id)
    newItem["content"] = content
    newItem["style"] = style
    let filteredItems = [...items]
    filteredItems[ind] = newItem
    setItems(filteredItems);
    await new Promise(resolve => setTimeout(resolve, 500));
    // setTimeout(()=>{grid.makeWidget(getMap().get(count))}, 5)
  }

  useEffect(()=>{
    const grid = GridStack.init({float: true, cellHeight: 50, column: 4, acceptWidgets: true, columnOpts:{breakpoints:[{w:480, c:1}, {w:690, c:1}, {w:1280, c:2}]},
      margin: 1, staticGrid: !canEdit, disableResize: !canEdit, disableDrag: !canEdit})
      setGrid(grid)
    return () => {grid.destroy(false)}
  },[ ,items]) 

  const render=(item)=>{
    const type = item.id.split("-")[0]
    const dictionary = {
      image: <ImageWidget content={item.content} id={item.id} edit={editWidget} editable={canEdit} style={item.style}/>,
      text:  <TextWidget content={item.content} id={item.id} edit={editWidget} editable={canEdit} style={item.style}/>,
      title: <TitleWidget content={item.content} id={item.id} edit={editWidget} editable={canEdit} style={item.style}/>, 
      payment: <PaymentButtonWidget content={item.content} id={item.id} edit={editWidget} editable={canEdit} style={item.style}/> , 
      button: <ButtonWidget content={item.content} id={item.id} edit={editWidget} editable={canEdit} style={item.style}/> , 
      video: <VideoWidget content={item.content} id={item.id} edit={editWidget} editable={canEdit} style={item.style}/> ,
      comparer: <ComparerWidget content={item.content} id={item.id} edit={editWidget} editable={canEdit} style={item.style}/>,
      carousel: <CarouselWidget content={item.content} id={item.id} edit={editWidget} editable={canEdit} style={item.style} />,
      blank: <BlankWidget content={item.content} id={item.id} edit={editWidget} editable={canEdit} style={item.style}  />
    }
   return dictionary[type]}

  return (
    <div className='grid-stack w-full border border-zinc-400  min-h-[90vh]' style={styles}>
    {items?.map((cat, index)=>
    (
      <div className='grid-stack-item overflow-hidden h-fit' gs-w={cat?.w} gs-h={cat.id.split("-")[0] == "image" ? (width > 760 ? (cat?.h)/2 : cat?.h): cat?.h} key={cat?.id} gs-id={cat.id} gs-x={cat.x} gs-y={cat.y} gs-content={cat.content} gs-sub-grid={cat.id.split("-")[0] == "container" ? "true" : "false"}
      ref={(node)=>{
        const map = getMap();
        if(node){
          map.set((cat.id), node)
        } else {map.delete(cat.id)}
        }}>
          <div className={`grid-stack-item-content overflow-hidden ${(cat.id.split("-")[0] == "container" )&& "subgrid"} content-center min-w-[50px] min-h-[20px] h-fit`} >
            {canEdit && <button onClick={() => removeWidget(( cat.id))}
            className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded z-30">
           <HiOutlineTrash className="size-4" /></button>}
            {render(cat, index)}
    </div>            
    </div> ))}
    <div >
      {canEdit && <Field className="absolute flex -bottom-9 -right-3 bg-zinc-50 p-1 rounded-lg shadow-xl border border-zinc-200 z-30">
        <h3 className="text-xs my-1 ml-1">Fondo de layout: </h3>
        <input onChange={e=> setLayoutColor(prev => ({...prev, ["backgroundColor"]: e.target.value}))}  type="color" className="my-1 w-[20px] h-[20px] mx-1 text-xs" />
        <input onChange={e=> setLayoutColor(prev => ({...prev, ["backgroundImage"] : e.target.value  }))}  type="text" placeholder="URL fondo" className="mx-1 my-1 w-[80px] h-[20px] rounded-sm border border-zinc-200" />
      </Field>}
    </div>
  </div>)
}


