import '@testing-library/jest-dom/vitest'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error jsdom
globalThis.ResizeObserver = ResizeObserverMock

Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
})
