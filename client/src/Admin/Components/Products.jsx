import React, { useContext, useRef } from "react";
import ProductItem from "./ProductItem";
import productContext from "../Context/ProductContext";
import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { useCookies } from "react-cookie";
import "../../Shared/styles/productItem.css";


export default function Products(props) {
  const context = useContext(productContext);
  const { products, getProducts, getProductsByCategory, editProduct } = context; // destructuring

  const [cookies] = useCookies(["jwt"]);
  if (!props.isLoggedin && !cookies.jwt) {
    return <Navigate to="/login? You are not logged in. Please login first." />;
  }

  // calling the getProducts
  useEffect(() => {
    if (props.productCategory) {
      getProductsByCategory(props.productCategory);
    } else {
      getProducts();
    }
  }, [props.productCategory]);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [product, setProduct] = useState({
    id: "",
    productName: "",
    productPrice: 0,
    productDescription: "",
    productImages: null,
    productCategory: "",
  });

  const updateProduct = (currentProduct) => {
    ref.current.click();
    setProduct({
      id: currentProduct._id,
      productName: currentProduct.productName,
      productCategory: currentProduct.productCategory,
      productDescription: currentProduct.productDescription,
      productPrice: currentProduct.productPrice,
      productImages: currentProduct.productImages,
    });
  };

  const handleClick = (e) => {
    editProduct(product.id, product);
    refClose.current.click();
  };

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
      >
        Large modal
      </button>

      <div
        className="modal fade bd-example-modal-lg"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
        data-backdrop="false"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Product
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div>
                <div className="modal-body">
                  {" "}
                  <div className="row">
                    <div className="col-md-6">
                      <form onSubmit={handleClick}>
                        <div className="form-group">
                          <div className="label-and-span">
                            <label htmlFor="name">Name</label>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="productName"
                            value={product.productName}
                            onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <div className="label-and-span">
                            <label htmlFor="price">Price</label>
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            id="price"
                            name="productPrice"
                            value={product.productPrice}
                            onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <div className="label-and-span">
                            <label htmlFor="category">Category</label>
                          </div>

                          {/* <select className="form-control" id="category" name="productCategory" onChange={onChange}>
                    <option value="">Select Category</option>
                    {props.categoryList.map((category, index) => (
                      <option key={index} value={category.category}>{category.category}</option>
                    ))}
                  </select>  */}
                        </div>
                        <div className="form-group">
                          <div className="label-and-span">
                            <label htmlFor="image">Image</label>
                          </div>
                          <input
                            type="file"
                            name="productImages"
                            accept=".jpg, .jpeg, .png"
                            maxSize="3000000"
                            multiple
                            className="form-control-file"
                            id="image"
                            onChange={onChange}
                          />
                        </div>
                        <div className="form-group">
                          <div className="label-and-span">
                            <label htmlFor="description">Description</label>
                          </div>
                          <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            name="productDescription"
                            value={product.productDescription}
                            onChange={onChange}
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ marginRight: "10px" }}
                        >
                          Update Product
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2>{props.productCategory}</h2>
        <div className="row">
          {products.map((product) => {
            return (
              <ProductItem
                key={product._id}
                updateProduct={updateProduct}
                product={product}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
