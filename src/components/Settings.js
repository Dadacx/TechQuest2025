import '../styles/Settings.css';
import CharacterForm from './CharacterForm';
import plus_image from '../images/plus-icon.svg';

const Settings = ({ characters }) => {
    function addCharacter() {
        
    }
    return (
        <div className="settings-container">
            <div className="settings-icon"></div>
            <div className='settings-content'>
                <h2>Ustawienia</h2>
                <div className='settings-list'>
                    <h3>Wybierz asystenta</h3>
                    <div className="characters-list">
                        {characters && characters.map((character, index) => (
                            <div key={index} className="character-item">
                                <img width={50} src={character.avatar} alt={character.name} className="character-avatar" />
                                <p className="character-name">{character.name}</p>
                            </div>
                        ))}
                        <div className="character-item">
                            <img width={50} src={plus_image} alt="add" className="character-avatar" />
                            <p className="character-name">Dodaj asystenta</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
