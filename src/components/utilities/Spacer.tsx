function Spacer({ space, className }: { space?: number; className?: string }) {
  return <div className={className} style={{ width: '100%', paddingTop: space ?? '0.1rem', paddingBottom: space ?? '0.1rem' }} />
}

export default Spacer
