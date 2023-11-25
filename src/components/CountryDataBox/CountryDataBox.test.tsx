import React from 'react';
import ReactDOM from 'react-dom';
import CountryDataBox from './CountryDataBox';

it.skip('It should mount', () => {
  const div = document.createElement('div');
  // ReactDOM.render(<CountryDataBox countryData={}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
