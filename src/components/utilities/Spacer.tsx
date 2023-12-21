function Spacer({ space }: { space?: number }) {
  return <div style={{ width: '100%', paddingTop: space ?? '0.1rem', paddingBottom: space ?? '0.1rem' }} />
}

export default Spacer
