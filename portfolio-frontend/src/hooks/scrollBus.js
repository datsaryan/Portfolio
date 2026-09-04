/**
 * One scroll listener, one requestAnimationFrame loop, for the entire
 * app — every scroll-driven visual effect (parallax, hero fade, scroll
 * progress bar, navbar state) subscribes here instead of each rolling
 * its own `window.addEventListener('scroll', ...)` + `requestAnimationFrame`
 * pair. Running N of those in parallel means N separate callbacks and N
 * separate layout reads competing for the same frame budget every time
 * the page moves — that's the usual cause of scroll jank. Consolidating
 * to one read/dispatch pass per frame is the fix.
 *
 * Deliberately independent of Lenis (see useLenis.js): Lenis drives the
 * browser's *real* scroll position, which still fires native `scroll`
 * events, so subscribing here works identically whether Lenis is active,
 * mid-init, or unavailable — no ordering dependency between the two.
 */

const subscribers = new Set();
let raf = null;
let listening = false;

function tick() {
  raf = null;
  subscribers.forEach((cb) => cb());
}

function onScrollOrResize() {
  if (raf == null) raf = requestAnimationFrame(tick);
}

function ensureListening() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);
}

/**
 * Registers `callback` to run on the shared frame tick whenever the page
 * scrolls or resizes. Fires once immediately on subscribe so the element
 * is positioned correctly before the next real scroll event. Returns an
 * unsubscribe function — call it in your effect's cleanup.
 */
export function subscribeScroll(callback) {
  ensureListening();
  subscribers.add(callback);
  callback();
  return () => {
    subscribers.delete(callback);
  };
}
