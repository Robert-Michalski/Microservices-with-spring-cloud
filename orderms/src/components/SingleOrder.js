import React from "react"

function SingleOrder(props) {
  function getStatusBg(status) {
    if (status == "RECEIVED") return "bg-green"
    else {
      return "bg-red"
    }
  }
  return (
    <>
      <div className="col-sm p-3">{props.order.id}</div>
      <div className="col-sm p-3">{props.order.productName}</div>
      <div className="col-sm p-3">17 January 2023</div>
      <div className="col-sm p-3 ">
        <span className={getStatusBg(props.order.status) + " p-2"} id="status">
          {props.order.status}
        </span>
      </div>
      <div className="col-sm p-3">2350</div>
      <hr className="mt-2" />
      <div className="w-100"></div>
    </>
  )
}

export default SingleOrder
