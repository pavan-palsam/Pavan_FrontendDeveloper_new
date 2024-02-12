import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Filters from './index.tsx';
import { useFoodContext } from '../../context.tsx';

const mockFoodItemsData = {
  meals: [
    { idMeal: '123', strMeal: 'Meal 1', strMealThumb: 'image1.jpg' },
    { idMeal: '456', strMeal: 'Meal 2', strMealThumb: 'image2.jpg' },
  ],
};

jest.mock('../../context.tsx', () => ({
  useFoodContext: jest.fn(),
}));

const mockUseFoodContext = {
  foodItems: mockFoodItemsData,
  setFoodItems: jest.fn(),
};

describe('Filters component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useFoodContext.mockReturnValue(mockUseFoodContext);
  });

  test('renders Filters component with mock data', async () => {
    const { getByText, getByLabelText } = render(<Filters />);

    expect(getByText('Restaurants With Great Offers Near Me')).toBeInTheDocument();
    expect(getByText('Filter')).toBeInTheDocument();
    expect(getByLabelText('alphabetical')).toBeInTheDocument();

    axios.get.mockResolvedValueOnce({
      data: {
        meals: [
          { strArea: 'Area 1' },
          { strArea: 'Area 2' },
        ],
      },
    });

    fireEvent.click(getByText('Filter'));

    await waitFor(() => {
      expect(getByText('Area 1')).toBeInTheDocument();
      expect(getByText('Area 2')).toBeInTheDocument();
    });

    
    axios.get.mockResolvedValueOnce({
      data: mockFoodItemsData,
    });

  
    fireEvent.click(getByText('Apply'));

  
    await waitFor(() => {
      expect(getByLabelText('Loading')).not.toBeInTheDocument();
    });

   
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('filter.php?a='));

   
    expect(mockUseFoodContext.setFoodItems).toHaveBeenCalledWith(mockFoodItemsData);
  });


});
