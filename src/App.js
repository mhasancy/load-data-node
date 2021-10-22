import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [users, serUsers] = useState();
  const emailRef = useRef();
  const nameRef = useRef();

  //data sent to server
  const handleForm = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name, email };
    fetch("http://localhost:5000/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const addedUser = data;
        const newUser = [...users, addedUser];
        serUsers(newUser);
        nameRef.current.value = "";
        emailRef.current.value = "";
      });
    e.preventDefault();
  };
  //data load
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => serUsers(data));
  }, []);
  return (
    <div className="App">
      <br />
      <br />
      <form onSubmit={handleForm}>
        <input type="email" ref={emailRef} placeholder="your email" />
        <br />
        <input type="text" ref={nameRef} placeholder="your name" /> <br />
        <input type="submit" value="submit" />
      </form>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </div>
  );
}

export default App;
