import React from 'react';
import useInput from '../hooks/useInput';
import anony from '../lib/anony';

const Login = () => {
  const [userId, userIdHandler] = useInput('');
  const [password, passwordHandler] = useInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    anony.post('auth/login')
      .then((res) => console.log(res.data))
      .catch((err) => {
        alert(err);
        console.error(err);
      });
  };
  return (
      <div className="h-screen bg-gray-100 flex justify-center">
      <div className="py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-800 font-bold">ID</label>
            <input type="text" value={userId} onChange={userIdHandler} placeholder="@id" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
          </div>
          <div>
            <label className="block text-gray-800 font-bold">Password</label>
            <input type="password" value={password} onChange={passwordHandler} placeholder="@password" className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600" />
          </div>
          <button type="submit" className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;