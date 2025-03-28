// ApplicationStatus.tsx
import React from 'react';
import { useApplicationStatusViewModel } from './ApplicationStatusVM';

const ApplicationStatus: React.FC = () => {
  const { status, statusMessage, loading, error, refreshStatus } = useApplicationStatusViewModel();
  
  return (
    <div className="application-status">
      <h3>Application Status</h3>
      {loading && <div>Loading application status...</div>}
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={refreshStatus}>Try Again</button>
        </div>
      )}
      {status && (
        <div className={`status-message status-${status.toLowerCase()}`}>
          {statusMessage}
        </div>
      )}
      {!loading && !error && !status && <div>No status available</div>}
    </div>
  );
};

export default ApplicationStatus;