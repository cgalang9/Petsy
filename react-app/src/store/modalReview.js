//Get review by review id
const GET_REVIEW = 'modalReviews/GET_ONE_REVIEW'
const getOneReview = (review) => {
    return { type: GET_REVIEW, review }
}

export const getOneReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`)

    if (response.ok) {
        const review = await response.json()
        dispatch(getOneReview(review))
        return review
    }
}

export const modalReviewReducer = (state = null, action) => {
    switch (action.type) {
        case GET_REVIEW:
            return action.review
        default:
            return state
    }
}
