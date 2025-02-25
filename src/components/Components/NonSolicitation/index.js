import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import Vector from '../../../assets/svg/vector';
import Rectangle from '../../../assets/svg/rec';
import TextAreaComponent from '..';
import { setRulesText } from '../../../redux/ruleSlice';

const NonSolicitation = ({ onNonSolicitationChange }) => {
  const dispatch = useDispatch();
  const rules = useSelector((state) => state.rules.rules);
  console.log("rules", rules);

  const predefinedRules = "7) Non-Solicitation: Almost all NDAs will have a non-solicitation section that states your firm and affiliates will not solicit the company’s employees or customers.";

  const ruleFirst = "i) We recommend adding a carveout to this section that doesn’t stop you from hiring people that (i) originates from general solicitations for employment not directed toward a specific individual of the Company or (ii) is not initiated by someone who had access to confidential information";
  const ruleSecond = "ii) If not already present, we recommend adding a carveout that explicitly states that your firm or your affiliates currently or intend to do business in the Company’s market and nothing in the document shall prohibit you or your affiliates from contacting or doing business with the Company’s customers in the ordinary course of business";

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    ruleFirst: "",
    ruleSecond: ""
  });

  const [rulesText, setRulesTextState] = useState("");
  const [comments, setComments] = useState("");
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const initialCheckboxes = { ...selectedCheckboxes };

    rules.forEach(rule => {
      if (rule.text.includes(predefinedRules)) {
        initialCheckboxes[rule.id] = rule.id;
        setRulesTextState(rule.text);
      }
    });

    setSelectedCheckboxes(initialCheckboxes);
  }, [rules]);

  const handleCheckboxChange = (group, id, rule, shouldAddRule) => {
    const newSelection = selectedCheckboxes[group] === id ? "" : id;
    
    setSelectedCheckboxes(prev => ({
      ...prev,
      [group]: newSelection
    }));

    updateRulesText(group, id, rule, shouldAddRule);
    onNonSolicitationChange(newSelection !== "");
  };

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    setComments(newComment);
    debouncedUpdateRulesTextWithComments(newComment);
  };

  const handleInputChange = (id, event, rule) => {
    const newValue = event.target.value;
    setInputValues(prev => ({
      ...prev,
      [id]: newValue
    }));
    updateRulesTextWithInput(id, newValue, rule);
  };

  const updateRulesTextWithComments = (comment) => {
    let updatedRules = rulesText;

    if (!updatedRules.includes(predefinedRules)) {
      updatedRules = predefinedRules;
    }

    if (comment) {
      if (updatedRules.includes("(Additional Add to Non-Solicitation)")) {
        updatedRules = updatedRules.replace(/(\(Additional Add to Non-Solicitation\).*)/, `(Additional Add to Non-Solicitation) ${comment}`);
      } else {
        updatedRules += `\n(Additional Add to Non-Solicitation) ${comment}`;
      }
    } else {
      updatedRules = updatedRules.replace(/(\n\(Additional Add to Non-Solicitation\).*)/, '');
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "Non-Solicitation", text: updatedRules }));
  };

  const updateRulesTextWithInput = (id, input, rule) => {
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
    dispatch(setRulesText({ id: "Non-Solicitation", text: updatedRules }));
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
    dispatch(setRulesText({ id: "Non-Solicitation", text: updatedRules }));
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
        Non-Solicitation
        </h2>
      </div>
      <>
        <p className='fs24 configDesc' style={{ fontWeight: "500" }}>
        Almost all NDAs will have a non-solicitation section that states your firm and affiliates will not solicit the company’s employees or customers.
        </p>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          If not already present, we recommend adding a carveout to this section that doesn’t stop you from hiring people that (i) originates from general solicitations for employment not directed toward a specific individual of the Company or (ii) is not initiated by someone who had access to confidential information. Do you want to add these carveouts?
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
          If not already present, we recommend adding a carveout that explicitly states that your firm or your affiliates currently or intend to do business in the Company’s market and nothing in the document shall prohibit you or your affiliates from contacting or doing business with the Company’s customers in the ordinary course of business. Do you want to add this carveout?
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
            {selectedCheckboxes['ruleSecond'] === 'confidentialInfoRequiredFirst' && (
              <div className="input-group" style={{ marginRight: "20px" }}>
                <input
                  type="text"
                  value={inputValues['confidentialInfoRequiredFirst'] || ''}
                  onChange={(e) => handleInputChange('confidentialInfoRequiredFirst', e, ruleSecond)}
                  placeholder="Add details"
                  style={{ fontSize: '18px' }} // Increase font size
                />
              </div>
            )}
          </div>
        </div>
        <div className='input-preferences'>
          <p className='fs24'>
          Anything else you want to add to your preferences as it relates to Non-Solicitation?
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

export default NonSolicitation;
  