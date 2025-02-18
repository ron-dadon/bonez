import { renderHook, act } from "@testing-library/react-hooks/dom"
import { bone, useDerivedBoneValue } from '../src'

describe('useBoneValue', () => {
  it('should get derived initial value from bone', () => {
    const derivationFunction = vi.fn((value: string) => value.toUpperCase())
    const b = bone('test')
    const { result } = renderHook(() => useDerivedBoneValue(b, derivationFunction))
    expect(result.current).toEqual('TEST')
    expect(derivationFunction).toHaveBeenCalledWith('test')
  })

  it('should update derived value from bone', () => {
    const derivationFunction = vi.fn((value: string) => value.toUpperCase())
    const b = bone('test')
    const { result } = renderHook(() => useDerivedBoneValue(b, derivationFunction))

    act(() => {
      b.setValue('test 2')
    })

    expect(result.current).toEqual('TEST 2')
    expect(derivationFunction).toHaveBeenNthCalledWith(1, 'test')
    expect(derivationFunction).toHaveBeenNthCalledWith(2, 'test 2')
  })

  it('should not update derived value from bone if the same', () => {
    const derivationFunction = vi.fn((value: string) => value.toUpperCase())
    const b = bone('test')
    const { result } = renderHook(() => useDerivedBoneValue(b, derivationFunction))

    act(() => {
      b.setValue('test')
    })

    expect(result.current).toEqual('TEST')
    expect(derivationFunction).toHaveBeenCalledOnce()
    expect(derivationFunction).toHaveBeenCalledWith('test')
  })
})
