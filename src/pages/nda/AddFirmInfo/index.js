import React, { useState, useRef } from 'react';
import './index.css';
import { Typography } from '@mui/material';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddFirm = ({ onTaskComplete, PreviousTaskAndAdvance }) => {
  const [imageURL, setImageURL] = useState(""); // To store the base64 image URL
  const [signatureSaved, setSignatureSaved] = useState(false); // To track if the signature has been saved
  const sigCanvas = useRef({});
  const [phoneError, setPhoneError] = useState(""); // To track phone number validation error

  const navigate = useNavigate();
  const US_STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  const userId = localStorage.getItem('userId');

  const [formDataFields, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    countryCode: '+1',
    firmName: '',
    firmAddress: '',
    firmCity: '',
    firmZip: '',
    firmEntity: 'LLC',
    firmState: 'CA',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === "phone" || name === "countryCode") {
      validatePhoneNumber(name === "phone" ? value : formDataFields.phone, name === "countryCode" ? value : formDataFields.countryCode);
    }
  };

  const validatePhoneNumber = (phone, countryCode) => {
    let phoneLength = countryCode === '+1' ? 10 : (countryCode === '+92' ? 11 : phone.length);
    if (phone.length > phoneLength) {
      setPhoneError(`Phone number must be ${phoneLength} digits long`);
    } else {
      setPhoneError("");
    }
  };

  const validateForm = () => {
    const requiredFields = ['name', 'title', 'email', 'phone', 'firmName', 'firmAddress', 'firmCity', 'firmZip', 'firmEntity', 'firmState'];
    for (let field of requiredFields) {
      if (!formDataFields[field]) {
        return false;
      }
    }
    if (!imageURL || phoneError) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("All fields, including the signature, are required");
      return;
    }

    const formData = new FormData();
    formData.append('name', formDataFields.name);
    formData.append('title', formDataFields.title);
    formData.append('email', formDataFields.email);
    formData.append('phone', `${formDataFields.countryCode}${formDataFields.phone}`);
    formData.append('firmName', formDataFields.firmName);
    formData.append('firmAddress', formDataFields.firmAddress);
    formData.append('firmCity', formDataFields.firmCity);
    formData.append('firmZip', formDataFields.firmZip);
    formData.append('firmEntity', formDataFields.firmEntity);
    formData.append('firmState', formDataFields.firmState);
    formData.append('userId', userId);
    formData.append('signatureFile', imageURL);

    try {
      const response = await fetch('https://mydealai.com:5000/firms/addFirm', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.status === 200) {
        toast.success('Added successfully');
        localStorage.setItem("isFirmInfo", 1);
        setTimeout(() => {
          navigate('/homeNda');
        }, 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error submitting form");
    }
  };

  const saveSignature = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
    setSignatureSaved(true);
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
    setImageURL("");
    setSignatureSaved(false);
  };

  return (
    <div className='AddFirm'>
      <ToastContainer />
      <div className='AddFirmflex'>
        <div className='AddFirmflexText'>
          <h2 className='fs36 mb-0' style={{color: "#353535", fontWeight: "500"}}>
            Your preferences are configured!
          </h2>
          <p className='fs16 AddFirmflexText__'>
          Please add your firm's information so that we can send you the filled-out and signed document along with your redlines.
          </p>
          <div className='button-firm'>
            <Button text={"Back"} className={"button-components"} onClick={PreviousTaskAndAdvance} />
            <Button text={"Finish"} className={"button-components"} onClick={handleSubmit} />
          </div>
        </div>
        <div className='form-container'>
          <form>
            <div className="input-group">
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Signee Name</Typography></label>
              <input
                type="text"
                name="name"
                value={formDataFields.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Signee Title</Typography></label>
              <input
                type="text"
                name="title"
                value={formDataFields.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Your Email</Typography></label>
              <input
                type="email"
                name="email"
                value={formDataFields.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group ">
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Signee Phone No</Typography></label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                  name="countryCode"
                  value={formDataFields.countryCode}
                  onChange={handleInputChange}
                  style={{ marginRight: '10px', padding: '8px', fontSize: '16px', width: "fit-content" }}
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44 </option>
                  <option value="+61">+61</option>
                  <option value="+92">+92</option>
                  {/* Add more country codes as needed */}
                </select>
                <input
                  type="text"
                  name="phone"
                  value={formDataFields.phone}
                  onChange={handleInputChange}
                  style={{ padding: '8px', fontSize: '16px', flex: 1 }}
                />
              </div>
              {phoneError && (
                <Typography fontSize={"14px"} fontWeight={400} sx={{ color: 'red', marginTop: '10px' }}>
                  {phoneError}
                </Typography>
              )}
            </div>
            <div className="input-group">
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Firm Legal Name</Typography></label>
              <input
                type="text"
                name="firmName"
                value={formDataFields.firmName}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Firm Street Address</Typography></label>
              <input
                type="text"
                name="firmAddress"
                value={formDataFields.firmAddress}
                placeholder={"456 Elm Street, USA 54321"}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Firm City</Typography></label>
              <input
                type="text"
                name="firmCity"
                value={formDataFields.firmCity}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Firm Zip Code</Typography></label>
              <input
                type="text"
                name="firmZip"
                value={formDataFields.firmZip}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group-flex">
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Firm Entity type and state</Typography></label>
              <div className='input-group-select'>
                <select
                  name="firmEntity"
                  value={formDataFields.firmEntity}
                  onChange={handleInputChange}
                >
                  <option value="LLC">LLC</option>
                  <option value="Inc">Inc</option>
                  <option value="Corp">Corp</option>
                </select>
                <select
                  name="firmState"
                  value={formDataFields.firmState}
                  onChange={handleInputChange}
                >
                  {US_STATES.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </form>
          <div className="input-group">
            <Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>
              Insert your Digital Signature Here
            </Typography>
            <SignatureCanvas
              ref={sigCanvas}
              penColor='black'
              canvasProps={{
                height: 200,
                width:300,
                className: 'sigCanvas',
                style: { border: '1px solid #000', borderRadius: '8px' }
              }}
            />
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
              <Button text="Save Signature" onClick={saveSignature} />
              <Button text="Clear Signature" onClick={clearSignature} />
            </div>
            {signatureSaved && (
              <Typography fontSize={"16px"} fontWeight={400} sx={{ marginTop: "10px", color: "green", marginLeft: "10px" }}>
                Image Saved
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFirm;
