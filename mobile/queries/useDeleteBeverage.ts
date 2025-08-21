import { useEffect, useState } from 'react';
import api from '../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Keys } from '@/queries/Keys';

const useDeleteBeverages = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => {
      const { id } = payload;
      return api.delete(`/beverages/${id}`);
    },
    onSuccess: (resp) => {
      queryClient.invalidateQueries({queryKey: Keys.beverageList});
    },
    onError: (error) => {
      console.log("useDeleteBeverages",{error})
    }
  });
};

export default useDeleteBeverages;
