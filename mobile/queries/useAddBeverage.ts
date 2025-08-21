import { useEffect, useState } from 'react';
import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Keys } from '@/queries/Keys';

const useAddBeverage = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => {
      return api.post<void>(`/beverages`, payload);
    },
    onSuccess: (resp) => {
      queryClient.invalidateQueries({queryKey: Keys.beverageList});
    },
    onError: (error) => {
      console.log("useAddBeverage",{error})
    }
  });
};

export default useAddBeverage;
