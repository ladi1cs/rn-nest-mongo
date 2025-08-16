import { useEffect, useState } from 'react';
import api from '../api';

const useDB = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.post('/users', {firstName:'Petya', lastName:'Kukin'})
      //.then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

 
};

export default useDB;
