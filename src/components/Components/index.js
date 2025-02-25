import React from 'react'

const TextAreaComponent = React.memo(function TextAreaComponent({  id, value, onChange, placeholder }) {
    return (
      <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: '100%', height: '150px', padding: '20px', marginTop: '10px',fontSize:"20px" }}
    />
    );
  });
export default TextAreaComponent
