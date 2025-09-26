'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const storyRefs = useRef<(HTMLElement | null)[]>(new Array(11).fill(null));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation sequence with delay to ensure smooth loading
      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(logoRef.current,
        { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" }
      )
      .to(".hero-title",
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=0.8"
      )
      .to(".hero-subtitle",
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6"
      );

      // Story sections animation with stagger
      storyRefs.current.forEach((ref) => {
        if (ref) {
          gsap.fromTo(ref,
            { y: 100, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Floating elements fade in first, then start floating animation
      gsap.to(".floating-element", {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 1.5,
        stagger: 0.1
      });

      // Floating elements with more complex animation (start after hero loads)
      gsap.to(".floating-element", {
        y: -30,
        x: 10,
        rotation: 180,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 3, // Start after fade in
        stagger: {
          amount: 2,
          from: "random"
        }
      });

      // Parallax effect for background elements
      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Text reveal animation for paragraphs
      gsap.utils.toArray(".story-paragraph").forEach((paragraph) => {
        gsap.fromTo(paragraph as Element,
          { 
            opacity: 0,
            y: 30,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: paragraph as Element,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative">
      {/* Background Pattern */}
      <div className="parallax-bg absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-amber-200 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-rose-200 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-blue-200 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Background floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-element absolute top-20 left-10 w-3 h-3 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full shadow-lg" style={{ opacity: 0 }}></div>
          <div className="floating-element absolute top-40 right-20 w-2 h-2 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full shadow-lg" style={{ opacity: 0 }}></div>
          <div className="floating-element absolute bottom-40 left-20 w-4 h-4 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full shadow-lg" style={{ opacity: 0 }}></div>
          <div className="floating-element absolute bottom-20 right-10 w-2.5 h-2.5 bg-gradient-to-r from-purple-300 to-violet-300 rounded-full shadow-lg" style={{ opacity: 0 }}></div>
          <div className="floating-element absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full shadow-lg" style={{ opacity: 0 }}></div>
          <div className="floating-element absolute top-1/3 right-1/3 w-2 h-2 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-full shadow-lg" style={{ opacity: 0 }}></div>
        </div>

        <div ref={logoRef} className="mb-16 transform-gpu" style={{ transform: 'scale(0.5) rotate(-10deg)', opacity: 0 }}>
          <div className="relative">
        <Image
              src="/assets/logo.svg"
              alt="Helio Logo"
              width={192}
              height={192}
              className="w-40 h-40 md:w-48 md:h-48 drop-shadow-2xl"
          priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-rose-200/20 rounded-full blur-xl scale-110"></div>
          </div>
        </div>

        <div className="text-center max-w-5xl">
          <h1 className="hero-title text-6xl md:text-8xl font-extralight text-slate-800 mb-8 leading-tight tracking-tight" style={{ opacity: 0, transform: 'translateY(100px)' }}>
            Helio
          </h1>
          <p className="hero-subtitle text-2xl md:text-3xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto" style={{ opacity: 0, transform: 'translateY(50px)' }}>
            Phase I(Lucina): Bringing light to women&apos;s health patterns
          </p>
        </div>
      </section>

      {/* Story Sections */}
      <div className="max-w-5xl mx-auto px-6 py-24 space-y-40 relative">
        
        <section ref={el => { storyRefs.current[0] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-amber-200 via-orange-200 to-transparent opacity-60"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            I met Sophia about a year ago. From the first day she felt like a force of energy. She grew up sailing and she still loves the water. She never misses a chance to travel and she spends hours at the gym because moving her body makes her feel alive. She is the kind of friend who fills a room and lifts others with her energy.
          </p>
        </section>

        <section ref={el => { storyRefs.current[1] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-rose-200 via-pink-200 to-transparent opacity-60"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            In May of this year that energy started to fade. Sophia began experiencing pain and fatigue that circled back around her period. At first it seemed like an inconvenience but quickly it became something heavier. Doctors ran blood tests, ordered imaging, and wrote in their notes that everything was normal. Nothing matched what she felt in her body. Each time she heard &ldquo;normal&rdquo; she grew quieter, less certain of herself, less believed.
          </p>
        </section>

        <section ref={el => { storyRefs.current[2] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-200 via-cyan-200 to-transparent opacity-60"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            One of the hardest moments was hearing her talk about how impossible it was to see an OB-GYN. In Canada she had to wait a month for an appointment and by then the cycle of pain had already come and gone. She ended up traveling all the way to Buffalo, New York just to get an MRI. Even then the results were inconclusive. Watching this unfold has been devastating. I have seen one of the brightest, most ambitious, most outgoing people I know turn into someone who feels sad and stuck.
          </p>
        </section>

        <section ref={el => { storyRefs.current[3] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-purple-200 via-violet-200 to-transparent opacity-60"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            This is not just Sophia&apos;s story. My mother had her own struggles when she was young and pregnant. Her hemoglobin and estrogen levels were low and she fainted often. My grandmother lived with chronic dizziness and blood pressure that was always low. Friends tell me about pelvic pain that comes and goes, heavy bleeding, sudden exhaustion, mood swings. These are echoes of the same story. They cross generations. They appear in different bodies. They are everywhere.
          </p>
        </section>

        <section ref={el => { storyRefs.current[4] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-emerald-200 via-teal-200 to-transparent opacity-60"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            The truth is that women&apos;s health has been left in the dark. Endometriosis affects an estimated one in ten women worldwide, yet the average time to diagnosis is between six and ten years. Maternal health is another painful reminder. More than seven hundred women die every day from causes that could have been prevented with the right care. Heart disease, the leading cause of death for women, often goes unrecognized because the symptoms present differently than in men. Menopause touches every woman yet remains one of the least understood and least studied stages of life. For decades women were excluded from clinical trials. It was not until 1993 that their participation was even required by law.
          </p>
        </section>

        <section ref={el => { storyRefs.current[5] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-indigo-200 via-blue-200 to-transparent opacity-60"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            What Sophia lives through is the result of a system that was never designed to see cycles. Pain, fatigue, and bleeding flare at predictable points each month, but tests and imaging are ordered at random times. Short visits cannot capture weeks of suffering. The data looks episodic while the reality is rhythmic. That gap between what is measured and what is lived is why Sophia feels invisible.
          </p>
        </section>

        <section ref={el => { storyRefs.current[6] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-amber-300 via-orange-300 to-transparent opacity-70"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            Helio is the umbrella. The name means light for a reason. The mission is to bring hidden patterns in health into view and to turn lived experience into knowledge that medicine can use. Helio is not a single app. It is a long project to build the data, the methods, and the trust to uncover rhythms that snapshots miss, and to do it across women&apos;s health first, then across the rest of life.
          </p>
        </section>

        <section ref={el => { storyRefs.current[7] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-emerald-300 via-teal-300 to-transparent opacity-70"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            Lucina is Phase I. Lucina comes from Latin and refers to the Roman protector of childbirth, linked to the word lux, which means light. The sense is &ldquo;she who brings into the light.&rdquo; Lucina is a simple mobile companion that listens every day and lines each note up with the user&apos;s cycle. In about thirty seconds a day, a woman can log pain, energy, mood, bleeding, sleep, and anything else she wants to remember. Lucina turns those notes into clear pattern cards that say what repeats, when it repeats, and what it tends to come with. Lucina then creates a visit packet that a doctor can read in minutes. This is a familiar model that people already use. Trackers like Clue, Flo, and Glow proved that millions will check in daily when the product is respectful and useful. Lucina builds on that habit and turns it into evidence that can change a visit.
          </p>
        </section>

        <section ref={el => { storyRefs.current[8] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-indigo-300 via-purple-300 to-transparent opacity-70"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            The mission beyond Lucina is larger. Medicine has been built around isolated moments. One appointment. One lab. One image. Life does not happen that way. Life is a sequence. When you capture sequences and put them in order, new knowledge appears. Helio&apos;s goal is to collect these sequences with consent, to structure them with care, and to study them with modern tools so that patterns that were always there finally become visible. Artificial intelligence can help, but only when the data reflects real life and not only chart notes. We begin with women&apos;s health because the blind spots are wide and the need is urgent. The same foundation can then carry into men&apos;s health, children&apos;s health, and aging, where rhythm and context matter just as much.
          </p>
        </section>

        <section ref={el => { storyRefs.current[9] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-rose-300 via-pink-300 to-transparent opacity-70"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            In just a few days I shared this idea with fifty women I know. Their response was overwhelming. Nearly all of them said the same thing: I would pay for this. How fast can you build it. They are not asking for another app to scroll through. They are asking for a tool that can shorten the painful years of waiting, misdiagnosis, and dismissal.
          </p>
        </section>

        <section ref={el => { storyRefs.current[10] = el; }} className="relative">
          <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-300 via-cyan-300 to-transparent opacity-70"></div>
          <p className="story-paragraph text-xl md:text-2xl text-slate-700 leading-relaxed font-light pl-8 text-smooth">
            Sophia is my friend and she is the reason I started this. But she is not alone. Behind her story are millions of women, mothers, and daughters who deserve clarity. Helio's Lucina is for them.
          </p>
        </section>

      </div>

      {/* Footer */}
      <footer className="py-20 text-center relative">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <div className="relative inline-block">
          <Image
                src="/assets/logo.svg" 
                alt="Helio Logo" 
                width={80}
                height={80}
                className="w-20 h-20 mx-auto opacity-70 drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 to-rose-200/30 rounded-full blur-lg scale-125"></div>
            </div>
          </div>
          <p className="text-xl text-slate-600 font-light tracking-wide">
            Lucina — Bringing light to women&apos;s health
          </p>
          <div className="mt-8 flex justify-center space-x-8">
            <div className="w-2 h-2 bg-gradient-to-r from-amber-300 to-orange-300 rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-rose-300 to-pink-300 rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-300 to-violet-300 rounded-full opacity-60"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
