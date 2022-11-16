import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getItemDetailsThunk, deleteItemThunk } from "../../store/itemPage";
import { getItemReviewsThunk } from "../../store/itemReviews";
import { getImagesBySellerIdThunk } from "../../store/sellerReviewImages";
import StarRatings from "react-star-ratings";
import Modal from 'react-modal';
import ReviewImageModal from "../ReviewImageModal";
import "./ItemDetialsPage.css";
import AddToCart from "../AddToCart";

function ItemDetailsPage() {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const modalStr = useRef('')

  const [isLoaded, setIsLoaded] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  useEffect(() => {
    Modal.setAppElement('body')
  },[])

  useEffect(async () => {
    try {
      const item = await dispatch(getItemDetailsThunk(itemId));
      await dispatch(getItemReviewsThunk(itemId));
      await dispatch(getImagesBySellerIdThunk(item.sellerId));
      setIsLoaded(true);
    } catch {
      history.push("/404");
    }
  }, [dispatch, itemId]);

  const item = useSelector((state) => state.itemPage);
  const itemReviews = useSelector((state) => state.itemReviews);
  const sellerReviewImages = useSelector((state) => state.sellerReviewImages);
  const sessionUser = useSelector((state) => state.session.user);


  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this item? You can not recover this item after deletion."
      )
    ) {
      dispatch(deleteItemThunk(itemId)).then(() => history.push("/"));
    }
  };

  let imgIdx = 0; //to keep track of which img needs to be displayed
  const makeActive = (e) => {
    //remove border to emphasize highlighted tile on all tiles
    const imgsTile = document.querySelectorAll(
      ".items-details-page-images-container-tiles-images"
    );
    imgsTile.forEach((img) => {
      img.classList.remove("active-tile-image");
    });
    //add border to emphasize highlighted tile clicked tile
    e.target.classList.add("active-tile-image");

    //hides all imgs on main container
    const imgsMain = document.querySelectorAll(
      ".items-details-page-images-container-main-images"
    );
    imgsMain.forEach((img) => {
      img.classList.remove("show");
    });

    //change img idx to clicked image's idx
    imgIdx = e.target.id.slice(14);
    //displays img at imgIdx for main container
    const imgSelectedMain = document.querySelector(`#img-page-main-${imgIdx}`);
    imgSelectedMain.classList.add("show");
  };

  const handleRightArrow = () => {
    //Increase img idx by 1 or if curr img idx is at last img, changes img idx to zero
    imgIdx < item.imageURLs.length - 1 ? (imgIdx += 1) : (imgIdx = 0);
    moveDisplayedImage(imgIdx);
  };

  const handleLeftArrow = () => {
    //Decrease img idx by 1 or goes to last img idx if current img idx is 0
    imgIdx > 0 ? (imgIdx -= 1) : (imgIdx = item.imageURLs.length - 1);
    moveDisplayedImage(imgIdx);
  };

  const moveDisplayedImage = (idx) => {
    //remove border to emphasize highlighted tile on all tiles
    const imgsTile = document.querySelectorAll(
      ".items-details-page-images-container-tiles-images"
    );
    imgsTile.forEach((img) => {
      img.classList.remove("active-tile-image");
    });

    //add border to emphasize highlighted tile to tile at new idx
    const imgSelectedTile = document.querySelector(`#img-page-tile-${idx}`);
    imgSelectedTile.classList.add("active-tile-image");

    //hides all imgs on main container
    const imgsMain = document.querySelectorAll(
      ".items-details-page-images-container-main-images"
    );
    imgsMain.forEach((img) => {
      img.classList.remove("show");
    });
    //displays img at new idx for main container
    const imgSelectedMain = document.querySelector(`#img-page-main-${idx}`);
    imgSelectedMain.classList.add("show");
  };

  const handleRightArrowReview = () => {
    if (reviewIdx + 4 < itemReviews.length) {
      setReviewIdx(reviewIdx + 4);
    }
  };

  const handleLeftArrowReview = () => {
    if (reviewIdx > 0) {
      setReviewIdx(reviewIdx - 4);
    }
  };

  //Modal functions and styling
  const customStyles = {
    content: {
      width: '65%',
      height: '65%',
      top: '50%',
      left: '50%',
      borderRadius: '15px',
      transform: 'translate(-50%, -50%)',
    },
  };

//   let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = async(e) => {
    modalStr.current = `${e.target.alt.slice(14)}:::::${e.target.src}` //reviewId separated by img url to pass to modal
    await setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div id='items-details-page-oustside-container'>
      {isLoaded && (
        <div id='items-details-page'>
          {item && (
            <>
              <div id='items-details-page-left'>
                <div id='items-details-page-images-container'>
                  <div id='items-details-page-images-container-tiles'>
                    {item.imageURLs &&
                      item.imageURLs.map((url, idx) => (
                        <div key={idx}>
                          <img
                            src={url}
                            alt='item picture'
                            id={`img-page-tile-${idx}`}
                            className={
                              idx == 0
                                ? "items-details-page-images-container-tiles-images active-tile-image"
                                : "items-details-page-images-container-tiles-images"
                            }
                            onClick={makeActive}></img>
                        </div>
                      ))}
                  </div>
                  <div id='items-details-page-images-container-main'>
                    <div
                      className='items-details-page-arrow'
                      onClick={handleLeftArrow}>
                      <i className='fa-solid fa-angle-left' />
                    </div>
                    {item.imageURLs &&
                      item.imageURLs.map((url, idx) => (
                        <div key={idx}>
                          <img
                            src={url}
                            alt='item picture'
                            id={`img-page-main-${idx}`}
                            className={
                              idx == 0
                                ? "items-details-page-images-container-main-images show"
                                : "items-details-page-images-container-main-images"
                            }></img>
                        </div>
                      ))}
                    <div
                      className='items-details-page-arrow'
                      onClick={handleRightArrow}>
                      <i className='fa-solid fa-angle-right' />
                    </div>
                  </div>
                </div>
                <div id='items-details-page-main-review-containter'>
                  <div id='items-details-page-main-shop-reviews'>
                    {item.shopReviews} reviews for this store
                    <span className='items-details-page-stars'>
                      <StarRatings
                        rating={item.avgShopRating}
                        starRatedColor='black'
                        numberOfStars={5}
                        starDimension='25px'
                        starSpacing='1px'
                      />
                    </span>
                  </div>
                  <div id='items-details-page-main-item-reviews-total'>
                    Reviews for this item <span>{itemReviews.length}</span>
                  </div>
                  <div>
                        <NavLink to={{ pathname: `/items/${itemId}/add-review`}}>
                            Create Review for this Item
                        </NavLink>
                    </div>
                  {itemReviews &&
                    itemReviews
                      .slice(reviewIdx, reviewIdx + 4)
                      .map((review) => (
                        <div key={review.id} className='items-details-page-review-containter'>
                            <div className='items-details-page-review-containter-left'>
                                <div className='items-details-page-main-item-reviews-rating'>
                                    <StarRatings
                                    rating={review.starRating}
                                    starRatedColor='black'
                                    numberOfStars={5}
                                    starDimension='20px'
                                    starSpacing='1px'
                                    />
                                </div>
                                <div className='items-details-page-main-item-reviews-text'>
                                    {review.text}
                                </div>
                                <div className='items-details-page-main-item-reviews-user'>
                                    {review.user.username}{" "}
                                    {new Date(review.date).toDateString().slice(4)}
                                </div>
                            </div>
                                <div className='items-details-page-review-containter-right'>
                                    {review.imgUrls[0] && (
                                        <img src={review.imgUrls[0]} alt='review image' className='items-details-page-review-containter-image'></img>
                                    )}
                                </div>
                        </div>
                      ))}
                  <div id='items-details-page-main-item-reviews-page'>
                    <span
                      className='items-details-page-arrow-review'
                      onClick={handleLeftArrowReview}>
                      <i className='fa-solid fa-angle-left' />
                    </span>
                    Page {reviewIdx / 4 + 1} of{" "}
                    {Math.ceil(itemReviews.length / 4)}
                    <span
                      className='items-details-page-arrow-review'
                      onClick={handleRightArrowReview}>
                      <i className='fa-solid fa-angle-right' />
                    </span>
                  </div>
                  <div id='items-details-page-main-shop-reviews-images-head'>
                    Photos from reviews
                  </div>
                  <div id='items-details-page-main-shop-reviews-images-container'>
                    {sellerReviewImages &&
                      sellerReviewImages.map((img) => (
                        <div key={img.id}>
                          <img
                            src={img.url}
                            alt={`Image: Review ${img.reviewId}`}
                            className='items-details-page-main-shop-reviews-images'
                            onClick={openModal}></img>
                        </div>
                      ))}
                  </div>
                  <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                        <ReviewImageModal modalStr={modalStr.current}/>
                  </Modal>
                </div>
              </div>
              <div id='items-details-page-right'>
                <div id='items-details-page-right-shopname'>
                  {item.shopName}
                </div>
                <div id='items-details-page-right-shop-sales'>
                  {item.shopSales} sales
                  <span> | </span>
                  <StarRatings
                    rating={item.avgShopRating}
                    starRatedColor='black'
                    numberOfStars={5}
                    starDimension='20px'
                    starSpacing='1px'
                  />
                </div>
                {sessionUser && sessionUser.id === item.sellerId && (
                  <div id='items-details-page-edit-links'>
                    <div id='edit-item-link'>
                      <NavLink
                        to={{
                          pathname: `/items/${itemId}/edit-item`,
                          state: { ...item }
                        }}>
                        {" "}
                        Edit Item
                      </NavLink>
                    </div>
                    <div
                      id='delete-item-link'
                      onClick={handleDelete}>
                      Delete Item
                    </div>
                  </div>
                )}
                <div id='items-details-page-right-item-name'>{item.name}</div>
                <div id='items-details-page-right-price'>${item.price}</div>
                <div id='items-details-page-add-to-cart-btn-container'><AddToCart itemId={item.id} /></div>
                <div id='items-details-page-right-description'>
                  <div id='items-details-page-right-description-head'>
                    Description
                  </div>
                  <div id='items-details-page-right-description-text'>
                    {item.description}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemDetailsPage;
