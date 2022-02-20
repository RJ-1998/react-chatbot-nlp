import React, { useState } from "react";
import { predict_answer } from "../util";

export default function ChatWindow(props) {
  const { model } = props;
  const [response, setResponse] = useState("");
  const [request, setRequest] = useState("");
  const handleRequest = (e) => {
    setRequest(e.target.value);
  };
  const handleChat = () => {
    setResponse(predict_answer(request, model));
  };
  return (
    <div className="chatWindow">
      <span>BOT::- {response}</span>
      <input
        type="text"
        value={request}
        name="request"
        onChange={handleRequest}
      />
      <button name="chat" onClick={handleChat}>
        Chat
      </button>
    </div>
  );
}
