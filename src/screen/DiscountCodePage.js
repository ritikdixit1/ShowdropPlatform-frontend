import React from "react";
import { useLocation } from "react-router-dom";
import "../style/DiscountCodePage.css";

const DiscountCodePage = () => {
  const location = useLocation();
  const { discountCode } = location.state || {};

  return (
    <div className="discount-code-page">
      <header className="header">
        <h1>Your Discount Code</h1>
        <p>Thank you for signing up! Here's your discount code.</p>
      </header>

      <div className="discount-code">
        {discountCode ? (
          <div>
            <p>{discountCode}</p>
          </div>
        ) : (
          <p>Oops something went wrong!</p>
        )}
      </div>
    </div>
  );
};

export default DiscountCodePage;
