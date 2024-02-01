import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import Delete from "./Delete";
import Edit from "./Edit";
import axios from "axios";
import { useRouter } from "next/router";

const Preview = ({classname="dropdown",userMenu, user, userData}:any) => {
    const ref = useRef<any>(null);
    const option = useRef<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>();
    const [value, setValue] = useState<string>("");
    const [focus, setFocus] = useState<boolean>(false);

    const router = useRouter()
     
      const open = () => {
        try {
          ref.current.focus();
          setIsOpen((prev) => !prev);
        } catch (error) {
          console.log(error);
        }
      };

      const close = () => {
        setIsOpen(false); 
      };
    
      useEffect(() => {
        if (!isOpen) {
          setIsOpen(false);
        }
        return () => {
          if (!isOpen) {
            setIsOpen(true);
          }
        };
      }, [isOpen]);

      const handleDeleteUser = async (userId: any) => {
        try {
          console.log("Deleting user with ID:", userId);
          await axios.delete(`/api/users/${userId}`);
          console.log("User deleted successfully");
    
          
        } catch (error) {
          router.reload()
          console.error("Error deleting user:", error);
        }
      };
    
  return (
    <>
    <div   className={classname}
      onClick={(e) => {
        e.stopPropagation();
        open;
      }}>
            <button onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        ref={ref}
        tabIndex={0} type="button"   data-modal-target="defaultModal" data-modal-toggle="defaultModal"className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                            Preview 
                        </button>
    </div>
    <div id="defaultModal"  aria-hidden="true"  tabIndex={0}
        className={classNames({"  flex justify-center items-center fixed inset-0 z-50":true, hidden:!isOpen,})}>
        <div className="relative p-4 w-full max-w-2xl max-h-full">

            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                    <h3 className="font-semibold ">{user.name}</h3>
                    <p className="font-bold">{user.email}</p>
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600"> 
                    <button type="button" onClick={close} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-target="createProductModal" data-modal-toggle="createProductModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                </div>

                <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Details</dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{user.address}<br/>{user.number}</dd>
                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Department:</dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{user.department}</dd>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">{user.role}</dd>
                </dl>
                {user && user.id && userMenu[user.id] && (
                  <div className="flex">
                              <Edit/>
                          <Delete onDeleteUser={handleDeleteUser} user={user} />
                  </div>
                 )}
            </div>
        </div>
    </div>
    </>
  )
}

export default Preview