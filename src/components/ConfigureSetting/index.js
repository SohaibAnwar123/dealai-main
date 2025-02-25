import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import Button from '../Button';
import Typography from '@mui/material/Typography';
import ConfidentialInformation from '../confidentalInformation';
import CarveOuts from '../Components/CarveOut';
import Representatives from '../Components/Representatives';
import Required from '../Components/Required';
import Remedies from '../Components/Remedies';
import InformationDisclosed from '../Components/InformationDisclosed';
import NonSolicitation from '../Components/NonSolicitation';
import GoverningLaw from '../Components/GoverningLaw';
import Term from '../Components/Term';
import AnyThingElse from '../Components/AnythingElse';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfigureSetting = ({ onTaskComplete }) => {
  const preDefinedRules = [
    { id: 'Term', text: 'Term: This Agreement will continue in full force and effect for a period of two (2) years following the date of signing and will expire automatically thereafter.' },
    { id: 'Confidential Information', text: 'Confidential Information shall not include information that (i) is or becomes public other than as a result of acts by the undersigned; (ii) can be shown was already known to the undersigned at the time of its disclosure hereunder (iii) is independently obtained by the undersigned from a third party having no duty of confidentiality to the Client; or (iv) is independently developed by the undersigned without use of any Information supplied hereunder.' },
    { id: 'Carveouts for Confidential Information', text: 'Carveouts for Confidential Information: Confidential Information shall not include information that (i) is or becomes public other than as a result of acts by the undersigned; (ii) can be shown was already known to the undersigned at the time of its disclosure hereunder (iii) is independently obtained by the undersigned from a third party having no duty of confidentiality to the Client; or (iv) is independently developed by the undersigned without use of any Information supplied hereunder.' },
    { id: 'Communication of Confidential Information as Requested by Law', text: 'Communication of Confidential Information as Requested by Law: In the event that you or any of your Representatives are requested or required by law, regulatory authority, or other applicable judicial or governmental order to disclose any Evaluation Material, you will provide the Company with prompt notice of any such request or requirement so that the Company may, at its expense, seek a protective order or other appropriate remedy and/or waive compliance with the terms of this agreement, and you will reasonably cooperate with any such efforts of the Company to seek a protective order or other appropriate remedy. In the event that such protective order or other remedy is not obtained, or that the Company waives compliance with the terms hereof, you may disclose only that portion of the Evaluation Material which is legally required.' },
    { id: 'May and Seek in Remedies Section', text: 'May and Seek in Remedies Section: It is understood and agreed that money damages may not be sufficient remedy for any breach and the Company is entitled to seek specific performance and injunctive or other equitable relief.' },
    { id: 'Waiving of Rights', text: 'Waiving of Rights: Occasionally, you may see certain rights being waived. For example, they may ask to waive any requirement to secure or post a bond in connection with seeking relief, or waive the right to a trial. Consult the deal lead when you see rights being waived.' },
    { id: 'Cost of Seeking Relief', text: 'Cost of Seeking Relief: To the extent the Company prevails in their assertions, you also agree to reimburse the Company for all costs incurred by the Company in connection with the enforcement of this agreement.' },
    { id: 'Ability to Keep a Record for Our Files if Asked to Return', text: 'Ability to Keep a Record for Our Files if Asked to Return: Notwithstanding the foregoing, you and your Representatives (i) may retain copies of the Evaluation Material (including the Evaluation Material stored on electronic, magnetic, or similar media) solely in accordance with bona fide policies and procedures of general application (such as internal record retention policies) implemented strictly to comply with any applicable law, legal or regulatory requirements, or professional standards, and (ii) will not be required to destroy electronic versions of the Evaluation Material that are backed up on your or their information management and communications systems or servers and is not available to an end user, to the extent such destruction is not reasonably practical.' },
    { id: 'Non-Solicit Carveout for General Solicitations', text: 'Non-Solicit Carveout for General Solicitations: Nonetheless, nothing herein shall prohibit the Parties from soliciting and hiring persons who are currently employees of the Disclosing Party or Target Company when such employment: (a) results from general solicitations for employment placed in trade or industry publications or other media; or (b) was not initiated through direct contact to such employees by any person acting for the Recipient who had access to the Confidential Information. Additionally, nothing herein shall prohibit the Parties and their affiliates from contacting or doing business with customers of the Disclosing Party or Target Company in the ordinary course of business including but not limited to social media, industry publications, and other forms of media.' },
    { id: 'Anything Else', text: 'Additionally, nothing herein shall prohibit the Parties and their affiliates from contacting or doing business with customers of the Disclosing Party or Target Company in the ordinary course of business including but not limited to social media, industry publications, and other forms of media.' }
  ];

  const combinedRulesTextDefault = preDefinedRules.map(rule => rule.text).join('\n');
  const rules = useSelector((state) => state.rules.rules);
  const userId = localStorage.getItem('userId');

  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [configureScreen, setConfigure] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [confidentialInfoChecked, setConfidentialInfoChecked] = useState(false);
  const [carveOutsChecked, setCarveOutsChecked] = useState(false);
  const [representativesChecked, setRepresentativesChecked] = useState(false);
  const [requiredChecked, setRequiredChecked] = useState(false);
  const [remediesChecked, setRemediesChecked] = useState(false);
  const [informationDisclosedChecked, setInformationDisclosedChecked] = useState(false);
  const [nonSolicitationChecked, setNonSolicitationChecked] = useState(false);
  const [governingLawChecked, setGoverningLawChecked] = useState(false);
  const [termChecked, setTermChecked] = useState(false);
  const [anythingElseChecked, setAnythingElseChecked] = useState(false);

  const endpoint = isUpdate ? `${BASE_URL}/rules/update` : `${BASE_URL}/rules/save`;

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/rules/get?userId=${userId}`);
        if (response.data && response.data.length > 0) {
          setIsUpdate(true);
        }
      } catch (err) {
        console.error('Error fetching rules:', err);
      }
    };

    fetchRules();
  }, [userId]);

  const validateCurrentSection = () => {
    const sectionValidations = [
      validateConfidentialInformation,
      validateCarveOuts,
      validateRepresentatives,
      validateRequired,
      validateRemedies,
      validateInformationDisclosed,
      validateNonSolicitation,
      validateGoverningLaw,
      validateTerm,
    ];
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, sectionValidations.length);
    for (let i = startIndex; i < endIndex; i++) {
      if (!sectionValidations[i]()) {
        return false;
      }
    }
    return true;
  };

  const validateConfidentialInformation = () => {
    if (!confidentialInfoChecked) {
      toast.error('Please select the Confidential Information checkbox before proceeding.');
      return false;
    }
    return true;
  };

  const validateCarveOuts = () => {
    if (!carveOutsChecked) {
      toast.error('Please ensure CarveOuts are correctly selected.');
      return false;
    }
    return true;
  };

  const validateRepresentatives = () => {
    if (!representativesChecked) {
      toast.error('Please ensure Representatives are correctly selected.');
      return false;
    }
    return true;
  };

  const validateRequired = () => {
    if (!requiredChecked) {
      toast.error('Please ensure Required section is correctly selected.');
      return false;
    }
    return true;
  };

  const validateRemedies = () => {
    if (!remediesChecked) {
      toast.error('Please ensure Remedies are correctly selected.');
      return false;
    }
    return true;
  };

  const validateInformationDisclosed = () => {
    if (!informationDisclosedChecked) {
      toast.error('Please ensure Information Disclosed section is correctly selected.');
      return false;
    }
    return true;
  };

  const validateNonSolicitation = () => {
    if (!nonSolicitationChecked) {
      toast.error('Please ensure Non-Solicitation section is correctly selected.');
      return false;
    }
    return true;
  };

  const validateGoverningLaw = () => {
    if (!governingLawChecked) {
      toast.error('Please ensure Governing Law section is correctly selected.');
      return false;
    }
    return true;
  };

  const validateTerm = () => {
    if (!termChecked) {
      toast.error('Please ensure Term section is correctly selected.');
      return false;
    }
    return true;
  };

  const validateAnythingElse = () => {
    if (!anythingElseChecked) {
      toast.error('Please ensure Anything Else section is correctly selected.');
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentSection()) {
      return;
    }

    const startIndex = currentPage * itemsPerPage;

    if (startIndex + itemsPerPage < sectionComponents.length) {
      setCurrentPage(currentPage + 1);
    } else {
      const hasEmptyRule = rules.some(rule => !rule.text.trim());

      if (hasEmptyRule) {
        toast.error('Please fill out all rules before proceeding.');
        return;
      }

      const combinedRulesText = rules.reduce((acc, rule) => acc + rule.text + "\n", "");

      try {
        const response = await axios.post(endpoint, {
          userId,
          rules: combinedRulesText,
          rulesArray: rules,
          Expire: localStorage.getItem("selectedYears")
        });

        if (response) {
          onTaskComplete();
        } else {
          toast.error('Failed to save rules');
        }
      } catch (error) {
        toast.error('Failed to save rules: ' + error.message);
      }
    }
  };

  const saveRules = async () => {
    if (!validateConfidentialInformation()) {
      return;
    }

    const hasEmptyRule = rules.some(rule => !rule.text.trim());

    if (hasEmptyRule) {
      toast.error('Please fill out all rules before proceeding.');
      return;
    }
    try {
      const response = await axios.post(endpoint, {
        userId,
        rules: combinedRulesTextDefault,
        rulesArray: preDefinedRules,
        Custom: false,
        Expire: 2
      });

      if (response) {
        localStorage.setItem('selectedYears', 2);
        onTaskComplete();
      } else {
        toast.error('Failed to save rules');
      }
    } catch (error) {
      toast.error('Failed to save rules: ' + error.message);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === 10) {
      setConfigure(true);
    }
  }, [currentPage]);

  const handlePreferences = () => {
    setConfigure(true);
  };

  const handleConfidentialInfoChange = (checked) => {
    setConfidentialInfoChecked(checked);
  };

  const handleCarveOutsChange = (checked) => {
    setCarveOutsChecked(checked);
  };

  const handleRepresentativesChange = (checked) => {
    setRepresentativesChecked(checked);
  };

  const handleRequiredChange = (checked) => {
    setRequiredChecked(checked);
  };

  const handleRemediesChange = (checked) => {
    setRemediesChecked(checked);
  };

  const handleInformationDisclosedChange = (checked) => {
    setInformationDisclosedChecked(checked);
  };

  const handleNonSolicitationChange = (checked) => {
    setNonSolicitationChecked(checked);
  };

  const handleGoverningLawChange = (checked) => {
    setGoverningLawChecked(checked);
  };

  const handleTermChange = (checked) => {
    setTermChecked(checked);
  };


  const sectionComponents = [
    <ConfidentialInformation key="ConfidentialInformation" onConfidentialInfoChange={handleConfidentialInfoChange} />,
    <CarveOuts key="CarveOuts" onCarveOutsChange={handleCarveOutsChange} />,
    <Representatives key="Representatives" onRepresentativesChange={handleRepresentativesChange} />,
    <Required key="Required" onRequiredChange={handleRequiredChange} />,
    <Remedies key="Remedies" onRemediesChange={handleRemediesChange} />,
    <InformationDisclosed key="InformationDisclosed" onInformationDisclosedChange={handleInformationDisclosedChange} />,
    <NonSolicitation key="NonSolicitation" onNonSolicitationChange={handleNonSolicitationChange} />,
    <GoverningLaw key="GoverningLaw" onGoverningLawChange={handleGoverningLawChange} />,
    <Term key="Term" onTermChange={handleTermChange} />,
    <AnyThingElse key="AnyThingElse" />
  ];

  const itemsPerPage = 1;
  const startIndex = currentPage * itemsPerPage;
  const currentSections = sectionComponents.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className='main' ref={containerRef}>
      <ToastContainer />
      {!configureScreen ? (
        <div className='configure'>
          <h2 className='fs30 mb-0' style={{color: '#0D3EBA', fontWeight: "500"}}>
          Configuration Settings
          </h2>
          <p className='fs24 configDesc'>
          To ensure that we redline your NDAs in a manner that aligns with your preferences, please indicate whether you would like us to adhere to our standard practices or tailor the redlining process to your specific preferences.
          </p>
          <div className='configure-detail'>
              <Button text={"Use our NDA preferences"} className={"configure-button"} onClick={saveRules} />
              <Button text={"Tailor your own preferences"} className={"trail-custom fs24"} onClick={handlePreferences} />
            </div>
        </div>
      ) : (
        <div className='preferences'>
          {currentSections}
          <div className='button-preference'>
            <Button text={"Back"} className={"button-components"} onClick={handleBack} />
            <Button text={"Next"} className={"button-components"} onClick={handleNext} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigureSetting;
