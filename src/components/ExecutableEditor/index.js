import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Modal, Typography } from '@mui/material';
import { saveAs } from 'file-saver';

const EditDocumentExecutableModal = ({ open, handleClose, initialContent, onSaveExecutable, firm }) => {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (initialContent && firm) {
      // Extract the JSON-like information
      const regex = /\[information:\s*(\{[^]*?\})\]/;
      const match = initialContent.match(regex);

      let updatedContent = initialContent;

      let jsonValues = [""];
      let replacementValues = [];

      if (match) {
        try {
          const info = JSON.parse(match[1]);
          jsonValues = jsonValues.concat(Object.values(info));  // Add the values starting from index 1
          if(jsonValues.includes("[]")){
             jsonValues=[{
              "by": `By: `,
              "[Name of Firm]":  '',
              "[buyer rep. name], Title [title]": "",
              "[Title [title]": "",
              "[Address]":"",
            }]  
          }
          // Remove the [information:...] part
          updatedContent = updatedContent.replace(regex, '');
        } catch (error) {
          console.error('Failed to parse the information:', error);
        }
      }

      // Perform the replacements and collect their values
      const replacements = {
        "by   ": `By: <img src="${firm.signatureFile || ''}" width="250px" height="150px" alt="Firm Signature" />`,
        "[Name of Firm]": firm.firmName || '',
        "[buyer rep. name], Title [title]": `${firm.name || ''}`,
        "[Title [title]": `${firm.title}`,
        "[Address]": firm.firmAddress || '',
      };

      for (const [key, value] of Object.entries(replacements)) {
        const escapedKey = key.replace(/[\[\]\/\\]/g, '\\$&'); // Escape special characters
        const keyRegex = new RegExp(escapedKey, 'g');
        updatedContent = updatedContent.replace(keyRegex, value);
        replacementValues.push(value);
      }

      // Create the table HTML with two columns: JSON values and replacement values
      let tableHTML = '<table border="1" style="width: 100%; margin-top: 20px;">';
      
      const maxLength = Math.max(jsonValues.length, replacementValues.length);
      for (let i = 0; i < maxLength; i++) {
        tableHTML += `<tr><td>${jsonValues[i] || ''}</td><td>${replacementValues[i] || ''}</td></tr>`;
      }
      tableHTML += '</table>';

      // Append the combined table to the updated content
      updatedContent += tableHTML;

      setContent(updatedContent);
    }
  }, [initialContent, firm]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };



  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', width: '80%', maxWidth: '800px' }}>
        <Typography id="modal-modal-title" fontSize={"24px"} fontWeight={500} color={"#000"}>Executable</Typography>
        <Editor
          apiKey="enguszi53z2wpvvcumh4a6hriqu85kpx2rsqsvyjob3wyf7a"
          value={content}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify  | ' +
            'removeformat | help'
          }}
          onEditorChange={handleEditorChange}
        />
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={() => onSaveExecutable(content)}>
            Save
          </Button>
   
        </div>
      </div>
    </Modal>
  );
};

export default EditDocumentExecutableModal;
