import React from "react";
import { Link } from "react-router";

const Products = ({ product }) => {
  const { title, price_min, price_max, _id, image } = product;
  // console.log(_id);
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-4 pt-4">
        <img src={image} alt={title} className="rounded-xl" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-secondary font-bold text-xl">
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
