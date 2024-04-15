import { useLocation, useNavigate } from "react-router-dom"
import PostCard from "../components/PostCard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Header from "../components/Header";

console.log("blog page called")

export default function BlogPage(){
    // https://codehelp-apis.vercel.app/api/get-blog?blogId=BLOG100
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const navigate= useNavigate();
    const [blog,setBlog]= useState(null);
    const [relatedblogs, setrelatedBlogs]= useState([]);
    const location = useLocation();

    const blogId= location.pathname.split('/').at(-1);
    console.log(blogId);
    const {loading, setLoading}= useContext(AppContext);


    async function fetchRelatedBlogs(){
        setLoading(true);
        let url= `${newBaseUrl}get-blog?blogId=${blogId}`;
        console.log(url);
        try{
            const res= await fetch(url);
            const data= await res.json();
            setBlog( data.blog);
            setrelatedBlogs( data.relatedBlogs);
        }
        catch(error){
            console.log("error");
            setBlog(null);
            setrelatedBlogs([])
        }
        setLoading(false)
    }

    useEffect( ()=>{
        console.log(blogId);
        if( blogId){
            fetchRelatedBlogs();
        }
    },[location.pathname])
     
    return (
        <div>
            <Header/>
            <button onClick={()=> navigate(-1)} className="btnback">Back</button>
            
            <div>
                { 
                    loading?
                     (<h2>Loading...</h2>) :
                     blog?
                        (<div>
                            
                            <PostCard post={blog} />
                            <h2>Related Blogs</h2>
                            {
                                relatedblogs.map( post => (
                                    <PostCard key={post.id}post={post}/>
                                )) 
                            }
                        </div>
                        )
                        :
                        (<div> <p> No blog found</p> </div>)
                     
                }
            </div>
        </div>
    )
}
