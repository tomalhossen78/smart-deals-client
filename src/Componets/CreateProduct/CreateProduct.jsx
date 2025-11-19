import React, { useState } from "react";
import Container from "../Container/Container";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const [condition, setCondition] = useState("Brand New");
  const [cat, setCat] = useState("Vehicles");
  const [products, setProducts] = useState([]);
  const handleChange = (e) => {
    setCondition(e.target.value);
  };
  const handleCatChange = (e) => {
    setCat(e.target.value);
  };
  const handleAddproduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const usage = form.usage.value;
    const image = form.image.value;
    const seller_name = form.seller_name.value;
    const seller_image = form.seller_image.value;
    const location = form.location.value;
    const description = form.description.value;
    const newProduct = {
      title,
      cat,
      usage,
      image,
      seller_name,
      seller_image,
      location,
      description,
      condition,
    };
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Products Added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          newProduct._id = data.insertedId;
          const newProducts = [...products, newProduct];
          setProducts(newProducts);
          form.reset();
        }
      });
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="w-4xl mx-auto">
        <h1 className="text-4xl font-bold pt-4 text-center">
          Create a <span className="text-primary">Product</span>
        </h1>
        <form
          onSubmit={handleAddproduct}
          className="bg-white p-10 m-4 grid grid-cols-2 gap-x-6"
        >
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              type="text"
              name="title"
              className="input w-full"
              placeholder="e.g. Yamaha Fz Guitar for Sale"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Category</legend>
            <select className="select" value={cat} onChange={handleCatChange}>
              <option disabled={true}>Select a Category</option>
              <option>Vehicles</option>
              <option>Electronics</option>
              <option>Computers</option>
              <option>Furniture</option>
              <option>Furniture</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Min Price You want to Sale ($)
            </legend>
            <input
              name="price_min"
              type="text"
              className="input w-full"
              placeholder="e.g. 18.5"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Max Price You want to Sale ($)
            </legend>
            <input
              name="price_max"
              type="text"
              className="input w-full"
              placeholder="e.g. 18.5"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Product Condition</legend>
            <div className="flex gap-2">
              <div className="flex items-center justify-center gap-1">
                <input
                  type="radio"
                  name="condition"
                  className="radio radio-primary"
                  value="Brand New"
                  // defaultChecked
                  checked={condition === "Brand New"}
                  onChange={handleChange}
                />
                <h1>Brand New</h1>
              </div>
              <div className="flex items-center justify-center gap-1">
                <input
                  type="radio"
                  name="condition"
                  className="radio radio-primary"
                  value="Old"
                  checked={condition === "Old"}
                  onChange={handleChange}
                />
                <h1>Old</h1>
              </div>
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Product Usage time</legend>
            <input
              name="usage"
              type="text"
              className="input w-full"
              placeholder="e.g. 1 year 3 month "
            />
          </fieldset>
          <fieldset className="fieldset col-span-2">
            <legend className="fieldset-legend">Your Product Image URL</legend>
            <input
              name="image"
              type="text"
              className="input w-full"
              placeholder="https://..."
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Seller Name</legend>
            <input
              name="seller_name"
              type="text"
              className="input w-full"
              placeholder="e.g. Artisan Roasters"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Seller Email</legend>
            <input
              name="email"
              type="text"
              className="input w-full"
              placeholder="leli31955@nrlord.com"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Seller Contact</legend>
            <input
              name="seller_contact"
              type="text"
              className="input w-full"
              placeholder="e.g. +1-555-1234"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Seller Image URL</legend>
            <input
              name="seller_image"
              type="text"
              className="input w-full"
              placeholder="https://..."
            />
          </fieldset>
          <fieldset className="fieldset col-span-2">
            <legend className="fieldset-legend">Location</legend>
            <input
              name="location"
              type="text"
              className="input w-full"
              placeholder="City, Country"
            />
          </fieldset>
          <fieldset className="fieldset col-span-2">
            <legend className="fieldset-legend">
              Simple Description about your Product
            </legend>
            <textarea
              type="text"
              name="description"
              className="input w-full"
              placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning
 guitar is so tough..... ................"
            />
          </fieldset>
          <button
            type="sumbit"
            className="btn btn-primary w-full col-span-2 my-4 text-xl p-6"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
