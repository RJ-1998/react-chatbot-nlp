import { useState, useEffect } from "react";
import "./App.scss";
import chatbot_png from "./conversation.png";
import * as tf from "@tensorflow/tfjs";
import { predict_answer } from "./util";

function App() {
  const [model, setModel] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

  // message states
  const [sendMessage, setSendMessage] = useState("");
  const [receiveMessage, setReceiveMessage] = useState("");

  // chat history
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchModel = async () => {
      const model = await tf.loadLayersModel(
        "http://localhost:4001/static/model.json"
      );
      setModel(model);
      return model;
    };
    fetchModel()
      .then((model) => {
        setIsModelLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSendMessage = (e) => {
    if (!isModelLoading) {
      const ans = predict_answer(sendMessage, model);
      setReceiveMessage(ans);
      const chatObj = {
        sent: sendMessage,
        received: ans,
      };

      setChatHistory((prev) => {
        return [...prev, chatObj];
      });
      setSendMessage("");
      setReceiveMessage("");
    }
  };

  const handleTypeMessage = (e) => {
    setSendMessage(e.target.value);
  };

  return (
    <div className="App">
      <header className="header">
        <h2>
          <img src={chatbot_png} alt="" />
          Chatbot
        </h2>
      </header>

      <div className="container">
        <div className="box">
          <div className="heading">
            <h4>Chat with the BOT</h4>
          </div>

          <div className="chat_area">
            <div className="message_area">
              <MyFunc chatHistory={chatHistory} />
            </div>

            <div className="chat_inputs">
              <input
                type="text"
                name="chat"
                placeholder="Enter your message..."
                value={sendMessage}
                onChange={handleTypeMessage}
              />
              <input type="submit" value="Send" onClick={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyFunc({ chatHistory }) {
  return (
    <div>
      {chatHistory.map((chat) => (
        <>
          <Send send_msg={[chat.sent]} />
          <Received recv_msg={[chat.received]} />
        </>
      ))}
    </div>
  );
}

function Send(props) {
  return (
    <div>
      {props.send_msg.map((item, index) => {
        return (
          <div className="mssg_send" key={index}>
            <p className="message">{item}</p>
            <p className="status">Send</p>
          </div>
        );
      })}
    </div>
  );
}

function Received(props) {
  return (
    <div>
      {props.recv_msg.map((item, index) => {
        return (
          <div div className="mssg_recv" key={index}>
            <p className="message">{item}</p>
            <p className="status">Recieved</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
