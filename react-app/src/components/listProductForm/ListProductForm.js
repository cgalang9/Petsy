import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./listproduct.css";
import { postItemThunk } from "../../store/itemPage";
import AWS from "aws-sdk";

const ListProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [urls, setUrls] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [imgs, setImgs] = useState([]);
  const [imgsUploaded, setImgsUploaded] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
  }, [user]);

  useEffect(() => {
    let errorsArr = [];
    let parsedPrice = parseFloat(price);

    if (!(name && description && price))
      errorsArr.push("All fields must be filled out");
    if (name && name.length > 75)
      errorsArr.push("Product name must be less than 75 characters");
    if (description && description.length > 2000)
      errorsArr.push("Product description must be less than 255 characters");
    if (price && (!parsedPrice || !Number(price) || parsedPrice <= 0))
      errorsArr.push("Price must be a positive number");

    setErrors(errorsArr);
  }, [name, description, price]);

  const uploadImgs = async (e) => {
    e.preventDefault();
    setUrls("");

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    });

    let newUrls = [];
    let count = 1;
    for (let i = 0; i < imgs.length; i++) {
      const imgFile = imgs[i];

      var upload = new AWS.S3.ManagedUpload({
        params: {
          Body: imgFile,
          Bucket: "thebnb",
          Key: imgFile.lastModified + imgFile.name,
        },
      });

      var promise = upload.promise();
      setImgsUploaded(`Uploading... ${count} of ${imgs.length}`);
      await promise.then(
        function (data) {
          newUrls.push(data.Location);
          count++;
          if (count >= imgs.length) {
            setImgsUploaded("Upload Complete");
            alert("Successfully uploaded photos.");
          } else {
            setImgsUploaded(`Uploading... ${count} of ${imgs.length}`);
          }
        },
        function (err) {
          setImgsUploaded("Error");
          return alert(
            "There was an error uploading your photo: ",
            err.message
          );
        }
      );
    }
    newUrls = newUrls.join(",");
    setUrls(newUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imgsUploaded === "Error")
      return alert(
        "There was an error uploading your image. Please upload again."
      );
    if (imgsUploaded !== "Upload Complete")
      return alert(
        "Please wait for images to finish uploading before submitting"
      );

    if (!urls) return alert("Image required. Please upload an image");
    if (errors.length) {
      setSubmitted(true);
      return;
    }

    let payload = {
      name,
      description,
      price,
      images_urls: urls,
    };

    const item = await dispatch(postItemThunk(payload));
    history.push(`/items/${item.id}`);
  };

  return (
    <div className="list-product-form-wrapper">
      <form onSubmit={handleSubmit} className="list-product-form">
        <h1>List your product</h1>
        {errors.length > 0 && submitted && (
          <ul className="list-product-form-errors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={1}
            maxLength={75}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min={0.01}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            minLength={1}
            maxLength={2000}
          />
        </div>
        <div style={{ display: "flex" }}>
          <label>Upload Images</label>
          <input
            id="input_file"
            type="file"
            onChange={(e) => setImgs(e.target.files)}
            multiple
            accept="image/*"
            required
          />
          {imgs.length > 0 && (
            <button type="button" className="upload_img" onClick={uploadImgs}>
              Upload Image
            </button>
          )}
          <div className="upload_prog">{imgsUploaded}</div>
        </div>
        <button type="submit">Post product</button>
      </form>
      <button className="cancel-btn" onClick={() => history.push(`/`)}>
        Cancel
      </button>
    </div>
  );
};

export default ListProductForm;
