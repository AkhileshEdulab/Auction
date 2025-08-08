import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAuction } from '../Stores/Slices/auctionSlice';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const categories = [
  'Electronics',
  'Fashion',
  'Home & Garden',
  'Automotive',
  'Collectibles',
  'Art',
  'Jewelry & Watches',
  'Books',
  'Sports & Outdoors',
  'Health & Beauty',
  'Toys & Games',
  'Music & Instruments',
  'Real Estate',
  'Industrial Equipment',
  'Furniture',
  'Mobile Phones',
  'Computers & Tablets',
  'Gaming',
  'Antiques',
  'Motorcycles',
  'Bicycles',
  'Pet Supplies',
  'Movies & TV Memorabilia'
];

const CreateAuction = () => {
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingBid, setStartingBid] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');

  const { loading,success  } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  
  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const handleCreateAuction = (e) => {
  e.preventDefault();

  if (!title || !description || !image || !category || !condition || !startingBid || !startTime || !endTime) {
    alert('Please fill all fields.');
    return;
  }

  const formData = new FormData();
  formData.append('image', image);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('startingBid',startingBid);
  formData.append('condition', condition);
  formData.append('startTime',startTime);
  formData.append('endTime', endTime);
  formData.append('category', category);
  dispatch(createAuction(formData));
};


  useEffect(() => {
    if (!isAuthenticated || user.role !== 'Auctioneer') {
      navigateTo('/');
    }
   
  }, [isAuthenticated, user, navigateTo]);
  useEffect(() => {
  if (success) {
    navigateTo('/');
  }
}, [success, navigateTo]);

  return (
    <section className="w-full min-h-screen flex justify-center items-center px-6 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Create Auction</h1>

        <form onSubmit={handleCreateAuction} className="space-y-6">
          {/* Title and Category */}
         <h1 className="text-xl text-gray-700 font-semibold  mb-6"> Auction Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat, i) => (
                  <MenuItem key={i} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Starting Bid and Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              type="number"
              value={startingBid}
              onChange={(e) => setStartingBid(e.target.value)}
              label="Starting Bid"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Condition</InputLabel>
              <Select
                value={condition}
                label="Condition"
                onChange={(e) => setCondition(e.target.value)}
              >
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Used">Used</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Description */}
          <TextField
            label="Description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

          {/* Date Time Pickers */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
              <DateTimePicker
                format={'EEE MMMM d, yyyy h:mm aa'}
               
                label="Start Time"
                value={startTime}
                onChange={(data) => setStartTime(data)}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <DateTimePicker
                format={'EEE MMMM d, yyyy h:mm aa'}
                label="End Time"
                value={endTime}
                onChange={(data) => setEndTime(data)}
                slotProps={{ textField: { fullWidth: true } }}
              />

             
            </div>
          </LocalizationProvider>

          {/* Image Upload */}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {imagePrev ? (
                  <img src={imagePrev} alt="Preview" className="h-40 object-contain mb-4" />
                ) : (
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                )}
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">JPG, PNG, GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={imageHandler} />
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
          >
            {loading ? 'Creating Auction...' : 'Create Auction'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CreateAuction;
