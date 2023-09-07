/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Routes } from "react-router-dom";
import { Usercontext } from "../context/userContext";

const PrivateRoute = () => {
  const { user } = useContext(Usercontext);
  if (user && !user.auth) {
    return <>You do not have permisson to acess this route</>;
  }
  return (
    <>
      <Routes></Routes>
    </>
  );
};

export default PrivateRoute;
