import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/Step4.css';
import { useEffect, useState } from 'react';
import { ReturnedData } from '../../types';
import { initialState, useAddOnDispatch } from '../../contexts/constants';


const Step4 = () => {
  const navigate = useNavigate();
  const storedData = localStorage.getItem('storedData');
  const dispatch = useAddOnDispatch();
  const [storedDataJson, setStoredDataJson] = useState<ReturnedData | null>(null);


  useEffect(() => {
    if (storedData) {
      const dataJson: ReturnedData = JSON.parse(storedData);
      setStoredDataJson(dataJson);
    }
  }, [storedData]);

  return (
    <div className='step4-container step-container'>
      <h1>Finishing up</h1>
      <p className='subtitle'>
        Double-check everything looks OK before confirming.
      </p>
      <div className='check-container'>
        <div className='selected-plan'>
          <div>
            <h2>{storedDataJson?.plan.name} ({ storedDataJson?.plan.date === 'mo'? 'Monthly': 'Yearly' })</h2>
            <span onClick={() => navigate('/step2')}>Change</span>
          </div>
          <span>${storedDataJson?.plan.price}/{storedDataJson?.plan.date}</span>
        </div>
        <div className='selected-addons'>
          {
            storedDataJson?.addOn.map((data, idx) => (
            <div key={idx}>
              <p>{data.name}</p>
              <span>${data.price}/{storedDataJson?.plan.date}</span>
            </div>
            ))
          }
        </div>
      </div>
      <div className='total-container'>
        <p>Total (per { storedDataJson?.plan.date === 'mo'? 'month': 'year' })</p>
        <h2>${storedDataJson?.addOn.reduce((prev, next) => prev + next.price, storedDataJson?.plan.price)}/{storedDataJson?.plan.date}</h2>
      </div>

      <div className='btn-footer'>
        <div>
          <Link to='/step3'>
            <button type='button' id='back-btn'>Go Back</button>
          </Link>
          <Link to='/thankyou'>
            <button type='button' id='btn-confirm' onClick={() => {
              localStorage.removeItem('storedData');
              dispatch({ type: 'REMOVE', payload: initialState });
            }}>
              Confirm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Step4;
