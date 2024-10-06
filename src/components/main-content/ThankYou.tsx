import '../../assets/css/Thankyou.css';

const ThankYou = () => {
  return (
    <div className='thankyou-container'>
      <img
        src='./images/icon-thank-you.svg'
        alt='thank you icon'
        className='thankyou-icon'
      />
      <h1>Thank you!</h1>
      <p>
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
      {/* <label htmlFor="toggle" className='toggle-switch'>
        <input type="checkbox" name="toggle" id="toggle" />
        <span className="slider round"></span>
      </label>
      <input type="checkbox" id="check" className='check-me'/>
      <label htmlFor="check">Check me</label> */}
    </div>
  );
};

export default ThankYou;
