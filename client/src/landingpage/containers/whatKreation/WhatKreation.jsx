import React from 'react';
import { Feature, ImgFeature } from '../../components/feature/Feature';
import './whatKreation.css';

const WhatKreation = () => (
  <div className="kreation__whatkreation section__margin" id="wkreation">
    <div className="kreation__whatkreation-feature">
      <Feature title="What is SSI?" text="The Smart Shopping Interface (SSI) is a leap forward in Shopper-Computer-Interaction. Just by (dis-)liking sneakers, the SSI gives you personalized recommendations, equips you with tools to explore 1000s of shoes, and provides you with an unique overview over all sneakers and styles out there." />
    </div>
    <div className="kreation__whatkreation-container">
      <ImgFeature title="Personalized" text="Like a shoe? By answering this question, you train the SSI to recognize which styles you like. Say goodbye to skimming through tons of products you're not interested in. The SSI gets better with every (dis-)like and will show you just what you want to see." id={0} />
      <ImgFeature title="Mapping Styles" text="The world of sneakers in a nutshell. The SSI puts every sneaker we've got on a map. But not anywhere. Similar looking sneakers are closer together and form style groups. You'll get a great overview in no time." id={1} />
      <ImgFeature title="Full Control" text="For this next-level online shopping experience you need a control center. We've build one for you that elegantly bundles and performs all those advanced functions. On top of that, it's optimized for smartphone use." id={2} />
    </div>
  </div>
);

export default WhatKreation;
