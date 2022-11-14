import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getItemDetailsThunk } from '../../store/itemPage'

function ItemDetailsPage() {
    const { itemId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItemDetailsThunk(itemId))
            .catch((res) => 'error')
    }, [dispatch, itemId])

    const item = useSelector(state => state.itemPage)
    console.log(item)


    return (
        <div id='items_details_page'>
            {item && (
                <>
                    <div id='items_details_page_left'>
                        <div id='items_details_page_images_container'>
                            {item.imageURLs && (item.imageURLs.map(url => (
                                <div key={url}>
                                    <img src={url} alt="item picture"></img>
                                </div>
                            )))}
                        </div>
                        <div>{item.shopReviews} reviews {item.avgShopRating} stars</div>
                        <div>
                            <div>Reviews for this item</div>
                        </div>
                        <div>
                            <div>Reviews for this shop</div>
                        </div>
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
