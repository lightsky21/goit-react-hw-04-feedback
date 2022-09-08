import React, { Component } from 'react';

import Statistics from './Widget/Statistics';
import FeedbackOptions from './Widget/FeedbackOptions';
import Section from './Widget/Section';
import Notification from './Widget/Notification'

export class App extends Component {

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  
  handleClick = e => {
    const { name } = e.currentTarget;
    this.setState(prevState => {
      
      return {
        [name]: prevState[name] + 1,
      };
    });
  }
  
  countTotalFeedback = () => {
    return Object.values(this.state).reduce((previousValue, number) => {
      return previousValue + number;
    }, 0);
  };

  countPositiveFeedbackPercentage = () => {
    const TotalFeedbackNumber = this.countTotalFeedback();
    const GoodFeedbackNumber = this.state.good;
    const PositiveFeedbackPercentage =
      (GoodFeedbackNumber * 100) / TotalFeedbackNumber;
    //
    return isNaN(PositiveFeedbackPercentage.toFixed(0))
      ? '0'
      : PositiveFeedbackPercentage.toFixed(0);
  };


  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
  
   

    return (<div>
      <Section title="Please leave feedback">
        <FeedbackOptions
        options={this.state}
        onLeaveFeedback={this.handleClick} />
      </Section>
      
      <Section title="Statistics">
        {total === 0 ? (<Notification message="There is no feedback"></Notification>) :
        (<Statistics good={good}
        neutral={neutral}
        bad={bad}
        total={this.countTotalFeedback()}
        positivePercentage={this.countPositiveFeedbackPercentage()} />)}
        
      </Section>
      
    
    </div>);
  }
    
}
