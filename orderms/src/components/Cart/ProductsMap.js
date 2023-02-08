import ProductView from "./ProductView"
function ProductsMap(props) {
  console.log(props)
  return (
    <div className="bg-white row ms-2 orders">
      {props.shoppingCart.map((product, index) => {
        return <ProductView item={product} key={index} bgIndex={index} max={props.shoppingCart.length} refresh={props.refresh} />
      })}{" "}
    </div>
  )
}
export default ProductsMap
