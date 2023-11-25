import React from 'react';
import ReactDOM from 'react-dom';
import CountriesListContainer from './CountriesListContainer';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CountriesListContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
