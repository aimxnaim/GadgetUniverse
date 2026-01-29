import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

const HorizontalScroller = ({ title, items = [], renderItem }) => {
  const scrollerRef = useRef(null);

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.floor(el.clientWidth * 0.8));
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="home-wrapper-2 py-5" style={{ backgroundColor: 'transparent', marginTop: '0' }}>
      <div className="container-xxl">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="section-heading m-0" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1a1a1a' }}>{title}</h3>
          <div className="d-flex align-items-center gap-3">
            <button 
              aria-label="scroll left" 
              className="btn rounded-circle border-0" 
              style={{ 
                width: 44, 
                height: 44,
                backgroundColor: '#111',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
              }}
              onClick={() => scrollByAmount('left')}
            >
              ←
            </button>
            <button 
              aria-label="scroll right" 
              className="btn rounded-circle border-0" 
              style={{ 
                width: 44, 
                height: 44,
                backgroundColor: '#111',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000';
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#111';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
              }}
              onClick={() => scrollByAmount('right')}
            >
              →
            </button>
          </div>
        </div>

        <div 
          ref={scrollerRef} 
          className="d-flex overflow-auto" 
          style={{ 
            scrollBehavior: 'smooth', 
            gap: '1.5rem', 
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Hide scrollbar via CSS */}
          <style>{`
            [data-scroller]::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {items?.map((item, idx) => (
            <div key={idx} style={{ minWidth: '340px', flex: '0 0 auto' }}>
              {renderItem(item, idx)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HorizontalScroller
