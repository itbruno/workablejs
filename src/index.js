import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Muli:400,600,700', 'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('workablejs'));