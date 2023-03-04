import { useStompClient } from "./useStompClient"
function Notification() {
  const stompClient = useStompClient(message => {})
}
export default Notification
