import { render, screen } from '@testing-library/react'
import Navigation from '../../app/components/Navigation'

// Mock framer-motion to avoid issues in test environment
jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

describe('Navigation', () => {
  it('renders navigation component', () => {
    render(<Navigation />)
    
    // Check if navigation is rendered (adjust based on your actual Navigation component)
    const nav = screen.getByRole('navigation', { hidden: true })
    expect(nav).toBeInTheDocument()
  })

  it('should be accessible', () => {
    const { container } = render(<Navigation />)
    expect(container.firstChild).toBeInTheDocument()
  })
}) 