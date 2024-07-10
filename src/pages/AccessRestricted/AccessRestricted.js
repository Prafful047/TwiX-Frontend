// AccessRestricted.js
import React from 'react';

const AccessRestricted = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Access Restricted</h1>
      <p style={styles.message}>Access is restricted on mobile devices during this time.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  },
  heading: {
    color: '#dc3545',
  },
  message: {
    fontSize: '1.2rem',
  },
};

export default AccessRestricted;
