function LoadingMsg({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[1000]">
      <div className="leaflet-control leaflet-bar !border-0">
        {isLoading && <div className="px-3 py-1 bg-blue-600 text-white rounded-full">fetching data...</div>}
      </div>
    </div>
  )
}

export default LoadingMsg
