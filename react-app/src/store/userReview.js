const GET_USER_REVIEWS = 'userReviews/GET_REVIEW'
const getUserReviews = (reviews) => {
    return { type: GET_USER_REVIEWS, reviews }
}

export const getUserReviewsThunk = () => async (dispatch) => {
    const response = await fetch(`/api/session/reviews`)

    if (response.ok) {
        const reviews = await response.json()
        let normalizedReviews = {}
        console.log(reviews.userReviews)
        reviews.userReviews.forEach(review => {
            normalizedReviews[review.id] = review
        });
        dispatch(getUserReviews(normalizedReviews))
        return reviews
    }

}

export const userReviewsReducer = (state = null, action) => {
    switch (action.type) {
        case GET_USER_REVIEWS:
            const stateGetUserReviews = { ...action.reviews }
            return stateGetUserReviews
        default:
            return state
    }
}
