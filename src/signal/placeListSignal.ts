import { TPlace } from '@/constants/types'
import { signal } from '@preact/signals-react'

export const placeListSignal = signal<TPlace[]>([])
