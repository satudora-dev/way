import React from 'react';
import Signup from '../../Signup';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


test("Signup has 4 Textfield" , () => {
  const wrapper = shallow(<Signup />);
  expect(wrapper.find('TextField').length).toBe(4);
})
