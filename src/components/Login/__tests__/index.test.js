import React from 'react';
import Login from '../../Login';
import { shallow } from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


test("Login has 1 SiteInfo, 1 GithubButton" , () => {
  const wrapper = shallow(<Login />);
  expect(wrapper.find('SiteInfo').length).toBe(1);
  expect(wrapper.find('GithubButton').length).toBe(1);
})
