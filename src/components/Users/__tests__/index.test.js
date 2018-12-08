import React from 'react';
import Users from '../../Users';
import renderer from 'react-test-renderer';

test('Users snapshot', () => {
  const component = renderer.create(
    <Users />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
