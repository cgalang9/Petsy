import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./listproduct.css"
import { postItemThunk } from "../../store/itemPage";

const ListProductForm = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [urls, setUrls] = useState("");
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        let errorsArr = []
        let parsedPrice = parseFloat(price)
        let urlArr = urls.split(/\r?\n/)

        const validateUrl = (urls) => {
            let check = true
            urls.forEach(url => {
                if (!url || !url.includes('.') || url.length > 2048) check = false
            });
            return check
        }

        if (!(name && description && price)) errorsArr.push("All fields must be filled out")
        if (name && name.length > 75) errorsArr.push("Product name must be less than 50 characters")
        if (description && description.length > 2000) errorsArr.push("Product description must be less than 255 characters")
        if (price && (!parsedPrice || !Number(price) || parsedPrice <= 0)) errorsArr.push('Price must be a positive number')
        if (urls && !validateUrl(urlArr)) errorsArr.push('Each image must have a valid url seperated by a new line')

        setErrors(errorsArr)
    }, [name, description, price, urls])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (errors.length) {
            setSubmitted(true)
            return
        }

        let urlStr = urls.split(/\r?\n/).join(', ')

        let payload = {
            name,
            description,
            price,
            images_urls: urlStr
        }

        const item = await dispatch(postItemThunk(payload))
        console.log(item)
        // history.push(`/items/${item.id}`)
    }

    return (
        <div className="list-product-form-wrapper">
            <form onSubmit={handleSubmit} className='list-product-form'>
                <h1>List your product</h1>
                {errors.length > 0 && submitted && <ul className="list-product-form-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                <div className='list-product-input-wrapper'>
                    <label className='list-product-input-label'>
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='list-product-form-input'
                    />
                </div>
                <div className='list-product-input-wrapper'>
                    <label className='list-product-input-label'>
                        Price
                    </label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        className='list-product-form-input'
                    />
                </div>
                <div className='list-product-input-wrapper'>
                    <label className='list-product-input-label'>
                        Description
                    </label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className='list-product-form-input'
                    />
                </div>
                <div className='input-wrapper'>
                    <label className='input-label'>Image urls (one per line)</label>
                    <textarea
                        className='form-input'
                        onChange={e => setUrls(e.target.value)}
                        value={urls}
                    />
                </div>
                <div className='input-wrapper'>
                    <button className='submit-button'>Post product</button>
                </div>
            </form>
        </div>
    )
}

export default ListProductForm
