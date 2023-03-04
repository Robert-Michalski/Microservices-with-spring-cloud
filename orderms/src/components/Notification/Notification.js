import { useState } from "react"
import { useStompClient } from "./useStompClient"

function Notification() {
  const [number, setNumber] = useState(0)
  let count = 0
  const stompClient = useStompClient(message => {
    setNumber(prev => (prev += 1))
    count += 1
    console.log(count)
  })

  return (
    <div className="d-flex relative">
      <span className="material-symbols-outlined ms-3">notifications</span>
      {number === 0 ? null : <div className="absolute notification-count">{number}</div>}
    </div>
  )
}
export default Notification
