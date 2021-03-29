import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
    const savedCart = getDatabaseCart();
    const oderDetails = { ...loggedInUser, products: savedCart, shipment: data, oderTime: new Date() };

    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(oderDetails)
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          alert('order placed')
            processOrder();
        }
      })

  }

  console.log(watch("example"));
  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} placeholder="Your name" ref={register({ required: true })} />

      {errors.name && <span className="error">Name is required</span>}

      <input name="email" defaultValue={loggedInUser.email} placeholder="Your email" ref={register({ required: true })} />

      {errors.email && <span className="error">Email is required</span>}

      <input name="address" placeholder="Your address" ref={register({ required: true })} />

      {errors.address && <span className="error">Address is required</span>}

      <input name="phone" placeholder="Your Phone number" ref={register({ required: true })} />

      {errors.phone && <span className="error">Phone Number is required</span>}

      <input type="submit" />
    </form>
  );
};

export default Shipment;