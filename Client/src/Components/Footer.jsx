import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#e5e4e6] text-gray-800 py-10 px-5 md:px-20">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Category */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Category</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Gadget</a></li>
            <li><a href="#">Antiques</a></li>
            <li><a href="#">Digital Art</a></li>
            <li><a href="#">Automotive</a></li>
            <li><a href="#">Old Coin</a></li>
            <li><a href="#">Books & Comics</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">How to Bid</a></li>
            <li><a href="#">How To Sell</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">F.A.Q</a></li>
          </ul>
        </div>

        {/* Logo & Social */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">
            PRO<span className="bg-black text-white px-1">BID</span>
          </h1>
          <p className="text-sm mt-1">Bid High, Win Big, Smile Bigger</p>
          <p className="mt-4 font-medium">Social Just You Connected Us!</p>
          <p className="text-xs text-gray-600">All of update in social</p>
          <div className="flex justify-center md:justify-start gap-4 mt-4 text-sm">
            <a href="#">LinkedIn</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="w-full md:w-1/3">
          <h3 className="font-semibold text-lg mb-4">
            Join Our Newsletter &<br /> More information.
          </h3>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button className="bg-white px-4 py-2 border border-l-0 border-gray-300 rounded-r-md">
              →
            </button>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Secured Payment Gateways</p>
            <div className="flex gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.png" alt="MasterCard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo_%282018%29.svg" alt="Amex" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Maestro_2016.svg" alt="Maestro" className="h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 mt-10 border-t pt-4">
        ©Copyright 2024 <span className="font-semibold text-black">Probid</span> | Design By{" "}
        <span className="font-semibold">Egens Lab</span>
        <div className="mt-2 flex justify-center gap-6 text-xs">
          <a href="#">Support Center</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
