import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'

function ItemDetailsPage() {
    const { itemId } = useParams()


    return (
        <div id='items_details_page'>
            <h1>test</h1>
        </div>
    )
}

export default ItemDetailsPage
