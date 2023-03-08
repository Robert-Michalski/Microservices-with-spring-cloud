import { useParams } from "react-router"
import Axios from "axios"
import MainTop from "../MainTop"
import { useState } from "react"
import StateContext from "../../StateContext"
import { useContext } from "react"
import { useEffect } from "react"
import LoadingIcon from "../LoadingIcon"
import { Link } from "react-router-dom"
import getFormattedDate from "../GetFormattedDate"
function SingleOrderDetailed() {
  const { id } = useParams()
  const appState = useContext(StateContext)
  const [order, setOrder] = useState({})

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    async function fetchOrder() {
      try {
        const response = await Axios.get(`/api/order/` + id, { headers: { Authorization: `Bearer ${appState.user.token}` } }, { cancelToken: ourRequest.token })
        setOrder(prev => (prev = response.data))
      } catch (e) {
        console.log("there was a problem fetching the data")
      }
    }
    fetchOrder()
  }, [id])

  function getTotal() {
    let total = 0
    order.products.forEach(product => {
      total += product.quantityOrdered * product.price
    })
    return total.toFixed(2) + " PLN"
  }
  return (
    <div className="col-11 mx-auto p-3 mt-4 bg-gray">
      <MainTop label="Orders" />
      <hr />
      {order.products ? (
        <div className="container p-3 d-flex flex-column">
          <div className="fs-2">{"Ordered on " + getFormattedDate(order.orderDate)}</div>
          <div className="fs-2 mt-2">{"Total " + getTotal()}</div>
          <div className="d-flex flex-wrap col-12 mt-3">
            {order.products.map((product, index) => {
              return (
                <div className="ms-2 mt-2 col-5 d-flex flex-column order-product-card" key={index}>
                  <Link to={"/products/" + product.productId} className="fc-blue fs-4">
                    {product.productName}
                  </Link>
                  <span className="mt-1">Price : {product.price.toFixed(2) + " PLN"}</span>
                  <span className="mt-1">Quantity : {product.quantityOrdered}</span>
                  <span className="mt-1">Total: {(product.price * product.quantityOrdered).toFixed(2) + " PLN"}</span>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <LoadingIcon />
      )}
    </div>
  )
}
export default SingleOrderDetailed
