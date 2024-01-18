import { useEffect, useState } from "react";
import AddPost from "./AddPost";
import "./homepage.css";




const Homepage = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:5050/api/buch", { method: "GET" })
        .then((res) => res.json())
        .then(({ success, result, error }) => {
            if (!success) console.log(error); // FIXME: add error handling
            else setPosts(result);
        });
    }, []);
    
    console.log(posts);

    

    
    return ( 
        <>
        
            <div>
            <h1>Gästebuch</h1>
            </div>
            <AddPost  updatePostArray={(newPostArray) => setPosts(newPostArray)}/>
            <section className="container">
            {posts.map((post) => (
                <div className="Text" key={post.id}>
                    <h2>{post.name}</h2>
                    <p><span>Email:</span> <br />{post.email}</p>
                    <p><span>Massage:</span> <br />{post.message}</p>
                </div>
            ))}
            </section>
        </>

    );
}

export default Homepage;