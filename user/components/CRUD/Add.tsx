import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Add = ({ classname = "dropdown" }) => {
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    number: "",
    departmentId: "",
    roleId: "",
    address:"",
  });
  const router = useRouter();
  
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchDepartmentsAndRoles = async () => {
      try {
        const { data: departmentsData } = await axios.get("/api/departments");
        const { data: rolesData } = await axios.get("/api/roles");
        setDepartments(departmentsData);
        setRoles(rolesData);
      } catch (error) {
        console.error("Error fetching departments and roles:", error);
      }
    };
    fetchDepartmentsAndRoles();
  }, []);

  useEffect(() => {
    const fetchUser = async (id:any) => {
      try {
        const { data } = await axios.get(
          `api/users/${id}`
        );
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (router.query.id) {
      fetchUser(router.query.id);
    }
  }, [router.query.id]);

  const handleChange = (fieldName:any, value:any) => {
    setUser((prevUser) => ({ ...prevUser, [fieldName]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await axios.post("/api/users", {
        ...user,
        departmentId: parseInt(user.departmentId),
        roleId: parseInt(user.roleId), 
      });
      toast.success("User Saved", {
        position: "bottom-center",
      });
      router.reload(); 
    } catch (error) {
      //@ts-ignore
      toast.error(error.response.data.message);
    }
  };
  

  const open = () => {
    try {
      //@ts-ignore
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

  return (
    <>
      <div
        className={classname}
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
          ref={ref}
          tabIndex={0}
          type="button"
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            className="h-3.5 w-3.5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            />
          </svg>
          Add user
        </button>
      </div>
      <div
        id="defaultModal"
        aria-hidden="true"
        tabIndex={0}
        className={classNames({
          "flex justify-center items-center fixed inset-0 z-50": true,
          hidden: !isOpen,
        })}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add User
              </h3>
              <button
                type="button"
                onClick={close}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-target="createProductModal"
                data-modal-toggle="createProductModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    value={user.name}
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
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    value={user.email}
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
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    value={user.number}
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
                  <select
                    value={user.departmentId}
                    onChange={(e) => handleChange("departmentId", e.target.value)}
                    name="departmentId"
                    id="departmentId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map((department:any) => (
                      <option key={department.id} value={department.id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    value={user.roleId}
                    onChange={(e) => handleChange("roleId", e.target.value)}
                    name="roleId"
                    id="roleId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select Role</option>
                    {roles.map((role:any) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <input
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    value={user.address}
                    type="text"
                    name="address"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Address"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="mr-1 -ml-1 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add new user
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
