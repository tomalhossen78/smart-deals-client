import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Context/AuthContest";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const product = useLoaderData();
  const { _id: productId } = product;
  // console.log("product is ", product);
  const [bids, setBids] = useState([]);
  const bidModalRef = useRef(null);
  const { user } = use(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`, {
      headers: {
        authorization: `Bearer ${user?.accessToken} `,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this products", data);
        setBids(data);
      });
  }, [productId, user]);
  // console.log(product);
  const handlebidModalsOpen = () => {
    bidModalRef.current.showModal();
  };
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const bid = form.bid.value;
    // console.log(_id, name, email, bid);
    const newBid = {
      buyer_name: name,
      buyer_image: user?.photoURL,
      buyer_email: email,
      bid_price: bid,
      status: "pending",
      product: productId,
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bids Added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          //add the new bid to the state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
      });
  };

  return (
    <div>
      {/*product info */}
      <div></div>
      <div>
        <button onClick={handlebidModalsOpen} className="btn btn-primary">
          I want to Buy this Product
        </button>
        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give the best offer!</h3>
            <p className="py-4">Offet something seller can not resist</p>
            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  defaultValue={user?.displayName}
                  readOnly
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  defaultValue={user?.email}
                  readOnly
                />
                {/* bids amout */}
                <label className="label">Bid</label>
                <input
                  type="number"
                  className="input"
                  name="bid"
                  placeholder="your bids"
                />
                <button className="btn btn-neutral mt-4">Place Your bid</button>
              </fieldset>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-primary">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* bid for this products */}
      <div>
        <h3 className="text-3xl">
          Bids for this Products :{" "}
          <span className="text-primary">{bids.length}</span>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>SL. NO.</th>
                  <th>Buyer Name</th>
                  <th>Buyer Email</th>
                  <th>Bid Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {bids.map((bid, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{bid.buyer_name}.</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {bid.buyer_email}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        Desktop Support Technician
                      </span>
                    </td>
                    <td>{bid.bid_price}</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">details</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </h3>
      </div>
    </div>
  );
};

export default ProductDetails;
