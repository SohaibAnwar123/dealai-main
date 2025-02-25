import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import Vector from '../../../assets/svg/vector';
import Rectangle from '../../../assets/svg/rec';
import TextAreaComponent from '..';
import { setRulesText } from '../../../redux/ruleSlice';

const Remedies = ({ onRemediesChange }) => {
  const dispatch = useDispatch();
  const rules = useSelector((state) => state.rules.rules);
  console.log("rules", rules);
  
  const predefinedRules = "5) Remedies: It is understood and agreed that money damages are not a sufficient remedy for any breach and the Company is entitled to specific performance and injunctive or other equitable relief.";

  const ruleFirst = "replace “are not a sufficient” with “may not be sufficient”.";
  const ruleSecond = "ii) want to make this change replacing “is entitled to specific performance..” with “is entitled to seek specific…”.";
  const ruleThird = "iii) the NDA will ask you to waive certain rights such as any requirement to post a bond in connection to seeking relief or waive a right to a trial. We recommend deleting these waivers of rights want to redline these waiver of rights.";
  const ruleFourth = "iv) Some NDAs will state that the cost of the Company seeking relief will be at the cost of your firm. I prefer";

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
    onRemediesChange(newSelection !== "");
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
    if (!updatedRules.includes(predefinedRules)) {
      updatedRules = predefinedRules;
    }

    // Update the comments in rulesText
    if (comment) {
      updatedRules += `\n(Additional Add to Remedies) ${comment}`;
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "Remedies", text: updatedRules }));
  };

  const updateRulesTextWithInput = (id, input, rule) => {
    let updatedRules = rulesText;

    // Ensure predefinedRules is added only once
    if (!updatedRules.includes(predefinedRules)) {
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
    dispatch(setRulesText({ id: "Remedies", text: updatedRules }));
  };

  const updateRulesText = (group, id, rule, shouldAddRule) => {
    let updatedRules = rulesText;

    // Ensure predefinedRules is added only once
    if (!updatedRules.includes(predefinedRules)) {
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
    dispatch(setRulesText({ id: "Remedies", text: updatedRules }));
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
        Remedies
        </h2>
      </div>
      <>
        <p className='fs24 configDesc' style={{ fontWeight: "500" }}>
        “It is understood and agreed that money damages are not a sufficient remedy for any breach and the Company is entitled to specific performance and injunctive or other equitable relief.”
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
          We recommend replacing “is entitled to specific performance..” with “is entitled to seek specific…” - do you want to make this change?
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
        <div className='preferences-detail-box'>
          <p className='fs24'>
          Occasionally, the NDA will ask you to waive certain rights such as any requirement to post a bond in connection to seeking relief or waive a right to a trial. We recommend deleting these waivers of rights. Do you want to redline these waiver of rights?
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
                  placeholder="Add details"
                  style={{ fontSize: '18px' }} // Increase font size
                />
              </div>
            )}
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          If it is not already in the document, do you want to add language saying “Nothing herein will preclude either party with complying with any legal requirements? This is standard.
        </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFourth', 'confidentialInfoRequiredThird', ruleFourth + " Costs will be paid only to the extent the Company prevails", true)}>
              {selectedCheckboxes['ruleFourth'] === 'confidentialInfoRequiredThird' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Costs will be paid only to the extent the Company prevails
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFourth', 'confidentialInfoDoNotRedlineThirdr', ruleFourth + " Each party will incur and be responsible for their own costs", false)}>
              {selectedCheckboxes['ruleFourth'] === 'confidentialInfoDoNotRedlineThirdr' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Each party will incur and be responsible for their own costs
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFourth', 'confidentialInfoDoNotRedlineThirdd', ruleFourth + " Delete the section related to costs", false)}>
              {selectedCheckboxes['ruleFourth'] === 'confidentialInfoDoNotRedlineThirdd' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Delete the section related to costs
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFourth', 'confidentialInfoDoNotRedlineThirdf', ruleFourth + " Don’t redline this item", false)}>
              {selectedCheckboxes['ruleFourth'] === 'confidentialInfoDoNotRedlineThirdf' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Don’t redline this item
        </p>
            </div>
          </div>
        </div>
        <div className='input-preferences'>
          <p className='fs24'>
          Anything else you want to add to your preferences as it relates to Remedies?
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
};

export default Remedies;
