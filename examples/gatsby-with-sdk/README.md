# Gatsby Blog with JS SDK

**Demo** - https://gatsbyblogmain41640.gatsbyjs.io/   
**Repo** - https://github.com/iosypov/gatsby-blog

Sample gatsby blog with using SDK [`blips-and-chitz-feedback-api-sdk`](https://www.npmjs.com/package/blips-and-chitz-feedback-api-sdk) for like/dislike blog post.
Created on gatsby starter blog.

You an use this tutorial not only for gatsby portal, you can use on every ReactJS Application.


# Tutorial 

In this example we will create blog on gatsby and added Like, Dislike functionality to our blog posts. For using `Feedback API` we will install SDK [`blips-and-chitz-feedback-api-sdk`](https://www.npmjs.com/package/blips-and-chitz-feedback-api-sdk).

## Credentials

First we should create `credentials` for `Feedback API`. If you has already you can skip.

1. Open [Feedback API Portal](https://rapidapi.com/blips-and-chitz-blips-and-chitz-default/api/feedback-api5)
1. Choose `Credentials` Section > `createCredentials`.
1. Click `Test Endpoint`
1. In response you will receive `privateKey`. Store this key.

## Create blog
We will create simple blog in gatsby. 

For this we need install `gatsby-cli`.

```
npm i -g gatsby-cli
```

After that create blog with following comand:

```
npx gatsby new gatsby-starter-blog https://github.com/gatsbyjs/gatsby-starter-blog
```

## Integration

### Custom hook
Lets integrate `Feedback API` to our blog.  
Create custom hook `useFeedbackApi` in `src/hooks/useFeedbackApi`. In this hook we will use SDK.

Install SDK:

```
npm i blips-and-chitz-feedback-api-sdk
```

You should add your `RapidAPIKey` from [Feedback API portal](https://rapidapi.com/blips-and-chitz-blips-and-chitz-default/api/feedback-api5).

```js
import { Client, FeedbackController } from "blips-and-chitz-feedback-api-sdk"
const client = new Client({
  timeout: 0,
  xRapidAPIKey: "RapidAPIKey",
})
const publicController = new FeedbackController(client)
function useFeedbackApi() {
  async function save(feedback, sentiment, page) {
    let resp
    if (feedback && feedback.id) {
      resp = await publicController.updateFeedbackById(feedback.id, {
        sentiment,
        page,
        tags: ["sample-blog"],
      })
    } else {
      resp = await publicController.createFeedback({
        sentiment,
        page,
        tags: ["sample-blog"],
      })
    }

    return resp.result
  }
  return { save }
}

export default useFeedbackApi

```

As you can see we import `blips-and-chitz-feedback-api-sdk`.  
We use `createFeedback` for create feedback, if feedback has not created. And `updateFeedbackById` when feedback has already created.  
Tag `sample-blog` is tag for this project. We can simply filter by this tag in admin panel.

Documentation about all method in SDK you can see [here](https://iosypov.github.io/feedback-api-sdk/).

### Like component

Now we will create our component this thumb up and thumb down. I will use icons from [`react-icons`](https://react-icons.github.io/).

```
npm i react-icons
```

And create component `Like` in `src/components/like`

```js
import React, { useEffect, useState } from "react"

import { BiLike, BiDislike } from "react-icons/bi"

import useFeedbackApi from "../hooks/useFeedbackApi"

const Like = ({ page }) => {
  const feedbackApi = useFeedbackApi()
  const [feedback, setFeedback] = useState(null)
  const handleLikeClick = React.useCallback(
    async like => {
      const result = await feedbackApi.save(feedback, like, page)
      setFeedback(result)
      localStorage.setItem(`${page}_feedback`, JSON.stringify(result))
    },
    [feedbackApi, feedback, page]
  )
  useEffect(() => {
    setFeedback(JSON.parse(localStorage.getItem(`${page}_feedback`)) ?? null)
  }, [page])
  return (
    <div style={{ display: "flex", flexDirection: "row", fontSize: "20px" }}>
      <div
        style={{
          paddingRight: "10px",
          color: feedback && feedback.sentiment ? "blue" : "black",
          cursor: "pointer",
        }}
      >
        <BiLike onClick={handleLikeClick.bind(null, true)} />
      </div>
      <div
        style={{
          paddingRight: "10px",
          color: feedback && feedback.sentiment === false ? "blue" : "black",
          cursor: "pointer",
        }}
      >
        <BiDislike onClick={handleLikeClick.bind(null, false)} />
      </div>
    </div>
  )
}

export default Like
```
We save our feedback in `localStorage`. On component render we get from there, and show icons with blue or black color when state is like or dislike.

We made a handler on icons click and call `feedbackApi.save` with `feedback` from `localStorage`, `location` and `like/dislike` . After that we store in `localStorage` result of this function.

### Post

Now we should use our `Like` component in blog post. Open `src/templates/blog-post.js`.

Import component

```js
import Like from "../components/like"
```

And now use this component inside `BlogPostTemplate`:

```js
 <Like page={location.pathname} />
```

### Look feedbacks

Now we can look our feedbacks on [Feedback API portal](https://rapidapi.com/blips-and-chitz-blips-and-chitz-default/api/feedback-api5).

1. Open `Feedback` Section > `getFeedback`.
1. Enter in `X-API-KEY` your `privateKey` from [Credentials Section](#credentials).
1. Enter in `tags` - `["sample-blog"]`. It's for filter.
1. Click `Test Endpoint`
1. Now you can see all feedbacks from `blog`. You can also setup another filter. For example you want see all feedbacks on /my-blog/ page, just input in `page` parameters `["/my-blog/"]`.

### Conclusion

That's all. Simple :)

In this way you can use not only in gatsby portal, you can use on every ReactJS Application.
