import '../../assets/css/Step1.css';
import { useEffect, useRef, useState } from 'react';
import { ReturnedData } from '../../types';
import { useNavigate } from 'react-router-dom';
import { initialState, useAddOnDispatch } from '../../contexts/constants';

const Step1 = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const nameErrorRef = useRef<HTMLSpanElement>(null);
  const emailErrorRef = useRef<HTMLSpanElement>(null);
  const phoneErrorRef = useRef<HTMLSpanElement>(null);
  const storedData = localStorage.getItem('storedData');
  const navigate = useNavigate();
  const dispatch = useAddOnDispatch();
  const requiredError = 'This field is required';

  useEffect(() => {
    if (!storedData) {
      const dataJson: ReturnedData = initialState;

      localStorage.setItem('storedData', JSON.stringify(dataJson));
      dispatch({ type: 'ADD', payload: dataJson });
    }
  }, [storedData, dispatch]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { target } = e;

    if (!target.checkValidity()) {
      switch (target.name) {
        case 'name':
          if (nameErrorRef.current) {
            nameErrorRef.current.innerHTML = requiredError;
          }
          break;
        case 'email':
          if (emailErrorRef.current) {
            emailErrorRef.current.innerHTML = target.validity.valueMissing
              ? requiredError
              : 'Please enter a valid email';
          }
          break;
        case 'phone':
          if (emailErrorRef.current) {
            emailErrorRef.current.innerHTML = requiredError;
          }
          break;
        default:
          break;
      }
    } else {
      if (
        nameErrorRef.current &&
        emailErrorRef.current &&
        phoneErrorRef.current
      ) {
        nameErrorRef.current.innerHTML = '';
        emailErrorRef.current.innerHTML = '';
        phoneErrorRef.current.innerHTML = '';
      }

      switch (target.name) {
        case 'name':
          setName(target.value);
          break;
        case 'email':
          setEmail(target.value);
          break;
        case 'phone':
          setPhone(target.value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = () => {
    const inputList = document.querySelectorAll('input');
    let hasError = false;
    inputList.forEach((item) => {
      if (item.validity.valueMissing) {
        if (item.previousElementSibling?.lastElementChild) {
          item.previousElementSibling.lastElementChild.innerHTML = requiredError;
          hasError = true;
        }
      }
    });
    if (!hasError) {
      const data = {
        name,
        email,
        phone,
      };
      if (storedData) {
        const dataJson: ReturnedData = JSON.parse(storedData);
        const dataToStored: ReturnedData = {...dataJson, ...data};
        localStorage.setItem('storedData', JSON.stringify(dataToStored));
        dispatch({ type: "ADD", payload: dataJson });
        navigate('/step2');
      }
    }
  };

  return (
    <div className='step1-container step-container'>
      <h1 className='title'>Personal info</h1>
      <p className='subtitle' id='subtitle'>
        Please provide your name, email address, and phone number.
      </p>
      <div className='input-container'>
        <div className='label-container'>
          <label htmlFor='name'>Name</label>
          <span className='name-error' ref={nameErrorRef}></span>
        </div>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='e.g. Stephen King'
          required
          onChange={handleOnChange}
        />
      </div>
      <div className='input-container'>
        <div className='label-container'>
          <label htmlFor='email'>Email Address</label>
          <span className='email-error' ref={emailErrorRef}></span>
        </div>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='e.g. stephenking@lorem.com'
          required
          onChange={handleOnChange}
        />
      </div>
      <div className='input-container'>
        <div className='label-container'>
          <label htmlFor=''>Phone Number</label>
          <span className='phone-error' ref={phoneErrorRef}></span>
        </div>
        <input
          type='text'
          name='phone'
          id='phone'
          placeholder='e.g. +1 234 567 890'
          required
          onChange={handleOnChange}
        />
      </div>
      <div className='btn-footer'>
        <div>
          <button type='button' id='next-btn' onClick={handleSubmit}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1;
