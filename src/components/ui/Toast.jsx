import {
  X
} from 'lucide-react';
import { useState } from "react";

const Toast = ({open}) => {
  const [display, setDisplay] = useState(true)
  
  const toggleToast = () => {
    setDisplay(!display)
  }
  
  if(!display){
    return;
  }
  
  return (
      <div className="fixed bottom-8 w-full text-black">
        <div className="relative bg-gray-800 text-black rounded mx-4 p-4 md:mx-10">
          <button onClick={toggleToast} className="absolute right-2 top-2">
            <X />
          </button>
          <p className="px-1 text-sm">
            Account created successfuly. Account created successfuly.
          </p>
        </div>
      </div>
  )
}

export default Toast
