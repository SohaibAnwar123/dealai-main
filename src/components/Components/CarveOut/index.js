import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from "@mui/material";
import Vector from '../../../assets/svg/vector';
import Rectangle from '../../../assets/svg/rec';
import { setRulesText } from '../../../redux/ruleSlice';

const CarveOuts = ({ onCarveOutsChange }) => {
  const dispatch = useDispatch();
  const rules = useSelector((state) => state.rules.rules);

  const predefinedRules = "2) Carveouts for Confidential Information: If the Confidential Information section is pretty broad, then there should be carveout for information that becomes public, is already known by us, is obtained through another source that is not the company, or is developed by us independently of the disclosures. Confidential Information shall not include information that";

  const ruleFirst = "i) Confidential Information shall not include information that can be shown was already known to the undersigned at the time of its disclosure.";
  const ruleSecond = "ii) Confidential Information shall not include information that can be shown was already known to the undersigned at the time of its disclosure.";
  const ruleThird = "iii) Confidential Information shall not include information that is independently obtained by the undersigned from a third party having no duty of confidentiality to the Client.";
  const ruleFourth = "iv) Confidential Information shall not include information that is independently developed by the undersigned without use of any information supplied hereunder.";

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    ruleFirst: "",
    ruleSecond: "",
    ruleThird: "",
    ruleFourth: ""
  });

  const [rulesText, setRulesTextState] = useState("");

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
    onCarveOutsChange(newSelection !== "");
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

      dispatch(setRulesText({ id: "Carveouts for Confidential Information", text: updatedRules }));

      return updatedRules;
    });
  }, [selectedCheckboxes, dispatch]);

  return (
    <div className='preference-body'>
      <div className='iconParent'>
        <h2 className='fs30 mb-0' style={{ color: '#0D3EBA', fontWeight: "500" }}>
          Confidential Information Carve-Outs
        </h2>
      </div>
      <>
        <p className='fs21 configDesc' style={{ fontWeight: "500" }}>
          Confidential information should have carveouts for certain items that are not subject to the NDA. Below are some suggested carve out items:
        </p>
        <div className='preferences-detail-box'>
          <p className='fs24'>
            {ruleFirst}
          </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFirst', 'confidentialInfoRequired', ruleFirst, true)}>
              {selectedCheckboxes['ruleFirst'] === 'confidentialInfoRequired' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
                Required
              </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFirst', 'confidentialInfoDoNotRedline', ruleFirst, false)}>
              {selectedCheckboxes['ruleFirst'] === 'confidentialInfoDoNotRedline' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Do not redline
              </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFirst', 'confidentialInfoOnlyRedline', ruleFirst, true)}>
              {selectedCheckboxes['ruleFirst'] === 'confidentialInfoOnlyRedline' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Only redline if other items are being redlined
              </p>
            </div>
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          {ruleSecond}
              </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleSecond', 'confidentialInfoRequiredFirst', ruleSecond, true)}>
              {selectedCheckboxes['ruleSecond'] === 'confidentialInfoRequiredFirst' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Required
              </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleSecond', 'confidentialInfoDoNotRedlineFirst', ruleSecond, false)}>
              {selectedCheckboxes['ruleSecond'] === 'confidentialInfoDoNotRedlineFirst' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Do not redline
              </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleSecond', 'confidentialInfoOnlyRedlineFirst', ruleSecond, true)}>
              {selectedCheckboxes['ruleSecond'] === 'confidentialInfoOnlyRedlineFirst' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Only redline if other items are being redlined
              </p>
            </div>
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          {ruleThird}
              </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleThird', 'confidentialInfoRequiredSecound', ruleThird, true)}>
              {selectedCheckboxes['ruleThird'] === 'confidentialInfoRequiredSecound' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Required
              </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleThird', 'confidentialInfoDoNotRedlineSecound', ruleThird, false)}>
              {selectedCheckboxes['ruleThird'] === 'confidentialInfoDoNotRedlineSecound' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Do not redline
              </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleThird', 'confidentialInfoOnlyRedlineSecound', ruleThird, true)}>
              {selectedCheckboxes['ruleThird'] === 'confidentialInfoOnlyRedlineSecound' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Only redline if other items are being redlined
              </p>
            </div>
          </div>
        </div>
        <div className='preferences-detail-box'>
          <p className='fs24'>
          {ruleFourth}
              </p>
          <div className='preferences-detail-checkbox'>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFourth', 'confidentialInfoRequiredThird', ruleFourth, true)}>
              {selectedCheckboxes['ruleFourth'] === 'confidentialInfoRequiredThird' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Required
              </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFourth', 'confidentialInfoDoNotRedlineThird', ruleFourth, false)}>
              {selectedCheckboxes['ruleFourth'] === 'confidentialInfoDoNotRedlineThird' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Do not redline
              </p>
            </div>
            <div className='preferences-detail-checkbox-detail' onClick={() => handleCheckboxChange('ruleFourth', 'confidentialInfoOnlyRedlineThird', ruleFourth, true)}>
              {selectedCheckboxes['ruleFourth'] === 'confidentialInfoOnlyRedlineThird' ? <Vector /> : <Rectangle />}
              <p className='fs24'>
              Only redline if other items are being redlined
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default CarveOuts;
