import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import Vector from '../../../assets/svg/vector';
import Rectangle from '../../../assets/svg/rec';
import TextAreaComponent from '..';  // Adjust the import path as necessary
import { setRulesText } from '../../../redux/ruleSlice';

const Representatives = ({ onRepresentativesChange }) => {
  const dispatch = useDispatch();
  const rules = useSelector((state) => state.rules.rules);
  console.log("rules", rules);
  
  const predefinedRules = 
    "3) Representatives: There is typically a definition of Representatives that allows you to share the information with your firm’s representatives (i.e. operating partners, diligence partners, etc.). Below are some items:";
  
  const ruleFirst = "i) Representatives are usually defined as affiliates, principals, employees, agents, Operating partners and investment committee members.";
  const ruleSecond = "ii) Occasionally, the document will require you to have each Representative acknowledge in writing that they are bound by the NDA.";
  const ruleThird = "iii) NDAs specifically state that you will not enter into an agreement with a debt financing source as a representative if that agreement would prevent such debt financing source from working with other parties in connection with the opportunity at hand.";

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    ruleFirst: "",
    ruleSecond: "",
    ruleThird: ""
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
    onRepresentativesChange(newSelection !== "");
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
      if (updatedRules.includes("(Additional Add to Representatives)")) {
        updatedRules = updatedRules.replace(/(\(Additional Add to Representatives\).*)/, `(Additional Add to Representatives) ${comment}`);
      } else {
        updatedRules += `\n(Additional Add to Representatives) ${comment}`;
      }
    } else {
      updatedRules = updatedRules.replace(/(\n\(Additional Add to Representatives\).*)/, '');
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "Representatives", text: updatedRules }));
  };

  const updateRulesTextWithInput = (id, input, rule) => {
    let updatedRules = rulesText;

    if (!updatedRules.includes(predefinedRules)) {
      updatedRules = predefinedRules;
    }

    const currentRuleText = id === 'confidentialInfoRequired' ? ruleFirst : 
                            id === 'confidentialInfoRequiredFirst' ? ruleSecond : ruleThird;

    const previousInput = inputValues[id] || '';
    if (previousInput) {
      updatedRules = updatedRules.replace(`\n(${currentRuleText}) ${previousInput}`, '').trim();
    }

    if (input) {
      updatedRules += `\n(${currentRuleText}) ${input}`;
    }

    setRulesTextState(updatedRules);
    setInputValues(prev => ({
      ...prev,
      [id]: input
    }));
    dispatch(setRulesText({ id: "Representatives", text: updatedRules }));
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
    dispatch(setRulesText({ id: "Representatives", text: updatedRules }));
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
        Representatives
        </h2>
      </div>
      <>
        <p className='fs24 configDesc' style={{ fontWeight: "500" }}>
        There is typically a definition of Representatives that allows you to share the information with your firm’s representatives (i.e. operating partners, diligence partners, etc.). Below are some items:
        </p>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          Representatives are usually defined as affiliates, principals, employees, and agents. Is there anything you require to be added?
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
                />
              </div>
            )}
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          Occasionally, the document will require you to have each Representative acknowledge in writing that they are bound by the NDA. Are you okay with this?
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
        <div className='preferences-detail-box'>
          <p className='fs24'>
          {ruleThird}
        </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleThird', 'confidentialInfoRequiredSecond', ruleThird, true)}>
              {selectedCheckboxes['ruleThird'] === 'confidentialInfoRequiredSecond' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Yes
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleThird', 'confidentialInfoDoNotRedlineSecond', ruleThird, false)}>
              {selectedCheckboxes['ruleThird'] === 'confidentialInfoDoNotRedlineSecond' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              No
        </p>
            </div>
          </div>
        </div>
        <div className='input-preferences'>
          <p className='fs24'>
          Anything else you want to add to your preferences as it relates to the definition of representatives and the actions related to those representatives?
        </p>
          <div className='input-preference'>
            <TextAreaComponent
              id="commentBox1"
              value={comments}
              onChange={(e) => handleCommentChange(e)}
              placeholder="Add comments"
            />
          </div>
        </div>
      </>
    </div>
  );
}

export default Representatives;
