import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/Step3.css';
import { useEffect, useRef, useState } from 'react';
import { Plans, ReturnedData } from '../../types';
import { useAddOnDispatch, useAddOnValue } from '../../contexts/constants';

const Step3 = () => {
  const [addOn, setAddOn] = useState<Plans[]>([]);
  const storedData = localStorage.getItem('storedData');
  const dataInStore = useAddOnValue();
  const [displayMonth, setDisplayMonth] = useState<string>(
    dataInStore.plan.date
  );
  const checkedRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAddOnDispatch();

  useEffect(() => {
    if (storedData) {
      const dataJson: ReturnedData = JSON.parse(storedData);
      dispatch({ type: 'ADD', payload: dataJson });
      setDisplayMonth(dataJson.plan.date);
      dataJson.addOn.forEach((val) => {
        const element = document.getElementsByName(val.name);
        element[0].click();
      });
    }
  }, [storedData]);

  console.log(addOn);

  const handleOnChangeAddOn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    if (target.checked) {
      const nextDiv = target.nextSibling?.nextSibling;
      if (nextDiv) {
        const addOnPrice = nextDiv?.nextSibling?.textContent;
        const name = nextDiv?.childNodes[0].textContent as string;
        const price = Number(addOnPrice?.split('/')[0].slice(2));
        if (storedData) {
          const dataJson: ReturnedData = JSON.parse(storedData);
          const data: Plans = {
            name,
            price,
            date: dataJson.plan.date,
          };
          setAddOn((prev) => prev.concat(data));
        }
      }
    } else {
      setAddOn((prev) => prev.filter((data) => data.name !== target.name));
    }
  };

  const handleSubmit = () => {
    if (storedData && addOn.length > 0) {
      const dataJson: ReturnedData = JSON.parse(storedData);
      const dataToStore = { ...dataJson, addOn };
      localStorage.setItem('storedData', JSON.stringify(dataToStore));
      dispatch({ type: 'ADD', payload: dataJson });
      navigate('/step4');
    } else {
      document.querySelector('.add-on-error')!.textContent =
        'Please select at least one add-on';
    }
  };

  return (
    <div className='step3-container step-container'>
      <h1>Pick add-ons</h1>
      <p className='subtitle'>Add-ons help enhance your gaming experience.</p>

      <div>
        <p className='add-on-error'></p>
        <div className='service-container'>
          <input
            type='checkbox'
            name='Online service'
            id='online-service'
            onChange={handleOnChangeAddOn}
            ref={checkedRef}
          />
          <label htmlFor='online-service'></label>
          <div>
            <h2>Online service</h2>
            <p>Access to multiplayer games</p>
          </div>
          {displayMonth && displayMonth === 'mo' && (
            <span>+$1/{displayMonth}</span>
          )}
          {displayMonth && displayMonth === 'yr' && (
            <span>+$10/{displayMonth}</span>
          )}
        </div>
        <div className='service-container'>
          <input
            type='checkbox'
            name='Larger storage'
            id='larger-storage'
            onChange={handleOnChangeAddOn}
          />
          <label htmlFor='larger-storage'></label>
          <div>
            <h2>Larger storage</h2>
            <p>Extra 1TB of cloud save</p>
          </div>
          {displayMonth && displayMonth === 'mo' && (
            <span>+$2/{displayMonth}</span>
          )}
          {displayMonth && displayMonth === 'yr' && (
            <span>+$20/{displayMonth}</span>
          )}
        </div>
        <div className='service-container'>
          <input
            type='checkbox'
            name='Customizable Profile'
            id='customizable'
            onChange={handleOnChangeAddOn}
          />
          <label htmlFor='customizable'></label>
          <div>
            <h2>Customizable Profile</h2>
            <p>Custom theme on your profile</p>
          </div>
          {displayMonth && displayMonth === 'mo' && (
            <span>+$2/{displayMonth}</span>
          )}
          {displayMonth && displayMonth === 'yr' && (
            <span>+$20/{displayMonth}</span>
          )}
        </div>
      </div>

      <div className='btn-footer'>
        <div>
          <Link to='/step2'>
            <button type='button' id='back-btn'>
              Go Back
            </button>
          </Link>
          <button type='button' id='next-btn' onClick={handleSubmit}>
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
