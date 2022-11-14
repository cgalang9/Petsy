const GET_PRODUCTS = "items/GET_PRODUCTS"

const initialState = {};

const populateProducts = (products) => (
    {
        type: GET_PRODUCTS,
        products
    }
)

export const getProducts = (queryParams) => async (dispatch) => {
    let query = []
    let queryString = ''

    for (let [key, val] of Object.entries(queryParams)) {
        query.push(`${key}=${val}`)
    }

    if (query.length > 0) {
        queryString += '?' + query.join('&')
    }

    const products = await fetch(`/api/items${queryString}`).then(res => res.json()).then(body => body.items)
    const normalizedProducts = products.reduce((acc, product) => {
        acc[product.id] = {...(delete product.id && product)}
        return acc
    }, {})

    console.log("normalized", normalizedProducts)

    dispatch(populateProducts(normalizedProducts))
}

export default function reducer(state=initialState, action) {
    if (action.type === GET_PRODUCTS) {
        return action.products
    }

    return state
}
