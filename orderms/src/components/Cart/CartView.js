import ProductsMap from "./ProductsMap"
function CartView(props) {
  function getTotal() {
    let total = 0
    props.shoppingCart.forEach(product => {
      total += product.quantity * product.price
    })
    return total.toFixed(2) + " $"
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="ms-3 fs-2">My cart</div>
      </div>
      <div className="d-flex justify-content-around align-items-center fs-5 mt-5">
        <div className="fw-bold d-flex align-items-center cart-order cart-order-active">
          <div>Cart</div>
          <span className="material-symbols-outlined ms-2">cancel</span>
        </div>
        <div className=" d-flex align-items-center cart-order">
          <div>Delivery</div>
          <span className="material-symbols-outlined ms-2">cancel</span>
        </div>
        <div className="d-flex align-items-center cart-order">
          <div>Summary</div>
          <span className="material-symbols-outlined ms-2">cancel</span>
        </div>
      </div>
      <div className="d-flex container mt-4">
        {props.shoppingCart.length === 0 ? (
          "There are no items in cart yet"
        ) : (
          <div className="col-7">
            <ProductsMap shoppingCart={props.shoppingCart} />
          </div>
        )}
        {/* -------------- */}
        <div className="ms-auto col-3">
          <div className="bg-white d-flex flex-column orders p-3">
            <div>
              Total: <span className="fw-bold ms-2">{getTotal()}</span>
            </div>
            <div className="">
              <button className="btn bg-green fc-white col-12 mt-4" onClick={props.nextView}>
                DELIVERY
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CartView
