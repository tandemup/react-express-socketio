import io from "socket.io-client";
import { useState, useEffect } from "react";
//import "./index.css";
//import "./style.css";

const socket = io("/");

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", receiveMessage);
    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) => {
    setMessages((state) => [...state, message]);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
      <ul>
        {messages.map((message, i) => (
          <li key={i}>
            {message.from}:{message.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
