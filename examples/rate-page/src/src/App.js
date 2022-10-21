import React from 'react';
import axios from 'axios';
import { notification, Alert } from 'antd';
import { SmileOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import './App.css';
import logo from './logo.png';

import RatingExample from './components/RatingExample';
import LikeDislikeExample from './components/LikeDislikeExample';
import SuggestionExample from './components/SuggestionExample';
import CombinedExample from './components/CombinedExample';

const axiosInstance = axios.create({
  baseURL: 'https://feedback-api5.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': '637316bb60msh72029ce58a98a83p19d6d5jsnb9fefc607f61',
    'X-RapidAPI-Host': 'feedback-api5.p.rapidapi.com'
  }
});

const LOCAL_STORAGE_KEYS_FEEDBACK_MAP_KEY = 'feedback';
const LOCAL_STORAGE_FEEDBACK_KEYS = {
  rating: 'rating',
  sentiment: 'sentiment',
  suggestion: 'suggestion',
  combined: 'combined'
};

const getLocalStorageUser = () => {
  return localStorage.getItem('userId');
}

const setLocalStorageUser = (userId) => {
  localStorage.setItem('userId', userId);
}

const getLocalStorageFeedbackData = () => {
  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS_FEEDBACK_MAP_KEY)
  );
}

const setLocalStorageFeedbackData = (subkey, feedback) => {
  const newFeedbackData = Object.assign(getLocalStorageFeedbackData() || {}, { [subkey]: feedback });

  localStorage.setItem(LOCAL_STORAGE_KEYS_FEEDBACK_MAP_KEY, JSON.stringify(newFeedbackData));
};

function App() {
  const [feedbackData, setFeedbackData] = React.useState(getLocalStorageFeedbackData() || {});

  const refreshFeedback = () => {
    setFeedbackData(getLocalStorageFeedbackData() || {})
  };

  const openSuccessNotification = () => {
    notification.open({
      message: 'Thank you!',
      description: 'We appreciate your feedback.',
      icon: <SmileOutlined style={{ color: '#3BD158' }} />,
    });
  };

  const openErrorNotification = () => {
    notification.error({
      message: 'Failed to submit feedback',
      description: 'Something went wrong with your feedback. Please try again.',
      icon: <ExclamationCircleOutlined style={{ color: '#F81E22' }} />,
    });
  };

  const submitFeedback = async (feedbackId, payload, localStorageSubkey) => {
    console.log(payload, 'payload')
    if (!payload) {
      console.log('no payload')
    }
    const userId = getLocalStorageUser();
    const metadata = { page: 'root', tags: ['demo-page'] };
    const submitPayload = { ...metadata, ...payload };

    if (userId) submitPayload.userId = userId;

    let feedback;

    try {
      if (feedbackId) {
        const { data } = await axiosInstance.put(`/feedback/${feedbackId}`, submitPayload);

        feedback = data;
      } else {
        const { data } = await axiosInstance.post('/feedback', submitPayload);

        feedback = data;
      }

      if (!userId) {
        setLocalStorageUser(feedback.userId);
      }

      setLocalStorageFeedbackData(localStorageSubkey, { id: feedback.id, ...payload });
      refreshFeedback();
      openSuccessNotification();
    } catch (e) {
      console.error(e);
      openErrorNotification();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className="App-main-section">
        <Alert
          showIcon
          type="info"
          message="The examples below represent various ways you can interact with our Feedback API. Feel free to practice."
          style={{ marginBottom: '15px' }}
        />

        <div className="App-main-section-example-wrapper">
          <RatingExample
            data={feedbackData.rating}
            onSubmit={(id, payload) => submitFeedback(id, payload, LOCAL_STORAGE_FEEDBACK_KEYS.rating)}
          />
        </div>
        <div className="App-main-section-example-wrapper">
          <LikeDislikeExample
            data={feedbackData.sentiment}
            onSubmit={(id, payload) => submitFeedback(id, payload, LOCAL_STORAGE_FEEDBACK_KEYS.sentiment)}
          />
        </div>
        <div className="App-main-section-example-wrapper">
          <SuggestionExample
            data={feedbackData.suggestion}
            onSubmit={(id, payload) => submitFeedback(id, payload, LOCAL_STORAGE_FEEDBACK_KEYS.suggestion)}
          />
        </div>
        <div className="App-main-section-example-wrapper">
          <CombinedExample
            data={feedbackData.combined}
            onSubmit={(id, payload) => submitFeedback(id, payload, LOCAL_STORAGE_FEEDBACK_KEYS.combined)}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
