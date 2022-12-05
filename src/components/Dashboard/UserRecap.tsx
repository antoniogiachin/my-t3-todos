import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slicers/userSlice";
import { UserCard } from "./DashboardCards/UserCard";

export const UserRecap = () => {
  return (
    <article className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {/* USER INFOS  */}
      <UserCard />
      {/* todo recap  */}
      {/* <div className="card bg-base-100 shadow-xl lg:card-side">
        <figure>
          <Image
            src={sessionUser.image}
            width={100}
            height={100}
            alt={sessionUser.name + "-profile-pic"}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{sessionUser.name}</h2>
          <p>{sessionUser.email}</p>
          {/* <div className="card-actions justify-end">
            <button className="btn-primary btn">Listen</button>
          </div> 
        </div>
      </div>*/}
      {/* actions recap  */}
      {/*  <div className="card bg-base-100 shadow-xl md:col-span-2 lg:col-span-1 lg:card-side">
        <div className="card-body">
          <h2 className="card-title">{sessionUser.name}</h2>
          <p>{sessionUser.email}</p>
           <div className="card-actions justify-end">
            <button className="btn-primary btn">Listen</button>
          </div> 
        </div>
      </div> 
    */}
    </article>
  );
};
