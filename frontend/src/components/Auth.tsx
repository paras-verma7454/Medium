import { SignupInput } from "@paras_verma/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type:"Sign Up"|"Sign In"}) => {

    const navigate = useNavigate();
    const [postInputs,setPostInputs]=useState<SignupInput>({
        email:"",
        password:"",
        name:""
    })

    function sendRequest(){
        
        axios.post(`${BACKEND_URL}/user${type==="Sign Up"? "/signup":"/signin"}`,postInputs)
        .then(response=>{
            const jwt=response.data.jwt;
            console.log(jwt);
            localStorage.setItem("token",jwt);
            navigate("/blogs")
        })
        .catch(err =>{alert(err.response.data.message);});
    }


  return (
    <div>
        <div className="h-screen flex justify-center items-center flex-col">
            <div className="mb-10">
                <h1 className=" flex  text-4xl font-extrabold items-center justify-center">{type==="Sign Up"? "Create an account":"Login"}</h1>
                <h2 className="font-normal text-slate-500 text-lg mt-2 px-5 ">{type==="Sign Up"? "Already have an account? ": "Don't have an account? "} <Link to={type==="Sign Up"? "/signin":"/signup"} className="underline ">{type==="Sign Up"? "Login":"Sign up"}</Link></h2>
            </div>
            <div className="">
                {type==="Sign Up"? <LabelledInput label="Name" placeholder="Paras Verma" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        name:e.target.value,
                    })
                }}/>: null}
                 <LabelledInput label="Email" type="Email" placeholder="Paras@gmail.com" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        email:e.target.value,
                    })
                }}/>
                 <LabelledInput label="Password" type="password" placeholder="***********" onChange={(e)=>{
                    setPostInputs({
                        ...postInputs,
                        password:e.target.value,
                    })
                }}/>
                <button onClick={sendRequest} type="button" className ="text-white bg-black-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-3 w-full dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700">{type}</button>
            </div>
        </div>

    </div>
  )
}

interface LabelledInputType {
    label:string;
    placeholder:string;
    onChange?:(e: ChangeEvent<HTMLInputElement>) => void;
    type?:string
}   

 export function LabelledInput({label,placeholder,onChange,type}:LabelledInputType) {

    return <div className="">
        <div>
            <label className="block mb-2 mt-2 text-sm font-medium text-gray-900">{label}</label>
            <input onChange={onChange} type={type || "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-3 m-1 " placeholder={placeholder} required />
        </div>
    </div>
}