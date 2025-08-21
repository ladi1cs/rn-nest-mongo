import { useEffect, useState } from 'react';
import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Keys } from '@/queries/Keys';

const useAddBeverageSize = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => {
      return api.post<void>(`/beverageSizes`, payload);
    },
    onSuccess: (resp) => {
      queryClient.invalidateQueries({queryKey: Keys.beverageSizeList});
    },
    onError: (error) => {
      console.log("useAddBeverageSize",{error})
    }
  });
};

export default useAddBeverageSize;
