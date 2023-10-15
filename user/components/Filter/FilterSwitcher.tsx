import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../hook/useOutsideClick";
const FilterSwitcher = ({ departments, roles, selectedDepartment, selectedRole, handleDepartmentChange, handleRoleChange }: any) => {

    const ref = useRef<any>(null);
    const option = useRef<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>();
    const [focus, setFocus] = useState<boolean>(false);
    
    useOutsideClick(option, () => {
        setFocus(true);
      });

    const [activeDepartment, setActiveDepartment] = useState(selectedDepartment);
    const [activeRole, setActiveRole] = useState(selectedRole);

      const toggleDepartment = (departmentId: string) => {
        if (activeDepartment === departmentId) {
          setActiveDepartment(null);
          handleDepartmentChange(null);
        } else {
          setActiveDepartment(departmentId);
          handleDepartmentChange(departmentId);
        }
      };

      const toggleRole = (roleId: string) => {
        if (activeRole === roleId) {
          setActiveRole(null);
          handleRoleChange(null);
        } else {
          setActiveRole(roleId);
          handleRoleChange(roleId);
        }
      };
  return (
   <>
   <div >
     <button onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        ref={ref}
        tabIndex={0} className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
         <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
         </svg>
            Filter
         <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
     </button>
    </div>

     <div  className={classNames({"z-10 w-56 p-3 fixed bg-white rounded-lg shadow dark:bg-gray-700":true, hidden:!isOpen,})}>
        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
        <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
        {departments.map((department: any) => (
          <li key={department.id}>
            <input
              type="checkbox"
              id={`department-${department.id}`}
              value={department.id}
              checked={activeDepartment === department.id}
              onChange={() => toggleDepartment(department.id)}
              
            />
            <label>{department.name}</label>
          </li>
        ))}
      </ul>
      <h6>Role</h6>
      <ul>
        {roles.map((role: any) => (
          <li key={role.id}>
            <input
              type="checkbox"
              id={`role-${role.id}`}
              value={role.id}
              checked={activeRole === role.id}
              onChange={() => toggleRole(role.id)}
            />
            <label>{role.name}</label>
          </li>
        ))}
        </ul>
     </div>
   </>
  )
}

export default FilterSwitcher