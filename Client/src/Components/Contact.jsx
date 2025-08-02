// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import emailjs from '@emailjs/browser';
// import { toast } from 'react-toastify';

// const Contact = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [phone, setPhone] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigateTo = useNavigate();

//   const handleContactForm = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const templeteParams = {
//       name,
//       email,
//       subject,
//       phone,
//       message,
//     };

//     emailjs
//       .send('service_vjsb6ti','template_kd6er1u', templeteParams, 'fkM9uuAvYdcnbwk6E')
//       .then(() => {
//         toast.success('Thank you! Your message has been sent successfully.');
//         setLoading(false);
//         navigateTo('/');
//       })
//       .catch((error) => {
//         toast.error('Failed to send message.');
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
//       <form
//         onSubmit={handleContactForm}
//         className="w-full max-w-xl bg-white shadow-md rounded-lg p-8 space-y-6"
//       >
//         <h1 className="text-3xl font-bold text-center text-gray-800">Contact Us</h1>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Name</label>
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             placeholder="Your Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Subject</label>
//           <input
//             type="text"
//             placeholder="Subject"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Phone</label>
//           <input
//             type="text"
//             placeholder="Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700">Write Your Message</label>
//           <textarea
//             placeholder="What's on your mind."
//             rows="5"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-md transition duration-300"
//         >
//           {loading ? 'Sending...' : 'Send Message'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Contact;


import React, { useState } from 'react';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import { SlLocationPin } from "react-icons/sl";
import { IoMdCall, IoMdMail } from 'react-icons/io';

const Contact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);
 const handleContactForm = (e) => {
     e.preventDefault();
     setLoading(true);

    const templeteParams = {
      name,
      email,
      subject,
      phone,
      message,
    };

    emailjs
      .send('service_vjsb6ti','template_kd6er1u', templeteParams, 'fkM9uuAvYdcnbwk6E')
      .then(() => {
        toast.success('Thank you! Your message has been sent successfully.');
        setLoading(false);
        navigateTo('/');
      })
      .catch((error) => {
        toast.error('Failed to send message.');
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 px-6 md:px-20 py-12 bg-white">
      {/* Left Info */}
      <div className="flex flex-col gap-8 w-full md:w-1/2">
        {/* Phone */}
        <div className="bg-white shadow rounded-xl p-6 ">
          <h2 className="text-lg font-semibold mb-2">To Know More</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-red-200 text-white rounded-full text-xl">
              <IoMdCall />
            </div>
            <div>
              <p className="text-gray-700">+990–737 621 432</p>
              <p className="text-gray-700">+990–737 621 432</p>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white shadow rounded-xl p-6 ">
          <h2 className="text-lg font-semibold mb-2">Email Now</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-red-200 text-white rounded-full text-xl">
             <IoMdMail/>
            </div>
            <div>
              <p className="text-gray-700">info@example.com</p>
              <p className="text-gray-700">example@example.com</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white shadow rounded-xl p-6 ">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-red-200 text-white rounded-full text-xl">
              <SlLocationPin />
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                168/170, Avenue 01, Old York Drive Rich Mirpur DOHS, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <form onSubmit={handleContactForm} className="bg-blue-50 rounded-xl p-8 w-full md:w-1/2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@example.com"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+8801XXXXXXXXX"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Write Your Message*</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What’s on your mind"
            className="w-full border border-gray-300 rounded px-4 py-2 h-32"
            required
          ></textarea>
        </div>

        <button  type="submit"disabled={loading}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-md transition duration-300">
          {loading ? 'Sending...' : 'Send Message'}
          </button>
      </form>
    </div>
  );
};

export default Contact;
