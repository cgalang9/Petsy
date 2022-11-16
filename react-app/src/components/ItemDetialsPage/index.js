import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getItemDetailsThunk, deleteItemThunk } from '../../store/itemPage'
import { getItemReviewsThunk } from '../../store/itemReviews'
import './ItemDetialsPage.css'


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

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this item? You can not recover this item after deletion.")) {
            dispatch(deleteItemThunk(itemId))
                .then(() => history.push('/'))
        }
    }

    let imgIdx = 0 //to keep track of which img needs to be displayed
    const makeActive = (e) => {
        //remove border to emphasize highlighted tile on all tiles
        const imgsTile = document.querySelectorAll('.items-details-page-images-container-tiles-images')
        imgsTile.forEach(img => {
            img.classList.remove('active-tile-image')
        })
        //add border to emphasize highlighted tile clicked tile
        e.target.classList.add('active-tile-image')

        //hides all imgs on main container
        const imgsMain = document.querySelectorAll('.items-details-page-images-container-main-images')
        imgsMain.forEach(img => {
            img.classList.remove('show')
        })

        //change img idx to clicked image's idx
        imgIdx = e.target.id.slice(14)
        //displays img at imgIdx for main container
        const imgSelectedMain = document.querySelector(`#img-page-main-${imgIdx}`)
        imgSelectedMain.classList.add('show')
    }

    const handleLeftArrow = () => {
        //Decrease img idx by 1 or goes to last img idx if current img idx is 0
        imgIdx > 0 ? imgIdx -= 1 : imgIdx = item.imageURLs.length - 1
        moveDisplayedImage(imgIdx)
    }

    const handleRightArrow = () => {
        //Increase img idx by 1 or if curr img idx is at last img, changes img idx to zero
        imgIdx < item.imageURLs.length - 1 ? imgIdx += 1 : imgIdx = 0
        moveDisplayedImage(imgIdx)
    }

    const moveDisplayedImage = idx => {
        //remove border to emphasize highlighted tile on all tiles
        const imgsTile = document.querySelectorAll('.items-details-page-images-container-tiles-images')
        imgsTile.forEach(img => {
            img.classList.remove('active-tile-image')
        })

        //add border to emphasize highlighted tile to tile at new idx
        const imgSelectedTile = document.querySelector(`#img-page-tile-${idx}`)
        imgSelectedTile.classList.add('active-tile-image')

        //hides all imgs on main container
        const imgsMain = document.querySelectorAll('.items-details-page-images-container-main-images')
        imgsMain.forEach(img => {
            img.classList.remove('show')
        })
        //displays img at new idx for main container
        const imgSelectedMain = document.querySelector(`#img-page-main-${idx}`)
        imgSelectedMain.classList.add('show')
    }


    return (
        <div id='items-details-page'>
            {item && (
                <>
                    <div id='items-details-page-left'>
                        {sessionUser?.id === item.sellerId && (
                            <>
                                <div id='edit-item-link'>
                                    <NavLink to={{
                                        pathname: `/items/${itemId}/edit-item`,
                                        state: { ...item }
                                    }}> Edit Item
                                    </NavLink>
                                </div>
                                <div id='delete-item-link' onClick={handleDelete}>
                                    Delete Item
                                </div>
                            </>
                        )}
                        <div id='items-details-page-images-container'>
                            <div id='items-details-page-images-container-tiles'>
                                {item.imageURLs && (item.imageURLs.map((url, idx) => (
                                    <div key={idx} >
                                        <img
                                            src={url}
                                            alt="item picture"
                                            id={`img-page-tile-${idx}`}
                                            className={idx == 0 ? "items-details-page-images-container-tiles-images active-tile-image" : "items-details-page-images-container-tiles-images"}
                                            onClick={makeActive}
                                        ></img>
                                    </div>
                                )))}
                            </div>
                            <div id='items-details-page-images-container-main'>
                                <div className='items-details-page-arrow' onClick={handleLeftArrow}><i className="fa-solid fa-angle-left" /></div>
                                {item.imageURLs && (item.imageURLs.map((url, idx) => (
                                    <div key={idx}>
                                        <img
                                            src={url}
                                            alt="item picture"
                                            id={`img-page-main-${idx}`}
                                            className={idx == 0 ? "items-details-page-images-container-main-images show" : "items-details-page-images-container-main-images"}
                                        ></img>
                                    </div>
                                )))}
                                <div className='items-details-page-arrow' onClick={handleRightArrow}><i className="fa-solid fa-angle-right" /></div>
                            </div>
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
                    <div id='items-details-page-right'>
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
