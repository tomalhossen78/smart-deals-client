import React from "react";
import { Link } from "react-router";

const Products = ({ product }) => {
  const { title, price_min, price_max, _id } = product;
  // console.log(_id);
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-4 pt-4">
        <img
          src="https://www.mobiledokan.com/media/apple-iphone-17-pro-max-cosmic-orange-official-image.webp"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>
          Price : {price_min} BDT - {price_max} BDT
        </p>
        <div className="card-actions">
          <Link
            to={`/productDetails/${_id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
