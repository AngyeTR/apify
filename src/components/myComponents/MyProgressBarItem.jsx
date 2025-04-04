import { HiOutlineCheck  } from "react-icons/hi";
export const MyProgressBarItem = ({status})=>{

    const getIcon = ()=>{
        if(status == "completed"){
            return (
            <div className="relative flex size-8 items-center justify-center rounded-full bg-indigo-600 ">
                <HiOutlineCheck className="text-white size-6"/>
            </div>)
        } else if (status == "current") {
            return (
            <div className="relative flex size-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white" aria-current="step">
                <span className="size-2.5 rounded-full bg-indigo-600" aria-hidden="true"></span>
            </div>)
        } else {
            return (
            <div className="group relative flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white ">
                <span className="size-2.5 rounded-full bg-transparent" aria-hidden="true"></span>
            </div>)
        } 
    }
        return (
        <li className="relative pr-8 sm:pr-20">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className={`h-0.5 w-full ${status == "completed" ? "bg-indigo-600" : "bg-gray-200"}`}></div>
          </div>
           { getIcon()}  
        </li>)
}