import { useState } from 'react'
import { useLocation } from 'react-router-dom'

function EditItemForm() {
    const location = useLocation()
    const {item} = location.state

    const [name, setName] = useState(item.name)
    const [price, setPrice] = useState(item.price)
    const [description, setDescription] = useState(item.description)

    return (
        // <h1>test</h1>
        <form id='edit_item_form'>
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
                    min={1}
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

            <button type="submit">Confirm Changes</button>
        </form>
    )
}

export default EditItemForm
