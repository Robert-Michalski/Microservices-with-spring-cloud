import { useContext, useEffect } from "react"
import { useState } from "react"
import { useStompClient } from "./useStompClient"
import StateContext from "../../StateContext"
import Axios from "axios"

function Notification() {
  const [notificationCount, setNotificationCount] = useState(0)
  const [notificationUpdate, setNotificationUpdate] = useState(0)
  const [notificationsVisible, setNotificationsVisible] = useState(false)
  const [notifications, setNotifications] = useState([])
  const appState = useContext(StateContext)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchNotifications() {
      try {
        const response = await Axios.get("http://localhost:9090/api/notification/" + appState.user.id, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        setNotifications(prev => (prev = response.data))
        setNotificationCount(prev => (prev = response.data.filter(resp => resp.isRead === false).length))
      } catch (e) {
        console.log("Error during notifications loading " + e)
      }
    }
    fetchNotifications()
  }, [notificationCount, notificationUpdate])

  useStompClient(message => {
    setNotificationCount(prev => (prev += 1))
  })

  async function markAsRead(notificationId) {
    const ourRequest = Axios.CancelToken.source()
    try {
      await Axios.patch("http://localhost:9090/api/notification/" + notificationId, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
      setNotificationUpdate(prev => (prev += 1))
    } catch (e) {
      console.log("Error during notification status update " + e)
    }
  }

  function getBackground(isRead) {
    if (!isRead) {
      return "bg-dark fc-white"
    } else {
      return "bg-white"
    }
  }
  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString()
  }
  return (
    <div className="d-flex relative">
      <span className="material-symbols-outlined ms-3" onClick={() => setNotificationsVisible(prev => !prev)}>
        notifications
      </span>
      {notificationCount === 0 ? null : <div className="absolute notification-count">{notificationCount}</div>}
      {notificationsVisible ? (
        <div className="absolute notifications d-flex flex-column bg-white">
          {notifications.map(notification => {
            return (
              <>
                <div className={"col-12 single-notification p-2 d-flex " + getBackground(notification.isRead)} key={notification.id}>
                  <div className="p-2">{notification.content}</div>
                  <div className="p-1 d-flex flex-column ms-auto">
                    <div className="ms-auto mt-2">
                      {notification.isRead ? null : (
                        <span
                          className="material-symbols-outlined"
                          id="notification-x"
                          onClick={() => {
                            markAsRead(notification.id)
                          }}
                        >
                          cancel
                        </span>
                      )}
                    </div>
                    <div id="notification-date" className="align-self-end d-flex">
                      <span>{formatDate(notification.timestamp)}</span>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
export default Notification
