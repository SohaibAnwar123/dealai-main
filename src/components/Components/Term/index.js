import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import Vector from '../../../assets/svg/vector';
import Rectangle from '../../../assets/svg/rec';
import TextAreaComponent from '..';
import { setRulesText } from '../../../redux/ruleSlice';

const Term = ({ onTermChange }) => {
  const dispatch = useDispatch();
  const rules = useSelector(state => state.rules.rules);

  const predefinedRules = "9) Term: NDAs will have a term associated with them and will often note that confidential information will remain subject to this agreement indefinitely:";

  const ruleFirst = "i) A term length that you will not go above is less than ";
  const ruleSecond = "ii) There is a carveout that certain confidential information will continue to be subject to the NDA indefinitely, want to delete this provision";

  const [selectedCheckboxes, setSelectedCheckboxes] = useState(() => {
    const savedCheckboxes = localStorage.getItem('selectedCheckboxes');
    return savedCheckboxes ? JSON.parse(savedCheckboxes) : { ruleFirst: "", ruleSecond: "" };
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

  useEffect(() => {
    localStorage.setItem('selectedCheckboxes', JSON.stringify(selectedCheckboxes));
  }, [selectedCheckboxes]);

  const handleCheckboxChange = (group, id, rule, year, shouldAddRule) => {
    const newSelection = selectedCheckboxes[group] === id ? "" : id;

    setSelectedCheckboxes(prev => ({
      ...prev,
      [group]: newSelection
    }));

    if (newSelection) {
      localStorage.setItem('selectedYears', year);
    } else {
      localStorage.removeItem('selectedYears');
    }

    updateRulesText(group, id, rule, shouldAddRule);
    onTermChange(newSelection !== "");
  };

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    setComments(newComment);
    debouncedUpdateRulesTextWithComments(newComment);
  };

  const updateRulesTextWithComments = (comment) => {
    let updatedRules = rulesText;

    if (!updatedRules.includes(predefinedRules)) {
      updatedRules = predefinedRules;
    }

    if (comment) {
      if (updatedRules.includes("(Additional Add to Term)")) {
        updatedRules = updatedRules.replace(/(\(Additional Add to Term\).*)/, `(Additional Add to Term) ${comment}`);
      } else {
        updatedRules += `\n(Additional Add to Term) ${comment}`;
      }
    } else {
      updatedRules = updatedRules.replace(/(\n\(Additional Add to Term\).*)/, '');
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "Term", text: updatedRules }));
  };

  const updateRulesTextWithInput = (id, input, rule) => {
    let updatedRules = rulesText;

    if (!updatedRules.includes(predefinedRules)) {
      updatedRules = predefinedRules;
    }

    const currentRuleText = id === 'confidentialInfoRequired' ? ruleFirst : ruleSecond;

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
    dispatch(setRulesText({ id: "Term", text: updatedRules }));
  };

  const updateRulesText = useCallback((group, id, rule, shouldAddRule) => {
    setRulesTextState(prevRulesText => {
      let updatedRules = prevRulesText;

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

      dispatch(setRulesText({ id: "Term", text: updatedRules }));

      return updatedRules;
    });
  }, [selectedCheckboxes, dispatch]);

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
        Term
        </h2>
      </div>
      <>
        <p className='fs24 configDesc' style={{ fontWeight: "500" }}>
        NDAs will have a term associated with them and will often note that confidential information will remain subject to this agreement indefinitely. Tell us your preferences below:
        </p>

        <div className='preferences-detail-box'>
          <p className='fs24'>
          Is there a term length that you will not go above?
        </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFirst', 'confidentialInfoRequired', ruleFirst + "1 year", 1, true)}>
              {selectedCheckboxes['ruleFirst'] === 'confidentialInfoRequired' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              1
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFirst', 'confidentialInfoDoNotRedline', ruleFirst + "2 years", 2, true)}>
              {selectedCheckboxes['ruleFirst'] === 'confidentialInfoDoNotRedline' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              2
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFirst', 'confidentialInfoOnlyRedline', ruleFirst + "3 years", 3, true)}>
              {selectedCheckboxes['ruleFirst'] === 'confidentialInfoOnlyRedline' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              3
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFirst', 'confidentialInfoOnlyRedline4', ruleFirst + "4 years", 4, true)}>
              {selectedCheckboxes['ruleFirst'] === 'confidentialInfoOnlyRedline4' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              4
        </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFirst', 'confidentialInfoOnlyRedline5', ruleFirst + "5 years", 5, true)}>
              {selectedCheckboxes['ruleFirst'] === 'confidentialInfoOnlyRedline5' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              5
        </p>
            </div>
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          If there is a carveout that certain confidential information will continue to be subject to the NDA indefinitely, do you want to delete this provision?
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
          Anything else you want to add to your preferences as it relates to the term of the agreement?
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

export default Term;
