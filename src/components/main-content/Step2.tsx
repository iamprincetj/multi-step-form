import { useEffect, useRef, useState } from 'react';
import '../../assets/css/Step2.css';
import { Link, useNavigate } from 'react-router-dom';
import { Plans, ReturnedData } from '../../types';
import { emptyState, useAddOnDispatch, useAddOnValue } from '../../contexts/constants';

const Step2 = () => {
  const [on, setOn] = useState<boolean>(false);
  const arcadePlan = useRef<HTMLDivElement>(null);
  const advancedPlan = useRef<HTMLDivElement>(null);
  const proPlan = useRef<HTMLDivElement>(null);
  const [plans, setPlans] = useState<Plans | null>(null);
  const storedData = localStorage.getItem('storedData');
  const dispatch = useAddOnDispatch();
  const dataInStore = useAddOnValue();
  const navigate = useNavigate();

  const planList: React.RefObject<HTMLDivElement>[] = [
    arcadePlan,
    advancedPlan,
    proPlan,
  ];

  const addPlans = () => {
    planList.forEach((val: React.RefObject<HTMLDivElement>) => {
      const element = val.current;
      element?.addEventListener('click', () => {
        planList.forEach((value) => {
          if (value.current) {
            value.current.style.borderColor = '';
          }
        });
        if (element) {
          element.style.borderColor = 'hsl(243, 100%, 62%)';
          if (
            element.children[1].childNodes[0].textContent &&
            element.children[1].childNodes[1].textContent
          ) {
            const planName = element.children[1].childNodes[0].textContent;
            const planInfo = element.children[1].childNodes[1].textContent;
            const planPrice = planInfo.split('/')[0];
            const planDate = planInfo.split('/')[1];
            const plan: Plans = {
              name: planName,
              price: Number(planPrice.slice(1)),
              date: planDate,
            };
            setPlans(plan);
          }
        }
      });
    });
  };

  const divElement: HTMLDivElement | null = plans?.name
    ? document.querySelector(`.${plans?.name.toLowerCase()}`)
    : null;

  const resetPlans = (element: HTMLDivElement | null) => {
    if (element) {
      element.style.borderColor = 'hsl(243, 100%, 62%)';
      if (
        element.children[1].childNodes[0].textContent &&
        element.children[1].childNodes[1].textContent
      ) {
        const planName = element.children[1].childNodes[0].textContent;
        const planInfo = element.children[1].childNodes[1].textContent;
        const planPrice = planInfo.split('/')[0];
        const planDate = planInfo.split('/')[1];
        const plan: Plans = {
          name: planName,
          price: Number(planPrice.slice(1)),
          date: planDate,
        };
        setPlans(plan);
      }
    }
  };

  useEffect(() => {
    addPlans();
    const trackSelectedPlan = () => {
      if (storedData) {
        const dataJson: ReturnedData = JSON.parse(storedData);
        const element: HTMLDivElement | null = dataJson.plan.name
          ? document.querySelector(`.${dataJson.plan.name.toLowerCase()}`)
          : null;
        if (element) {
          element.style.borderColor = 'hsl(243, 100%, 62%)';
        }
        const date = dataInStore ? dataInStore.plan.date : dataJson.plan.date;
        const inputElement: HTMLInputElement | null =
          document.querySelector('#toggle');

        setOn(date === 'yr' ? true : false);
        setPlans(dataInStore.plan);
        if (date === 'yr') {
          inputElement?.click();
        }
      }
    };

    trackSelectedPlan();
  }, [storedData, dataInStore]);

  useEffect(() => {
    resetPlans(divElement);
  }, [on]);

  const handleSubmit = () => {
    if (storedData && JSON.stringify(plans) !== JSON.stringify(emptyState.plan)) {
      const dataJson = JSON.parse(storedData);
      const newStoredData = { ...dataJson, plan: plans };
      localStorage.removeItem('storedData');
      localStorage.setItem('storedData', JSON.stringify(newStoredData));
      dispatch({ type: 'ADD', payload: newStoredData });
      navigate('/step3');
    } else {
      document.querySelector('.interaction-container .error')!.textContent  = 'Please select a plan';
    }
  };

  return (
    <div className='step2-container step-container'>
      <h1>Select your plan</h1>
      <p className='subtitle'>
        You have the option of monthly or yearly billing.
      </p>
      <div className='interaction-container'>
        <p className='error'></p>
        <div className='plans-container'>
          <div ref={arcadePlan} className='arcade'>
            <img
              src='./images/icon-arcade.svg'
              alt='arcade icon'
              className='arcade-icon'
            />
            <span>
              <h2>Arcade</h2>
              <p>${on === true ? '90/yr' : '9/mo'}</p>
              {on === true&& <span>2 months free</span>}
            </span>
          </div>
          <div ref={advancedPlan} className='advanced'>
            <img
              src='./images/icon-advanced.svg'
              alt='advanced icon'
              className='advanced-icon'
            />
            <span>
              <h2>Advanced</h2>
              <p>${on === true? '120/yr' : '12/mo'}</p>
              {on === true&& <span>2 months free</span>}
            </span>
          </div>
          <div ref={proPlan} className='pro'>
            <img
              src='./images/icon-pro.svg'
              alt='pro icon'
              className='pro-icon'
            />
            <span>
              <h2>Pro</h2>
              <p>${on === true? '150/yr' : '15/mo'}</p>
              {on === true&& <span>2 months free</span>}
            </span>
          </div>
        </div>
        <div className='toggler'>
          <h3>Monthly</h3>
          <label htmlFor='toggle'>
            <input
              type='checkbox'
              name='toggle'
              id='toggle'
              onChange={({ target }) => {
                setOn(target.checked);
              }}
            />
            <span className='slider round'></span>
          </label>
          <h3>Yearly</h3>
        </div>
      </div>

      <div className='btn-footer'>
        <div>
          <Link to='/'>
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

export default Step2;
