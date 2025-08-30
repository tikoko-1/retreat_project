import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-xl font-medium text-black tracking-tight mb-4">RETREAT CENTERS</h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Connecting retreat facilitators with verified, premium retreat centers worldwide. 
                Discover sacred spaces designed for transformation and healing.
              </p>
            </div>
            
            {/* Secondary CTA */}
            <div className="mb-6">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black border-b border-gray-300 hover:border-black transition-colors cursor-pointer"
              >
                List your retreat center
              </a>
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-4">For Facilitators</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors cursor-pointer">Browse Centers</a></li>
              <li><a href="#" className="hover:text-black transition-colors cursor-pointer">How It Works</a></li>
              <li><a href="#" className="hover:text-black transition-colors cursor-pointer">Pricing Guide</a></li>
              <li><a href="#" className="hover:text-black transition-colors cursor-pointer">Success Stories</a></li>
              <li><a href="#" className="hover:text-black transition-colors cursor-pointer">Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@retreatcenters.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Global network of verified retreat centers</span>
              </li>
            </ul>
          </div>
        </div>



        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2024 Retreat Centers. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="hover:text-gray-700 transition-colors cursor-pointer">Terms of Service</a>
              <a href="#" className="hover:text-gray-700 transition-colors cursor-pointer">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}