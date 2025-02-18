import { renderHook, act } from "@testing-library/react-hooks/dom"
import { bone, useBone } from '../src'

describe('useBone', () => {
  it('should get initial value from bone', () => {
    const b = bone('test')
    const { result } = renderHook(() => useBone(b))
    expect(result.current[0]).toEqual('test')
  })

  it('should get setter function from bone', () => {
    const b = bone('test')
    const { result } = renderHook(() => useBone(b))
    expect(result.current[1]).toBe(b.setValue)
  })

  it('should update value using setter', () => {
    const b = bone('test')
    const { result } = renderHook(() => useBone(b))
    expect(result.current[0]).toEqual('test')

    act(() => {
      result.current[1]('test 2')
    })

    expect(result.current[0]).toEqual('test 2')
  })
})
