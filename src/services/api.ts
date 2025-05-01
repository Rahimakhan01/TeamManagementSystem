import { useEffect, useState } from 'react';

const API_URL = '/api';

export interface Member {
  _id: string;
  name: string;
  rollNo: string;
  year: string;
  degree: string;
  aboutProject: string;
  hobbies: string;
  certificate: string;
  internship: string;
  aboutAim: string;
  profilePhoto: string;
  createdAt: string;
  updatedAt: string;
}

// Hook for fetching all members
export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/members`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        setMembers(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMembers();
  }, [refetchTrigger]);
  
  const refetch = () => setRefetchTrigger(prev => prev + 1);
  
  return { members, loading, error, refetch };
};

// Hook for fetching a single member
export const useMember = (id: string | undefined) => {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    const fetchMember = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/members/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        setMember(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMember();
  }, [id]);
  
  return { member, loading, error };
};

// Function to add a new member
export const addMember = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_URL}/members`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add member');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};