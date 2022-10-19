# Embedding the Feedback API snippet into your blog site

1. Add a div container with some ID for every page where you want to collect a feedback from users. Example `<div id="feedback-container"></div>`.
2. Insert the snippet into the HTML file.
3. Fill in the config object with your `rapidApiKey` and `selector` of the container where feedback component will be inserted.
4. Optionally you can change the text of the template.

Now your blog will collect feedback, and you can check them all by executing `getFeedback` from your portal and filter them by context.

![feedback-exampl](images/feedback-example.png)
