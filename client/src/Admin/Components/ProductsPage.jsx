import { Card,Button,Select,Form} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useContext,  useRef} from "react";
import productContext from "../Context/ProductContext";
import { useState, useEffect } from "react";
import EditProductModal from './EditProductModal';
import "../../Shared/styles/productsPage.css"
import CategoriesContext from "../Context/CategoriesContext";

const { Meta } = Card;

export default function ProductsPage(props) {
    const { Option } = Select;
    const [form] = Form.useForm();


    const context = useContext(productContext);
    const categoryContext = useContext(CategoriesContext);
    const { categories} = categoryContext // destructuring
    const { products, productsHandler,getProducts, getProductsByCategory,deleteProduct} = context; // destructuring
    const [filteredproducts,setFilteredProducts]=useState([])
    // ---------- filter the categories to get the data of current category page (getting subCategories)------
    let filteredCategories=[];
    if(categories.length>0){
      filteredCategories = categories.filter((category) => category.category === props.productCategory);
      // console.log(filteredCategories[0]);
    }

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
      form.resetFields(['filter']);
        if (props.productCategory) {
          getProductsByCategory(props.productCategory);
        } else {
          getProducts();
        }
    }, [props.productCategory]);

    useEffect(()=>{
      setFilteredProducts(products)
    },[products])

    // useEffect(()=>{
    //   console.log(products);
    //   console.log(filteredproducts);
    // })

    const handleDelete = (productId) => {
      // Handle delete action here
      // console.log('Delete product:', productId);
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

    const onSelect=(value)=>{
      if(value){
        // console.log("if cond");
        const result=filterProductsBySubcategory(value)
        setFilteredProducts(result);
      }else{
        // console.log("else cond");
        setFilteredProducts(products);
      }
    }

    const filterProductsBySubcategory = (subcategory) => {
      const result = products.filter(product => product.productSubCategory === subcategory);
      return result;
    };

  return (
    <div className='product-wrapper'>
      <div className='filter-div'>
      <Form form={form}>
        <Form.Item name="filter">
          <Select
            className='filter-box'
            placeholder="Filter"
            style={{width: 150,}}
            allowClear
            onChange={onSelect}
          >
          {filteredCategories.length>0 && (
              filteredCategories[0].subCategories.map((subcategory, index) => (
                <Option key={index} value={subcategory}>{subcategory}</Option>
              ))
            )}
          </Select>
        </Form.Item>
      </Form>
      </div>
      <div className='product-grid'>
        {filteredproducts.length>0 && (filteredproducts.map((product) => (
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
          )))}

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
    </div>
  );
};

