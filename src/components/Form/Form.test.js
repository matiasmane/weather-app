import React from 'react';
import Form from './Form';
import {shallow} from 'enzyme'

it('renders without crashing', () => {
  shallow(<Form />)
});