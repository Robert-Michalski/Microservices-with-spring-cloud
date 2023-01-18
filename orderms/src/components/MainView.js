import React, { useEffect } from "react"
import Navigation from "./Navigation"
function MainView(props) {
  return (
    <div className="d-flex container">
      {/* Leftie and rightie */}
      {/* <button onClick={checkState}>CHECK</button> */}
      <Navigation />
      <props.view />
    </div>
  )
}

export default MainView
