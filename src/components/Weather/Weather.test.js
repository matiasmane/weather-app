import React from 'react';
import Current from './Weather';
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<Current />)
});