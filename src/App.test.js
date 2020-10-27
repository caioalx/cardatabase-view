import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import TestRenderer from 'react-test-renderer';
import AddCar from './components/AddCar';

/*test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

it('renders a snapshot', () => {
  const tree = TestRenderer.create(<AddCar/>).toJSON();
  expect(tree).toMatchSnapshot();
});
