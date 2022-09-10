import  { useState } from 'react';

import Statistics from './Widget/Statistics';
import FeedbackOptions from './Widget/FeedbackOptions';
import Section from './Widget/Section';
import Notification from './Widget/Notification'

export const  App = () => {
  // state = {
  //   good: 0,
  //   neutral: 0,
  //   bad: 0,
  // };
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const options = { good, neutral, bad };
  
  const handleClick = e => {
    const { name } = e.currentTarget;
    // this.setState(prevState => {
      
    //   return {
    //     [name]: prevState[name] + 1,
    //   };
    // });
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1)
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1)
        break;
      case 'bad':
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


   
    // const { good, neutral, bad } = this.state;
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
