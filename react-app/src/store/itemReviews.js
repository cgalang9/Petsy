//Get item reviews by item id
const GET_REVIEWS = 'itemReviews/GET_REVIEW'
const getItemReviews = (reviews) => {
    return { type: GET_REVIEWS, reviews }
}

export const getItemReviewsThunk = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}/reviews`)

    if (response.ok) {
        const reviews = await response.json()
        dispatch(getItemReviews(reviews))
        return reviews
    }

}

export const itemReviewsReducer = (state = null, action) => {
    switch (action.type) {
        case GET_REVIEWS:
            const stateGetItemReviews = [...action.reviews['itemReviews']]
            return stateGetItemReviews
        default:
            return state
    }
}
