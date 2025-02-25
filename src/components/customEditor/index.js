import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { BASE_URL } from '../../constants';
import { Button, Typography } from '@mui/material';

const     NdaTextEditor = ({ filePath, onSave, handleClose, text, firm }) => {
  const [content, setContent] = useState('');
console.log("content",content)
  useEffect(() => {
    const optionsButtons = document.querySelectorAll('.option-button');
    const advancedOptionButtons = document.querySelectorAll('.adv-option-button');
    const fontName = document.getElementById('fontName');
    const fontSizeRef = document.getElementById('fontSize');
    const writingArea = document.getElementById('text-input');
    const linkButton = document.getElementById('createLink');
    const alignButtons = document.querySelectorAll('.align');
    const spacingButtons = document.querySelectorAll('.spacing');
    const formatButtons = document.querySelectorAll('.format');
    const scriptButtons = document.querySelectorAll('.script');
    const fontList = [
      'Arial',
      'Verdana',
      'Times New Roman',
      'Garamond',
      'Georgia',
      'Courier New',
      'cursive',
    ];

    const initializeEditor = () => {
      highlightButtons(alignButtons, true);
      highlightButtons(spacingButtons, true);
      highlightButtons(formatButtons, false);
      highlightButtons(scriptButtons, true);
      fontList.forEach((fontNameOption) => {
        const option = document.createElement('option');
        option.value = fontNameOption;
        option.textContent = fontNameOption;
        fontName.appendChild(option);
      });
      for (let i = 1; i <= 7; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        fontSizeRef.appendChild(option);
      }
      fontSizeRef.value = 3;
    };

    const modifyText = (command, value = null) => {
      document.execCommand(command, false, value);
    };

    optionsButtons.forEach((button) => {
      button.addEventListener('click', () => {
        modifyText(button.id);
        setContent(writingArea.innerHTML);
      });
    });

    advancedOptionButtons.forEach((button) => {
      button.addEventListener('change', () => {
        modifyText(button.id, button.value);
        setContent(writingArea.innerHTML);  
      });
    });

    linkButton.addEventListener('click', () => {
      const url = prompt('Enter the URL:');
      if (url) {
        modifyText('createLink', url);
        setContent(writingArea.innerHTML);
      }
    });

    const highlightButtons = (buttons, singleSelection) => {
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          if (singleSelection) {
            buttons.forEach((btn) => btn.classList.remove('editorActive'));
          }
          button.classList.toggle('editorActive');
        });
      });
    };

    const loadHtmlFromFile = () => {
      fetch(`${BASE_URL}/documents/gethtml/${filePath.split('/').slice(-4).join('/')}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('File not found');
          }
          return response.text();
        })
        .then((html) => {
          writingArea.innerHTML = html;
          setContent(html);
        })
        .catch((error) => {
          console.error('Error loading HTML:', error);
          alert('Error loading HTML: File not found');
        });
    };

    initializeEditor();
    if (filePath) {
      loadHtmlFromFile();
    }
  }, [filePath]);

  useEffect(() => {
    
    if (text === 'Executed') {
      
      const regex = /\[RecieveSign\]/g;
      
      // Check if there is a match
      if (regex.test(content)) {
        
        const updatedContent = content.replace(regex, `<img src="${firm.signatureFile}" alt="Signature" />`);
        setContent(updatedContent);

        const writingArea = document.getElementById('text-input');
        if (writingArea) {
          
          writingArea.innerHTML = updatedContent;
        }
      } else {
        console.log('No match found for [RecieveSign]');
      }
    }
  }, [text, firm?.signatureFile, content]);


  return (
    <>
      <div className="editor-container">
        <Typography fontSize={24} fontWeight={600}>{text}</Typography>
        <div className="editor-options">
          <button id="bold" className="option-button format">
            <i className="fa-solid fa-bold"></i>
          </button>
          <button id="italic" className="option-button format">
            <i className="fa-solid fa-italic"></i>
          </button>
          <button id="underline" className="option-button format">
            <i className="fa-solid fa-underline"></i>
          </button>
          <button id="strikethrough" className="option-button format">
            <i className="fa-solid fa-strikethrough"></i>
          </button>
          <button id="superscript" className="option-button script">
            <i className="fa-solid fa-superscript"></i>
          </button>
          <button id="subscript" className="option-button script">
            <i className="fa-solid fa-subscript"></i>
          </button>
          <button id="insertOrderedList" className="option-button">
            <div className="fa-solid fa-list-ol"></div>
          </button>
          <button id="insertUnorderedList" className="option-button">
            <i className="fa-solid fa-list"></i>
          </button>
          <button id="undo" className="option-button">
            <i className="fa-solid fa-rotate-left"></i>
          </button>
          <button id="redo" className="option-button">
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <button id="createLink" className="adv-option-button">
            <i className="fa fa-link"></i>
          </button>
          <button id="unlink" className="option-button">
            <i className="fa fa-unlink"></i>
          </button>
          <button id="justifyLeft" className="option-button align">
            <i className="fa-solid fa-align-left"></i>
          </button>
          <button id="justifyCenter" className="option-button align">
            <i className="fa-solid fa-align-center"></i>
          </button>
          <button id="justifyRight" className="option-button align">
            <i className="fa-solid fa-align-right"></i>
          </button>
          <button id="justifyFull" className="option-button align">
            <i className="fa-solid fa-align-justify"></i>
          </button>
          <button id="indent" className="option-button spacing">
            <i className="fa-solid fa-indent"></i>
          </button>
          <button id="outdent" className="option-button spacing">
            <i className="fa-solid fa-outdent"></i>
          </button>
          <div className='input-editor-field'>
            <select id="formatBlock" className="adv-option-button">
              <option value="H1">H1</option>
              <option value="H2">H2</option>
              <option value="H3">H3</option>
              <option value="H4">H4</option>
              <option value="H5">H5</option>
              <option value="H6">H6</option>
            </select>
            <select id="fontName" className="adv-option-button"></select>
            <select id="fontSize" className="adv-option-button"></select>
          </div>
          <div className="input-wrapper">
            <input type="color" id="foreColor" className="adv-option-button" />
            <label htmlFor="foreColor">Font Color</label>
          </div>
          <div className="input-wrapper">
            <input type="color" id="backColor" className="adv-option-button" />
            <label htmlFor="backColor">Highlight Color</label>
          </div>
        </div>
        <div id="text-input" contentEditable="true"></div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={() => onSave(content)}>
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

export default NdaTextEditor; 
