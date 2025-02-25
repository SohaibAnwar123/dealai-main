import React, { useState, useEffect } from 'react';
import './index.css';
import { Typography } from '@mui/material';
import Button from '../../../components/Button';
import PayPalButton from '../../../components/PaypalButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../constants';
import AppBar from '../../../components/AppBar';

const Payment = () => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchPaymentInfo(storedUserId); // Fetch payment info if userId exists
    }
  }, []);

  const fetchPaymentInfo = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/getPayment/${userId}`);
      if (response.data && response.data.length > 0) {
        const payment = response.data[0];
        setCardHolderName(payment.cardHolderName);
        setCardNumber(payment.cardNumber);
        setExpiry(payment.expiryDate);
        setCvv(payment.cvv);
      }
    } catch (error) {
      console.error('Error fetching payment info:', error);
    }
  };

  const handleNavigation = () => {
    navigate('/homeNdaLanding');
  };

  const handleCreatePaymentLink = () => {
    fetch('https://mydealai.com:5000/payments/create-payment-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ redirectUrl: 'https://mydealai.com/homeNdaLanding' }),
    })
      .then(response => response.json())
      .then(data => {
        window.location.href = data.link.url;
      });
  };

  const handleSaveCardDetails = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/savePayment`, {
        userId,
        cardHolderName,
        cardNumber,
        expiryDate: expiry,
        cvv,
      });

      if (response.status === 201) {
        console.log('Payment information saved successfully');
        // handleNavigation(); // Navigate on successful payment
      } else {
        console.error('Failed to save payment information');
      }
    } catch (error) {
      console.error('Error saving payment information:', error);
    }
  };

  const validateCardNumber = (number) => {
    const firstDigit = number.charAt(0);
    const length = number.length;

    if ((firstDigit === '4' || firstDigit === '5' || firstDigit === '6') && length === 16) {
      return true;
    } else if (firstDigit === '3' && length === 15) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }
    if (!validateCardNumber(cardNumber)) {
      setError('Invalid card number length');
      return;
    }
    setError('');
    await handleSaveCardDetails();
    handleCreatePaymentLink();
  };

  return (
    <>
    <AppBar/>
    <div className='main'>
      <div className='payment-card'>
        <div className='payment-card-header'>
          <Typography fontSize={"24px"} fontWeight={600} color={"#0F46D2"}>Your Free Trial Period has ended. Please add a
          payment method to continue saving time on your NDAs.</Typography>
          <Button text={"Back"} className={"button-components-back"} onClick={handleNavigation} />
        </div>
        <div className='card-main'>
          <div className='card-paypal'>
            <div className='card-paypal-body'>
              <Typography fontSize={"20px"} fontWeight={500}>
                Payment details
              </Typography>

              <div className="divider">
                <Typography fontSize={"12px"} fontWeight={400}>
                  or pay with credit card number
                </Typography>
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="form-group">
                <label><Typography fontSize={"14px"} fontWeight={400}>Card Holder Name</Typography></label>
                <input
                  type="text"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label><Typography fontSize={"14px"} fontWeight={400}>Card Number</Typography></label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className='flex'>
                <div className="form-group">
                  <label><Typography fontSize={"14px"} fontWeight={400}>Expiry</Typography></label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder='MM/YY'
                  />
                </div>
                <div className="form-group-ccv">
                  <label>CVV</label>
                  <input
                    type="password"
                    placeholder="••••" // This sets the placeholder text
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="cvv-input" // Apply custom styling
                  />
                </div>
              </div>
              <Button text={"Save Payment"} className={"button-components-payment"} onClick={handleSubmit} />
            </div>
          </div>
          <div className='card-monthly'>
            <div className='card-paypal-body'>
              <Typography fontSize={"20px"} fontWeight={500} sx={{ marginBottom: "9px" }}>
                Monthly Plan
              </Typography>
              <Typography fontSize={"16px"} fontWeight={500} color={"#828181"}>
                $14.99/month
              </Typography>
              <div className='payment-section'>
                <div className='payment-section-space-between'>
                  <Typography fontSize={"18px"} fontWeight={500} color={"#0D0D0D"}>
                    Subtotal
                  </Typography>
                  <Typography fontSize={"16px"} fontWeight={500} color={"#828181"}>
                    $14.99
                  </Typography>
                </div>
              </div>
              <div className="divider-line">
              </div>
              <div className='payment-section-space-between'>
                <Typography fontSize={"18px"} fontWeight={500} color={"#0D0D0D"}>
                  Billed Now
                </Typography>
                <Typography fontSize={"16px"} fontWeight={500} color={"#828181"}>
                $14.99
                </Typography>
              </div>
              <div className='trial-button'>
                <Button text={"Processed"} className={"button-components-payment"} onClick={handleSubmit} />
              </div>
              {/* <div className='payment-due'>
                <img src={check} alt='check' />
                <Typography fontSize={"18px"} fontWeight={500}>
                  No payment due now
                </Typography>
              </div>
              <div className='footer-text'>
                <Typography fontSize={"12px"} fontWeight={500} lineHeight={"22px"}>At the end of the 7 day period, you will be charged $14.99 USD automatically.</Typography>
                <Typography fontSize={"12px"} fontWeight={500} lineHeight={"22px"}>You will be charged $14.99 USD monthly thereafter while subscription is active.</Typography>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Payment;
