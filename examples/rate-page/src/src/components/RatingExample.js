import React from 'react';
import { Card, Rate } from 'antd';

function RatingExample(props) {
  const { data = { rating: 0 }, onSubmit } = props;

  return (
    <Card title="Rating example">
      <blockquote><i>What did the ocean say to the beach? Nothing, it just waved.</i></blockquote>
      <Rate value={data.rating} onChange={(rating) => onSubmit(data.id, { rating })} />
    </Card>
  );
}

export default RatingExample;