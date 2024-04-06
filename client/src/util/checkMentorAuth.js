// authActions.js
import axios from 'axios';
import { login, logout } from '../store/authSlice';

export const checkAuth = () => async (dispatch) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const response = await axios.post('/api/v1/auth/validateMentor', null, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const user = response.data.user;

        dispatch(login(user));

      } else {
        dispatch(logout()); 
      }
    } catch (error) {
      console.error('Error validating token:', error);
      
    }
  }
};
