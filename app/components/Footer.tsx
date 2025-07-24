'use client'

import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  ArrowRight,
  Heart,
  Shield
} from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'About HIMS', href: '/about' },
    { name: 'Admissions', href: '/apply' },
    { name: 'Track Application', href: '/#track' },
    { name: 'Contact Us', href: '/contact' }
  ]

  const academicPrograms = [
    { name: 'FSC Pre-Medical', href: '/#programs' },
    { name: 'FSC Engineering', href: '/#programs' },
    { name: 'ICS Computer Science', href: '/#programs' },
    { name: 'FA Literature', href: '/#programs' }
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook, color: 'hover:bg-blue-600' },
    { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:bg-sky-500' },
    { name: 'Instagram', href: '#', icon: Instagram, color: 'hover:bg-pink-600' }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-lg opacity-50"></div>
                  <div className="relative p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">HIMS College</h3>
                  <p className="text-blue-200 text-xs">Excellence Since 1995</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Empowering future leaders through quality education and character development at HIMS Degree College.
              </p>

              {/* Mission */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-start space-x-2">
                  <div className="p-1 bg-blue-500/20 rounded">
                    <Heart className="w-4 h-4 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm mb-1">Our Mission</h4>
                    <p className="text-xs text-gray-300">
                      Providing quality education with strong moral values.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Academic Programs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Programs</h4>
            <ul className="space-y-2">
              {academicPrograms.map((program) => (
                <li key={program.name}>
                  <Link 
                    href={program.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {program.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-blue-500/20 rounded">
                  <MapPin className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Campus Address</p>
                  <p className="text-gray-300 text-xs">HIMS Degree College<br />Shahi Bagh Road<br />Peshawar, Pakistan</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-green-500/20 rounded">
                  <Phone className="w-4 h-4 text-green-300" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Phone</p>
                  <p className="text-gray-300 text-xs">+92 (091) xxx-xxxx</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-purple-500/20 rounded">
                  <Mail className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Email</p>
                  <p className="text-gray-300 text-xs">info@hims.edu.pk</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-orange-500/20 rounded">
                  <Clock className="w-4 h-4 text-orange-300" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">Office Hours</p>
                  <p className="text-gray-300 text-xs">Mon-Fri: 8AM-6PM<br />Sat: 9AM-2PM</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-white font-semibold mb-3 text-sm">Follow Us</h5>
              <div className="flex space-x-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`p-2 bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-300 ${social.color} hover:scale-110`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-4 h-4 text-white" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Accreditation */}
        <div className="flex items-center justify-center mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center space-x-2 text-sm text-blue-200">
            <Shield className="w-4 h-4" />
            <span>Accredited by Higher Education Commission (HEC)</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/30 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © {currentYear} HIMS Degree College. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs">
                Building futures since 1995 • Peshawar, Pakistan
              </p>
            </div>
            
            <div className="flex items-center space-x-4 text-xs">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 