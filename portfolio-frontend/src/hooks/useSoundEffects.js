import { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR =
  'a, button, .project-card, .about-card, input, textarea, .tool-chip';

const SOUND_SRC = '/click.mp3';

/**
 * Plays a short click sound on hover and a slightly heavier one on click,
 * for anything matching the same interactive selector CustomCursor reacts
 * to. Delegated to document (mouseover/click bubble, unlike mouseenter) so
 * it keeps working as sections mount/unmount.
 *
 * Browsers block audio playback before a real user gesture, so nothing
 * plays until the first click anywhere on the page — that's a browser
 * policy, not a bug here.
 */
export function useSoundEffects() {
  const unlockedRef = useRef(false);
  const lastPlayedRef = useRef({ target: null, time: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const play = ({ rate = 1, volume = 0.5 } = {}) => {
      if (!unlockedRef.current) return;
      const audio = new Audio(SOUND_SRC);
      audio.volume = volume;
      audio.playbackRate = rate;
      audio.play().catch(() => {});
    };

    const unlock = () => {
      unlockedRef.current = true;
    };
    document.addEventListener('click', unlock, { once: true });

    const onOver = (e) => {
      const el = e.target.closest(INTERACTIVE_SELECTOR);
      if (!el) return;
      const now = performance.now();
      // avoid re-triggering while moving across children of the same element
      if (lastPlayedRef.current.target === el && now - lastPlayedRef.current.time < 250) return;
      lastPlayedRef.current = { target: el, time: now };
      play({ rate: 1.5, volume: 0.22 });
    };

    const onClick = (e) => {
      const el = e.target.closest(INTERACTIVE_SELECTOR);
      if (!el) return;
      play({ rate: 0.95, volume: 0.55 });
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('click', onClick);
      document.removeEventListener('click', unlock);
    };
  }, []);
}
