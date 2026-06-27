import { useContext } from 'react'
import { ImageContext } from './imageContextValue'

export function useImages() {
  const context = useContext(ImageContext)
  if (!context) throw new Error('useImages must be used inside ImageProvider')
  return context
}
