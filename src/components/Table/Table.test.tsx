import React from 'react';
import { Table } from './Table';
import { render, screen } from '@testing-library/react';

it('renders without crashing', () => {
    render(<Table />);
    expect(screen.getByText('Analysis')).toBeInTheDocument();
});
