import { FloppyFishGame } from './components/floppy-fish-game'

// Sample fish data for the game
const sampleFish = {
  id: "1",
  name: "Blue Fish",
  image: "/fish/blue-fish.svg",
  experienceMultiplier: 1.0
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Floppy Fish Game
        </h1>
        <FloppyFishGame selectedFish={sampleFish} />
      </div>
    </div>
  )
}

export default App 