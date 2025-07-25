import { HiItalic, HiMiniBold, HiMiniUnderline, HiOutlineBars3BottomLeft, HiOutlineBars3 , HiOutlineBars3BottomRight   } from "react-icons/hi2";

export const TextController = ({styles, setStyles})=>{
    console.log(styles)
    const fonts = ["Roboto", "Poppins", "Tagesschrift", "Nunito", "Monserrat", "Oxygen", "Monoton", "Emilys Candy", "Nosifer" , "VT323", "Audiowide", "Rubik Puddles", "Permanent Marker"]

    const changeToggle =(variable, value)=>{
        if(styles[variable]){
        (styles[variable] == "none" || styles[variable] == "normal") ?
        (setStyles(prev => ({...prev, [variable] : value}))) :
        ( variable == "textDecoration") ? (setStyles(prev => ({...prev, [variable] : "none"}))) : (setStyles(prev => ({...prev, [variable] : "normal"})))
        }else {setStyles(prev => ({...prev, [variable] : value}))}
      }
      
    return (
    <div className="flex my-1 justify-center min-w-xs  w-full max-w-lg">
        <input  placeholder={styles?.fontSize ? styles.fontSize : "Tamaño"} onChange={e=> (setStyles(prev => ({...prev, ["fontSize"] : parseInt(e.target.value)})))}  type="number" min="8" max="32" className="h-8 w-[15%] text-md border border-zinc-400 rounded-sm self-center mx-1"></input>
        <select defaultValue={styles.fontFamily} onChange={e=> (setStyles(prev => ({...prev, ["fontFamily"] : e.target.value})))} placeholder="Fuente" type="number" min="8" max="32" className="h-8 w-[20%] text-md border border-zinc-400 rounded-sm self-center mx-1">
            {fonts.map(font=> <option style={{fontFamily: font}} value={font}>{font}</option>)}
        </select>
        <div className="flex w-[15%] justify-center">
        <input onChange={e=> (setStyles(prev => ({...prev, ["color"] : e.target.value})))}  type="color" className="w-[25px] h-8" defaultValue={styles?.color ? styles.color : "#000000"}/>
        <input onChange={e=> (setStyles(prev => ({...prev, ["backgroundColor"] : e.target.value})))}  type="color" className="w-[25px] h-8" defaultValue={styles?.backgroundColor ? styles.backgroundColor : "#000000"}/>
        </div>
        <div className="flex w-[20%] justify-center">
        <HiItalic onClick={()=>changeToggle("fontStyle", "italic")} className={`self-center rounded-xs  mx-1 size-6 hover:border hover:border-zinc-300 ${styles["fontStyle"] == "italic" && "border border-zinc-700"}`} />
        <HiMiniBold onClick={()=>changeToggle("fontWeight", "bold")} className={`self-center rounded-xs mx-1 size-6 hover:border hover:border-zinc-300 ${styles["fontWeight"] == "bold" && "border border-zinc-700"}`} />
        <HiMiniUnderline onClick={()=>changeToggle("textDecoration", "underline")} className={`self-center rounded-xs mx-1 size-6 hover:border hover:border-zinc-300 ${styles["textDecoration"] == "underline" && "border border-zinc-700"}`}/>
        </div>
        <div className="flex w-[20%] justify-center">
        <HiOutlineBars3BottomLeft onClick={e=> (setStyles(prev => ({...prev, ["textAlign"] : "left"})))} className={`self-center size-6 rounded-xs  mx-1 hover:border hover:border-zinc-300 ${styles["textAlign"] == "left" && "border border-zinc-700"}`} />
        <HiOutlineBars3 onClick={e=> (setStyles(prev => ({...prev, ["textAlign"] : "center"})))} className={`self-center rounded-xs size-6 mx-1  hover:border hover:border-zinc-300 ${styles["textAlign"] == "center" && "border border-zinc-700"}`} />
        <HiOutlineBars3BottomRight onClick={e=> (setStyles(prev => ({...prev, ["textAlign"] : "right"})))} className={`self-center size-6 rounded-xs mx-1  hover:border hover:border-zinc-300 ${styles["textAlign"] == "right" && "border border-zinc-700"}`} />
        </div>
    </div>
    )
}