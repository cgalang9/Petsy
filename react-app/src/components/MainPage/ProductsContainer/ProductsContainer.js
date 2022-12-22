import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, NavLink, useHistory } from "react-router-dom";
import { getProducts } from "../../../store/items";
import Product from "../Product/Product";
import slidingWindowPages from "./utils/slidingWindowPages";

import "./ProductsContainer.css";

export default function ProductsContainer({ isSearch }) {
  const history = useHistory();

  const [numResults, products] = useSelector((state) => [
    state.items.numResults,
    state.items,
  ]);

  const user = useSelector((state) => state.session.user);

  const [page, setPage] = useState(1);
  const [pageNums, setPageNums] = useState([]);
  const [displayPageNums, setDisplayPageNums] = useState([]);
  const [prefix, setPrefix] = useState(false);
  const [postfix, setPostfix] = useState(false);
  const [query, setQuery] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNoRes, setShowNoRes] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const pageDisplayInfo = slidingWindowPages(pageNums, page);
    setDisplayPageNums(pageDisplayInfo.pages);
    setPrefix(pageDisplayInfo.prefix);
    setPostfix(pageDisplayInfo.postfix);
  }, [page, pageNums]);

  useEffect(() => {
    setIsLoaded(false);
    const query = {};
    const acceptedParams = new Set([
      "q",
      "minPrice",
      "maxPrice",
      "sellerId",
      "pageSize",
      "page",
    ]);

    if (isSearch) {
      const params = new URLSearchParams(location.search);

      if (params.get("page")) {
        setPage(Number(params.get("page")));
      } else if (page !== 1) {
        setPage(1);
      }

      const newPageNums = Array.from(
        { length: Math.ceil(numResults / (params.get("pageSize") || 20)) },
        (_, i) => i + 1
      );

      if (String(newPageNums) !== String(pageNums)) {
        setPageNums(newPageNums);
      }

      for (let [key, val] of params) {
        if (acceptedParams.has(key)) {
          if (["page", "pageSize", "sellerId"].includes(key)) {
            query[key] = Math.floor(val);
          } else if (key !== "q") {
            query[key] = Number(val);
          } else {
            query[key] = val;
          }
        }
      }
      setQuery(query);
    }

    dispatch(getProducts(query)).then(() => {
      setShowNoRes(true);
    });
    setIsLoaded(true);
  }, [location, numResults]);

  useEffect(() => {
    const noRes = document.querySelector(".products-container-no-results");
    if (noRes && !showNoRes) noRes.classList.remove("hide");
    if (noRes && showNoRes) noRes.classList.add("hide");
  }, [showNoRes]);

  const searchTopic = (topic) => {
    setIsLoaded(false);
    const formattedTopic = topic.replaceAll(" ", "+");
    history.push(`/search?q=${formattedTopic}`);
  };

  return (
    <>
      {!isSearch && (
        <div className="main-header-container">
          <div className="main-header">
            <div className="main-header-title">
              {user
                ? `Welcome back, ${user.username}!`
                : `Find gifts that your pet will love.`}
            </div>
            <div className="main-header-background" />
            <div className="main-header-bottom">
              <div
                className="main-header-img-container"
                onClick={() => searchTopic("cat")}
              >
                <img
                  src="https://images.pexels.com/photos/14003811/pexels-photo-14003811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="item"
                  className="main-header-img"
                  onError={(e) => {
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
                    e.onerror = null;
                  }}
                />
                <div>Gifts for Cats</div>
              </div>
              <div
                className="main-header-img-container"
                onClick={() => searchTopic("dog")}
              >
                <img
                  src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="item"
                  className="main-header-img"
                  onError={(e) => {
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
                    e.onerror = null;
                  }}
                />
                <div>Gifts for Dogs</div>
              </div>
              <div
                className="main-header-img-container"
                onClick={() => searchTopic("birds")}
              >
                <img
                  src="https://images.pexels.com/photos/1418241/pexels-photo-1418241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="item"
                  className="main-header-img"
                  onError={(e) => {
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
                    e.onerror = null;
                  }}
                />
                <div>Gifts for Birds</div>
              </div>
              <div
                className="main-header-img-container"
                onClick={() => searchTopic("toys")}
              >
                <img
                  src="https://images.pexels.com/photos/6864016/pexels-photo-6864016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="item"
                  className="main-header-img"
                  onError={(e) => {
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
                    e.onerror = null;
                  }}
                />
                <div>Pet Toys</div>
              </div>
              <div
                className="main-header-img-container"
                onClick={() => searchTopic("bed")}
              >
                <img
                  src="https://images.pexels.com/photos/7282664/pexels-photo-7282664.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="item"
                  className="main-header-img"
                  onError={(e) => {
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
                    e.onerror = null;
                  }}
                />
                <div>Pet Beds</div>
              </div>
              <div
                className="main-header-img-container"
                onClick={() => searchTopic("treat")}
              >
                <img
                  src="https://images.pexels.com/photos/978947/pexels-photo-978947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="item"
                  className="main-header-img"
                  onError={(e) => {
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930";
                    e.onerror = null;
                  }}
                />
                <div>Treats for Pets</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoaded &&
        ((Object.entries(products).length > 1 && (
          <ul id="products-container-products-container">
            {Object.entries(products).map(([id, product]) => {
              if (id !== "numResults") {
                return <Product key={id} product={product} id={id} />;
              }
            })}
          </ul>
        )) || (
          <div className="products-container-no-results hide">
            <h1>
              <i className="fa-solid fa-bone"></i>
              <span className="products-container-no-results-message">
                no results
              </span>
              <i className="fa-solid fa-bone"></i>
            </h1>{" "}
            <img src="https://i.pinimg.com/564x/2d/37/ab/2d37ab595697d54c61094894cdbca161.jpg" />
          </div>
        ))}
      {isSearch && isLoaded && (
        <div className="products-container-navlinks">
          {prefix && (
            <span className="products-container-dots-before">...</span>
          )}
          {displayPageNums.map((pageNum) => (
            <NavLink
              className={`products-container-navlink ${
                pageNum === page ? "current" : ""
              }`}
              key={pageNum}
              onClick={() => {
                setPage(pageNum);
              }}
              to={`/search?${new URLSearchParams({
                ...query,
                page: pageNum,
              }).toString()}`}
            >
              {pageNum}
            </NavLink>
          ))}
          {postfix && (
            <span className="products-container-dots-after">...</span>
          )}
        </div>
      )}
      {isLoaded && (
        <h6 className="about-links-footer">
          <div className="about-links-creators">
            <div style={{ marginRight: 10 }}>Created by </div>
            <div className="about-links-creator-container">
              <span>Carmelino Galang</span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/cgalang9"
              >
                <div className="about-links-github-icon">
                  <i className="fa-brands fa-github" />
                </div>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/carmelino-galang-53369a205/"
              >
                <div className="about-links-github-icon">
                  <i class="fab fa-linkedin-in" />
                </div>
              </a>
            </div>
            <div className="about-links-creator-container">
              <span>Jason Premo</span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/jhpremo"
              >
                <div className="about-links-github-icon">
                  <i className="fa-brands fa-github" />
                </div>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/jhpremo/"
              >
                <div className="about-links-github-icon">
                  <i class="fab fa-linkedin-in" />
                </div>
              </a>
            </div>
            <div className="about-links-creator-container">
              <span>Jwad Aziz</span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/jwad96"
              >
                <div className="about-links-github-icon">
                  <i className="fa-brands fa-github" />
                </div>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/jwad-aziz/"
              >
                <div className="about-links-github-icon">
                  <i class="fab fa-linkedin-in" />
                </div>
              </a>
            </div>
            <div className="about-links-creator-container">
              <span>Sean Kennedy</span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/DevSPK"
              >
                <div className="about-links-github-icon">
                  <i className="fa-brands fa-github" />
                </div>
              </a>
            </div>
          </div>
        </h6>
      )}
    </>
  );
}
