// export default function Product({sellerId, name, avgShopRating, shopReviews, price, shopName, previewImageURL}) {
export default function Product( { product }) {
    const {name, avgShopRating, shopReviews, price, shopName, previewImageURL} = product
    return <h2>{`${name} ${avgShopRating} ${shopReviews} ${price} ${shopName} ${previewImageURL}`}</h2>
}
