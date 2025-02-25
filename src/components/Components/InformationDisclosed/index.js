import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import Vector from '../../../assets/svg/vector';
import Rectangle from '../../../assets/svg/rec';
import TextAreaComponent from '..';
import { setRulesText } from '../../../redux/ruleSlice';

const InformationDisclosed = ({ onInformationDisclosedChange }) => {
  const dispatch = useDispatch();
  const rules = useSelector(state => state.rules.rules);
  console.log("rules", rules);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    ruleFirst: "",
    ruleSecond: ""
  });

  const [rulesText, setRulesTextState] = useState("");
  const [comments, setComments] = useState("");
  const [inputValues, setInputValues] = useState({});

  const predefinedRules = "6) Ability to Retain Information Disclosed : There will often be a section that states if you decide to no longer pursue the transaction or at the company’s request, you will destroy or return the confidential information and will confirm so in writing.";

  const ruleFirst = "i) If required to respond in writing that all information has been destroyed or returned then want to delete this section";
  const ruleSecond = "ii) If not already present, we recommend adding a section that allows you to retain a copy of the documents for your records in accordance with your internal policies and procedures and to comply with applicable laws. Want to make this edit?";

  const handleCheckboxChange = (group, id, rule, shouldAddRule) => {
    const newSelection = selectedCheckboxes[group] === id ? "" : id;
    
    setSelectedCheckboxes(prev => ({
      ...prev,
      [group]: newSelection
    }));

    updateRulesText(group, id, rule, shouldAddRule);
    onInformationDisclosedChange(newSelection !== "");
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
    debouncedUpdateRulesTextWithComments(event.target.value);
  };

  const handleInputChange = (id, event) => {
    const newValue = event.target.value;
    setInputValues(prev => ({
      ...prev,
      [id]: newValue
    }));
    updateRulesTextWithInput(id, newValue);
  };

  const updateRulesTextWithComments = (comment) => {
    let updatedRules = rulesText;

    if (!updatedRules.includes(predefinedRules)) {
      updatedRules = predefinedRules;
    }

    if (comment) {
      if (updatedRules.includes("(Additional Add to informationDisclosed)")) {
        updatedRules = updatedRules.replace(/(\(Additional Add to informationDisclosed\).*)/, `(Additional Add to informationDisclosed) ${comment}`);
      } else {
        updatedRules += `\n(Additional Add to informationDisclosed) ${comment}`;
      }
    } else {
      updatedRules = updatedRules.replace(/(\n\(Additional Add to informationDisclosed\).*)/, '');
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "informationDisclosed", text: updatedRules }));
  };

  const updateRulesTextWithInput = (id, input) => {
    let updatedRules = rulesText;

    if (!updatedRules.includes(predefinedRules)) {
      updatedRules = predefinedRules;
    }

    const currentRuleText = id === 'confidentialInfoRequired' ? ruleFirst :
      id === 'confidentialInfoRequiredFirst' ? ruleSecond : "";

    const previousInput = inputValues[id] || '';
    if (previousInput) {
      updatedRules = updatedRules.replace(`\n(${currentRuleText}) ${previousInput}`, '').trim();
    }

    if (input) {
      updatedRules += `\n(${currentRuleText}) ${input}`;
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "informationDisclosed", text: updatedRules }));
  };

  const updateRulesText = (group, id, rule, shouldAddRule) => {
    let updatedRules = rulesText;

    if (!updatedRules.includes(predefinedRules)) {
      updatedRules = predefinedRules;
    }

    const ruleText = `\n${rule}`;

    if (shouldAddRule && selectedCheckboxes[group] !== id) {
      if (!updatedRules.includes(ruleText.trim())) {
        updatedRules += ruleText;
      }
    } else {
      updatedRules = updatedRules.replace(ruleText, '').trim();
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "informationDisclosed", text: updatedRules }));
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

  const debouncedUpdateRulesTextWithComments = useCallback(debounce(updateRulesTextWithComments, 500), [comments, rulesText]);

  return (
    <div className='preference-body'>
      <div className='iconParent'>
        <h2 className='fs30 mb-0' style={{ color: '#0D3EBA', fontWeight: "500" }}>
        Ability to Retain Information Disclosed
        </h2>
      </div>
      <>
        <p className='fs24 configDesc' style={{ fontWeight: "500" }}>
        There will often be a section that states if you decide to no longer pursue the transaction or at the company’s request, you will destroy or return the confidential information and will confirm so in writing.
        </p>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          If required to respond in writing that all information has been destroyed or returned, do you want to delete this section?
        </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFirst', 'confidentialInfoRequired', ruleFirst, true)}>
              {selectedCheckboxes['ruleFirst'] === 'confidentialInfoRequired' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Yes
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFirst', 'confidentialInfoDoNotRedline', ruleFirst, false)}>
              {selectedCheckboxes['ruleFirst'] === 'confidentialInfoDoNotRedline' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              No
        </p>
            </div>
            {selectedCheckboxes['ruleFirst'] === 'confidentialInfoRequired' && (
              <div className="input-group" style={{ marginRight: "20px" }}>
                <input
                  type="text"
                  value={inputValues['confidentialInfoRequired'] || ''}
                  onChange={(e) => handleInputChange('confidentialInfoRequired', e, ruleFirst)}
                  placeholder="Add details"
                  style={{ fontSize: '18px' }} // Increase font size
                />
              </div>
            )}
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          If not already present, we recommend adding a section that allows you to retain a copy of the documents for your records in accordance with your internal policies and procedures and to comply with applicable laws. Want to make this edit?
        </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleSecond', 'confidentialInfoRequiredFirst', ruleSecond, true)}>
              {selectedCheckboxes['ruleSecond'] === 'confidentialInfoRequiredFirst' ? <Vector /> : <Rectangle />}
              
              <p className='fs24'>
              Yes
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleSecond', 'confidentialInfoDoNotRedlineFirst', ruleSecond, false)}>
              {selectedCheckboxes['ruleSecond'] === 'confidentialInfoDoNotRedlineFirst' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              No
        </p>
            </div>
          </div>
        </div>
        <div className='input-preferences'>
          <p className='fs24'>
          Anything else you want to add to your preferences as it relates to Information Disclosed?
        </p>
          <div className='input-preference'>
            <TextAreaComponent
              id="commentBox1"
              value={comments}
              onChange={(e) => handleCommentChange(e)}
              placeholder="Add comments"
              style={{ fontSize: '18px' }} // Increase font size
            />
          </div>
        </div>
      </>
    </div>
  );
}

export default InformationDisclosed;
