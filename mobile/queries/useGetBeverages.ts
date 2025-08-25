import api from '../api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Keys } from './Keys';

const useGetBeverages = () => { 
  return useQuery({
    queryKey: Keys.beverageList,
    queryFn: async (): Promise<any> => {
      const resp = await api.get('/beverages');
      return resp.data;
    }
  });
};

export default useGetBeverages;
