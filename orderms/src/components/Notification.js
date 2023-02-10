import React, { useEffect } from "react"
import SockJsClient from "react-stomp"

function Notification() {
  const sendMessage = msg => {}
  useEffect(() => {
    sendMessage("hello")
  }, [])
  return (
    <div>
      <SockJsClient
        url="http://localhost:62344/app"
        topics={["notification/message"]}
        onMessage={msg => {
          console.log(msg)
        }}
        onConnect={() => {
          console.log("connected")
        }}
      />
    </div>
  )
}
export default Notification
