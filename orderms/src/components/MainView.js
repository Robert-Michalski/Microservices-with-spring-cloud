import React from "react"
import Navigation from "./Navigation"
function MainView(props) {
  return (
    <div className="d-flex container">
      <Navigation />
      <props.view />
    </div>
  )
}

export default MainView
