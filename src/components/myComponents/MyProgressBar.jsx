
import { MyProgressBarItem } from "./MyProgressBarItem";
export const MyProgressBar = (props )=>{
  const {currentStep, steps} = props

  const getItems= ()=>{
    const items = []
    for(let i = 1; i <= steps; i++){
      const status = i < currentStep ? "completed" : i > currentStep ? "upcoming" : "current"
      items.push(<MyProgressBarItem status={status} key={i}/>) } 
    return items
    }

    return (
      <nav aria-label="Progress" className="w-xs md:w-sm lg:w-md justify-items-center">
        <ol role="list" className="flex items-center">
          {getItems().map((item)=> item)}
      </ol>
    </nav>
        )
    
}