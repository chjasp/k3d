import React from 'react';
import { Feature } from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'Puma Smash V2 is your perfect shoe-match?',
    text: 'Good luck finding it on page 23 in your go-to-store. SSI will figure out your style preferences and recommend it to you ASAP.',
  },
  {
    title: 'Like elegant form and wild colors?',
    text: 'Good luck finding filters for that in your go-to-store. SSI\'s map will let you find this style group fast.',
  },
  {
    title: 'Want to have fun shopping online?',
    text: 'The SSI responds to you, tailors recommendations to you, and delivers an overall way more exciting experience than most online shops.',
  },
  {
    title: 'Want to shop on a smartphone?',
    text: 'Having shoppers click through 20+ pages of products is sooo PC-age ... Our interface is optimized for the smartphone. Mobile first!',
  },
];

const Features = () => (
  <div className="kreation__features section__padding" id="features">
    <div className="kreation__features-heading">
      <h1 className="gradient__text">Explore 1000s of Products in Minutes with the Smart Shopping Interface (SSI)</h1>
      <p>Get Started and Test the SSI Sneaker Store</p>
    </div>
    <div className="kreation__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} mode={'dark'}/>
      ))}
    </div>
  </div>
);

export default Features;
