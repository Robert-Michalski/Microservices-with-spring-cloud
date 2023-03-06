import { useEffect } from "react"
import { useState } from "react"
import { useStompClient } from "./useStompClient"

function Notification() {
  const [notificationCount, setNotificationCount] = useState(0)
  const [notificationsVisible, setNotificationsVisible] = useState(false)
  const [notifications, setNotifications] = useState([])

  const stompClient = useStompClient(message => {
    setNotifications(prev => prev.concat(message.body))
    setNotificationCount(prev => (prev += 1))
  })

  function remove(index) {
    console.log(index)
  }

  return (
    <div className="d-flex relative" onClick={() => setNotificationsVisible(prev => !prev)}>
      <span className="material-symbols-outlined ms-3">notifications</span>
      {notificationCount === 0 ? null : <div className="absolute notification-count">{notificationCount}</div>}
      {notificationsVisible && notificationCount > 0 ? (
        <div className="absolute notifications d-flex flex-column bg-white">
          {notifications.map((notification, index) => {
            return (
              <div className="single-notification p-1 d-flex" key={index}>
                <div>{notification}</div>
                <div className="ms-auto">
                  <span
                    className="material-symbols-outlined"
                    id="notification-x"
                    onClick={e => {
                      remove(index)
                    }}
                  >
                    cancel
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
export default Notification
