function ProductView(props) {
  return (
    <>
      <div className="col-4">{props.item.name}</div>
      <div className="col-3 text-right">{props.item.price + ".00$"}</div>
      <div className="col-4">Quantity: {props.item.quantity}</div>
      <div className="col-1 ms-auto">
        <span className="material-symbols-outlined">delete</span>
      </div>
      <div className="w-100"></div>
    </>
  )
}

export default ProductView
