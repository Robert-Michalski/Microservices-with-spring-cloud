import { useEffect } from "react"

function NotificationsList(props) {
  return props.notifications.map(notification => {
    return <div className="single-notification p-1">{notification}</div>
  })
}
export default NotificationsList
