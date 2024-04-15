import Header from "../components/Header"
import Footer from "../components/Footer"
import Blogs from "../components/Blogs"
import { useLoaderData, useLocation, useNavigate } from "react-router-dom"

export default function TagPage(){
    const navigate= useNavigate();
    const location = useLocation();
    const tag= location.pathname.split('/').at(-1).replaceAll("-"," ");
    return (
        <div>
            <Header/>
            <div>
                <button onClick={()=>{ navigate(-1)}} className="btnback" >
                    Back
                </button>
                <h2>Blogs tagged #{tag}</h2>
            </div>
            <Blogs/>
            <Footer/>
        </div>
    )
}