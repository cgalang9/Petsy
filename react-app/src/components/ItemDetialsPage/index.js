import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getItemDetailsThunk } from '../../store/itemPage'
import { getItemReviewsThunk } from '../../store/itemReviews'

function ItemDetailsPage() {
    const { itemId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getItemDetailsThunk(itemId))
            .catch((res) => 'error')
        dispatch(getItemReviewsThunk(itemId))
            .catch((res) => 'error')
    }, [dispatch, itemId])

    const item = useSelector(state => state.itemPage)
    const itemReviews = useSelector(state => state.itemReviews)
    const sessionUser = useSelector(state => state.session.user)

    return (
        <div id='items_details_page'>
            {item && (
                <>
                    <div id='items_details_page_left'>
                        {sessionUser.id === item.sellerId && (
                            // <div className='edit_item_link'><a href={`/${itemId}/edit-item`}>Edit Item</a></div>
                            <div className='edit_item_link'>
                                <NavLink to={{
                                    pathname: `/items/${itemId}/edit-item`,
                                    state: { ...item }
                                }}> Edit Item
                                </NavLink>
                            </div>
                        )}
                        <div id='items_details_page_images_container'>
                            {item.imageURLs && (item.imageURLs.map(url => (
                                <div key={url}>
                                    <img src={url} alt="item picture" style={{ maxWidth: 500 }}></img>
                                </div>
                            )))}
                        </div>
                        <div>{item.shopReviews} reviews {item.avgShopRating} stars</div>
                        <div>
                            <div>Reviews for this item</div>
                            {itemReviews && (itemReviews.map(review => (
                                <div key={review.id}>
                                    <div>{review.starRating}</div>
                                    <div>{review.text}</div>
                                    <div>{review.user.username}</div>
                                </div>
                            )))}
                        </div>
                        {/* <div>
                            <div>Reviews for this shop</div>
                        </div> */}
                    </div>
                    <div id='items_details_page_right'>
                        <div>{item.shopName}</div>
                        <div>{item.shopSales} sales {item.avgShopRating} stars</div>
                        <div>{item.name}</div>
                        <div>${item.price}</div>
                        <div>{item.description}</div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ItemDetailsPage
