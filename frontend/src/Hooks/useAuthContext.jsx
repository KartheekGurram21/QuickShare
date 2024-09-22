import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext'; // Adjust the path as needed

export function useAuthContext() {
  const context = useContext(AuthContext);

  // Error handling: Ensure the hook is used within AuthContextProvider
  if (!context) {
    throw new Error('useAuthContext must be used inside an AuthContextProvider');
  }

  const { state, dispatch } = context;

  // Function to set the user and store it in localStorage
  const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: { user },
    });
  };

  const getUser = () => state.user;

  // Function to clear the user from state and localStorage
  const clearUser = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    setUser,
    getUser,
    clearUser,
  };
}