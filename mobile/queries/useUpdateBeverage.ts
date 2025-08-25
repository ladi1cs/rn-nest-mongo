import { useEffect, useState } from 'react';
import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Keys } from '@/queries/Keys';

const useUpdateBeverage = (id: string) => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => {
      return api.patch<void>(`/beverages/${id}`, payload);
    },
    onSuccess: (resp) => {
      queryClient.invalidateQueries({queryKey: Keys.beverageList});
    },
    onError: (error) => {
      console.log("useUpdateBeverage",{error})
    }
  });
};

export default useUpdateBeverage;
