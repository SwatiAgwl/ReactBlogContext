import { NavLink } from "react-router-dom";

export default function PostCard({post}){
    return (
        <div>
            <NavLink to={`/blog/${post.id}`}>{post.title}</NavLink>
            <p>By {post.author} on <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`}>{post.category}</NavLink> </p>
            <p>Posted on {post.date}</p>
            <p>{post.content}</p>
            <div>
                {post.tags.map ( (tag,index)=> (
                    <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}> #{tag}  </NavLink>
                ))}
            </div>
            <br/>
            <br/>
        </div>
    )
}