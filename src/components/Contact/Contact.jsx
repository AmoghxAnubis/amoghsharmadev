'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/SocialIcons';
import { personalInfo } from '@/data/portfolio';
import { SectionHeading, GlassCard, GradientButton, ScrollReveal } from '@/components/ui';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thanks for reaching out! This form is a placeholder — connect with me via the social links.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const socials = [
    { name: 'GitHub', icon: Github, href: personalInfo.social.github },
    { name: 'LinkedIn', icon: Linkedin, href: personalInfo.social.linkedin },
    { name: 'Twitter', icon: Twitter, href: personalInfo.social.twitter },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionHeading
          label="Let's Connect"
          title="Get In Touch"
          subtitle="Have a project in mind or just want to say hi? I'd love to hear from you."
        />

        <div className={styles.contactGrid}>
          <ScrollReveal direction="left">
            <GlassCard>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    className={styles.formInput}
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="contact-name" className={styles.formLabel}>
                    Your Name
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="email"
                    name="email"
                    id="contact-email"
                    className={styles.formInput}
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="contact-email" className={styles.formLabel}>
                    Email Address
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="subject"
                    id="contact-subject"
                    className={styles.formInput}
                    placeholder=" "
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="contact-subject" className={styles.formLabel}>
                    Subject
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <textarea
                    name="message"
                    id="contact-message"
                    className={styles.formTextarea}
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="contact-message" className={styles.formLabel}>
                    Message
                  </label>
                </div>

                <GradientButton type="submit" variant="fill">
                  <Send size={16} />
                  Send Message
                </GradientButton>
              </form>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className={styles.contactInfo}>
              <div className={styles.decorativeOrb} aria-hidden="true" />

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <Mail size={18} />
                </div>
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <p className={styles.infoText}>{personalInfo.email}</p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <MapPin size={18} />
                </div>
                <div>
                  <p className={styles.infoLabel}>Location</p>
                  <p className={styles.infoText}>{personalInfo.location}</p>
                </div>
              </div>

              <h4 className={styles.socialHeading}>Find me on</h4>

              <div className={styles.socialGrid}>
                {socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <social.icon size={22} className={styles.socialIcon} />
                    <span className={styles.socialName}>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
