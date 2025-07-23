'use client'

import { GraduationCap } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Excellence College</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering future leaders through excellence in education, innovation, and character development.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#teachers" className="hover:text-white transition-colors">Faculty</a></li>
              <li><a href="#programs" className="hover:text-white transition-colors">Programs</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Admissions</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#apply" className="hover:text-white transition-colors">Apply Now</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Financial Aid</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Campus Tours</a></li>
              <li><a href="#" className="hover:text-white transition-colors">International Students</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-5 h-5 bg-white rounded-full"></div>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="w-5 h-5 bg-white rounded-full"></div>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <div className="w-5 h-5 bg-white rounded-full"></div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Excellence College. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 