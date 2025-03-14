import './styles/main.css';
import Chat from './components/Chat.js';

import testCharacter from './characters.json'

function App() {
  const characters = testCharacter
  return (
    <div className="container">
      <Chat character={characters[0]} />
    </div>
  );
}

export default App;