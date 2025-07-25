"use client";
import React from "react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const Manager = () => {
  const [form, setform] = useState({ link: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [show, setShow] = useState(false);
  const passwordRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);


  const togglePassword = () => {
    setShow(!show);
  };

  const copytext = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Text Copied!', {
position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
  };


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savepass = () => {
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    setform({ link: "", username: "", password: "" });
    toast.success('Password Saved', {
position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
  };

  const editPassword = (id) => {
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  const deletePassword = (id) => {
    console.log(id);
    const confirmation = confirm("Do you  want to delete this password?")
    if (confirmation) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
    toast.warn('Password Deleted!', {
position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-50 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-30 blur-[90px]"></div>
      </div>
      <div className="md:containor my-30 w-[100vw] md:w-[60%] md:mx-auto flex justify-center overflow-hidden items-center flex-col text-black">
        <div className="heading">
          <h1 className="text-2xl font-bold">
            <span className="text-2xl font-bold text-green-700"> &lt;</span>Pass
            <span className="text-2xl font-bold text-green-700">OP/&gt;</span>
          </h1>
        </div>
        <p className="mb-5">Your own Password manager</p>
        <div className="weblink w-full  flex justify-center">
          <input
            value={form.link}
            onChange={handleChange}
            name="link"
            className="border border-green-500 w-[80%] py-1 md:py-0 rounded-full px-4 bg-white outline-none"
            placeholder="Enter website URL "
            type="text"
          />
        </div>
        <div className="inputs flex md:grid gap-3 flex-col w-[80%] md:w-[100%] md:gap-16 md:px-19 my-5 md:grid-cols-[2fr_1fr] ">
          <input
            value={form.username}
            name="username"
            onChange={handleChange}
            className="border border-green-500 py-1 md:py-0 rounded-full px-4 bg-white outline-none"
            placeholder="Enter username"
            type="text"
          />
          <div className="relative">
            <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter Password"
        ref={passwordRef}
        type={show ? "text" : "password"}
        className="border border-green-500 py-1 relative  md:py-0 rounded-full px-4 bg-white outline-none "
      />
      <Image
        onClick={togglePassword}
        src={show ? "/eye.png" : "/eyecross.png"}
        width={24}
        height={24}
        className="absolute right-22 md:right-2 top-2 md:top-[1px] cursor-pointer"
        alt="Toggle password"
      />
          </div>
        </div>
        <button
        disabled={form.link == 0 || form.username == 0 || form.password == 0}
          onClick={savepass}
          className="bg-green-200 disabled:bg-green-50 border hover:scale-106 hover:text-shadow-current border-green-300 flex items-center gap-2 hover:bg-green-300  font-bold  px-3 py-1 rounded-full"
        >
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
          <lord-icon
    src="https://cdn.lordicon.com/efxgwrkc.json"
    trigger="hover"
                style={{ width: "20px", height: "20px" }}>
</lord-icon>
          Save
        </button>
        <div className="display mt-6 w-full">
          <div className="headingdisplay text-center">
            <h2 className="text-xl font-bold py-2">Your Passwords</h2>
          </div>
          {passwordArray.length == 0 && (
            <div className="text-center">No Password to show yet</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-fixed mx-auto w-[90vw] h-52  md:w-[100%] border-collapse border-gray-400">
              <thead >
                <tr className="bg-green-800 font-extralight text-sm text-white md:font-bold">
                  <th className="border md:font-bold text-sm font-extralight border-gray-300 px-4 md:w-77 py-2">
                    Website Link
                  </th>
                  <th className="border md:font-bold text-sm font-extralight  border-gray-300 px-4 py-2">Username</th>
                  <th className="border md:font-bold text-sm font-extralight border-gray-300 px-4 py-2">Password</th>
                  <th className="border md:font-bold text-sm font-extralight border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="">
                {passwordArray &&
                  passwordArray.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="md:grid md:grid-cols-[2fr_1fr_1fr_1fr] flex justify-evenly gap-4 md:gap-0 w-[90vw] md:w-190"
                      >
                        <td
                          onClick={() => {
                            copytext(item.link);
                          }}
                          className=" gap-2 flex flex-col md:mx-2  border-b-1 items-center border-gray-300 md:w-auto w-22 px-4 py-2 overflow-hidden whitespace-nowrap "
                        >
                          <Link href={item.link} target="_blank">
                            {item.link}
                          </Link>
                          <lord-icon
                            src="https://cdn.lordicon.com/ftasfhkn.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </td>
                        <td
                          onClick={() => {
                            copytext(item.username);
                          }}
                          className="gap-2 flex items-center overflow-hidden whitespace-nowrap md:w-auto w-22 md:mx-2 text-ellipsis flex-col border-b-1 justify-center border-gray-300 px-4 py-2"
                        >
                          {item.username || ""}
                          <lord-icon
                            src="https://cdn.lordicon.com/ftasfhkn.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </td>
                        <td
                          onClick={() => {
                            copytext(item.password);
                          }}
                          className="gap-2 flex items-center justify-center overflow-hidden md:w-auto w-22 whitespace-nowrap text-ellipsis flex-col md:mx-2  border-b-1 border-gray-300 px-4 py-2"
                        >
                          {item.password}
                          <lord-icon
                            src="https://cdn.lordicon.com/ftasfhkn.json"
                            trigger="hover"
                            style={{ width: "20px", height: "20px" }}
                          ></lord-icon>
                        </td>
                        <td className="gap-2 flex items-center  border-b-1 justify-center border-gray-300 px-4 py-2">
                          <span
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/exymduqj.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </span>
                          <span
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/jzinekkv.json"
                              trigger="hover"
                              style={{ width: "20px", height: "20px" }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
           <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Manager;
