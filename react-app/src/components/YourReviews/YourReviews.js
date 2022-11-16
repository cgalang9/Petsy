import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getUserReviewsThunk } from "../../store/userReview"
import './yourReview.css'

const YourReviews = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const user = useSelector((state) => state.session.user)
    const [editToggle, setEditToggle] = useState(null)
    useEffect(async () => {
        if (!user) {
            history.push('/')
            return
        }
        await dispatch(getUserReviewsThunk())
        setIsLoaded(true)
    }, [dispatch, user])

    const reviews = useSelector((state) => state.userReviews)

    return (
        <div>
            <div className="your-reviews-wrapper">
                <h1 className="your-reviews-header">Your Reviews</h1>

                {isLoaded && reviews?.map((review) => {
                    return (
                        <div className="your-reviews-review-wrapper" key={review.id}>
                            <div className="your-reviews-review-border-wrapper">
                                <div className="your-reviews-item-image" onClick={() => history.push(`/items/${review?.item.itemId}`)} style={{ backgroundImage: `url(${review?.item.previewImageURL})` }}></div>
                                <div className="your-reviews-review-content-wrapper">
                                    <h2 onClick={() => history.push(`/items/${review?.item.itemId}`)}>{review?.item.name} sold by {review?.item.shopName}</h2>
                                    <div className="your-reviews-review-content">
                                        {editToggle !== review.id && <>
                                            <h4>{review.starRating} stars | {(new Date(review.date)).toDateString()}</h4>
                                            <p>{review.text}</p>
                                            {review?.reviewImageURL && <div className="your-reviews-review-image" style={{ backgroundImage: `url(${review?.reviewImageURL})` }}></div>}
                                        </>}
                                    </div>
                                </div>
                            </div>
                            <div className="your-reviews-buttons">
                                <button onClick={() => {
                                    if (editToggle === review.id) setEditToggle(null)
                                    else setEditToggle(review.id)
                                }}>
                                    {editToggle === review.id && 'Cancel'}{editToggle !== review.id && 'Edit review'}</button>
                                <button>Delete review</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default YourReviews
