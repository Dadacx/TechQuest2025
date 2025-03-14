import '../styles/Settings.css';
import { useState } from 'react';
import CharacterForm from './CharacterForm';
import { AddCharacterFetch } from './Fetch';
import plus_image from '../images/plus-icon.svg';

const Settings = ({ characters, setCharacters, setSelectedCharacter }) => {
    const [showSettings, setShowSettings] = useState(false);
    const [showForm, setShowForm] = useState(false);
    function addCharacter(character) {
        console.log(character);
        if(character) {
            console.log("add character");
            AddCharacterFetch(character).then((response) => {
                if(response) {
                    console.log(response);
                    setCharacters([...characters, character]);
                    setShowForm(false);
                }
            });
        }        
    }
    return (<>
        {showForm && <CharacterForm Return={addCharacter} setShowForm={setShowForm} />}
        <div className="settings-container">
            <div className="settings-icon" onClick={() => setShowSettings(!showSettings)}></div>
            { showSettings && <div className='settings-content'>
                <h2>Ustawienia</h2>
                <div className='settings-list'>
                    <h3>Wybierz asystenta</h3>
                    <div className="characters-list">
                        {characters && characters.map((character, index) => (
                            <div key={index} className="character-item">
                                <img width={50} src={character.avatar} alt={character.name} className="character-avatar"
                                onClick={() => setSelectedCharacter(character.id)} />
                                <p className="character-name">{character.name}</p>
                            </div>
                        ))}
                        <div className="character-item">
                            <img width={50} src={plus_image} alt="add" className="character-avatar add-avatar"
                            onClick={() => setShowForm(true)} />
                            <p className="character-name">Dodaj asystenta</p>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
        </>
    );
};

export default Settings;
