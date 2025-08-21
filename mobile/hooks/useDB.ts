import { useEffect, useState } from 'react';
import api from '../api';

const useDB = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    //api.post('/users', {firstName:'Petya', lastName:'Kukin'})
    api.get('/beverages/689974595b3b8e855d525fc7')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    console.log("==== useDB ===", {users})
  }, [users]);
 
};

export default useDB;
