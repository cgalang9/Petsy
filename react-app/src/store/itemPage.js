
//Get item details by id
const GET_ITEM = 'spots/GET_ITEM'
const getItem = (item) => {
    return { type: GET_ITEM, item }
}

export const getItemDetailsThunk = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}`)

    if(response.ok) {
        const item = await response.json()
        dispatch(getItem(item))
        return item
    }

}


export const itemPageReducer = (state = null, action) => {
    switch(action.type) {
        case GET_ITEM:
            const stateGetItemDetails = {...action.item}
            return stateGetItemDetails
        default:
            return state
    }
}
