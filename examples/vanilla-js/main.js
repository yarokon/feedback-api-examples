import { connectFeedbackApi, setActiveButton } from './utils.js';

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Do you like using our Feedback API?</h1>
    
    <div id="buttons-container">
      <button type="button" value="yes">Yes 😍</button>
      <button type="button" value="no">No 🤪</button>
    </div>
  </div>
`;

connectFeedbackApi(document.querySelector('#buttons-container'));
setActiveButton();

