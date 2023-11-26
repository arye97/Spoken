import React from 'react';
import ReactDOM from 'react-dom';
import LanguageDataBox from './LanguageDataBox';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LanguageDataBox />, div);
  ReactDOM.unmountComponentAtNode(div);
});
