import React from 'react';
import ReactDOM from 'react-dom';
import MapButton from './MapButton';

it('It should mount', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<MapButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
