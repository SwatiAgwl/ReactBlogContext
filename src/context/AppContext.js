import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


// step 1: create context
export const AppContext= createContext();

export default function AppContextProvider({children}){
    console.log("inside context")

    const[loading,setLoading]= useState(false);
    const [page,setPage]= useState(1);
    const [posts,setPosts]= useState([]);
    const [totalPages, setTotalPages]= useState(null);

    const baseUrl = "https://codehelp-apis.vercel.app/api/get-blogs";

    const value= {
        loading,
        setLoading,
        page,
        setPage,
        posts,
        setPosts,
        totalPages,
        setTotalPages,
        fetchPosts,
        handlePageChange
    }

    async function fetchPosts(page=1,tag=null,category){
        setLoading(true);
        let url= `${baseUrl}?page=${page}`;
        if( tag){
            url+= `&tag=${tag}`;
        }
        if( category){
            url+= `&category=${category}`;
        }
        
       try{
        //const result= await fetch( `${baseUrl}?&page=${page}`);
        const result =await fetch(url);
        const output= await result.json();
        console.log(output);
        setPage(output.page);
        setPosts( output.posts); 
        setTotalPages( output.totalPages);
       } 
       catch(error){
        console.log("error in fetching")
        setPage(1);
        setPosts([]);
        setTotalPages(null)
       }
       setLoading(false);
    }

    const navigate= useNavigate();
    function handlePageChange(page){
        navigate({search: `?page=${page}`})
        setPage(page)
        //fetchPosts(page)
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}