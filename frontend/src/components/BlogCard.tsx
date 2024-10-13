import { Link } from "react-router-dom"

 export interface BlogCardProps{
    id:string,
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({authorName,title,content,publishedDate,id}:BlogCardProps) => {
  return (
    <Link to={`/blog/id/${id}`}>
        <div className="flex border-b border-slate-400 ">
            <div className="p-4 cursor-pointer ">
                <div className="flex font-thin gap-4">
                    <div> <Avtar authorName={authorName || "Anonymous"}/> </div>
                    <div  className="flex justify-center items-center">
                        {authorName || "Anonymous"} . {publishedDate}
                    </div> 
                </div>

                <div className="font-bold text-3xl pt-4">
                    {title}
                    
                </div>

                <div className="font-normal text-xl pt-2 ">
                    {content.slice(0,130)+"..."}
                </div>

                <div className="font-normal text-slate-400 pt-6">
                    {`${Math.ceil(content.length/1000)} min read`}
                </div>

            </div>
        </div>
    </Link>
  )
}

export function Avtar({authorName}:{authorName :string}){
    return <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium items-center justify-center text-gray-600 dark:text-gray-300">{authorName[0].toUpperCase()}</span>
            </div>
}
