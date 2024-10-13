import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog{
    "content":string,
    "title":string,
    "id":string,
    "author":{
        "name":string
    }
}

export const useBlog= ( {id} : {id:string}) => {
    

    const [loading,setLoading]=useState(true);
    const [blog,setBlog]= useState<Blog>();

    useEffect(() =>{
        axios.get(`${BACKEND_URL}/blog/id/${id}`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(Response=>{
            setBlog(Response.data.blog);
            setLoading(false);
        })
    },[id])

    return{
        loading,
        blog
    }
}



export const useBlogs = () => {

    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]= useState<Blog[]>([]);

    useEffect(() =>{
        axios.get(`${BACKEND_URL}/blog/bulk`,{
            headers:{
                Authorization:localStorage.getItem("token")
            }
        })
        .then(Response=>{
            setBlogs(Response.data.blog);
            setLoading(false);
        })
    },[])

    return{
        loading,
        blogs
    }
}
