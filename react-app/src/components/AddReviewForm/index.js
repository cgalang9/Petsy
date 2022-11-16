import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { addItemReviewThunk } from '../../store/itemReviews'

function AddReviewForm() {
    const { itemId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    //Set name, price and description from passed down data from parent if available
    const [rating, setRating] = useState(1)
    const [text, setText] = useState("")
    const [errors, setErrors] = useState([])

    useEffect(() => {}, [errors])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const review = {
            rating,
            text
        }

        setErrors([]);

        try {
            const data = await dispatch(addItemReviewThunk(itemId, review))
            console.log(data)
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
        <form id='add_reivew_form' onSubmit={handleSubmit}>
            <title>Add Your Review</title>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                <span>Rating</span>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                    min={1}
                    max={5}
                />
            </label>
            <label>
                <span>Text: </span>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                    minLength={1}
                    maxLength={255}
                />
            </label>
            <button>Add Review</button>
        </form>
    )
}

export default AddReviewForm
