import { Card,Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useContext} from "react";
import productContext from "../Context/ProductContext";
import { useState, useEffect } from "react";
import EditProductModal from './EditProductModal';
import "../../Shared/styles/productsPage.css"
import CategoriesContext from "../Context/CategoriesContext";

const { Meta } = Card;

export default function ProductsPage(props) {
    const context = useContext(productContext);
    const categoryContext = useContext(CategoriesContext);
    const { categories} = categoryContext // destructuring
    const { products, getProducts, getProductsByCategory,deleteProduct} = context; // destructuring

    // const [modalVisible, setModalVisible] = useState(false);
    // const openModal = (product) => {
    //     setSelectedProduct(product);
    //     setModalVisible(true);
    // };

    // const closeModal = () => {
    //   setSelectedProduct(null);
    //   setModalVisible(false);
    // };

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // calling the getProducts
    useEffect(() => {
      
        if (props.productCategory) {
          getProductsByCategory(props.productCategory);
        } else {
          getProducts();
        }
      
    }, [props.productCategory]);

    const handleDelete = (productId) => {
      // Handle delete action here
      console.log('Delete product:', productId);
      deleteProduct(productId);
    };

    const openEditModal = (product) => {
      setSelectedProduct(product);
      setEditModalVisible(true);
    };
    const closeEditModal = () => {
      setSelectedProduct(null);
      setEditModalVisible(false);
    };

  return (
    
    <div className='product-grid'>
      {products.map((product) => (
            <Card
                className="product-card"
                key={product._id}
                hoverable
                style={{ width: 240}}
                cover={<img alt={product.productName} src={product.productImages[0]} style={{ marginTop: 0, height:200,objectFit: "cover" }} />}
                // onClick={() => openModal(product)}
                actions={[
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => openEditModal(product)}
                    >
                      Edit
                    </Button>,
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </Button>,
                  ]}
            >
            <Meta
                title={product.productName}
                description={product.productPrice}
                style={{ color: 'black', fontSize: '18px' }}
            />
            </Card>
        ))}

      {/* <ProductDetailsModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={closeModal}
      /> */}
      <EditProductModal
        visible={editModalVisible}
        product={selectedProduct}
        onClose={closeEditModal}
      />

    </div>
  );
};

