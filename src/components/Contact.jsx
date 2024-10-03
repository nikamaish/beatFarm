import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* This ensures that the page takes up the full height of the screen. This allows us to stack the footer and content vertically. */}

      <div className="flex-grow"></div>

      <footer className="bg-dark-brown text-cream py-10">
        {/* This pushes the footer down when there's not enough content to fill the screen. */}
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-white transition">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition">Our Services</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition">Affiliate Program</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Get Help</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-white transition">FAQ</a></li>
              {/* <li className="mb-2"><a href="#" className="hover:text-white transition">Shipping</a></li> */}
              <li className="mb-2"><a href="#" className="hover:text-white transition">Returns</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition">Order Status</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition">Payment Options</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Online Shop</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-white transition">All Beats</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition">Free Beats</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white transition">Premium Beats</a></li>
              {/* <li className="mb-2"><a href="#" className="hover:text-white transition">Dress</a></li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-white transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
