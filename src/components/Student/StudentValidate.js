import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentValidate = () => {
  const [user, setUser] = useState('');
  const history = useNavigate();
  const token = localStorage.getItem('token');
  const _id = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (token) {
      if (_id) {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/studentNew?_id=${_id}`)
          .then(response => {
            setUser(response.data);
            // console.log(user)
          })
          .catch(err => console.log(err));
      } else {
        history('/student/login');
      }
    } else {
      history('/student/login');
    }
  }, [token, _id, history]);

  return user;
};

export default StudentValidate;
