import { Routes, Route } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import ThankYou from './ThankYou';
import '../../assets/css/MainContent.css';

const MainContent = () => {
  return (
    <div className='main-container'>
      <Routes>
        <Route path='/' element={<Step1 />} />
        <Route path='/step2' element={<Step2 />} />
        <Route path='/step3' element={<Step3 />} />
        <Route path='/step4' element={<Step4 />} />
        <Route path='/thankyou' element={<ThankYou />} />
      </Routes>
    </div>
  );
};

export default MainContent;
