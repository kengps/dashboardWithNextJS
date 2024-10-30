import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Result, Typography } from 'antd';
const { Paragraph, Text } = Typography;
const Failed = () => (
    <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrongfasdfa."
    extra={<Button type="primary">Back Home</Button>}
  />
);
export default Failed;