import React from 'react';
import Signup from '../Signup';
import renderer from 'react-test-renderer';

test('Signup changed by user input', () => {
  const component = renderer.create(
    <Signup />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  // let testEvent = {target: {
  //   name: 'givenName',
  //   value: 'kouhei-Maru'
  // }};
  // tree.props.onChange(testEvent);
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});
