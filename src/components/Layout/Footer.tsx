import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Jumy<span className="text-primary">Shop</span>
            </h3>
            <p className="text-gray-300">
              Your one-stop shop for all electronic needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary">Speakers</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary">Audio</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary">Wearables</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary">Smart Home</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary">Shipping</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary">Returns</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p>123 Electronics Way</p>
              <p>Tech City, TC 12345</p>
              <p className="mt-2">info@jumyshop.com</p>
              <p>(123) 456-7890</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} JumyShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
