import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { editItemThunk, getItemDetailsThunk } from '../../store/itemPage'

function EditItemForm() {
    const { itemId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const sessionUser = useSelector(state => state.session.user)

    //Sends user to error page if he is not seller of product
    if (location.state) {
        if (location.state.sellerId != sessionUser.id) history.push('/403')
    }

    //Set name, price and description from passed down data from parent if available
    const [name, setName] = useState(location.state ? location.state.name : "")
    const [price, setPrice] = useState(location.state ? location.state.price : 0)
    const [description, setDescription] = useState(location.state ? location.state.description : "")
    const [errors, setErrors] = useState([])

    //If not data passed down from parent, fetches item data from item id
    let item = {}
    if (!location.state) {
        (async () => {
            item = await dispatch(getItemDetailsThunk(itemId))

            //Sends user to error page if he is not seller of product
            if(item.sellerId!= sessionUser.id) history.push('/403')

            await setName(item.name)
            await setPrice(item.price)
            await setDescription(item.description)
        })()
    }

    useEffect(() => {}, [errors])




    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedItem = {
            name,
            price,
            description
        }

        setErrors([]);

        try {
            const data = await dispatch(editItemThunk(updatedItem, itemId))
            if (data.errors) {
                await setErrors(data.errors);
            } else {
                history.push(`/items/${itemId}`)
            }
        } catch (res) {
            history.push('/404')
        }
    }

    return (
        <form id='edit_item_form' onSubmit={handleSubmit}>
            <title>Edit Your Item</title>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                <span>Item Name: </span>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={1}
                    maxLength={75}
                />
            </label>
            <label>
                <span>Price: </span>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min={0.01}
                />
            </label>
            <label>
                <span>Description: </span>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    minLength={1}
                    maxLength={2000}
                />
            </label>
            <button>Confirm Changes</button>
        </form>
    )
}

export default EditItemForm
