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
    </div>
  );
};

export default ThankYou;
