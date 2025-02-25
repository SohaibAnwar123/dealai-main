import React, { useEffect, useState } from 'react';
import { Button, Modal, Typography } from '@mui/material';
import NdaTextEditor from '../customEditor';

const EditDocumentModal = ({ open, handleClose, onSave, initialContent }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
    }
  }, [initialContent]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', width: '80%', maxWidth: '800px' }}>
        <Typography id="modal-modal-title" fontSize={"24px"} fontWeight={500} color={"#000"}>Redline</Typography>
        {initialContent && <NdaTextEditor filePath={initialContent} />}
      </div>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={() => onSave(content)}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default EditDocumentModal;
