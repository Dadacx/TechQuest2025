import '../styles/Forms.css';
import { useRef, useState } from 'react';
import close from '../images/close.svg'

const CharacterForm = ({ Return, setShowForm, initialData, isEdit }) => {
  const [errors, setErrors] = useState({});
  const name = useRef(null);
  const avatar = useRef(null);
  const behaviour = useRef(null);

  function Character() {
    if (validateForm()) {
      console.log('Formularz poprawny');
      const character = {
        name: name.current.value.trim(),
        avatar: avatar.current.value.trim(),
        behaviour: behaviour.current.value.trim(),
      }
      console.log(character)
      Return(character);
    }
  }
  const validateForm = () => {
    const newErrors = {};
    name.current.classList.remove('invalid');
    avatar.current.classList.remove('invalid');
    behaviour.current.classList.remove('invalid');

    if (!name.current.value.trim()) {
      name.current.classList.add('invalid');
      newErrors.name = 'Nazwa jest wymagana';
    }
    if (!avatar.current.value.trim() || !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(avatar.current.value)) {
        avatar.current.classList.add('invalid');
        newErrors.avatar = `Podaj poprawny link do zdjęcia
        (Link powinien rozpoczynać się od "http://" lub "https://", a kończyć rozszerzeniem pliku graficznego (.jpg, .jpeg, .png, .gif, .webp, .bmp, .svg))`;
      }
    if (!behaviour.current.value.trim()) {
        behaviour.current.classList.add('invalid');
      newErrors.behaviour = 'Opis zachowania jest wymagany';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const RemoveInvalid = (e, name) => {
    e.target.classList.remove('invalid'); setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[e.target.id];
      return newErrors;
    })
  }

  return (
    <div className='form-box-container'>
      <div className='form-box'>
        <div className='close' onClick={() => setShowForm(null)}><img src={close} alt='close_icon' /></div>
        <h1>{isEdit ? "Edytuj asystenta" : "Dodaj asystenta"}</h1>
        <div className='form-form'>
          <label><span>Nazwa</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='name' ref={name} defaultValue={initialData?.name} />
          </label>
          {errors.name && <div className='form-error'>{errors.name}</div>}
          <label><span>Avatar</span>
            <input onChange={(e) => { RemoveInvalid(e) }} type='text' id='avatar' ref={avatar} defaultValue={initialData?.avatar} />
          </label>
          {errors.avatar && <div className='form-error'>{errors.avatar}</div>}
          <label><span>Opis zachowania</span>
            <textarea onChange={(e) => { RemoveInvalid(e) }} rows='6' id='behaviour' ref={behaviour} defaultValue={initialData?.behaviour} />
          </label>
          {errors.behaviour && <div className='form-error'>{errors.behaviour}</div>}
          <button className='form-btn' onClick={Character}>{isEdit ? "Zapisz zmiany" : "Dodaj"}</button>
        </div>
      </div>
    </div>
  );
}

export default CharacterForm;