import api from '../api';
import { useQuery } from '@tanstack/react-query';
import { Keys } from './Keys';

const useGetBeverageSize = (id: string) => { 
  return useQuery({
    queryKey: Keys.selectedBeverageSize,
    queryFn: async (): Promise<any> => {
      const resp = await api.get(`/beveragesizes/${id}`);
      return resp.data;
    }
  });
};

export default useGetBeverageSize;
