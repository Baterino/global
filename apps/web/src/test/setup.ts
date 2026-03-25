import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

/** Jodit loads `.css` in a way Node's test runner rejects; the real editor still runs in Vite dev/build. */
vi.mock('jodit-react', () => ({
  __esModule: true,
  default: () => null,
}))

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock as typeof ResizeObserver

Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
})
