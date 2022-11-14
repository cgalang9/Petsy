// export default function Product({sellerId, name, avgShopRating, shopReviews, price, shopName, previewImageURL}) {
export default function Product( { product }) {
    const {name, avgShopRating, shopReviews, price, shopName, previewImageURL} = product
    return (
        <div className="product-outer-product">
            <img src={`${previewImageURL}`}/>
            <input value={`${name}`}/>
        </div>
    )
}
