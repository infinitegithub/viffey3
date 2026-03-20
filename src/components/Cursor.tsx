'use client';

import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

const HOVER_SELECTOR = 'a, button, [data-cursor]';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);
  type HoverHandlers = {
    onEnter: (e: Event) => void;
    onLeave: (e: Event) => void;
  };

  const attachedElements = useRef<Map<Element, HoverHandlers>>(new Map());

  // Attach hover listeners to an element
  const attachHoverListeners = (el: Element) => {
    if (attachedElements.current.has(el)) return;

    const onEnterHover = () => {
      dotRef.current?.classList.add(styles.hover);
      ringRef.current?.classList.add(styles.hover);
    };
    const onLeaveHover = () => {
      dotRef.current?.classList.remove(styles.hover);
      ringRef.current?.classList.remove(styles.hover);
    };

    el.addEventListener('mouseenter', onEnterHover);
    el.addEventListener('mouseleave', onLeaveHover);

    // Store both the element and its handlers for proper cleanup
    attachedElements.current.set(el, { onEnter: onEnterHover, onLeave: onLeaveHover });
  };

  // Detach hover listeners from an element
  const detachHoverListeners = (el: Element) => {
    const handlers = attachedElements.current.get(el);
    if (!handlers) return;

    el.removeEventListener('mouseenter', handlers.onEnter);
    el.removeEventListener('mouseleave', handlers.onLeave);
    attachedElements.current.delete(el);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(animate);

    // Initial attachment to existing elements
    const initialEls = document.querySelectorAll(HOVER_SELECTOR);
    initialEls.forEach(el => attachHoverListeners(el));

    // Watch for new elements added to DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            // Check if the new element matches our selector
            if (el.matches && el.matches(HOVER_SELECTOR)) {
              attachHoverListeners(el);
            }
            // Check child elements
            const children = el.querySelectorAll(HOVER_SELECTOR);
            children.forEach(child => attachHoverListeners(child));
          }
        });

        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (el.matches && el.matches(HOVER_SELECTOR)) {
              detachHoverListeners(el);
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
      // Clean up attached elements
      attachedElements.current.forEach((handlers, el) => {
        el.removeEventListener('mouseenter', handlers.onEnter);
        el.removeEventListener('mouseleave', handlers.onLeave);
      });
      attachedElements.current.clear();
    };
  }, []);

  return (
    <div className={styles.cursor} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </div>
  );
}
