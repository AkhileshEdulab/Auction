import React, { useEffect, useState } from 'react';
import {
  Button, TextField, Checkbox, InputAdornment,
  FormControlLabel, InputLabel, FormControl,
  OutlinedInput, IconButton
} from '@mui/material';
import { MdEmail, MdLockOutline } from "react-icons/md";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { CiUnlock } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Stores/Slices/userSlices';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector(state => state.user);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(login(formData));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="min-h-screen">
      <div className="flex justify-center items-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl p-8 rounded-xl flex flex-col gap-6 bg-white shadow-md"
        >
          <div className="flex justify-center">
            <CiUnlock size={50} className='bg-gray-200 rounded-full p-2' />
          </div>

          <div className="text-center text-4xl font-bold">
            Welcome Back!
            <p className="mt-1 text-lg font-normal">Sign in with your credentials.</p>
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <div className="h-px flex-1 bg-gray-300"></div>
            <span className="text-sm">or sign in with email</span>
            <div className="h-px flex-1 bg-gray-300"></div>
          </div>

         
          <div className="flex flex-col gap-4">
            <TextField
              color="error"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdEmail />
                  </InputAdornment>
                )
              }}
            />

            <FormControl fullWidth variant="outlined" error={!!errors.password}>
              <InputLabel color="error" htmlFor="password">Password</InputLabel>
              <OutlinedInput
              color="error"
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                    <MdLockOutline />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </FormControl>
          </div>

          <div className="flex justify-between items-center text-sm">
            <FormControlLabel
           
              control={
                <Checkbox
                  color="error"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  name="rememberMe"
                />
              }
              label="Remember Me"
            />
            <Link to="/forgot-password" className="text-red-500 font-semibold hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" variant="contained" color="error" fullWidth>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          <p className="text-center text-gray-500 font-serif">
            Don't have an account?{' '}
            <Link to="/sign-up" className="hover:text-red-500 text-black hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
