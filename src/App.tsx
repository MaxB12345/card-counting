import { useState } from 'react'
import { Home } from './components/Home'
import { DeckCountdown } from './modes/DeckCountdown'
import { FlashCount } from './modes/FlashCount'
import { TrueCount } from './modes/TrueCount'

type Screen = 'home' | 'flash' | 'countdown' | 'trueCount'

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
          onStartTrueCount={() => setScreen('trueCount')}
        />
      )}
      {screen === 'flash' && <FlashCount onHome={goHome} />}
      {screen === 'countdown' && <DeckCountdown onHome={goHome} />}
      {screen === 'trueCount' && <TrueCount onHome={goHome} />}
    </main>
  )
}
