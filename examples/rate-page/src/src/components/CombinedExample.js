import React from 'react';
import { Card, Checkbox, Input, Button } from 'antd';

const { TextArea } = Input;

function CombinedExample(props) {
  const { data = { suggestion: '', reasons: [] }, onSubmit } = props;
  const [suggestion, setSuggestion] = React.useState(data.suggestion);
  const [reasons, setReasons] = React.useState(data.reasons);

  return (
    <Card title="Combined feedback example">
      <h2 style={{ textAlign: 'center' }}>Thank you for your feedback!</h2>
      <p>Please select the reason(s) for your feedback. The additional information you provide helps up improve our documentation:</p>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Checkbox.Group
          value={reasons}
          options={['Content is easy to follow', 'Solved my problem', 'Other']}
          onChange={(checkedValues) => setReasons(checkedValues)}
          style={{ display: 'flex', flexDirection: 'column', marginBottom: '15px' }}
        />
      </div>

      <TextArea value={suggestion} onChange={(e) => setSuggestion(e.target.value)} placeholder="Suggestions..." rows={4} />
      <Button disabled={!suggestion && !reasons.length} onClick={() => onSubmit(data.id, { suggestion, reasons })} shape="round" type="primary" size='large' style={{ marginTop: '15px' }}>
        Submit
      </Button>
    </Card>
  );
}

export default CombinedExample;