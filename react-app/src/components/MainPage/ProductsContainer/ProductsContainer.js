import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../../store/items"
import Product from "../Product/Product"

import "./ProductsContainer.css"

export default function ProductsContainer() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
    console.log(Object.entries(products))

    useEffect(() => {
        dispatch(getProducts({}))
    }, [])

    return (
        <>
          <ul id="products-container-products-container">
            {
                Object.entries(products).map(([id, product]) => {
                    console.log(product)
                    return <Product key={id} product={product} id={id}/>
                })
            }
          </ul>
        </>
    )
}
