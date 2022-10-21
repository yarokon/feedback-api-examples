import { Col, Rate, Row, Statistic } from 'antd';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { feedbackTypes } from '../constants';

function FeedbackStatistic(props) {
  const { type, total, overallRating, sentimentTotal } = props;

  const getStatistics = () => {
    if (type === feedbackTypes.rating) {
      return (
        <Col>
          <div className="ant-statistic-title">Average rating:</div>
          <Rate value={overallRating} disabled defaultValue={0} />
        </Col>
      )
    } else if (type === feedbackTypes.sentiment) {
      return (
        <>
          <Col><Statistic title="Yes" value={sentimentTotal} prefix={<LikeOutlined />} style={{ marginRight: 20 }} valueStyle={{ color: '#3f8600' }} /></Col>
          <Col><Statistic title="No" value={isNaN(total - sentimentTotal) || -1 ? 0 : (total - sentimentTotal)} prefix={<DislikeOutlined />} valueStyle={{ color: '#F81E22' }} /></Col>
        </>
      )
    } else {
      return null;
    }
  }

  return (
    <Row style={{ marginBottom: 20 }}>
      <Col style={{ marginRight: 80 }}>
        <Row>
          <Statistic title="Total responses:" value={total} style={{ marginRight: '40px' }} />
          <Statistic title="New:" value={props.newCount} valueStyle={{ color: '#3f8600' }} />
        </Row>
      </Col>
      {getStatistics()}
    </Row>
  )
}

export default FeedbackStatistic;