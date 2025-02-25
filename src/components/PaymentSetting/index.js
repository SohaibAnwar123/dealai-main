import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import image from "../../assets/atm-card.png";
import "./index.css"; // Assuming you have CSS in index.css
import { BASE_URL } from '../../constants/index.js';

const PaymentSetting = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
const handleNavigation=()=>{
  navigate("/payment")
}
  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/getPayment/${userId}`);
        setPaymentInfo(response.data);
        setError(null);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError('No Payment Method');
        } else {
          console.error('Error fetching payment info:', error);
          setError('An error occurred while fetching payment information');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentInfo();
  }, [userId]);



  return (
    <div>
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <div className="card mb-0">
              <div className="card-body px-0">
                {loading ? (
                  <p>Loading payment information...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : (
                  paymentInfo.map((info, index) => (
                    <div key={index} className="verify-content">
                      <div className="d-flex align-items-center main-credit">
                        <span className="credit-image">
                          <img src={image} alt="Credit Card" />
                        </span>
                        <div className="primary-number">
                          <p className="mb-0">{info.cardHolderName}</p>
                          <small>Credit Card ****{info.cardNumber?.slice(-4)}</small>
                          <br />
                          <small>Expiry Date: {info.expiryDate}</small>
                        </div>
                      </div>
                      <button className="btn btn-outline-primary" onClick={handleNavigation} >Manage</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSetting;
