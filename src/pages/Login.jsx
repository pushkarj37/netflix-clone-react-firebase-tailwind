import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// Remaining code remains the same

const Login = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, logIn } = UserAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      try {
          await logIn(email, password);
          navigate('/');
      } catch (err) {
          setError('Log in failed');
          console.error('Login error:', err);
      } finally {
          setLoading(false);
      }
  };

  return (
      <>
          <div className="w-full h-screen">
              <img
                  className="hidden sm:block absolute w-full h-full object-cover"
                  src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                  alt="signup page"
              />
              <div className="bg-black/70 fixed top-0 left-0 w-full h-screen" />

              <div className="fixed w-full px-4 py-24 z-20">
                  <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
                      <div className="max-w-[320px] mx-auto py-16">
                          <h1 className="text-3xl font-nsans-bold">Log In</h1>

                          <form onSubmit={handleFormSubmit} className="w-full flex flex-col py-4">
                              <input
                                  className="p-3 my-2 bg-gray-700 rounded"
                                  type="email"
                                  placeholder="email"
                                  autoComplete="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                              />

                              <input
                                  className="p-3 my-2 bg-gray-700 rounded"
                                  type="password"
                                  placeholder="password"
                                  autoComplete="current-password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                              />

                              <button className="bg-red-600 py-3 my-6 rounded font-nsans-bold" disabled={loading}>
                                  {loading ? 'Logging in...' : 'Log In'}
                              </button>

                              {error && <p className="text-red-500">{error}</p>}

                              <div className="flex justify-between items-center text-gray-600">
                                  <p>
                                      <input
                                          type="checkbox"
                                          className="mr-2"
                                          checked={rememberLogin}
                                          onChange={(e) => setRememberLogin(!rememberLogin)}
                                      />
                                      Remember Me
                                  </p>

                                  <p>Need Help?</p>
                              </div>

                              <p className="my-4">
                                  <span className="text-gray-600 mr-2">New to Netflix?</span>
                                  <Link to="/signup">Sign Up</Link>
                              </p>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </>
  );
};

export default Login;
