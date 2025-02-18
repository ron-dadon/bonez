import { renderHook, act } from "@testing-library/react-hooks/dom"
import { bone, useBoneValue} from '../src'

describe('useBoneValue', () => {
  it('should get initial value from bone', () => {
    const b = bone('test')
    const { result } = renderHook(() => useBoneValue(b))
    expect(result.current).toEqual('test')
  })

  it('should get updated value from bone', () => {
    const b = bone('test')
    const { result } = renderHook(() => useBoneValue(b))

    act(() => {
      b.setValue('test 2')
    })

    expect(result.current).toEqual('test 2')
  })
})
