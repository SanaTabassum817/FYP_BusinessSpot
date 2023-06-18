import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, YoutubeOutlined, LinkedinOutlined, TwitterOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Home = () => {
  const [businessData, setBusinessData] = useState([]);

  const fetchBusinessData = async () => {
    try {
      console.log("Sending request to getBusinessInfo backend");
      const response = await axios.get('http://localhost:8000/getBusinessInfo', { withCredentials: true });
      console.log("response from backend:", response.data);
      setBusinessData(response.data[0]); // Use the first array item as business data
    } catch (error) {
      console.log("Error occurred:", error);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBusinessData();
  }, []);

  console.log("returning backend");

  return (
    <div className="container" >
      <Card
        className="card"
        style={{marginTop:"50px",marginLeft:"50px",border:"2px"}}
        cover={businessData.logoImage && <img alt="Logo" src={businessData.logoImage} />}
      >
         
        <Meta title={businessData.businessName} description={businessData.businessDescription} />
        <div className="details">
          {businessData.businessTagline && <p>Tagline: {businessData.businessTagline}</p>}
          {businessData.businessEmail && <p><MailOutlined /> Email: {businessData.businessEmail}</p>}
          {businessData.businessAddress && <p><EnvironmentOutlined /> Address: {businessData.businessAddress}</p>}
          {businessData.bContactNumber && <p><PhoneOutlined /> Contact Number: {businessData.bContactNumber}</p>}
          <p>Social Media:</p>
          {businessData.youtube && <p><YoutubeOutlined /> YouTube: {businessData.youtube}</p>}
          {businessData.linkedIn && <p><LinkedinOutlined /> LinkedIn: {businessData.linkedIn}</p>}
          {businessData.twitter && <p><TwitterOutlined /> Twitter: {businessData.twitter}</p>}
          {businessData.instagram && <p><InstagramOutlined /> Instagram: {businessData.instagram}</p>}
          {businessData.facebook && <p><FacebookOutlined /> Facebook: {businessData.facebook}</p>}
        </div>
      </Card>
    </div>
  );
};

export default Home;
