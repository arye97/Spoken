import React from 'react';
import ReactDOM from 'react-dom';
import SelectDropdown from './SelectDropdown';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SelectDropdown />, div);
  ReactDOM.unmountComponentAtNode(div);
});
