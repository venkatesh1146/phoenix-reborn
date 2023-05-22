import { useEffect, useState } from 'react'

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    setIsDesktop(window?.innerWidth >= 1024)
  }, [])
  return isDesktop
}
