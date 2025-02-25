import React, { useState, useRef, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SettingsLayouts from "../Settings";
import Button from '../Button';
import axios from 'axios';
import { BASE_URL } from '../../constants';

const ProfileSetting = () => {
  const [imageURL, setImageURL] = useState(""); // To store the base64 image URL
  const [signatureSaved, setSignatureSaved] = useState(false); // To track if the signature has been saved
  const sigCanvas = useRef({});
  const [firm, setFirm] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFirmDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/firms/getFirm/${userId}`);
        if (response.data) {
          setFirm(response.data.firm);
          setFormData({
            name: response.data.firm.name || "",
            title: response.data.firm.title || "",
            email: response.data.firm.email || "",
            phone: response.data.firm.phone?.slice(3) || "", // Assuming phone includes country code
            countryCode: response.data.firm.phone.substring(0, 3) || "+1",
            firmName: response.data.firm.firmName || "",
            firmAddress: response.data.firm.firmAddress || "",
            firmCity: response.data.firm.firmCity || "",
            firmZip: response.data.firm.firmZip || "",
            firmEntity: response.data.firm.firmEntity || "LLC",
            firmState: response.data.firm.firmState || "CA",
          });
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          toast.error('Firm not found');
        } else {
          toast.error('Error fetching firm details');
        }
        console.error('Error fetching firm details:', err);
      }
    };

    fetchFirmDetails();
  }, [userId]);

  const navigate = useNavigate();
  const US_STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

  const [formDataFields, setFormData] = useState({
    name: "",
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
  };

  const validateForm = () => {
    const requiredFields = ['name', 'title', 'email', 'phone', 'firmName', 'firmAddress', 'firmCity', 'firmZip', 'firmEntity', 'firmState'];
    for (let field of requiredFields) {
      if (!formDataFields[field]) {
        return false;
      }
    }
    if (!imageURL) {
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
      let response;
      if (firm) {
        // Update existing firm
        response = await fetch(`${BASE_URL}/firms/updateFirm/${userId}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        // Add new firm
        response = await fetch(`${BASE_URL}/firms/addFirm`, {
          method: 'POST',
          body: formData,
        });
      }

      const result = await response.json();
      if (response.status === 200) {
        toast.success(firm ? 'Updated successfully' : 'Added successfully');
        localStorage.setItem("isFirmInfo", 1);
        // setTimeout(() => {
        //   navigate('/homeNda');
        // }, 2000);
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
    // <SettingsLayouts name="Profile">
    <div className='AddFirm'>
      <ToastContainer />
      <div className=''>
        <div className='form-container-firm'>
          <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Signee Email</Typography></label>
              <input
                type="email"
                name="email"
                value={formDataFields.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group d-flex  column" style={{display:"flex",flexDirection:"column"}}>
              <label><Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>Signee Phone No</Typography></label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <select
                  name="countryCode"
                  value={formDataFields.countryCode}
                  onChange={handleInputChange}
                  style={{ marginRight: '10px', padding: '8px', fontSize: '16px', width: "200px" }}
                >
                  <option value="+1">+1 (USA)</option>
                  <option value="+44">+44 (UK)</option>
                  <option value="+61">+61 (Australia)</option>
                  <option value="+92">+92 (Pakistan)</option>
                  {/* Add more country codes as needed */}
                </select>
                <input
                  type="text"
                  name="phone"
                  value={formDataFields.phone}
                  placeholder='(123) 456-7890'
                  onChange={handleInputChange}
                  style={{ padding: '8px', fontSize: '16px', flex: 1 }}
                />
              </div>
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
                placeholder={"456 Elm Street, Imaginaryville, USA 54321"}
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
            <div>
              <div className="input-group d-flex column" style={{display:"flex",flexDirection:"column"}}>
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
              <div className="input-group" style={{ gridColumn: 'span 2',display:"flex",flexDirection:"column" }}>
                <Typography fontSize={"16px"} fontWeight={400} sx={{ marginBottom: "10px" }}>
                  Insert your Digital Signature Here
                </Typography>
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor='black'
                  canvasProps={{
                    width: 420,
                    height: 200,
                    className: 'sigCanvas',
                    style: { border: '1px solid #000', borderRadius: '8px' }
                  }}
                />
                <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                  <Button text="Save Signature" onClick={saveSignature} />
                  <Button text="Clear Signature" onClick={clearSignature} />
                </div>
                {signatureSaved && (
                  <Typography fontSize={"16px"} fontWeight={400} sx={{ marginTop: "10px", color: "green",marginLeft:"10px" }}>
                    Image Saved
                  </Typography>
                )}
              </div>

            </div>
            <div className='form-row' style={{ gridColumn: 'span 2', textAlign: 'center' }}>
              <Button type="submit" text="Update"  className={"button-components"}  onClick={handleSubmit}/>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </SettingsLayouts>
  );
};

export default ProfileSetting;
