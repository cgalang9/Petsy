import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { addItemReviewThunk } from '../../store/itemReviews'
import './AddReviewForm.css'

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
        <div id='add_reivew_form-wrapper'>
            <form id='add_reivew_form' onSubmit={handleSubmit}>
                <h1>Add Your Review</h1>
                <div className='errors'>
                    {errors.errors && (errors.errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    )))}
                </div>
                <div>
                    <label>Rating</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                        min={1}
                        max={5}
                    />
                </div>
                <div>
                    <label>Review</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        minLength={1}
                        maxLength={255}
                    />
                </div>
                <button type='submit'>Add Review</button>
            </form>
        </div>
    )
}

export default AddReviewForm
