import React from 'react';
import { Button, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default function CartAmountToggle({ amount, setDecrease, setIncrease }) {
  return (
    <div >
      <div >
        <Space>
          <Button onClick={setDecrease} icon={<MinusOutlined />} size="small" />
          <div >{amount}</div>
          <Button onClick={setIncrease} icon={<PlusOutlined />} size="small" />
        </Space>
      </div>
    </div>
  );
}
