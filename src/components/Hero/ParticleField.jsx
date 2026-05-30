'use client';

import { useCallback, useMemo } from 'react';
import { ParticlesProvider, Particles } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

function ParticleCanvas({ className }) {
  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: {
          value: 60,
          density: { enable: true, width: 1920, height: 1080 },
        },
        color: {
          value: ['#FFFFFF', '#888888'],
        },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.3, max: 0.7 },
          animation: {
            enable: true,
            speed: 0.8,
            startValue: 'random',
            mode: 'auto',
          },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 1.5,
            startValue: 'random',
            mode: 'auto',
          },
        },
        links: {
          enable: true,
          distance: 140,
          color: '#FFFFFF',
          opacity: 0.12,
          width: 1,
        },
        move: {
          enable: true,
          speed: { min: 0.3, max: 1 },
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'bounce' },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
          resize: { enable: true },
        },
        modes: {
          repulse: { distance: 120, duration: 0.4, speed: 0.5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  return (
    <Particles
      id="hero-particles"
      className={className}
      options={options}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}

export default function ParticleField({ className }) {
  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={init}>
      <ParticleCanvas className={className} />
    </ParticlesProvider>
  );
}
