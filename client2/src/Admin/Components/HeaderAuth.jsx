import React from 'react';
import { Layout } from "antd";
import "../../Shared/styles/authForm.css";

const { Header } = Layout;

function HeaderAuth() {
  return (
    <Header>
      <div>
        <h2 className="logoText" style={{ marginBottom: "5px" }}>
          Business <span className="logo">Spot</span>
        </h2>
        <p style={{ marginLeft: "24px", color: "rgb(239, 239, 242)", fontSize: "14px",marginTop:"-22px" }}>Vision to Grow Better</p>
      </div>
    </Header>
  );
}

export default HeaderAuth;
