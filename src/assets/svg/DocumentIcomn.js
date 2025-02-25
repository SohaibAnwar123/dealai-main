import React from 'react';

const DocumentIcon = () => {
  return (
    <svg id="document-icon" viewBox="0 0 64 64" width="100" height="100">
      <style>
        {`
          .document {
            fill: none;
            stroke: black;
            stroke-width: 2;
          }
        `}
      </style>
      <path className="document" d="M16 2h24l10 10v50H16z"/>
      <path className="document" d="M40 2v10h10"/>
    </svg>
  );
};

export default DocumentIcon;