import { useState } from "react"
import SockJsClient from "react-stomp"
const SOCKET_URL = "http://localhost:9090/ws"

function Notification() {
  const [message, setMessage] = useState("You server message here.")

  var onConnected = () => {
    console.log("Connected!!")
  }

  var onMessageReceived = msg => {
    setMessage(prev => (prev = msg))
    console.log(msg.message)
  }
  return (
    <div>
      <SockJsClient url={SOCKET_URL} topics={["/topic/message"]} onConnect={onConnected} onDisconnect={console.log("Disconnected!")} onMessage={msg => onMessageReceived(msg)} debug={false} />
      <div>{message}</div>
    </div>
  )
}
export default Notification
