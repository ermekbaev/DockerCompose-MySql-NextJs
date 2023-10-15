import { SyntheticEvent, useEffect } from "react";

const useOutsideClick = (ref:React.RefObject<HTMLDivElement>, callback=(a?:any)=>{}) => {
  useEffect(() => {
  const handleClick = (e:any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      
      callback();
    }
  };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  },[ref, callback]);
};

export default useOutsideClick
