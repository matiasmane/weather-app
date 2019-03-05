import React from 'react';
import Current from './Current';
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<Current />)
});