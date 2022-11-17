import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink } from "react-router-dom";
import { getProducts } from "../../../store/items";
import Product from "../Product/Product";

import "./ProductsContainer.css";

export default function ProductsContainer({ search }) {
  const [page, setPage] = useState(1);
  const [pageNums, setPageNums] = useState([1, 2, 3]);
  const [query, setQuery] = useState({});

  const dispatch = useDispatch();
  const products = useSelector((state) => state.items);
  const numResults = products.numResults;
  delete products.numResults;
  const location = useLocation();
  console.log(numResults);

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

    if (search) {
      const params = new URLSearchParams(location.search);
      for (let [key, val] of params) {
        if (acceptedParams.has(key)) {
          if (key !== "q") {
            query[key] = Number(val);
          } else {
            query[key] = val;
          }
        }
      }
      setQuery(query);
    }

    console.log(query);
    dispatch(getProducts(query));
  }, [location]);

  return (
    <>
      <ul id='products-container-products-container'>
        {Object.entries(products).map(([id, product]) => {
          return (
            <Product
              key={id}
              product={product}
              id={id}
            />
          );
        })}
      </ul>
      {search && (
        <div className='products-container-navlink'>
          {pageNums.map((pageNum) => (
            <NavLink
              to={`/search?${new URLSearchParams({
                ...query,
                page: pageNum
              }).toString()}`}>
              {pageNum}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
