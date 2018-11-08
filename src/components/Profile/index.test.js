import React from 'react';
import Profile from '../Profile';
import renderer from 'react-test-renderer';

test('Profile snapshot', () => {
  const component = renderer.create(
    <Profile />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
