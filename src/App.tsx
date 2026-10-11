import { useState } from 'react'
import { Home } from './components/Home'
import { DeckCountdown } from './modes/DeckCountdown'
import { FlashCount } from './modes/FlashCount'

type Screen = 'home' | 'flash' | 'countdown'

/** Top-level screen switcher. */
export function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const goHome = () => setScreen('home')

  return (
    <main className="app">
      {screen === 'home' && (
        <Home
          onStartFlash={() => setScreen('flash')}
          onStartCountdown={() => setScreen('countdown')}
        />
      )}
      {screen === 'flash' && <FlashCount onHome={goHome} />}
      {screen === 'countdown' && <DeckCountdown onHome={goHome} />}
    </main>
  )
}
