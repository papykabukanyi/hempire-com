import React, { useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

const Signature = ({ setSignature }) => {
  const sigPad = useRef({});

  const clearSignature = () => {
    sigPad.current.clear(); // Clear signature
    setSignature('');
  };

  const saveSignature = () => {
    setSignature(sigPad.current.getTrimmedCanvas().toDataURL('image/png')); // Save signature as base64
  };

  return (
    <div>
      <h4>Signature</h4>
      <SignaturePad ref={sigPad} canvasProps={{ className: 'signatureCanvas' }} />
      <button type="button" onClick={clearSignature}>Clear Signature</button>
      <button type="button" onClick={saveSignature}>Save Signature</button>
    </div>
  );
};

export default Signature;
