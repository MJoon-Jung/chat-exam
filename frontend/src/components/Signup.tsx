import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signup } from '../actions/user';
import useInput from '../hooks/useInput';
import { useAppDispatch, useAppSelector } from '../store/store';

const Signup = () => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const { signupDone, signupLoading, signupError } = useAppSelector((state) => state.userSlice)
  const [email, emailHandler, setEmail] = useInput('');
  const [password, passwordHandler, setPassword] = useInput('');
  const [confirmPassword, confirmPasswordHandler, setConfirmPassword] = useInput('');

  const matchedPassword = () => (password === confirmPassword);
  const history = useHistory();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!matchedPassword) {
      alert('패스워드가 일치하지 않습니다.');    
      return;
    }
    dispatch(signup({ email, password }));
  };

  const resetSignUpForm = useCallback(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }, [setEmail, setPassword, setConfirmPassword])

  useEffect(() => {
    if(signupDone) { 
      history.push('/login');
    }
    if(signupError) {
      alert(signupError);
    }
    resetSignUpForm();
  }, [history, resetSignUpForm, signupDone, signupError])

  return (
      <div className="h-screen bg-gray-100 flex justify-center">
      <div className="py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-800 font-bold">ID</label>
            <input type="text" value={email} onChange={emailHandler} placeholder="@id" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
          </div>
          <div>
            <label className="block text-gray-800 font-bold">Password</label>
            <input type="password" value={password} onChange={passwordHandler} placeholder="@password" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
          </div>
          <div>
            <label className="block text-gray-800 font-bold">Password confirm</label>
            <input type="password" value={confirmPassword} onChange={confirmPasswordHandler} placeholder="@password confirm" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
          </div>
          { signupLoading ?           
            <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              loading
            </button> 
            : 
            <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">signUp</button>}
        </form>
      </div>
    </div>
  );
};

export default Signup;