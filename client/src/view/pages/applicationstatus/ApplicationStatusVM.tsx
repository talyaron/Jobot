import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
interface ApplicationStatusState {
  status: string | null;
  loading: boolean;
  error: string | null;
}

export function useApplicationStatusViewModel() {
  const { jobId } = useParams<{ jobId: string }>();

  const [state, setState] = useState<ApplicationStatusState>({
    status: null,
    loading: false,
    error: null
  });

  const checkApplicationStatus = async () => {
    if (!jobId) {
      setState(prev => ({ ...prev, error: 'No job ID provided', loading: false }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(`/api/userJobRoutes/status${jobId}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.jobUser) {
        setState(prev => ({ ...prev, status: data.jobUser.applicationStatus, loading: false }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: 'Unable to retrieve application status',
          loading: false 
        }));
      }
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: error.message || 'Error checking application status',
        loading: false 
      }));
      console.error('Application status error:', error);
    }
  };

  useEffect(() => {
    checkApplicationStatus();
  }, [jobId]);

  const getStatusMessage = (status: string | null) => {
    if (!status) return '';
    
    switch (status) {
      case 'PENDING':
        return 'Your status is pending';
      case 'HIRED':
        return 'Your status is Hired';
      case 'REJECTED':
        return 'Your status is rejected';
      default:
        return `Your status is ${status}`;
    }
  };

  return {
    status: state.status,
    statusMessage: getStatusMessage(state.status),
    loading: state.loading,
    error: state.error,
    refreshStatus: checkApplicationStatus
  };
}