import React, { useState } from 'react';
import Tech4Url from '../assets/images/tech4.svg';

// Small accessible badge + tooltip component used in problem descriptions
export default function RankBadgeTooltip({ alt = 'Tech4', width = 48, height = 60, imgClass = 'solution-badge-md', compact = false, compactTop, compactTranslateY, position = 'right' }) {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    console.log('Tech4 tooltip mouse enter');
    setOpen(true);
  };

  const handleMouseLeave = () => {
    console.log('Tech4 tooltip mouse leave');
    setOpen(false);
  };

  const handleClick = () => {
    console.log('Tech4 tooltip clicked, current state:', open);
    setOpen((s) => !s);
  };

  return (
    <span 
      className="rank-badge-tooltip tech4-inline" 
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
        <img src={Tech4Url} width={width} height={height} className={imgClass} alt={alt} aria-hidden style={{ verticalAlign: '-0.5em', marginRight: 12, display: 'block', borderRadius: 6 }} />
      </button>

      <span
        className={`tooltip-content ${open ? 'show' : ''}`}
        role="status"
        aria-hidden={!open}
        style={{
          position: 'absolute',
          left: position === 'left' ? 'auto' : '110%',
          right: position === 'left' ? '110%' : 'auto',
          // bring compact tooltip a bit lower by default; allow per-use overrides via compactTop/compactTranslateY
          top: compactTop ?? (compact ? '12%' : '90%'),
          transform: compactTranslateY ?? (compact ? 'translateY(-90%)' : 'translateY(0%)'),
          display: open ? 'block' : 'none',
          width: 'max-content',
          padding: compact ? '4px 6px' : '6px 10px',
          fontSize: compact ? '0.75rem' : '0.85rem',
          whiteSpace: 'nowrap',
          borderRadius: 6,
          pointerEvents: 'auto',
          zIndex: 1000,
          background: 'rgba(255,255,255,0.98)',
          border: '2px solid rgba(15,23,42,0.2)',
          boxShadow: open ? '0 6px 20px rgba(16,24,40,0.3)' : 'none'
        }}
      >
        <strong style={{ fontSize: compact ? '0.86rem' : undefined }}>Novice — Tech4:</strong>
        <span style={{ color: '#374151', fontSize: compact ? '0.8rem' : '0.92rem', marginLeft: 6 }}>earn a stripe!</span>
      </span>
    </span>
  );
}
