import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProducts } from "../../store/items"
import Product from "./product"

export default function ProductsContainer() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.items)
    console.log(Object.entries(products))

    useEffect(() => {
        dispatch(getProducts({}))
    }, [])

    return (
        <>
          <ul>
            {
                Object.entries(products).map(([id, product]) => {
                    console.log(product)
                    return <Product key={id} product={product}/>
                })
            }
          </ul>
        </>
    )
}
