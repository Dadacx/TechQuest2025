import logo from './logo.svg';
import './App.css';
import Prompt from './components/proompt.js'
import { useState, useEffect } from 'react';

function App() {
    const [ andrzej, setDuda ] = useState(null)
    useEffect(() => {
        const temp = async () => {
            const odp = await Prompt("Opowiedz mi historie o wilku")
            setDuda(odp)
        }
        temp()
    }, [])
  return (
    <>
            {andrzej}
    </>
  );
}

export default App;
