import { useEffect } from "react"
import { useState } from "react"
import NotificationsList from "./NotificationsList"
import { useStompClient } from "./useStompClient"

function Notification() {
  const [notificationCount, setNotificationCount] = useState(0)
  const [notificationsVisible, setNotificationsVisible] = useState(false)
  const [notifications, setNotifications] = useState([])

  const stompClient = useStompClient(message => {
    setNotifications(prev => prev.concat(message.body))
    setNotificationCount(prev => (prev += 1))
  })

  return (
    <div className="d-flex relative" onClick={() => setNotificationsVisible(prev => !prev)}>
      <span className="material-symbols-outlined ms-3">notifications</span>
      {notificationCount === 0 ? null : <div className="absolute notification-count">{notificationCount}</div>}
      {notificationsVisible ? (
        <div className="absolute notifications d-flex flex-column bg-white">
          <NotificationsList notifications={notifications} />
        </div>
      ) : null}
    </div>
  )
}
export default Notification
