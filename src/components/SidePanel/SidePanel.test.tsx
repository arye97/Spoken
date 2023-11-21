import React from 'react';
import ReactDOM from 'react-dom';
import SidePanel from './SidePanel';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SidePanel />, div);
  ReactDOM.unmountComponentAtNode(div);
});