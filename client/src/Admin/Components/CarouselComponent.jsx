import React,{useState,useEffect} from "react";
import "../../Shared/styles/carouselComponent.css"

const CarouselComponent = ({ images }) => {
 

  useEffect(() => {
    const myDiv=document.getElementById("carouselExampleIndicators");
    if (images.length===0) {
      myDiv.classList.add('hidden');
    } else {
      myDiv.classList.remove('hidden');
    }
  });

  return (
    <div id="carouselExampleIndicators" className={'carousel slide'} data-ride="carousel">
      <ol className="carousel-indicators">
        {images.map((image, index) => (
          <li
            key={index}
            data-target="#carouselExampleIndicators"
            data-slide-to={index}
            className={index === 0 ? "active" : ""}
          ></li>
        ))}
      </ol>
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <img className="d-block w-100" src={image} alt={`Product ${index + 1}`} />
          </div>
        ))}
      </div>
      <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default CarouselComponent;
