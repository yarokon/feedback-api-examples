import moment from 'moment';

import { feedbackTypes } from './constants';

export const mapFeedbackByType = (data, type) => {
  switch (type) {
    case feedbackTypes.rating: {
      return data
        .filter(item => item.hasOwnProperty('rating') && item.rating)
        .map(item => ({
          ...item,
          date: moment(item.createdAt).format('Do MMM'),
          response: item.rating
        }))
    }
    case feedbackTypes.sentiment: {
      return data
        .filter(item => item.hasOwnProperty('sentiment'))
        .map(item => ({
          ...item,
          date: moment(item.createdAt).format('Do MMM'),
          response: item.sentiment ? 'Yes' : 'No'
        }))
    }
    case feedbackTypes.suggestion: {
      return data
        .filter(item => item.hasOwnProperty('suggestion') && item.suggestion)
        .map(item => ({
          ...item,
          date: moment(item.createdAt).format('Do MMM'),
          response: item.suggestion
        }))
    }

    case feedbackTypes.combined: {
      return data
        .filter(item => {
          return item.hasOwnProperty('suggestion') && (Array.isArray(item.reasons) && item.reasons.length)
        })
        .map(item => {
          const reasons = item.reasons ? ` (${item.reasons.join(', ')})` : '';

          return {
            ...item,
            date: moment(item.createdAt).format('DD MMM'),
            response: `${item.suggestion}${reasons}`
          }
        });
    }
  }
};

export const calculateFeedbackStatistic = (feedback, type) => {
  let ratingTotal = type === feedbackTypes.rating ? 0 : undefined;
  let sentimentTotal = type === feedbackTypes.sentiment ? 0 : undefined;
  let newCount = 0;

  for (const item of feedback) {
    type === feedbackTypes.rating && (ratingTotal += item.rating);
    type === feedbackTypes.sentiment && (sentimentTotal += item.sentiment);

    moment(item.createdAt).isSame(moment(), 'day') && newCount++;
  }

  return {
    total: feedback.length,
    overallRating:feedback.length && type === feedbackTypes.rating ? Math.round(ratingTotal / feedback.length) : undefined,
    sentimentTotal,
    newCount
  }
};