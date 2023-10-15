import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import Delete from "./Delete";
import axios from "axios";
import { useRouter } from "next/router";

const Edit = ({className="dropdown", user, departments, roles}:any) => {
    const ref = useRef<any>(null);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>();
    const [editClicked, setEditClicked] = useState(false);
    const [values, setValues] = useState<any>({
      name: "",
      email: "",
      number: "",
      department: "", 
      role: "", 
      address:"",
    });

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
    

      useEffect(() => {
        if (user) {
          setValues({
            name: user.name || "",
            email: user.email || "",
            number: user.number || "",
            department: user.department_id || "", 
            role: user.role_id || "", 
            address: user.address || "",
          });
        } else {
          setValues({
            name: "",
            email: "",
            number: "",
            department: "", 
            role: "", 
            address: "",
          });
        }
      }, [user]);

      useEffect(() => {
        if (user) {
          setValues((prevValues:any) => ({
            ...prevValues,
            department: user.department_id || "",
            role: user.role_id || "",
          }));
        }
      }, [user]);

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues((prevValues: any) => ({
          ...prevValues,
          [name]: value,
        }));
      };

      const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        console.log("Selected department:", value);
        setValues((prevValues: any) => ({
           ...prevValues,
           department: value,
        }));
        
     };

     const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      console.log("Selected role:", value);
      setValues((prevValues: any) => ({
         ...prevValues,
         role: value,
      }));
   };
      
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        try {
          const response = await axios.put(`/api/users/${user.id}`, {
            ...values,
            departmentId: parseInt(values.department),
            roleId: parseInt(values.role),
          });
      
          if (response.status === 200) {
            console.log('Данные успешно обновлены на сервере');
            close();
          } else {
            console.error('Произошла ошибка при обновлении данных на сервере');
          }
        } catch (error) {
          router.reload();
          console.error('Произошла ошибка при отправке данных на сервер:', error);
        }
      };
      


  return (
    <>
    <div   
      className={className}
      onClick={(e) => {
        e.stopPropagation();
      }}>
       <button onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
          setEditClicked(true)
        }}
          ref={ref}
          tabIndex={0} type="button"   
          data-modal-target="defaultModal" 
          data-modal-toggle="defaultModal"
          className="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
         Edit 
      </button>
    </div>
    <div id="defaultModal"  aria-hidden="true"  tabIndex={0}
        className={classNames({" flex justify-center items-center fixed inset-0 z-50":true, hidden:!isOpen,})}>
        <div className="relative p-4 w-full max-w-2xl max-h-full">

            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update</h3>
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Product</h3>
                    <button type="button" onClick={close} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-target="createProductModal" data-modal-toggle="createProductModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form action="#" onSubmit={(e) => handleSubmit(e)}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={handleChange}
                    value={values.name}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    onChange={handleChange}
                    value={values.email}
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Number
                  </label>
                  <input
                    onChange={handleChange}
                    value={values.number}
                    type="number"
                    name="number"
                    id="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Department
                  </label>
                  {editClicked && departments && departments.length > 0 && (
                  <select
                      onChange={handleDepartmentChange}
                      value={values.department}
                      name="department"
                      id="department"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      {departments.map((dept:any) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  {editClicked && roles && roles.length > 0 && (
                  <select
                      onChange={handleRoleChange}
                      value={values.role}
                      name="role"
                      id="role"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      {roles.map((role:any) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    )}
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    onChange={handleChange}
                    value={values.address}
                    type="text"
                    name="address"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Address"
                  />
                </div>
              </div>
                <div className="flex items-center space-x-4">
                    <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update product</button>
                    <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                        <Delete/>
                    </button>
                </div>
            </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Edit