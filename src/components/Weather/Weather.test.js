import React from 'react';
import Weather from './Weather';
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<Weather />)
});