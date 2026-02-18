import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import MenuButton from './index'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}))

describe('MenuButton Component', () => {

  beforeEach(() => {
    mockNavigate.mockClear()
  })

  test('should render button text', () => {
    render(<MenuButton text="Go to Products" link="/products" />)

    expect(screen.getByText('Go to Products')).toBeInTheDocument()
  })

  test('should call navigate with correct link when clicked', () => {
    render(<MenuButton text="Go to Products" link="/products" />)

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/products')
    expect(mockNavigate).toHaveBeenCalledTimes(1)
  })

})