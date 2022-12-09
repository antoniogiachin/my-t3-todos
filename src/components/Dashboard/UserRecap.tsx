import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks/hooks";
import { SET_MODAL } from "../../store/slicers/modalSlice";
import { getUser } from "../../store/slicers/userSlice";
import { TheButton } from "../UI/TheButton";
import { UserCard } from "./DashboardCards/UserCard";

export const UserRecap = () => {
  const dispatch = useAppDispatch();

  const showAddListModal = () => {
    dispatch(
      SET_MODAL({
        id: "add-new-list",
        header: "Add new List",
        content: "<>Hello</>",
      })
    );
  };

  const showSecondAddListModal = () => {
    dispatch(
      SET_MODAL({
        id: "add-new-lister",
        header: "Add new listee",
        content: "<>Hello</>",
      })
    );
  };

  return (
    <article className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {/* USER INFOS  */}
      <UserCard />
      <div></div>
      <div className="flex justify-end">
        <TheButton
          label="Add new List"
          isModalHanlder={true}
          funcToExecute={showAddListModal}
        />
        <TheButton
          label="Add new Listereee"
          isModalHanlder={true}
          funcToExecute={showSecondAddListModal}
        />
      </div>
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
