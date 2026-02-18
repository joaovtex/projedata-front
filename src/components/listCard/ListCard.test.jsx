import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import ListCard from './index'

describe('ListCard Component', () => {

  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  const defaultProps = {
    id: 1,
    name: 'Test Product',
    stockQuantity: 50,
    value: 200,
    onEdit: mockOnEdit,
    onDelete: mockOnDelete
  }

  beforeEach(() => {
    render(<ListCard {...defaultProps} />)
  })

  test('should render product name', () => {
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  test('should render stock quantity when provided', () => {
    expect(screen.getByText('50 units')).toBeInTheDocument()
  })

  test('should render price when provided', () => {
    expect(screen.getByText('200')).toBeInTheDocument()
  })

  test('should call onEdit with correct id when Edit button is clicked', () => {
    const editButton = screen.getByText('Edit')
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledWith(1)
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })

  test('should call onDelete with correct id when Delete button is clicked', () => {
    const deleteButton = screen.getByText('Delete')
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledWith(1)
    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

})

describe('Conditional rendering', () => {

  test('should not render stock quantity when not provided', () => {
    render(
      <ListCard
        id={2}
        name="No Stock Product"
        value={100}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    )

    expect(screen.queryByText(/units/)).not.toBeInTheDocument()
  })

  test('should not render price when not provided', () => {
    render(
      <ListCard
        id={3}
        name="No Price Product"
        stockQuantity={10}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />
    )

    expect(screen.queryByText('Price')).not.toBeInTheDocument()
  })

})