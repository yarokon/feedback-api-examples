import React from 'react';
import { Card, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

function LikeDislikeExample(props) {
  const { data = { sentiment: undefined }, onSubmit } = props;

  return (
    <Card title="Like / dislike example" className="sentiment-example-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ marginBottom: 0 }}>Was this page helpful?</h3>
        <div style={{ display: 'flex' }}>
          <Button
            onClick={() => onSubmit(data.id, { sentiment: true })}
            shape="round"
            type="primary"
            className={data.sentiment === true ? 'active' : ''}
            icon={<CheckOutlined /> }
            size='large'
            style={{ marginRight: '10px' }}
          >
            Yes
          </Button>

          <Button
            onClick={() => onSubmit(data.id, { sentiment: false })}
            className={data.sentiment === false ? 'active' : ''}
            shape="round"
            type="primary"
            icon={ <CloseOutlined /> }
            size='large'
          >
            No
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default LikeDislikeExample;