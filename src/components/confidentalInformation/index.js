import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import Vector from '../../assets/svg/vector';
import Rectangle from '../../assets/svg/rec';
import { setRulesText } from '../../redux/ruleSlice';
import TextAreaComponent from '../Components';
import './index.scss'

const ConfidentialInformation = ({ onConfidentialInfoChange }) => {
  const dispatch = useDispatch();
  const rules = useSelector((state) => state.rules.rules);
  console.log("rules", rules);

  const predefinedRules = {
    confidentialInfoRequired: "1) Confidential Information: Confidential Information is usually a defined term that will dictate what information that is shared is bound by this NDA.",
  };

  const [selectedCheckbox, setSelectedCheckbox] = useState("");
  const [rulesText, setRulesTextState] = useState("");
  const [comments, setComments] = useState("");

  const handleCheckboxChange = (id) => {
    const newSelection = selectedCheckbox === id ? "" : id;
    setSelectedCheckbox(newSelection);
    if (id === 'confidentialInfoRequired') {
      onConfidentialInfoChange(newSelection === 'confidentialInfoRequired');
    }
    updateRulesText(newSelection, comments);
  };

  const handleCommentChange = (id, event) => {
    setComments(event.target.value);
    debouncedUpdateRulesText(id, event.target.value);
  };

  const updateRulesText = (id, comments) => {
    let updatedText = predefinedRules[id] || "";

    if (id === 'confidentialInfoRequired' && comments) {
      updatedText += ` (i) ${comments}`;
    }

    setRulesTextState(updatedText);
    dispatch(setRulesText({ id: "Confidential Information", text: updatedText }));
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const debouncedUpdateRulesText = useCallback(debounce(updateRulesText, 500), [selectedCheckbox, rulesText]);

  return (
    <div className='preference-body'>
      <h2 className='fs30 mb-0' style={{ color: '#0D3EBA', fontWeight: "500" }}>
        Definition of Confidential Information
      </h2>
      <p className='fs24 configDesc'>
        To ensure that we redline your NDAs in a manner that aligns with your preferences, please indicate whether you would like us to adhere to our standard practices or tailor the redlining process to your specific preferences.
      </p>
      <div className='preferences-detail-box'>
        <p className='fs24'>
          1. Confidential Information should be mutual as in it things you share with them are also bound by the NDA.
        </p>
        <div className='preferences-detail-checkbox'>
          <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('confidentialInfoRequired')}>
            {selectedCheckbox === 'confidentialInfoRequired' ? <Vector /> : <Rectangle />}
            <p className='fs24'>
              Required
            </p>
          </div>
          <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('confidentialInfoDoNotRedline')}>
            {selectedCheckbox === 'confidentialInfoDoNotRedline' ? <Vector /> : <Rectangle />}
            <p className='fs24'>
            Do not redline
            </p>
          </div>
          <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('confidentialInfoOnlyRedline')}>
            {selectedCheckbox === 'confidentialInfoOnlyRedline' ? <Vector /> : <Rectangle />}
            <p className='fs24'>
            Only redline if other items are being redlined
            </p>
          </div>
        </div>
      </div>
      <div className='input-preferences'>
        <p className='fs24'>
        2. Anything else you want to add to your preferences as it relates to the definition of confidential information?
            </p>

        <div className='input-preference'>
          <TextAreaComponent
            id="commentBox1"
            value={comments}
            onChange={(e) => handleCommentChange('confidentialInfoRequired', e)}
            placeholder="Add comments"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfidentialInformation;
