'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { SiteCopyContextType, SiteCopyBlock } from '@/types';

const SiteCopyContext = createContext<SiteCopyContextType | undefined>(undefined);

interface SiteCopyProviderProps {
  children: ReactNode;
}

export const SiteCopyProvider: React.FC<SiteCopyProviderProps> = ({ children }) => {
  const [siteCopy, setSiteCopy] = useState<Record<string, SiteCopyBlock[]>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch a specific site copy by key
  const fetchSiteCopy = async (key: string): Promise<SiteCopyBlock[] | null> => {
    try {
      setLoading(true);
      setError(null);

      // Check if we already have this data cached
      if (siteCopy[key]) {
        return siteCopy[key];
      }

      const { data, error: fetchError } = await supabase
        .from('site_copy')
        .select('blocks')
        .eq('key', key)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      if (data) {
        const blocks = data.blocks as SiteCopyBlock[];
        setSiteCopy(prev => ({
          ...prev,
          [key]: blocks
        }));
        return blocks;
      }

      return null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch site copy';
      setError(errorMessage);
      console.error('Error fetching site copy:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch all site copy data
  const fetchAllSiteCopy = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('site_copy')
        .select('key, blocks');

      if (fetchError) {
        throw fetchError;
      }

      if (data) {
        const siteCopyData: Record<string, SiteCopyBlock[]> = {};
        data.forEach(item => {
          siteCopyData[item.key] = item.blocks as SiteCopyBlock[];
        });
        setSiteCopy(siteCopyData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch site copy';
      setError(errorMessage);
      console.error('Error fetching all site copy:', err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh all site copy data
  const refreshSiteCopy = async (): Promise<void> => {
    setSiteCopy({});
    await fetchAllSiteCopy();
  };

  // Load initial data on mount
  useEffect(() => {
    fetchAllSiteCopy();
  }, []);

  const value: SiteCopyContextType = {
    siteCopy,
    loading,
    error,
    fetchSiteCopy,
    fetchAllSiteCopy,
    refreshSiteCopy,
  };

  return (
    <SiteCopyContext.Provider value={value}>
      {children}
    </SiteCopyContext.Provider>
  );
};

// Custom hook to use the SiteCopy context
export const useSiteCopy = (): SiteCopyContextType => {
  const context = useContext(SiteCopyContext);
  if (context === undefined) {
    throw new Error('useSiteCopy must be used within a SiteCopyProvider');
  }
  return context;
};

// Convenience hooks for specific site copy sections
export const useSiteCopySection = (key: string) => {
  const { siteCopy, fetchSiteCopy, loading, error } = useSiteCopy();
  
  const blocks = siteCopy[key] || [];
  const isLoading = loading && !siteCopy[key];
  
  useEffect(() => {
    if (!siteCopy[key] && !loading) {
      fetchSiteCopy(key);
    }
  }, [key, siteCopy, loading, fetchSiteCopy]);

  return {
    blocks,
    loading: isLoading,
    error,
    refetch: () => fetchSiteCopy(key),
  };
};

export default SiteCopyContext;
