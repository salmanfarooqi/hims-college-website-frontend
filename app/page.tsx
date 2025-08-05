'use client'

import { motion } from 'framer-motion'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProgramsSection from './components/ProgramsSection'
import TeachersSection from './components/TeachersSection'
import FacilitiesSection from './components/FacilitiesSection'
import HostelFacilitiesSection from './components/HostelFacilitiesSection'
import FeeStructureSection from './components/FeeStructureSection'
import ShiningStarsSection from './components/ShiningStarsSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import ApplicationTracker from './components/ApplicationTracker'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <TeachersSection />
      <FacilitiesSection />
      <HostelFacilitiesSection />
      <FeeStructureSection />
      <ShiningStarsSection />
      <TestimonialsSection />
      <CTASection />
      <ApplicationTracker />
      <Footer />
    </div>
  )
} 