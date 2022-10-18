const ApiKey = "637316bb60msh72029ce58a98a83p19d6d5jsnb9fefc607f61";

export function connectFeedbackApi(element) {
  element.addEventListener("click", async (event) => {
    const feedback = JSON.parse(window.localStorage.getItem("feedback"));

    const options = {
      method: feedback ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": ApiKey,
      },
      body: JSON.stringify({
        sentiment: event.target.value === "yes",
        userId: feedback?.userId,
        page: "vanilla-js example",
      }),
    };

    const response = await fetch(
      `https://feedback-api5.p.rapidapi.com/feedback${
        feedback?.id ? `/${feedback?.id}` : ""
      }`,
      options
    );

    if (response.status === 200 || response.status === 201) {
      const data = await response.json();

      window.localStorage.setItem("feedback", JSON.stringify(data));
      setActiveButton();
    }
  });
}

export function setActiveButton() {
  const feedback = JSON.parse(window.localStorage.getItem("feedback"));

  const buttons = Array.from(
    document.querySelector("#buttons-container").children
  );
  const firstButton = buttons[0];
  const secondButton = buttons[1];

  if (feedback) {
    if (feedback.sentiment) {
      firstButton.classList.add("active");
      secondButton.classList.remove("active");
    } else {
      firstButton.classList.remove("active");
      secondButton.classList.add("active");
    }
  }
}
