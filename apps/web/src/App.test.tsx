import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import './i18n'
import App from './App'

describe('App', () => {
  it('renders without throwing', async () => {
    expect(() => render(<App />)).not.toThrow()
    await waitFor(() => {
      expect(screen.getByText(/Enabling energy storage/i)).toBeInTheDocument()
    })
  })

  it('renders home hero and settles', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/Enabling energy storage/i)).toBeInTheDocument()
    })
  })
})
