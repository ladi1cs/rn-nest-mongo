import { useEffect, useState } from 'react';
import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Keys } from '@/queries/Keys';

const useAddOrder = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => {
      return api.post<void>(`/orders`, payload);
    },
    onSuccess: (resp) => {
      queryClient.invalidateQueries({queryKey: Keys.orderList});
    },
    onError: (error) => {
      console.log("useAddOrder",{error})
    }
  });
};

export default useAddOrder;
