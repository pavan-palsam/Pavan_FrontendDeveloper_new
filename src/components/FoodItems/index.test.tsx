import React from 'react';
import { render, waitFor } from '@testing-library/react';
import FoodItems from './index';

const mockFoodItemsData = {
  meals: [
    { idMeal: '123', strMeal: 'Meal 1', strMealThumb: 'image1.jpg' },
    { idMeal: '456', strMeal: 'Meal 2', strMealThumb: 'image2.jpg' },
  ],
};

test('renders FoodItems component with mock data', async () => {
  axios.get.mockResolvedValue({ data: mockFoodItemsData });

  const { getByText, getByAltText } = render(<FoodItems />);

  // Waiting for the loading spinner to disappear
  await waitFor(() => {
    expect(getByAltText('Loading')).not.toBeInTheDocument();
  });

  // Checking if the rendered component contains the expected data
  expect(getByText('Meal 1')).toBeInTheDocument();
  expect(getByText('Meal 2')).toBeInTheDocument();
});
