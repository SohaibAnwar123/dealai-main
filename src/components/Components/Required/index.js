import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import Vector from '../../../assets/svg/vector';
import Rectangle from '../../../assets/svg/rec';
import TextAreaComponent from '..';
import { setRulesText } from '../../../redux/ruleSlice';

const Required = ({ onRequiredChange }) => {
  const dispatch = useDispatch();
  const rules = useSelector((state) => state.rules.rules);

  const predefinedRules = 
    "4) Required: If compelled to disclose any of the information by law, the NDA will usually outline certain things that you need to comply with. Below are some items we usually see, please adjust as you see fit: ";

  const ruleFirst = "i) okay with giving the Company prompt written notice of the requirement the requested disclosure so the company can seek a protective order at their own expense";
  const ruleSecond = "ii) reasonably complying with the company’s efforts to seek such protective order or other appropriate remedy";
  const ruleThird = "iii) required to disclose by law, limiting the disclosure to only that which is legally required, as advised by your counsel";
  const ruleFourth = "iv) If it is not already in the document, want to add language saying “Nothing herein will preclude either party with complying with any legal requirements";

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    ruleFirst: "",
    ruleSecond: "",
    ruleThird: "",
    ruleFourth: ""
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
    onRequiredChange(newSelection !== "");
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

    // Ensure predefinedRules is added only once
    if (!updatedRules.includes(predefinedRules) && !updatedRules) {
      updatedRules = predefinedRules;
    }

    // Update the comments in rulesText
    if (comment) {
      updatedRules += `\n(Additional Add to Required) ${comment}`;
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "Required to Disclose By Law", text: updatedRules }));
  };

  const updateRulesTextWithInput = (id, input, rule) => {
    let updatedRules = rulesText;

    // Ensure predefinedRules is added only once
    if (!updatedRules.includes(predefinedRules) && !updatedRules) {
      updatedRules = predefinedRules;
    }

    // Determine the current rule based on the id
    const currentRuleText = id === 'confidentialInfoRequired' ? ruleFirst : 
                            id === 'confidentialInfoRequiredFirst' ? ruleSecond : ruleThird;

    // Update the specific rule with input value
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
    dispatch(setRulesText({ id: "Required to Disclose By Law", text: updatedRules }));
  };

  const updateRulesText = (group, id, rule, shouldAddRule) => {
    let updatedRules = rulesText;

    // Ensure predefinedRules is added only once
    if (!updatedRules.includes(predefinedRules) && !updatedRules) {
      updatedRules = predefinedRules;
    }

    const ruleText = `\n${rule}`;

    if (shouldAddRule && selectedCheckboxes[group] !== id) {
      // Checkbox was just checked and shouldAddRule is true
      if (!updatedRules.includes(ruleText.trim())) {
        updatedRules += ruleText;
      }
    } else {
      // Checkbox was just unchecked
      updatedRules = updatedRules.replace(ruleText, '').trim();
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "Required to Disclose By Law", text: updatedRules }));
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
        Required to Disclose By Law
        </h2>
      </div>
      <>
        <p className='fs24 configDesc' style={{ fontWeight: "500" }}>
        If compelled to disclose any of the information by law, the NDA will usually outline certain things that you need to comply with. Below are some items we usually see, please adjust as you see fit:
        </p>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          If required to disclose by law, are you okay with giving the Company prompt written notice of the requirement the requested disclosure so the company can seek a protective order at their own expense? This is standard.
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
                  placeholder="Additional Comments"
                  style={{ fontSize: '18px' }} // Add this line to increase font size
                />
              </div>
            )}
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          Are you okay reasonably complying with the company’s efforts to seek such protective order or other appropriate remedy? This is standard.
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
                  placeholder="Additional Comments"
                  style={{ fontSize: '18px' }} // Add this line to increase font size
                />
              </div>
            )}
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          If required to disclose by law, are you okay limiting the disclosure to only that which is legally required, as advised by your counsel? This is standard.
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
            {selectedCheckboxes['ruleThird'] === 'confidentialInfoRequiredSecond' && (
              <div className="input-group" style={{ marginRight: "20px" }}>
                <input
                  type="text"
                  value={inputValues['confidentialInfoRequiredSecond'] || ''}
                  onChange={(e) => handleInputChange('confidentialInfoRequiredSecond', e, ruleThird)}
                  placeholder="Additional Comments"
                  style={{ fontSize: '18px' }} // Add this line to increase font size
                />
              </div>
            )}
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          If it is not already in the document, do you want to add language saying “Nothing herein will preclude either party with complying with any legal requirements”? This is standard.
        </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFourth', 'confidentialInfoRequiredThird', ruleFourth, true)}>
              {selectedCheckboxes['ruleFourth'] === 'confidentialInfoRequiredThird' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Yes
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFourth', 'confidentialInfoDoNotRedlineThird', ruleFourth, false)}>
              {selectedCheckboxes['ruleFourth'] === 'confidentialInfoDoNotRedlineThird' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              No
        </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Required;
