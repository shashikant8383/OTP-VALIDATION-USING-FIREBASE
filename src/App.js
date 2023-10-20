import React, { useState } from 'react';
import firebase from './firebase';
import { getAuth, signInWithPhoneNumber } from 'firebase/auth';
import './App.css';
const App = () => {
  const [state, setState] = useState({
    mobile: '',
    otp: '',
  });
  const handelChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log('RecaptchaVerified');
      },
      defaultCountry: 'IN',
    });
  };

  const onSignInSubmit = (event) => {
    event.preventDefault();
    configureCaptcha();

    const phoneNumber = '+91' + state.mobile;
    console.log(phoneNumber);

    const appVerifier = window.recaptchaVerifier;
    const auth = getAuth();

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log('OTP has been sent');
      })
      .catch((error) => {
        console.log('SMS not sent', error);
      });
  };

  const onSubmitotp = (event) => {
    event.preventDefault();
    const code = state.otp;
    console.log(code);

    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        alert('User verified');
      })
      .catch((error) => {
        console.log('User couldn\'t sign in (bad verification code?)', error);
      });
  };

  return (
    <div>
      <h1>Login form</h1>
      <form onSubmit={onSignInSubmit}>
        <div id='sign-in-button'></div>
        <h2>Mobile No</h2>
        <label>Mobile No:</label>
        <input type='number' name='mobile' placeholder='Enter Mobile No' required onChange={handelChange} />
        <button type='submit'>Submit</button>
      </form>
      <h2>Enter OTP</h2>
      <form onSubmit={onSubmitotp}>
        <label>Enter OTP:</label>
        <input type='number' name='otp' placeholder='Enter OTP' required onChange={handelChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};
export default App;
