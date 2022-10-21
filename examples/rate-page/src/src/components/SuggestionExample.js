import React from 'react';
import { Card, Input, Button } from 'antd';

const { TextArea } = Input;

function SuggestionExample(props) {
  const { data = { suggestion: '' }, onSubmit } = props;
  const [suggestion, setSuggestion] = React.useState(data.suggestion);

  return (
    <Card title="Suggestion example">
      <h3>What can we improve?</h3>
      <TextArea value={suggestion} onChange={(e) => setSuggestion(e.target.value)} rows={3} />
      <Button disabled={!suggestion} onClick={() => onSubmit(data.id, { suggestion })} shape="round" type="primary" size='large' style={{ marginTop: '15px' }}>
        Submit
      </Button>
    </Card>
  );
}

export default SuggestionExample;