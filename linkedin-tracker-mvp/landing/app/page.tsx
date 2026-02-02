'use client'

import { useState } from 'react'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import Newsletter from '@/components/Newsletter'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
    </main>
  )
}
