import api from '../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Keys } from './Keys';

const useGetBeverageSizes = () => { 
  return useQuery({
    queryKey: Keys.beverageSizeList,
    queryFn: async (): Promise<any> => {
      const resp = await api.get('/beverageSizes');
      return resp.data;
    }
  });
};

export default useGetBeverageSizes;
