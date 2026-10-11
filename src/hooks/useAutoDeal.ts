import { useEffect, useState } from 'react'

/**
 * Advances an index from 0 to `total` at a fixed interval while `isActive`.
 * Returns the current index; it stays at `total` once the run is finished.
 */
export function useAutoDeal(total: number, intervalMs: number, isActive: boolean): number {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!isActive || index >= total) return
    const timer = setTimeout(() => setIndex((current) => current + 1), intervalMs)
    return () => clearTimeout(timer)
  }, [index, total, intervalMs, isActive])

  return index
}
