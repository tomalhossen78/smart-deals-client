import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContest";
import Swal from "sweetalert2";

const Mybids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);
  // console.log("token", user.accessToken);
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBids(data);
        });
    }
  }, [user]);

  // useEffect(() => {
  //   if (user?.email) {
  //     fetch(`http://localhost:3000/bids?email=${user.email}`, {
  //       headers: {
  //         authorization: `Bearer ${user.accessToken}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setBids(data);
  //       });
  //   }
  // }, [user]);

  const handleDeleteBid = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Bid has been deleted.",
                icon: "success",
              });

              const remaingBids = bids.filter((bid) => bid._id !== _id);
              setBids(remaingBids);
            }
          });
      }
    });
  };
  return (
    <div>
      <h3 className="text-4xl font-bold text-center">
        MY bids : {bids.length}
      </h3>
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
                  <th>status</th>
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
                    <td>
                      <div className="badge badge-warning">{bid.status}</div>
                    </td>
                    <th>
                      <button
                        onClick={() => handleDeleteBid(bid._id)}
                        className="btn btn-outline btn-xs"
                      >
                        Remove Bids
                      </button>
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

export default Mybids;
