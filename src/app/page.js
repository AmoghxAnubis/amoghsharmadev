'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Skills from '@/components/Skills/Skills';
import Projects from '@/components/Projects/Projects';
import Experience from '@/components/Experience/Experience';
import Education from '@/components/Education/Education';
import Research from '@/components/Research/Research';
import BuildLogs from '@/components/BuildLogs/BuildLogs';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

const Terminal = dynamic(() => import('@/components/Terminal/Terminal'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Research />
        <BuildLogs />
        <Contact />
      </main>
      <Footer />
      <Terminal />
    </>
  );
}
