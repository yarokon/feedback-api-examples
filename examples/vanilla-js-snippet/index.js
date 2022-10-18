(({ rapidApiKey, selector, context }) => {
  const container = document.querySelector(selector);

  container.innerHTML = `<div style="cursor:pointer;font-size: 20px;"><span>👍</span> <span>👎</span></div>`;

  container.addEventListener('click', async (event) => {
    const feedback = JSON.parse(window.localStorage.getItem('feedback'));

    const options = {
      method: feedback ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': rapidApiKey,
      },
      body: JSON.stringify({
        sentiment: event.target.alt === '👍',
        userId: feedback?.userId,
        ...context,
      }),
    };

    const response = await fetch(
      `https://feedback-api5.p.rapidapi.com/feedback${feedback?.id ? `/${feedback?.id}` : ''}`,
      options
    );

    if (response.status === 200 || response.status === 201) {
      const data = await response.json();

      window.localStorage.setItem('feedback', JSON.stringify(data));
    }
  });
})({
  rapidApiKey: '',
  selector: '',
  context: {},
});
