import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import Vector from '../../../assets/svg/vector';
import Rectangle from '../../../assets/svg/rec';
import TextAreaComponent from '..';
import { setRulesText } from '../../../redux/ruleSlice';

const GoverningLaw = ({ onGoverningLawChange }) => {
  const dispatch = useDispatch();
  const rules = useSelector(state => state.rules.rules);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    ruleFirst: "",
    ruleSecond: ""
  });

  const [rulesText, setRulesTextState] = useState("");
  const [comments, setComments] = useState("");
  const [inputValues, setInputValues] = useState({});

  const predefinedRules = "8) Governing Law: NDAs will be governed by a certain governing law. This will typically be the target’s county/state. Tell us your preferences below:";

  const ruleFirst = "i) NDAs to be governed by ";
  const ruleSecond = "ii) This state(s) that you are not okay with the NDA being governed by";

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
    onGoverningLawChange(newSelection !== "");
  };

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    setComments(newComment);
    debouncedUpdateRulesTextWithComments(newComment);
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
      if (updatedRules.includes("(Additional Add to governingLaw)")) {
        updatedRules = updatedRules.replace(/(\(Additional Add to governingLaw\).*)/, `(Additional Add to governingLaw) ${comment}`);
      } else {
        updatedRules += `\n(Additional Add to governingLaw) ${comment}`;
      }
    } else {
      updatedRules = updatedRules.replace(/(\n\(Additional Add to governingLaw\).*)/, '');
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "governingLaw", text: updatedRules }));
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
    dispatch(setRulesText({ id: "governingLaw", text: updatedRules }));
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
    dispatch(setRulesText({ id: "governingLaw", text: updatedRules }));
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
        Governing Law
        </h2>
      </div>
      <>
        <p className='fs24 configDesc' style={{ fontWeight: "500" }}>
        NDAs will be governed by a certain governing law. This will typically be the target’s county/state. Tell us your preferences below:
        </p>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          We recommend replacing “are not a sufficient” with “may not be sufficient” - do you want to make this change?
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
                  onChange={(e) => handleInputChange('confidentialInfoRequired', e)}
                  placeholder="Additional Comments"
                  style={{ fontSize: '18px' }} // Increase font size
                />
              </div>
            )}
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          Are there any state(s) that you require your NDAs to be governed by?
        </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleSecond', 'confidentialInfoRequiredFirst', ruleSecond, true)}>
              {selectedCheckboxes['ruleSecond'] === 'confidentialInfoRequiredFirst' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              If yes, please write them below:
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
                  onChange={(e) => handleInputChange('confidentialInfoRequiredFirst', e)}
                  placeholder="State"
                  style={{ fontSize: '18px' }} // Increase font size
                />
              </div>
            )}
          </div>
        </div>
        <div className='input-preferences'>
          <p className='fs24'>
          Anything else you want to add to your preferences as it relates to governing law?
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

export default GoverningLaw;
