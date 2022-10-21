import { Select } from 'antd';

import { feedbackTypes } from '../constants';

const { Option } = Select;

function FeedbackTableSelect (props) {
  const { value, onSelect } = props;

  return (
    <Select value={value} onChange={onSelect} style={{ marginBottom: '15px'}}>
      <Option value={feedbackTypes.rating}>Rating example</Option>
      <Option value={feedbackTypes.sentiment}>Like/dislike example</Option>
      <Option value={feedbackTypes.suggestion}>Suggestion example</Option>
      <Option value={feedbackTypes.combined}>Combined feedback example</Option>
    </Select>
  );
}

export default FeedbackTableSelect;