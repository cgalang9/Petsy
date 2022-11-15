import {useState} from "react"
import {useHistory} from "react-router-dom"
import "./Product.css"

export default function Product( { product, id }) {
    const {name, avgShopRating, shopReviews, price, shopName, previewImageURL} = product;
    const [hovered, setHovered] = useState("");
    const history = useHistory();
    const backgroundStyle = {"background-image": `url(${previewImageURL})`}

    const onMouseEnterProduct = () => {
        setHovered("product-hovered");
    }

    const onMouseLeaveProduct = () => {
        setHovered("");
    }

    const navigateToProductPage = () => {
        history.push(`/items/${id}`)
    }

    return (
        <div className="product-outer-product" onMouseEnter={onMouseEnterProduct} onMouseLeave={onMouseLeaveProduct} onClick={navigateToProductPage}>
            <div className={`product-image ${hovered}`} style={backgroundStyle}/>
            <div className="product-details">
                <div className="product-name">{name}</div>
                <div>{avgShopRating} ({shopReviews})</div>
                <div className="product-price">${price}</div>
                <div className="product-shop-name">{shopName}</div>
            </div>
        </div>
    )
}
