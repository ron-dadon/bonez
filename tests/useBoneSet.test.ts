import { renderHook } from "@testing-library/react-hooks/dom"
import { bone, useBoneSet } from '../src'

describe('useBoneSet', () => {
  it('should update bone value', () => {
    const b = bone('test')
    const { result } = renderHook(() => useBoneSet(b))
    result.current('test 2')
    expect(b.getValue()).toEqual('test 2')
  })
})
