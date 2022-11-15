import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { getProducts } from "../../../store/items"
import Product from "../Product/Product"

import "./ProductsContainer.css"

export default function ProductsContainer({ search }) {
    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
    const location = useLocation();

    useEffect(() => {
        const query = {}
        const acceptedParams = new Set(["q", "minPrice", "maxPrice", "sellerId"])

        if (search) {
            const params = new URLSearchParams(location.search)
            for (let [key, val] of params) {
                if (acceptedParams.has(key)) {
                    if (key !== 'q') {
                        query[key] = Number(val)
                    } else {
                        query[key] = val
                    }
                }
            }
        }

        dispatch(getProducts(query))
    }, [location])

    return (
        <>
          <ul id="products-container-products-container">
            {
                Object.entries(products).map(([id, product]) => {
                    return <Product key={id} product={product} id={id}/>
                })
            }
          </ul>
        </>
    )
}
