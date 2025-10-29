import React, { useState } from 'react';
import Tech5Url from '../assets/images/tech5.svg';

export default function Tech5Tooltip({ alt = 'Tech5', width = 48, height = 60, imgClass = 'solution-badge-md', position = 'left' }) {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    console.log('Tech5 tooltip mouse enter');
    setOpen(true);
  };

  const handleMouseLeave = () => {
    console.log('Tech5 tooltip mouse leave');
    setOpen(false);
  };

  const handleClick = () => {
    console.log('Tech5 tooltip clicked, current state:', open);
    setOpen((s) => !s);
  };

  return (
    <span 
      className="rank-badge-tooltip" 
      style={{ display: 'inline-block', position: 'relative', cursor: 'pointer' }} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        aria-label={alt}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
        style={{ 
          border: 'none', 
          background: 'transparent', 
          padding: '8px', 
          margin: 0,
          cursor: 'pointer',
          display: 'block'
        }}
      >
        <img src={Tech5Url} width={width} height={height} className={imgClass} alt={alt} aria-hidden style={{ verticalAlign: '-0.5em', marginRight: 12, display: 'block', borderRadius: 6 }} />
      </button>

      <span
        className={`tooltip-content ${open ? 'show' : ''}`}
        role="status"
        aria-hidden={!open}
        style={{
          position: 'absolute',
          left: position === 'left' ? 'auto' : '110%',
          right: position === 'left' ? '110%' : 'auto',
          top: '90%',
          transform: 'translateY(0%)',
          display: open ? 'block' : 'none',
          width: 'max-content',
          padding: '6px 10px',
          fontSize: '0.85rem',
          whiteSpace: 'nowrap',
          borderRadius: 6,
          pointerEvents: 'auto',
          zIndex: 1000,
          background: 'rgba(255,255,255,0.98)',
          border: '2px solid rgba(15,23,42,0.2)',
          boxShadow: open ? '0 6px 20px rgba(16,24,40,0.3)' : 'none'
        }}
      >
        <span>Tech5 (T/5) - You're now an NCO!</span>
      </span>
    </span>
  );
}