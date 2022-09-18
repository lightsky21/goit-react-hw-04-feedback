import  { useState } from 'react';

import Statistics from './Widget/Statistics';
import FeedbackOptions from './Widget/FeedbackOptions';
import Section from './Widget/Section';
import Notification from './Widget/Notification'


const OPTIONS_GOOD = 'good';
const OPTIONS_NEUTRAL = 'neutral';
const OPTIONS_BAD = 'bad';
export const  App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = { good, neutral, bad };
  
  const handleClick = e => {
    const { name } = e.currentTarget;
    
    switch (name) {
      case OPTIONS_GOOD:
        setGood(prevState => prevState + 1)
        break;
      case OPTIONS_NEUTRAL:
        setNeutral(prevState => prevState + 1)
        break;
      case OPTIONS_BAD:
        setBad(prevState => prevState + 1)
        break;

      default: return;
    }
  }
  
  const countTotalFeedback = () => {
    return Object.values(options).reduce((previousValue, number) => {
      return previousValue + number;
    }, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const TotalFeedbackNumber = countTotalFeedback();
    const GoodFeedbackNumber = good;
    const PositiveFeedbackPercentage =
      (GoodFeedbackNumber * 100) / TotalFeedbackNumber;
    //
    return isNaN(PositiveFeedbackPercentage.toFixed(0))
      ? '0'
      : PositiveFeedbackPercentage.toFixed(0);
  };


   
    
    const total = countTotalFeedback();
  
   

    return (<div>
      <Section title="Please leave feedback">
        <FeedbackOptions
        options={options}
        onLeaveFeedback={handleClick} />
      </Section>
      
      <Section title="Statistics">
        {total === 0 ? (<Notification message="There is no feedback"></Notification>) :
        (<Statistics good={good}
        neutral={neutral}
        bad={bad}
        total={countTotalFeedback()}
        positivePercentage={countPositiveFeedbackPercentage()} />)}
        
      </Section>
      
    
    </div>);
  
    
}
