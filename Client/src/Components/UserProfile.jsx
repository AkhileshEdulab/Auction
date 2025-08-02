import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from './SubComponents/Spinner';

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    joined: '',
    bio: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const defaultProfile = '/default-avatar.png';
  const defaultBanner =
    'https://img.freepik.com/free-vector/technology-banner-with-digital-red-lines_1017-31009.jpg';

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo('/');
    } else if (user) {
      setFormData({
        userName: user.userName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        role: user.role || '',
        joined: user.createdAt?.substring(0, 10) || '',
        bio: user.bio || '',
      });
      setProfileImage(user?.profileImage?.url || null);
    }
  }, [isAuthenticated, user, navigateTo]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    console.log('Saved Data:', formData);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(URL.createObjectURL(file));
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setBannerImage(URL.createObjectURL(file));
  };

  if (loading || !user) return <Spinner />;

  return (
    <div className="flex justify-center px-4 py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Banner */}
        <div className="relative h-48">
          <img
            src={bannerImage || defaultBanner}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          {editMode && (
            <label className="absolute top-3 right-3 bg-white px-3 py-1 text-sm rounded shadow cursor-pointer hover:bg-gray-100">
              Upload Banner
              <input type="file" accept="image/*" className="hidden" onChange={handleBannerImageChange} />
            </label>
          )}
          {/* Profile Image */}
          <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
            <img
              src={profileImage || defaultProfile}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            {editMode && (
              <label className="block text-center text-sm mt-2 bg-white px-3 py-1 rounded shadow cursor-pointer hover:bg-gray-100">
                Upload Photo
                <input type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
              </label>
            )}
          </div>
        </div>

        {/* User Details */}
        <div className="mt-16 px-6 pb-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Personal Details</h1>
          </div>

          <div className="space-y-4">
            {[
              { name: 'userName', label: 'Name', disabled: true },
              { name: 'email', label: 'Email', disabled: true },
              { name: 'phone', label: 'Phone' },
              { name: 'address', label: 'Address' },
              { name: 'role', label: 'Role', disabled: true },
              { name: 'joined', label: 'Joined On', disabled: true },
              { name: 'bio', label: 'Bio', isTextarea: true },
            ].map((field) =>
              field.isTextarea ? (
                <textarea
                  key={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={!editMode || field.disabled}
                  placeholder={field.label}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  rows={3}
                />
              ) : (
                <input
                  key={field.name}
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={!editMode || field.disabled}
                  placeholder={field.label}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              )
            )}
          </div>

          <div className="mt-6 text-center">
            {editMode ? (
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Auctioneer Payment Details */}
        {user.role === 'Auctioneer' && (
          <div className="border-t px-6 py-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Payment Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Bank Name"
                disabled
                value={user.paymentMethods?.bankTransfer?.bankName || ''}
                className="border border-gray-300 px-4 py-2 rounded"
              />
              <input
                type="text"
                placeholder="IBAN"
                disabled
                value={user.paymentMethods?.bankTransfer?.iban || ''}
                className="border border-gray-300 px-4 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Account Number"
                disabled
                value={user.paymentMethods?.bankTransfer?.bankAccountNumber || ''}
                className="border border-gray-300 px-4 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Account Holder"
                disabled
                value={user.paymentMethods?.bankTransfer?.bankAccountName || ''}
                className="border border-gray-300 px-4 py-2 rounded"
              />
              <input
                type="text"
                placeholder="EasyPaisa Number"
                disabled
                value={user.paymentMethods?.easyPaisa?.easyPaisaAccountNumber || ''}
                className="border border-gray-300 px-4 py-2 rounded"
              />
              <input
                type="email"
                placeholder="PayPal Email"
                disabled
                value={user.paymentMethods?.payPal?.paypalEmail || ''}
                className="border border-gray-300 px-4 py-2 rounded"
              />
            </div>
          </div>
        )}

        {/* Role-based Extras */}
        {user.role === 'Auctioneer' && (
          <div className="border-t px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Commission Info</h2>
            <input
              type="text"
              disabled
              value={user.unpaidCommission || 0}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Unpaid Commission"
            />
          </div>
        )}

        {user.role === 'Bidder' && (
          <div className="border-t px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Bidder Info</h2>
            <input
              type="text"
              disabled
              value={user.auctionWon || ''}
              className="w-full border border-gray-300 px-4 py-2 rounded mb-3"
              placeholder="Auctions Won"
            />
            <input
              type="text"
              disabled
              value={user.moneySpent || ''}
              className="w-full border border-gray-300 px-4 py-2 rounded"
              placeholder="Money Spent"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
