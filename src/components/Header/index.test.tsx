import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './index.tsx';

const mockData = {
    meals: [
      {
        idMeal: '1',
        strMeal: 'Mock Meal 1',
        strCategory: 'Mock Category',
        strArea: 'Mock Area',
        strMealThumb: 'https://example.com/mock-meal1.jpg',
      },
      {
        idMeal: '2',
        strMeal: 'Mock Meal 2',
        strCategory: 'Mock Category',
        strArea: 'Mock Area',
        strMealThumb: 'https://example.com/mock-meal2.jpg',
      },
    ],
  };
  

describe('Header component', () => {
  test('renders correctly', () => {
    render(<Header />);
    
    expect(screen.getByText('Swiggy')).toBeInTheDocument();
  });

  test('handles search input', async () => {
    axios.get.mockResolvedValue({ data: mockData});

    render(<Header />);
    
    const searchInput = screen.getByPlaceholderText('Search for restaurant and food');
    
    fireEvent.change(searchInput, { target: { value: 'test' } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=test');
    });
  });
});
