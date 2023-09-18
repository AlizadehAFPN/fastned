import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CarListItem } from '../src/component/carListItem';

describe('CarListItem Component', () => {
  const mockItem = {
    id: 1,
    brand: 'Brand 1',
    model: 'Model 1',
    version: 'Version 1',
    category: 'Category 1',
    imageUrl: 'image-url-1',
  };

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(
      <CarListItem item={mockItem} onPressCar={() => {}} />
    );

    // Check if the component renders the correct content
    expect(getByText('Brand:')).toBeTruthy();
    expect(getByText('Brand 1')).toBeTruthy();
    expect(getByText('Model:')).toBeTruthy();
    expect(getByText('Model 1')).toBeTruthy();
    expect(getByText('Version:')).toBeTruthy();
    expect(getByText('Version 1')).toBeTruthy();
    expect(getByText('Category:')).toBeTruthy();
    expect(getByText('Category 1')).toBeTruthy();

    // Check if the test IDs are correctly assigned
    expect(getByTestId('post-row-1')).toBeTruthy();
  });

  it('calls onPressCar when pressed', () => {
    const mockOnPressCar = jest.fn();
    const { getByTestId } = render(
      <CarListItem item={mockItem} onPressCar={mockOnPressCar} />
    );

    // Simulate a press on the component
    fireEvent.press(getByTestId('post-row-1'));

    // Check if onPressCar was called with the correct item ID
    expect(mockOnPressCar).toHaveBeenCalledWith(1);
  });
});
