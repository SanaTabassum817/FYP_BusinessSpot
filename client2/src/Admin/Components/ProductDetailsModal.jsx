import React from 'react';
import { Modal, Carousel, Row, Col } from 'antd';

const ProductDetailsModal = ({ visible, product, onClose }) => {
    if (!product) {
        return null; // Return null if product is null
    }
  const { productName, productPrice, productCategory, productSubCategory,productDescription, productImages } = product;

  const responsiveLayout = window.innerWidth < 576; // Check if screen size is smaller

  const carouselContent = (
    <Carousel autoplay>
      {productImages.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Product ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );

  const modalContent = (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        {carouselContent}
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <h2>{productName}</h2>
        <p>Price: {productPrice}</p>
        <p>Category: {productCategory}</p>
        <p>Subcategory: {productSubCategory}</p>
        <p>Description: {productDescription}</p>
      </Col>
    </Row>
  );

  return (
    <Modal
      title="Product Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={responsiveLayout ? '100%' : 800}
    >
      {responsiveLayout ? (
        <>
          {carouselContent}
          <br />
          {modalContent}
        </>
      ) : (
        modalContent
      )}
    </Modal>
  );
};

export default ProductDetailsModal;
