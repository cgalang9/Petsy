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
            <h1>test</h1>
        </div>
    )
}

export default ItemDetailsPage
