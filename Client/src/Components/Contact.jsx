
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
  if (!name.trim() || !email.trim() || !message.trim()) {
    toast.error("Please fill out all required fields.");
    return;
  }

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
      setName('');
      setEmail('');
      setSubject('');
      setPhone('');
      setMessage('');
    })
    .catch((error) => {
      toast.error('Failed to send message.');
      setLoading(false);
    });
};
  return (
    <div className="flex flex-col md:flex-row gap-10 px-6 md:px-20 py-12 ">
      <div className="flex flex-col  justify-center gap-8 w-full md:w-1/2">
         <h1 className='font-bold text-2xl'>Contact Me!</h1>
        <div className="bg-white shadow rounded-xl p-2 border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">To Know More</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-red-400 text-white rounded-full text-xl">
              <IoMdCall />
            </div>
            <div>
              <p className="text-gray-700">+990–737 621 432</p>
              <p className="text-gray-700">+990–737 621 432</p>
            </div>
          </div>
        </div>

  
        <div className="bg-white shadow rounded-xl p-2 border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Email Now</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-red-400 text-white rounded-full text-xl">
             <IoMdMail/>
            </div>
            <div>
              <p className="text-gray-700">info@example.com</p>
              <p className="text-gray-700">example@example.com</p>
            </div>
          </div>
        </div>

       
        <div className="bg-white shadow rounded-xl p-2 border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-red-400 text-white rounded-full text-xl">
              <SlLocationPin />
            </div>
            <div>
              <p className="text-gray-700 font-medium">
                168/170, Kondivita Road, Mumbai/Maharastra
              </p>
            </div>
          </div>
        </div>
      </div>

     
      <form onSubmit={handleContactForm} className="bg-blue-50 rounded-xl p-8 w-full md:w-1/2 space-y-6 border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+8801XXXXXXXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"             />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Write Your Message*</label>
          <textarea
            rows="6" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What’s on your mind"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"        
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
