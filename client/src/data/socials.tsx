import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF, FaYoutube, FaEnvelope } from 'react-icons/fa';
import type { SocialItem } from '@/components/ui/social-flip-button';

// The tiles spell INDOVA and flip to the icons on hover.
// TODO: add the real profile URLs. A tile with no `href` is shown but is not clickable.
export const socialItems: SocialItem[] = [
  { letter: 'I', icon: <FaLinkedinIn />, label: 'LinkedIn' },
  { letter: 'N', icon: <FaInstagram />, label: 'Instagram' },
  { letter: 'D', icon: <FaTwitter />, label: 'Twitter / X' },
  { letter: 'O', icon: <FaFacebookF />, label: 'Facebook' },
  { letter: 'V', icon: <FaYoutube />, label: 'YouTube' },
  { letter: 'A', icon: <FaEnvelope />, label: 'Email', href: 'mailto:partnerships@indovabeyond.com' },
];
