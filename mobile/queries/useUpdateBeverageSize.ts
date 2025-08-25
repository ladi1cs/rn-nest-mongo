import { useEffect, useState } from 'react';
import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Keys } from '@/queries/Keys';

const useUpdateBeverageSize = (id: string) => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => {
      return api.patch<void>(`/beverageSizes/${id}`, payload);
    },
    onSuccess: (resp) => {
      queryClient.invalidateQueries({queryKey: Keys.beverageSizeList});
    },
    onError: (error) => {
      console.log("useUpdateBeverageSize",{error})
    }
  });
};

export default useUpdateBeverageSize;
