import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Spin360Viewer - Lightweight, accessible 360° spin viewer for product images.
 *
 * Usage example:
 *   <Spin360Viewer spinImages={product.spinImages} initialFrame={0} />
 *
 * Do not wrap this component in a <Link>.
 */
const Spin360Viewer = ({
  spinImages = [],
  initialFrame = 0,
  loop = true,
  dragSpeed = 1.0,
  className = '',
  onFrameChange,
  preload = 'auto', // 'auto' | 'defer'
}) => {
  // --- State ---
  const [frame, setFrame] = useState(initialFrame);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOrigin, setDragOrigin] = useState(null); // {x, frame}
  const [autospin, setAutospin] = useState(false);
  const [loaded, setLoaded] = useState(Array(spinImages.length).fill(false));
  const [failed, setFailed] = useState(Array(spinImages.length).fill(0)); // 0: not tried, 1: failed once
  const [hintVisible, setHintVisible] = useState(true);
  const rAF = useRef();
  const containerRef = useRef();
  const total = spinImages.length;
  const minDragPx = 2; // Minimum px to trigger frame change
  const dragSensitivity = Math.max(0.1, dragSpeed);
  const preloadStep = 5; // Preload every 5th frame first
  const autospinSpeed = 60; // ms per frame

  // --- Preload logic ---
  // Preload key frames first, then rest in background
  useEffect(() => {
    if (!total) return;
    let isMounted = true;
    const loadedArr = Array(total).fill(false);
    // Preload every 5th frame first
    const keyFrames = [];
    for (let i = 0; i < total; i += preloadStep) keyFrames.push(i);
    if (!keyFrames.includes(initialFrame)) keyFrames.push(initialFrame);
    const restFrames = Array.from({length: total}, (_, i) => i).filter(i => !keyFrames.includes(i));
    // Helper to load a frame
    const loadFrame = (idx, retry = false) => {
      if (!spinImages[idx]) return;
      const img = new window.Image();
      img.loading = 'lazy';
      img.onload = () => {
        if (isMounted) {
          loadedArr[idx] = true;
          setLoaded(l => {
            const arr = [...l]; arr[idx] = true; return arr;
          });
        }
      };
      img.onerror = () => {
        if (!retry && isMounted) {
          setTimeout(() => loadFrame(idx, true), 200);
        } else if (isMounted) {
          setFailed(f => { const arr = [...f]; arr[idx] = 1; return arr; });
        }
      };
      img.src = spinImages[idx];
    };
    // Preload key frames
    keyFrames.forEach(i => loadFrame(i));
    // Preload rest in background
    if (preload === 'auto') {
      setTimeout(() => restFrames.forEach(i => loadFrame(i)), 500);
    }
    return () => { isMounted = false; };
  }, [spinImages, total, initialFrame, preload]);

  // --- Frame update (rAF for autospin) ---
  useEffect(() => {
    if (!autospin || !total) return;
    let last = Date.now();
    let stopped = false;
    function step() {
      if (stopped) return;
      const now = Date.now();
      if (now - last >= autospinSpeed) {
        setFrame(f => {
          let next = f + 1;
          if (next >= total) next = loop ? 0 : total - 1;
          if (onFrameChange) onFrameChange(next);
          return next;
        });
        last = now;
      }
      rAF.current = requestAnimationFrame(step);
    }
    rAF.current = requestAnimationFrame(step);
    return () => { stopped = true; cancelAnimationFrame(rAF.current); };
  }, [autospin, total, loop, autospinSpeed, onFrameChange]);

  // --- Drag/Pointer logic ---
  const pointerId = useRef(null);
  const dragAccum = useRef(0);
  const handlePointerDown = e => {
    if (!total) return;
    setIsDragging(true);
    setHintVisible(false);
    pointerId.current = e.pointerId;
    dragAccum.current = 0;
    setDragOrigin({ x: e.clientX, frame });
    containerRef.current.setPointerCapture(e.pointerId);
    if (autospin) setAutospin(false);
  };
  const handlePointerMove = e => {
    if (!isDragging || !dragOrigin) return;
    const dx = e.clientX - dragOrigin.x;
    dragAccum.current += dx;
    if (Math.abs(dragAccum.current) >= minDragPx) {
      let framesMoved = Math.floor(dragAccum.current * dragSensitivity / 10);
      if (framesMoved !== 0) {
        let next = dragOrigin.frame - framesMoved;
        if (loop) {
          next = (next + total) % total;
        } else {
          next = Math.max(0, Math.min(total - 1, next));
        }
        setFrame(next);
        if (onFrameChange) onFrameChange(next);
        dragAccum.current = 0;
        setDragOrigin({ x: e.clientX, frame: next });
      }
    }
  };
  const handlePointerUp = e => {
    setIsDragging(false);
    pointerId.current && containerRef.current.releasePointerCapture(pointerId.current);
    pointerId.current = null;
    dragAccum.current = 0;
  };
  const handlePointerCancel = handlePointerUp;

  // --- Touch support (pointer events covers both) ---

  // --- Keyboard support ---
  const handleKeyDown = useCallback(e => {
    if (!total) return;
    if (e.key === 'ArrowLeft') {
      let next = frame - 1;
      if (next < 0) next = loop ? total - 1 : 0;
      setFrame(next);
      if (onFrameChange) onFrameChange(next);
    } else if (e.key === 'ArrowRight') {
      let next = frame + 1;
      if (next >= total) next = loop ? 0 : total - 1;
      setFrame(next);
      if (onFrameChange) onFrameChange(next);
    }
  }, [frame, total, loop, onFrameChange]);

  // --- Accessibility: focus on mount for keyboard nav ---
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.tabIndex = 0;
    }
  }, []);

  // --- Edge case: empty images ---
  useEffect(() => {
    if (!spinImages || !spinImages.length) {
      console.warn('Spin360Viewer: spinImages prop is empty.');
    }
  }, [spinImages]);

  // --- Frame change callback ---
  useEffect(() => {
    if (onFrameChange) onFrameChange(frame);
  }, [frame, onFrameChange]);

  // --- Render ---
  if (!spinImages || !spinImages.length) {
    return <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl min-h-40 ${className}`}>No 360° images available.</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none outline-none ${className}`}
      style={{ touchAction: 'pan-y', WebkitUserSelect: 'none', userSelect: 'none' }}
      role="application"
      aria-label="360 degree product viewer"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      // Do not wrap this component in a <Link>
    >
      {/* Main image */}
      <img
        src={spinImages[frame]}
        alt={`Product 360 frame ${frame + 1}`}
        className="w-full h-full object-contain bg-white dark:bg-gray-900 rounded-xl"
        draggable={false}
        loading="lazy"
        style={{ pointerEvents: isDragging ? 'none' : 'auto', userSelect: 'none' }}
        onContextMenu={e => e.preventDefault()}
        onError={e => {
          if (failed[frame] < 1) {
            // Retry once
            const img = e.target;
            img.src = spinImages[frame];
            setFailed(f => { const arr = [...f]; arr[frame] = 1; return arr; });
          } else {
            // Skip frame
            setLoaded(l => { const arr = [...l]; arr[frame] = false; return arr; });
          }
        }}
      />
      {/* Overlay UI */}
      <div className="absolute top-2 left-2 z-20 flex items-center space-x-2 bg-black/40 text-white rounded-lg px-3 py-1 text-xs pointer-events-auto">
        <span>{frame + 1} / {total}</span>
        <button
          className="ml-2 px-2 py-1 rounded bg-white/20 hover:bg-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
          style={{ pointerEvents: 'auto' }}
          tabIndex={0}
          aria-label={autospin ? 'Pause spin' : 'Play spin'}
          onClick={() => setAutospin(a => !a)}
        >
          {autospin ? 'Pause' : 'Play'}
        </button>
      </div>
      {/* Drag hint */}
      {hintVisible && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-black/40 text-white rounded px-3 py-1 text-xs pointer-events-none select-none">
          Drag to rotate
        </div>
      )}
    </div>
  );
};

export default Spin360Viewer;

/**
 * Demo usage (not rendered, for reference):
 *
 * // In your product details page or ImmersiveViewer:
 * <Spin360Viewer
 *   spinImages={product.spinImages}
 *   initialFrame={0}
 *   loop={true}
 *   dragSpeed={1.0}
 *   className="w-full h-96"
 *   onFrameChange={idx => console.log('Frame:', idx)}
 *   preload="auto"
 * />
 */
