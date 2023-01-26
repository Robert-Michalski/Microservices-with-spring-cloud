import React, { useEffect } from "react"

function FlashMessages(props) {
  return (
    <div className="floating-alerts">
      {props.messages.map((msg, index) => {
        const bg = msg.bg ? "bg-" + msg.bg : "bg-green"
        return (
          <div key={index} className={"alert text-center floating-alert shadow-sm " + bg}>
            {msg.value}
          </div>
        )
      })}
    </div>
  )
}

export default FlashMessages
