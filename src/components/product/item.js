import React, { useContext, useState } from "react";
const renderHTML = (rawHTML: string) =>
  React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const ProductItem = ({ item }) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{item.title}</h4>
      </div>
      <div className="card-body">
        {item.image?.src && <img src={item.image.src} className="img-fluid" />}
        <h1 className="card-title pricing-card-title">
          ${item.variants[0].price}
        </h1>
        <div>{renderHTML(item.body_html)}</div>
        <button
          type="button"
          className="btn btn-lg btn-block btn-outline-primary"
        >
          Buy
        </button>
      </div>
    </div>
  );
};
export default ProductItem;
