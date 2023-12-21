import { InfoPanel, Map } from '@/components'

function Container() {
  return (
    <div className="flex flex-1">
      {/* Right Panel */}
      <InfoPanel />

      {/* Map */}
      <Map />
    </div>
  )
}

export default Container
