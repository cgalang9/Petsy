import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserReviewsThunk } from "../../store/userReview"
import './yourReview.css'

const YourReviews = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(async () => {
        await dispatch(getUserReviewsThunk())
        setIsLoaded(true)
    }, [dispatch])

    const reviews = useSelector((state) => state.userReviews)

    return (
        <div>
            <h1>Your Reviews</h1>
            <div className="your-reviews-wrapper">

                {isLoaded && reviews?.map((review) => {
                    return (
                        <div className="your-reviews-review-wrapper">
                            <div className="your-reviews-item-image" style={{ backgroundImage: `url(${review?.item.previewImageURL})` }}></div>
                            <div className="your-reviews-review-content-wrapper">
                                <h2>{review?.item.name} sold by {review?.item.shopName}</h2>
                                <h4>Your review: {review.starRating} stars</h4>
                                <p>{review.text}</p>
                                {review?.reviewImageURL && <div className="your-reviews-review-image" style={{ backgroundImage: `url(${review?.reviewImageURL})` }}></div>}
                                <span>{(new Date(review.date)).toDateString()}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default YourReviews
