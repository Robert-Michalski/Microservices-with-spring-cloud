import React, { useEffect } from "react"

function DashboardInfoBox(props) {
  return (
    <div className={"dash-info-box  me-5 col-2 d-flex flex-column bg-" + props.background}>
      <div className="fs-2">{props.title}</div>
      <hr />
      <div className="fs-3">150</div>
      <div className="ms-auto mt-2">
        <small>More info -></small>
      </div>
    </div>
  )
}

export default DashboardInfoBox
