import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import MenuCards from './index'

describe('MenuCards Component', () => {

  const defaultProps = {
    title: 'Product A',
    possibleProduction: 10,
    unitPrice: 50,
    totalRevenue: 500
  }

  test('should render all static labels', () => {
    render(<MenuCards {...defaultProps} />)

    expect(screen.getByText('Product')).toBeInTheDocument()
    expect(screen.getByText('Possible Production')).toBeInTheDocument()
    expect(screen.getByText('Unit Price')).toBeInTheDocument()
    expect(screen.getByText('Total Revenue')).toBeInTheDocument()
  })

  test('should render all dynamic props correctly', () => {
    render(<MenuCards {...defaultProps} />)

    expect(screen.getByText('Product A')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('500')).toBeInTheDocument()
  })

})