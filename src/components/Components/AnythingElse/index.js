import React, { useState, useEffect, useCallback } from 'react';
import { Typography } from "@mui/material";
import Vector from '../../../assets/svg/vector';
import Rectangle from '../../../assets/svg/rec';
import TextAreaComponent from '..';
import { setRulesText } from '../../../redux/ruleSlice';
import { useDispatch } from 'react-redux';

const AnyThingElse = () => {
  const dispatch = useDispatch();

  const [checkboxes, setCheckboxes] = useState({});
  const [rulesText, setRulesTextState] = useState("");
  const [comments, setComments] = useState("");
  const [inputValues, setInputValues] = useState({});

  console.log("rulesText", rulesText);

  const predefinedRules = 
  " 9) calibration in terms of preferences are now complete.  Before finalizing the process, please indicate anything else below that we have not asked you about yet that is important to note for your preferences as it relates to your NDAs:  ";




 

  const handleCommentChange = (id, event) => {
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
      if (updatedRules.includes("(AnythinmgElse)")) {
        updatedRules = updatedRules.replace(/(\(AnythinmgElse\).*)/, `(AnythingElse) ${comment}`);
      } else {
        updatedRules += `\n(AnythinmgElse) ${comment}`;
      }
    } else {
      updatedRules = updatedRules.replace(/(\n\(AnythinmgElse\).*)/, '');
    }

    setRulesTextState(updatedRules);
    dispatch(setRulesText({ id: "AnythingElse", text: updatedRules }));
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
   Anything else
        </h2>
      </div>
      <>
<p className='fs24 configDesc' style={{ fontWeight: "500" }}>
Anything else you want to add to your preferences as it relates to governing law?
        </p>


        <div className='input-preferences'>

          <div className='input-preference'>
            <TextAreaComponent
             id="commentBox1"
             value={comments}
             onChange={(e) => handleCommentChange('confidentialInfoRequired', e)}
             placeholder="Add comments"
            />
          </div>
        </div>
      </>
    </div>
  );
}











export default AnyThingElse
