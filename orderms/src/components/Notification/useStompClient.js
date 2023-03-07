import { useEffect, useState } from "react"
import Stomp from "stompjs"
import SockJs from "sockjs-client"
import { useContext } from "react"
import StateContext from "../../StateContext"

export const useStompClient = subscribeCallback => {
  const [stompClient, setStompClient] = useState()
  const appState = useContext(StateContext)

  useEffect(() => {
    connect()
  }, [])

  const connect = () => {
    const sockJs = new SockJs("http://localhost:9090/ws")
    let client = Stomp.over(sockJs)
    client.connect({}, () => client.subscribe("/user/" + appState.user.id + "/queue/messages", subscribeCallback), onError)
    setStompClient(client)
  }

  const onError = err => {
    console.log(err)
  }

  return stompClient
}
