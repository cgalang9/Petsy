import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import { getProducts } from "../../../store/items";
import Product from "../Product/Product";

import "./ProductsContainer.css";

export default function ProductsContainer({ isSearch }) {
    const [numResults, products] = useSelector(state => [state.items.numResults, state.items])

    const [page, setPage] = useState(1);
    const [pageNums, setPageNums] = useState([])
    const [query, setQuery] = useState({})

    const dispatch = useDispatch();
    const location = useLocation();



  useEffect(() => {
    const query = {};
    const acceptedParams = new Set([
      "q",
      "minPrice",
      "maxPrice",
      "sellerId",
      "pageSize",
      "page"
    ]);

        if (isSearch) {
            const params = new URLSearchParams(location.search)

            if (params.get("page")) {
                setPage(Number(params.get("page")));
            } else if (page !== 1) {
                setPage(1);
            }
            
            const newPageNums = Array.from({length: Math.ceil(numResults / (params.get("pageSize") || 20))}, (_, i) => i + 1)

            if (String(newPageNums) !== String(pageNums)) {
                setPageNums(newPageNums)
            }

            for (let [key, val] of params) {
                if (acceptedParams.has(key)) {
                    if (key !== 'q') {
                        query[key] = Number(val)
                        
                    } else {
                        query[key] = val
                    }
                }
            }
            setQuery(query)
        }

        dispatch(getProducts(query))
        
    }, [location, numResults])
    

    return (
        <>
          <ul id="products-container-products-container">
            {
                Object.entries(products).map(([id, product]) => {
                    if (id !== "numResults") {
                        return <Product key={id} product={product} id={id}/>
                    }
                })
            }
          </ul>
          {
            isSearch && 
            <div className="products-container-navlinks">
                {
                    pageNums.map(pageNum => 
                        <NavLink 
                            className={`products-container-navlink ${pageNum === page ? "current" : ""}`}
                            key={pageNum} 
                            onClick={() => {setPage(pageNum)}} 
                            to={`/search?${new URLSearchParams({...query, page: pageNum}).toString()}`}
                        >
                            {pageNum}
                        </NavLink>
                    )
                }
            </div>
          }
        </>
    )

}
