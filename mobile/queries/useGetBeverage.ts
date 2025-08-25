import api from '../api';
import { useQuery } from '@tanstack/react-query';
import { Keys } from './Keys';

const useGetBeverage = (id: string) => { 
  return useQuery({
    queryKey: Keys.selectedBeverage,
    queryFn: async (): Promise<any> => {
      const resp = await api.get(`/beverages/${id}`);
      return resp.data;
    }
  });
};

export default useGetBeverage;
