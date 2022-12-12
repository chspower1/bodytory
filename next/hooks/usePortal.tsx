import { FC, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";

const usePortal =()=>{

  const [isMount, setIsMount] = useState(false);

  useEffect(()=>{
    setIsMount(true);
  },[])

  const Portal = ({children} : {children:ReactNode | JSX.Element}) =>{
    return isMount ? ReactDOM.createPortal(children, document.getElementById("modal-root") as HTMLElement) : null;
  }
  return Portal;
}

export default usePortal;