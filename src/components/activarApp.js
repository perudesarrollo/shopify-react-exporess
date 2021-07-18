import React from "react";
import Api from './../services/api';
const ActivarApp = () => {
  return (
    <div className="col col-lg-5">
      <div className="alert alert-warning text-center" role="alert">
        <strong>Ups!</strong> Esta aplicación no tiene autorización.
        <button type="button" onClick={Api.install} className="btn btn-link btn-outline-primary mt-3">
          Autorizar Aplicación
        </button>
      </div>
    </div>
  )
}
export default ActivarApp;