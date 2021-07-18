import React, { useEffect, useState } from "react";
import ProductItem from "./components/product/item";
import ActivarApp from "./components/activarApp";
import Api from "./services/api";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [validation, setValidation] = useState({ code: false, message: "" });
  useEffect(() => {
    // if (!Api.existToken) {
    //   Api.install();
    // }

    const fetchData = async () => {
      Api.setHeader();
      let response = await Api.products();
      setProducts(response.products);
      setValidation(response);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 className="display-4">Pricing</h1>
        <p className="lead">
          Quickly build an effective pricing table for your potential customers
          with this Bootstrap example. It’s built with default Bootstrap
          components and utilities with little customization.
        </p>
      </div>
      <div className="container">
        <div className="card-deck mb-3 text-center">
          {products ? (
            products.map((m) => <ProductItem key={m.id} item={m} />)
          ) : (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <br />
          {!products && <div className="row justify-content-md-center" ><ActivarApp /> </div>}
        </div>
      </div>
    </>
  );
};

export default Home;
