import api from '../api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Keys } from '@/queries/Keys';

const useDeleteBeverageSize = () => { 
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => {
      const { id } = payload;
      return api.delete(`/beverageSizes/${id}`);
    },
    onSuccess: (resp) => {
      queryClient.invalidateQueries({queryKey: Keys.beverageSizeList});
    },
    onError: (error) => {
      console.log("useDeleteBeverages",{error})
    }
  });
};

export default useDeleteBeverageSize;
