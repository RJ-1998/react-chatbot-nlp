import { useState } from 'react'
import './App.scss'
import chatbot_png from './conversation.png'

function App() {

  const [recv_mssg, setRecvMssg] = useState(["Hello Recieved 1"])
  const [send_mssg, setSendMssg] = useState(["Hello Send 1"])

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
            <h4>

              Chat with the BOT</h4>
          </div>

          <div className="chat_area">

            <div className="message_area">

              <MyFunc
                send_mssg={send_mssg}
                recv_mssg={recv_mssg}
              />

            </div>

            <div className="chat_inputs">
              <input type="text" name="chat" placeholder="Enter yout message..." />
              <input type="submit" value="Send" />
            </div>

          </div>

        </div>

      </div>

    </div >
  )
}

function MyFunc(props) {
  return (
    <div>
      <Send send_mssg={props.send_mssg} />
      <Recieved recv_mssg={props.recv_mssg} />
    </div>
  )
}

function Send(props) {
  return (
    <div>

      {props.send_mssg.map((item, index) => {
        return (<div className="mssg_send" key={index}>
          <p className="message">{item}</p>
          <p className="status">Send</p>
        </div>)
      })}

    </div>
  )
}

function Recieved(props) {
  return (
    <div>

      {props.recv_mssg.map((item, index) => {
        return (<div div className="mssg_recv" key={index} >
          <p className="message">{item}</p>
          <p className="status">Recieved</p>
        </div>)
      })}

    </div>
  )
}

export default App