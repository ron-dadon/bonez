import { bone } from '../src'
import { vi } from 'vitest'

describe('bone', () => {
  it('should have bone id', () => {
    const b = bone<string>('test')
    expect(b.boneId).toBeDefined()
  })

  it('should initialize bone with initial value', () => {
    const b = bone<string>('test')
    expect(b.getValue()).toEqual('test')
  })

  it('should set a new value for bone and have the right value after that', () => {
    const b = bone<string>('test')
    b.setValue('new value')
    expect(b.getValue()).toEqual('new value')
  })

  it('should set a new value using setter function for bone and have the right value after that', () => {
    const b = bone<number>(0)
    expect(b.getValue()).toEqual(0)
    b.setValue((prevValue) => prevValue + 1)
    expect(b.getValue()).toEqual(1)
  })

  it('should setup and call watcher function with new value', () => {
    const b = bone<string>('test')
    const watcher = vi.fn()
    const unwatch = b.watch(watcher)
    b.setValue('new value')
    unwatch()
    expect(watcher).toHaveBeenCalledOnce()
    expect(watcher).toHaveBeenCalledWith('new value')
  })

  it('should not call watcher if unwatch was called', () => {
    const b = bone<string>('test')
    const watcher = vi.fn()
    const unwatch = b.watch(watcher)
    unwatch()
    b.setValue('new value')
    expect(watcher).not.toHaveBeenCalled()
  })

  it('should setup and not call watcher function with new value if manually called unwatch', () => {
    const b = bone<string>('test')
    const watcher = vi.fn()
    b.watch(watcher)
    b.unwatch(watcher)
    b.setValue('new value')
    expect(watcher).not.toHaveBeenCalled()
  })

  it('should not set a new value for bone if it is the same as previous value', () => {
    const b = bone<string>('test')
    const watcher = vi.fn()
    const unwatch = b.watch(watcher)
    b.setValue('test')
    unwatch()
    expect(watcher).not.toHaveBeenCalledOnce()
  })

  it('should run custom compare function if provided', () => {
    const compare = vi.fn(() => true)
    const b = bone<string>('test', { compare })
    b.setValue('test 2')
    expect(compare).toHaveBeenCalledOnce()
    expect(compare).toHaveBeenCalledWith('test', 'test 2')
  })
})
