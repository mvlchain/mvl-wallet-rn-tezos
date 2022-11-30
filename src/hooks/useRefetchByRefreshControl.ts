import React, { useState } from 'react';

export const useRefetchByRefreshControl = (refetch: () => Promise<unknown>) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const refresh = async () => {
    setRefreshing(true);

    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  };

  return {
    refreshing,
    refresh,
  };
};
