import React, { useState, useContext } from "react"
import StateContext from "../StateContext"
function SingleOrder(props) {
  const appState = useContext(StateContext)
  function getStatusBg(status) {
    if (status === "RECEIVED") return "bg-green"
    else {
      return "bg-red"
    }
  }

  function getFormattedTotal() {
    const total = 10 * 5 //price and quantity here
    const formatted = Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatted.format(total) + " $"
  }
  function getBackground() {
    if (props.bgIndex % 2 === 0) return " bg-gray"
    else return " bg-white"
  }
  return (
    <>
      <div className={"col-sm items-row " + getBackground()}>{props.order.id}</div>
      <div className={"col-sm items-row " + getBackground()}>17 January 2023</div>
      <div className={"col-sm items-row " + getBackground()}>
        <span className={getStatusBg(props.order.status) + " p-2 "} id="status">
          {props.order.status}
        </span>
      </div>
      <div className={"col-sm items-row " + getBackground()}>{getFormattedTotal()}</div>
      <hr />
      <div className="w-100"></div>
    </>
  )
}

export default SingleOrder
