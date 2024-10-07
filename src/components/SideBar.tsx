import { useMatch } from 'react-router-dom';
import '../assets/css/SideBar.css';

const SideBar = () => {

  //  For knowing which route
  const step1 = useMatch('/');
  const step2 = useMatch('/step2');
  const step3 = useMatch('/step3');
  const step4 = useMatch('/step4');
  const thankyou = useMatch('thankyou');

  return (
    <aside className='nav-container'>
      <ul className='nav-list'>
        <li className='nav-item'>
          <span id={step1 ? 'active': ''}>1</span>
          <div className='nav-text'>
            <span>STEP 1</span>
            <p>YOUR INFO</p>
          </div>
        </li>
        <li className='nav-item'>
          <span id={step2 ? 'active': ''}>2</span>
          <div className='nav-text'>
            <span>STEP 2</span>
            <p>SELECT PLAN</p>
          </div>
        </li>
        <li className='nav-item'>
          <span id={step3 ? 'active': ''}>3</span>
          <div className='nav-text'>
            <span>STEP 3</span>
            <p>ADD-ONS</p>
          </div>
        </li>
        <li className='nav-item'>
          <span id={step4 || thankyou ? 'active': ''}>4</span>
          <div className='nav-text'>
            <span>STEP 4</span>
            <p>SUMMARY</p>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
