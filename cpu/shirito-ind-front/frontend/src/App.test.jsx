import React from 'react';
import { render,queryByAttribute  } from '@testing-library/react';
import App from './App';


const getById = queryByAttribute.bind(null, 'id');

test('renders learn react link', () => {
  const { container, getByText } = render(<App />);
  expect(getById(container, 'logo')).toBeInTheDocument();
});
