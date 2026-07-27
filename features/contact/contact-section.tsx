'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/content/site';
import { socialLinks } from '@/content/socials';
import { useCursor } from '@/features/cursor/cursor-context';
import { Magnetic } from '@/components/motion/magnetic';
import { copyToClipboard } from '@/lib/utils';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/ui/icons';
import { Mail, Copy, Check, Calendar, ArrowUpRight } from 'lucide-react';

export function ContactSection() {
  const { setCursorState, resetCursorState } = useCursor();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(siteConfig.email);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Github': return <GithubIcon className="h-4 w-4" />;
      case 'Linkedin': return <LinkedinIcon className="h-4 w-4" />;
      case 'Twitter': return <TwitterIcon className="h-4 w-4" />;
      case 'Calendar': return <Calendar className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-noise px-6 py-28 md:px-12 lg:px-24 border-t border-white/5"
    >
      <div className="mx-auto max-w-5xl space-y-12 text-center">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-blue-400 uppercase">
            <Mail className="h-4 w-4" />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="text-5xl font-extrabold tracking-tight hero-title-main sm:text-7xl lg:text-8xl uppercase leading-none">
            LET'S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-500 font-extrabold">
              SOMETHING REMARKABLE.
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-base text-neutral-400 font-normal pt-2">
            Available for Software Engineering opportunities specializing in Angular, React, and Next.js. Have a project or role in mind?
          </p>
        </div>

        {/* High-Impact Instant Action CTA Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {/* Instant Copy Email CTA */}
          <Magnetic strength={0.3}>
            <button
              onClick={handleCopy}
              onMouseEnter={() => setCursorState('button', copied ? 'Copied!' : 'Copy Email')}
              onMouseLeave={resetCursorState}
              className="flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-black hover:bg-blue-400 hover:text-white transition-all shadow-2xl"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 text-emerald-600" />
                  <span className="font-mono text-sm">Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  <span>{siteConfig.email}</span>
                </>
              )}
            </button>
          </Magnetic>

          {/* Schedule Call */}
          {siteConfig.calendarUrl && (
            <Magnetic strength={0.3}>
              <a
                href={siteConfig.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorState('link', 'Cal.com')}
                onMouseLeave={resetCursorState}
                className="flex items-center gap-2.5 rounded-full bg-white/10 px-8 py-4 text-base font-semibold text-white hover:bg-white/20 border border-white/15 transition-all backdrop-blur-md"
              >
                <Calendar className="h-5 w-5 text-blue-400" />
                <span>Schedule 1:1 Call</span>
              </a>
            </Magnetic>
          )}
        </div>

        {/* Social Accounts Grid */}
        <div className="pt-12 border-t border-white/10 max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorState('button', social.platform)}
                onMouseLeave={resetCursorState}
                className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-mono text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10 transition-all"
              >
                {getIcon(social.iconName)}
                <span>{social.platform}</span>
                <ArrowUpRight className="h-3 w-3 text-neutral-500" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
