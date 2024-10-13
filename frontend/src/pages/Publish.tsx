import { Appbar } from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



export const Publish = () => {

    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const navigate = useNavigate();

  return (
    <div>

        <div>
            <Appbar/>
        </div>

        <div className=" px-10">

            <div>

            <div>
                <label className="block mb-2 mt-2 text-sm font-medium text-gray-900">Title</label>
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type={"text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-80 p-3 m-1 " placeholder="Title" required />
            </div>

                <div>
                    
                <div className="pt-5">
                
                    <label id="message" className="block mb-2  font-semibold  ">Content</label>
                    <textarea onChange={(e)=>{
                        setContent(e.target.value);
                    }} id="message" rows={12} className="block p-5 mb-5 w-[90vw]  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                
                </div>
                    <button onClick={()=>{
                        axios.post(`${BACKEND_URL}/blog`,{
                            title,
                            content
                        },{
                            headers:{
                                Authorization:localStorage.getItem("token")
                            }
                        }).then((response)=>{
                            const data=response.data.id;
                            navigate(`/blog/id/${data}`)
                        })
                    }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-gray-800">
                    Publish post
                    </button>
                </div>

            </div>

        </div>

    </div>
  )
}






  