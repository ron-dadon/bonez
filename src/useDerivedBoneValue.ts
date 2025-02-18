import { useMemo } from 'react'
import { Bone } from './bone'
import { useBoneValue } from './useBoneValue'

export type BoneDerivationFunction<T, P> = (value: T) => P

export function useDerivedBoneValue<T, P>(bone: Bone<T>, derivationFunction: BoneDerivationFunction<T, P> ): P {
  const value = useBoneValue<T>(bone)

  return useMemo<P>(() => {
    return derivationFunction(value)
  }, [value])
}
