import { HiOutlineCheck  } from "react-icons/hi";
import { MyProgressBarItem } from "./MyProgressBarItem";
export const MyProgressBar = (props )=>{
  //  const steps = 8
  //  const currentStep= 6
  const {currentStep, steps} = props

  const getItems= ()=>{
    const items = []
    for(let i = 1; i <= steps; i++){
      const status = i < currentStep ? "completed" : i > currentStep ? "upcoming" : "current"
      console.log(status)
      items.push(<MyProgressBarItem status={status}/>) } 
    return items
    }

    return (
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {getItems().map((item)=> item)}
      </ol>
    </nav>
        )
    
}