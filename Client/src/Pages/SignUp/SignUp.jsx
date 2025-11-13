import React, { useEffect, useState } from 'react';
import { TextField, Button, InputAdornment, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { MdEmail, MdLockOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Stores/Slices/userSlices';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';

import { styled } from '@mui/material/styles';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePrev, setProfileImagePrev] = useState(null);

  const [bankAccountName, setBankAccountName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [razorPayAccountNumber, setRazorPayAccountNumber] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePrev(reader.result);
      setProfileImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('role', role);
    formData.append('profileImage', profileImage);
    if (role === 'Auctioneer') {
      formData.append('bankAccountName', bankAccountName);
      formData.append('bankAccountNumber', bankAccountNumber);
      formData.append('bankName', bankName);
      formData.append('paypalEmail', paypalEmail);
      formData.append('razorPayAccountNumber', razorPayAccountNumber);

    }

    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <section className="min-h-screen ">
      <div className="flex  justify-center items-center  py-8">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-4xl p-8 rounded-xl flex flex-col gap-6 bg-white shadow-md"
        >
          <h1 className="text-3xl font-bold text-center">Register</h1>
          <p className='font-semibold text-2xl'>Persnol Detail</p>
          <div className="flex  gap-4">
            <TextField fullWidth color="error" label="Full Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <TextField
              color="error"
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdEmail />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="flex gap-4">
            <TextField color="error" fullWidth label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <TextField
              fullWidth
              color="error"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdLockOutline />
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className="flex gap-4">
            <TextField color="error" fullWidth label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <FormControl fullWidth color="error">
              <InputLabel>Select Role</InputLabel>
              <Select value={role} onChange={(e) => setRole(e.target.value)} label="Select Role">
                <MenuItem value="Auctioneer">Auctioneer</MenuItem>
                <MenuItem value="Bidder">Bidder</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex items-center gap-4">
            {profileImagePrev && (
              <img src={profileImagePrev} alt="Preview" className="w-16 h-16 rounded-full object-cover" />
            )}
            <Button
              component="label"
              role={undefined}
              color="error"
              variant="outlined"
              tabIndex={-1}
              startIcon={<FaCloudUploadAlt />
              }
            >
              Upload Photo
              <VisuallyHiddenInput
                accept=".jpg,.jpeg,.png,.webp,.avif"
                type="file"
                onChange={handleImageChange}
                multiple
              />
            </Button>
          </div>

          <div
            className={`overflow-hidden transition-all ease-in-out duration-1000 ${role === 'Auctioneer' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <div className='flex flex-col gap-4 transition-all ease-in-out duration-1000'>
              <div className='flex flex-col gap-2'>
                <p className='font-semibold text-2xl'>Payment Method Details</p>
                <span>Fill Payment Details If you are registering as auctioneer</span>
              </div>
              <h1 className='font-semibold'>Bank Details</h1>
              <div className='flex gap-4'>
                <FormControl color="error" fullWidth>
                  <InputLabel>Bank Name</InputLabel>
                  <Select value={bankName} onChange={(e) => setBankName(e.target.value)} label="Bank Name">
                    <MenuItem value="HDFC">HDFC</MenuItem>
                    <MenuItem value="BOB">BOB</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  color="error"
                  label="Account Holder Name"
                  value={bankAccountName}
                  onChange={(e) => setBankAccountName(e.target.value)}
                />
                <TextField
                  color="error"
                  fullWidth
                  label="Bank Account Number"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <TextField
                  fullWidth
                  color="error"
                  label="PayPal Email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  color="error"
                  label="Razor Pay Account Number"
                  value={razorPayAccountNumber}
                  onChange={(e) => setRazorPayAccountNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button type="submit" variant="contained" color="error">
            {loading && 'Registring...'}
            {!loading && "Register"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
