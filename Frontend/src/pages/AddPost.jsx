import { useState } from "react";


const AddPost = ({updatePostArray}) => {



    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    function addPost() {
    fetch("http://localhost:5050/api/buch", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then(({ success, result, error }) => {
          if (!success) console.log(error); // FIXME: add error handling
        else updatePostArray(result);
        });
    }

    return ( 
        <>
                    <div className="Daten">
                <input type="text" placeholder="Name" onChange={(event) => setName(event.target.value)}/>
                <input type="text" placeholder="Email" onChange={(event) => setEmail(event.target.value)}/>
                <input type="text" placeholder="Massage" onChange={(event) =>  setMessage(event.target.value)}/>
                <button className="ADD" onClick={addPost}>ADD</button>
            </div>
        </>
    );
}

export default AddPost;