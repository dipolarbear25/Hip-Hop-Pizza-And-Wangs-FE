import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrder, getOrders, updateOrder } from '../../API/orderAPI';

const intialState = {
  name: '',
  Email: '',
  albumid: '',
  Number: '',
};

function OrderForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
    getOrders(user.uid).then(setOrders);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateOrder(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createOrder(payload).then(({ Name }) => {
        const patchPayload = { name: Name };

        updateOrder(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Customer Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="please enter the customer name."
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Customer Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Contact Number"
            name="Number"
            value={formInput.Number}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Customer Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="Email"
            value={formInput.Email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Select
          name="albumid"
          onChange={handleChange}
          value={formInput.albumid}
          required
        >
          <option value="">Select an album for this song</option>
          {
            orders.map((album) => (
              <option
                key={album.firebaseKey}
                value={album.firebaseKey}
              >
                {album.albumname}
              </option>
            ))
          }
        </Form.Select>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Song' : 'Submit Song'}
        </Button>
      </Form>
    </>
  );
}

OrderForm.propTypes = {
  obj: PropTypes.shape({
    Email: PropTypes.string,
    albumid: PropTypes.string,
    name: PropTypes.string,
    Number: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

OrderForm.defaultProps = {
  obj: intialState,
};

export default OrderForm;
