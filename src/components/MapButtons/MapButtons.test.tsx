import React from 'react';
import ReactDOM from 'react-dom';
import MapButtons from './MapButtons';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapButtons buttons={[]}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
