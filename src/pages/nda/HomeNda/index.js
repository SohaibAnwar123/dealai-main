import React, { useState, useRef, useEffect } from "react";
import SideBar from '../../../components/SideBar';
import "./index.css";
import { Typography, CircularProgress } from '@mui/material';
import AddNDAButtonTurn from '../../../components/NDAButton';
import PlusNda from "../../../assets/svg/plus";
import axios from 'axios';
import EditDocumentModal from "../../../components/editorModal";
import EditDocumentExecutableModal from "../../../components/ExecutableEditor";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../../constants";
import { saveAs } from 'file-saver';
import NdaTextEditor from "../../../components/customEditor";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LabTabs from "../../../components/LabelTAbs";
import Celebration from "../../../assets/svg/celebration";

const HomeNda = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [ firm, setFirm] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [redlineString, setRedlineString] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [executableModal, setExecutable] = useState(false);
  const [responseUploadDocument, setResponseUploadDocument] = useState(false);
  const [documentHtml, setDocumentHtml] = useState("");
  const [renderedData, setRenderedData] = useState(null);
  const [showExecutableHtml, setShowExecutable] = useState("");
  const [rules, setRules] = useState("");
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState({ userName: "", email: "" });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [totalChanges, setTotalChanges] = useState(0);
  const [counterPart, setCounterPart] = useState('');
  const [summary, setSummary] = useState('');
  const [originalDocxFile, setOriginalDocxFile] = useState('');
  const [executed, setExecuted] = useState("");
  const [fileId, setFileID] = useState("");
  const [allData, setAllData] = useState([]);
  const [redlineFilePath, setRedlineFile] = useState(false);

  useEffect(() => {
    console.log("userId from localStorage:", userId);
    fetchRenderedDoc(userId);
  }, [userId]);

  useEffect(() => {
    if (renderedData) {
      setShowExecutable(renderedData.htmlContent);
    }
  }, [renderedData]);

  useEffect(() => {
    if (user) {
      setUserData({ userName: user.userName, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
  }, [file]);

  useEffect(() => {
    if (responseUploadDocument) {
      setCounterPart(responseUploadDocument.CounterPart);
      setSummary(responseUploadDocument.Summary);
      setTotalChanges(responseUploadDocument.TotalChanges);
      setOriginalDocxFile(responseUploadDocument.processedFilePath);
      setRedlineString(responseUploadDocument.redlinedhtmlfilepath); 
      setExecuted(responseUploadDocument.ExecutedDocPath);
      setFileID(responseUploadDocument.fileId);
      setRedlineFile(responseUploadDocument.redlinedfilepath);
      localStorage.setItem('totalChanges', JSON.stringify(responseUploadDocument.TotalChanges));
      localStorage.setItem('summary', JSON.stringify(responseUploadDocument.Summary));
    }
  }, [responseUploadDocument]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/rules/get?userId=${userId}`);
        if (response.data && response.data.length > 0) {
          setRules(response.data[0].rules.toString());
        }
      } catch (err) {
        console.error('Error fetching rules:', err);
      }
    };

    fetchRules();
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/getUser?userId=${userId}`);
        if (response.data) {
          setUser(response.data.name[0]);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (redlineString) {
      setModalOpen(true);
    }
  }, [redlineString]);

  useEffect(() => {
    const fetchFirmDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/firms/getFirm/${userId}`);
        if (response.data) {
          setFirm(response.data.firm);
          localStorage.setItem("isFirmInfo",1)
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          toast.error('Firm not found');
        } else {
          toast.error('Error fetching firm details');
        }
        console.error('Error fetching firm details:', err);
      }
    };

    fetchFirmDetails();
  }, [userId]);

  const sendDetails = async () => {
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("userName");
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('redline', redlineFilePath);
    formData.append('executed', showExecutableHtml);
    formData.append('counterParties', counterPart);
    formData.append('OriginalDocxFile', originalDocxFile);
    formData.append('Noedits', totalChanges);
    formData.append('summary', summary);
    formData.append('email', firm?.email || email);
    formData.append('name', firm?.name || name);
    formData.append('fileId', fileId);
  
    try {
      const response = await fetch(`${BASE_URL}/documents/sendmail`, {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        setLoading(false);
        toast.success('Updated successfully');
        setTimeout(() => {
          navigate('/preferences');
        }, 2000);
        setExecutable(false);
      } else {
        throw new Error('Failed to send details');
      }
    } catch (error) {
      console.error('Error sending details:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (editedContent) => {
    setDocumentHtml(editedContent);
    setExecutable(true);
    setModalOpen(false);
  };

  const onSaveExecutable = (editedContent) => {
    setShowExecutable(editedContent);
  };

  useEffect(() => {
    if (showExecutableHtml) {
      sendDetails();
    }
  }, [showExecutableHtml]);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      uploadDocument(uploadedFile);
    }
  };

  const uploadDocument = async (file) => {
    setLoading(true);
    const  RecieverData ={
      RecieverTitle :firm?.name,
      RecieverFirmname :firm?.firmName,
      RecieverAddress :firm?.firmAddress,
      RecieverPhnNo :firm?.phone,
      RecieverSign:"[RecieveSign]",
      RecieverMail:firm?.email,
      By:"[RecieveSign]"
    }
    const formData = new FormData();
    formData.append('document', file);
    formData.append('rule', rules);
    formData.append('user_Id', userId);
    formData.append('receiverdata', JSON.stringify(RecieverData)); // Convert object to JSON string

    try {
      const response = await axios.post(`${BASE_URL}/documents/uploadDocument`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponseUploadDocument(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRenderedDoc = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/documents/getRenderedDoc/${userId}`);
      const data = response.data;
      setAllData(data);
    } catch (error) {
      console.error('Error fetching rendered documents:', error);
    }
  };

  const totalNDAs = allData?.length;
  const totalEdits = allData?.reduce((acc, nda) => acc + parseInt(nda.TotalChanges, 10), 0);
  const hoursSaved = (totalNDAs * 25 / 60).toFixed(2);

  return (
    <div className='mian-nda'>
      <SideBar />
      <div className='dashboard-body'>
        <div className='nda-card'>
          <div className='nda-card-body'>
            <div className='nda-card-body-card'>
              <h2 className="fs70">{allData ? totalNDAs : 0}</h2>
              <p className="fs30" style={{fontWeight: '500', color: '#353535'}}>
              NDAs
              </p>
            </div>
            <div className='nda-card-body-card'>
            <h2 className="fs70">{allData ? totalEdits : 0}</h2>
              <p className="fs30" style={{fontWeight: '500', color: '#353535'}}>
              Edits
              </p>
            </div>
            <div className='nda-card-body-card'>
            <h2 className="fs70">{allData ? hoursSaved : "0.00"}</h2>
              <p className="fs30" style={{fontWeight: '500', color: '#353535'}}>
              Hours Saved
              </p>
            </div>
          </div>
        </div>
        <div className='nda-card-body-button-card'>
          <Celebration/>
          <p className="nda-card-body-button-card-tx">
          Great, Now for the fun part
          </p>
          <button className="nda-button-turn w-100" onClick={() => fileInputRef.current.click()}>
            <input
              type="file"
              style={{ display: 'none' }}
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
           <PlusNda />
                {fileName ? fileName : "Add NDAs to turn"}
              {loading && (
                <div className="loader-container">
                  <CircularProgress sx={{ color: '#0F46D2' }} />
                </div>
              )}
          </button>
        </div>
      </div>
      <ToastContainer />
      {modalOpen && (
        <NdaTextEditor
          filePath={redlineString}
          handleClose={() => setModalOpen(false)}
          onSave={handleSave}
          text={"Redline"}
        />
      )}
      {executableModal && (
        <NdaTextEditor
          filePath={executed}
          handleClose={() => setExecutable(false)}
          onSave={onSaveExecutable}
          text={"Executed"}
          firm={firm}
        />
      )}
      {/* <LabTabs/> */}
    </div>
  );
}

export default HomeNda;