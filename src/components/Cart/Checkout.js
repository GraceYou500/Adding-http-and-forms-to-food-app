import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = props => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    code: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const codeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = event => {
    event.preventDefault();
    const userName = nameInputRef.current.value;
    const userStreet = streetInputRef.current.value;
    const userCode = codeInputRef.current.value;
    const userCity = cityInputRef.current.value;

    const userNameIsValid = !isEmpty(userName);
    const userStreetIsValid = !isEmpty(userStreet);
    const userCodeIsValid = isFiveChars(userCode);
    const userCityIsValid = !isEmpty(userCity);

    console.log(userCodeIsValid);
    console.log(userName, userStreet, userCode, userCity);

    setFormValidity({
      name: userNameIsValid,
      street: userStreetIsValid,
      code: userCodeIsValid,
      city: userCityIsValid,
    });

    const formIsValid =
      userNameIsValid &&
      userStreetIsValid &&
      userCodeIsValid &&
      userCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: userName,
      street: userStreet,
      code: userCode,
      city: userCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formValidity.name ? '' : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.street ? '' : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.code ? '' : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={codeInputRef} />
        {!formValidity.code && <p>Please enter a valid postal code!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formValidity.city ? '' : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
