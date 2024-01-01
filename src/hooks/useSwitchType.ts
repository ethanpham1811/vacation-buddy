import { TRequestDataFn, TUpdateParams } from '@/constants/types'
import { Events, eventEmitter } from '@/services/eventEmitter'
import { getBounds } from '@/services/utilities'
import { Map } from 'leaflet'
import { useEffect } from 'react'

/**
 * SWITCH_TYPE event listener:
 * - request data with corresponding type
 * - update search params "type"
 */

function useSwitchType(map: Map, requestData: TRequestDataFn, updateParams: TUpdateParams) {
  useEffect(() => {
    eventEmitter.subscribe(Events.SWITCH_TYPE, (type: unknown) => {
      // request data
      requestData(getBounds(map), type as string)

      // update params
      updateParams({ type: type as string })
    })

    /* cleanup */
    return () => {
      eventEmitter.unsubscribe(Events.SWITCH_TYPE)
    }
  }, [map, requestData, updateParams])
}

export default useSwitchType
