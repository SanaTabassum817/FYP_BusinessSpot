import React , { useContext, useRef }  from 'react';
import productContext from "../Context/ProductContext";
import { Modal, Row, Col, Form, Input,InputNumber, Button, Carousel} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import "../../Shared/styles/productImageCarousel.css"

const EditProductModal = ({ visible, onClose, onSave, product }) => {
  const context = useContext(productContext);
  const {editProduct } = context;
  console.log(product);

  if (!product) {
    return null; // Return null if product is null
  }

  const [form] = Form.useForm();
  const carouselRef = useRef(null);

  const handleSave = () => {
    form.validateFields().then((values) => {
      //onSave({ ...product, ...values });
      editProduct(product._id, { ...product, ...values });
      form.resetFields();
      onClose()
    });
  };

  const renderSubcategoryField = () => {
    const hasSubcategory = product.productSubCategory && product.productSubCategory!="null" &&product.productSubCategory!='';
    console.log(hasSubcategory);
    if (hasSubcategory) {
      return (
        <Form.Item name="productSubCategory" noStyle>
          <Input disabled />
        </Form.Item>
      );
    }
    return null;
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };
  

  

  return (
    <Modal open={visible} onCancel={onClose} onOk={handleSave} okText="Save" title="Edit Product">
      <Form form={form} initialValues={product}>
        <Form.Item label="Product Name" name="productName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Price"
          name="productPrice"
          rules={[{ required: true }]}
        >
          <InputNumber
            type="number"
            min={0}
            step={0.01}
            precision={0}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Category" name="productCategory">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            {renderSubcategoryField()}
          </Col>
        </Row>
        <Form.Item label="Product Description" name="productDescription" rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Product Images" name="productImages">
        <div className='carousel-wrapper'>
          <Carousel className='proviewImageCarousel' dotPosition="bottom" ref={carouselRef} >
              {product.productImages.map((image,index) => (
                
                  <img key={index} alt={product.productName} src={image} />
                
              ))}
          </Carousel>
          <div className="custom-carousel-buttons">
              <Button
                className="custom-carousel-button prev-button"
                icon={<LeftOutlined />}
                onClick={handlePrev}
              />
              <Button
                className="custom-carousel-button next-button"
                icon={<RightOutlined />}
                onClick={handleNext}
                style={{ marginLeft: "10px"}}
              />
          </div>
        </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
