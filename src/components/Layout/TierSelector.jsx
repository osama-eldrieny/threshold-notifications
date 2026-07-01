import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@exp-textura/react';

const tiers = [
  {
    id: 'approaching',
    label: 'Approaching',
    description: '70 to 90%',
    color: 'positive',
    icon: '📊'
  },
  {
    id: 'reaching',
    label: 'Reaching',
    description: '90 to 100%',
    color: 'warning',
    icon: '⚠️'
  },
  {
    id: 'exceeding',
    label: 'Exceeding',
    description: 'above 100%',
    color: 'critical',
    icon: '🔴'
  }
];

export function TierSelector({ currentTier, onTierChange }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const currentTierData = tiers.find(t => t.id === currentTier) || tiers[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  return (
    <div ref={menuRef} style={{ position: 'relative' }}>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px'
        }}
      >
        <span>{currentTierData.icon}</span>
        <span style={{ fontSize: '12px', fontWeight: '500' }}>
          {currentTierData.label}
        </span>
      </Button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: '-280px',
            right: '0',
            width: '320px',
            backgroundColor: 'var(--ntx-color-surface)',
            border: '1px solid var(--ntx-color-border)',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 1000
          }}
        >
          <div style={{ marginBottom: '12px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
              Select Quota Tier
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tiers.map(tier => (
              <button
                key={tier.id}
                onClick={() => {
                  onTierChange?.(tier.id);
                  setOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  border: currentTier === tier.id ? '2px solid #D0D8E0' : '1px solid var(--ntx-color-border)',
                  borderRadius: '8px',
                  backgroundColor: currentTier === tier.id ? '#F0F4F8' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontSize: '13px',
                  color: currentTier === tier.id ? '#0F1C3F' : 'inherit'
                }}
              >
                <div style={{ fontSize: '20px', flexShrink: 0, lineHeight: 1 }}>{tier.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px', lineHeight: 1.2 }}>
                    {tier.label}
                  </div>
                  <div style={{ fontSize: '12px', opacity: currentTier === tier.id ? '0.9' : '0.7', lineHeight: 1.2 }}>
                    {tier.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
