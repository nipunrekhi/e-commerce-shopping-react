import React, { useEffect, useState } from "react";
import "./checkoutsuccess.css";
import axios from "axios";
import { useGetUserProfileQuery } from "../../app/services/authService";

const CheckOutSuccess = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const { data } = useGetUserProfileQuery();
  useEffect(() => {
    setIsAnimated(true);
    axios.delete(`http://localhost:8089/delete/${data?.id}`).then((res) => {
      console.log(res);
    });
  }, [data]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap"
        rel="stylesheet"
      />
      <div className="card">
        <div className={`checkmark${isAnimated ? " animated" : ""}`}>✓</div>
        <h1 className="h1">Order Placed</h1>
        <p className="p">
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
      </div>
    </>
  );
};
const CheckOutError = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap"
        rel="stylesheet"
      />
      <div className="card">
        <div className={`checkmarked${isAnimated ? " animated" : ""}`}>X</div>
        <h1 className="h1">Error</h1>
        <p className="p">
          Payment Error
          <br /> we'll be in touch shortly!
        </p>
      </div>
    </>
  );
};

export { CheckOutSuccess, CheckOutError };
