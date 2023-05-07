import React from "react";
import { useContext } from "react";
import productContext from "../Context/ProductContext";
import "../../Shared/styles/productItem.css"

const ProductItem = (props) => {

  const context = useContext(productContext);
  const { deleteProduct } = context; // destructuring
  const { product, updateProduct } = props;

  return (
    <div className="col-sm-4">
      <div className="card my-3" style={{ height: "270px", width: "230px" }}>
        <img className="card-img-top" src={product.productImages} alt="" style={{ height: "70%" }} />
        <div className="card-body">
          <div className="row">
            <div className="col-9">
              <h5 className="card-title">{product.productName}</h5>
            </div>
            <div className="col-3 d-flex justify-content-end">
              <i className="fa-solid fa-pen-to-square mx-2  " onClick={() => { updateProduct(product); }}></i>
              <i className="fa-solid fa-trash mx-2   " onClick={() => { deleteProduct(product._id); }}></i>
            </div>
          </div>
          <span className="card-text small"><strong>Price:</strong> {product.productPrice}</span><br />
          <span className="card-text small"><strong>Category:</strong> {product.productCategory}</span><br />
          <span className="card-text small"><strong>Description:</strong> {product.productDescription}</span>
        </div>
      </div>
    </div>

  );
};

export default ProductItem;
