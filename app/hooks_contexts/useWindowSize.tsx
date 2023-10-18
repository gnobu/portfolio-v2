import { useEffect, useState, createContext } from 'react'

type WindowSize = 'smMobile' | 'mobile' | 'tablet' | 'desktop'
type Orientation = 'portrait' | 'landscape'
export const WindowSizeContext = createContext<{
    windowSize: WindowSize, orientation: Orientation
}>({ windowSize: 'mobile', orientation: 'portrait' })

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>('mobile')
    const [orientation, setOrientation] = useState<Orientation>('portrait')
    useEffect(() => {
        function handleWindowSize() {
            setWindowSize(
                window.innerWidth < 400
                    ? 'smMobile' : window.innerWidth <= 500
                        ? 'mobile' : window.innerWidth > 500 && window.innerWidth <= 768
                            ? 'tablet' : 'desktop'
            )
            setOrientation(
                window.innerWidth / window.innerHeight <= 1
                    ? 'portrait' : 'landscape'
            )
        }
        handleWindowSize()
        window.addEventListener('resize', handleWindowSize)
        return () => {
            window.removeEventListener('resize', handleWindowSize)
        }
    }, [])
    return { windowSize, orientation }
}