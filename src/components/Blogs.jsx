import { useContext } from "react";
import {AppContext} from '../context/AppContext'
import PostCard from "./PostCard";

// consume context
function Blogs(){
    const{ loading,posts}= useContext(AppContext);

    return (
        <div className="blogs">
            {
                loading? 
                (<div>
                    <h3>Loading...</h3>
                </div>): 

                ( posts.length===0?
                 (<div>No post found</div>):

                 (posts.map( post =>(
                    <PostCard key={post.id} post={post}/>
                    // <div key={post.id}>
                    //     <h3>{post.title}</h3>
                    //     <p>By <span>{post.author}</span> on <span>{post.category}</span></p>
                    //     <p>Posted on {post.date} </p>
                    //     <p>{post.content}</p>
                    //     <div>
                    //         {post.tags.map( (tag,index) =>{
                    //             return <span key={index}>{`# ${tag}`}</span>
                    //         })}
                    //     </div>
                    //</div>
                ))))
            }
        </div>
    )
        
    
}
export default Blogs;