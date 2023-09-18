import React from 'react';
import { render } from '@testing-library/react-native';
import { renderDetail } from '../src/component/renderItemDetail';
describe('renderDetail Function', () => {
  it('renders label and value correctly', () => {
    // Define test label and value
    const label: string = 'Test Label';
    const value: string = 'Test Value';

    // Render the component with the test label and value
    const { getByText } = render(renderDetail(label, value));

    // Verify that the label and value are rendered correctly
    expect(getByText('Test Label:')).toBeTruthy(); // Replace with actual label text
    expect(getByText('Test Value')).toBeTruthy(); // Replace with actual value text
  });

  it('renders empty value correctly', () => {
    // Define test label with an empty value
    const label: string = 'Test Label';
    const value: string = ''; // Empty value

    // Render the component with the test label and empty value
    const { getByText } = render(renderDetail(label, value));

    // Verify that the label is rendered correctly
    expect(getByText('Test Label:')).toBeTruthy(); // Replace with actual label text

    // Verify that an empty value is rendered correctly (e.g., empty string or placeholder)
    expect(getByText('')).toBeTruthy(); // Replace with your preferred empty value representation
  });

  // Add more test cases as needed for edge cases or variations
});