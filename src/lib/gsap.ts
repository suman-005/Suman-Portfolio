import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Default configuration
  ScrollTrigger.defaults({
    markers: false,
  });
}

export { gsap, ScrollTrigger };
