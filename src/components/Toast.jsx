import React from 'react';
import { useData } from '../context/DataContext';

export function Toast() {
  const { notifications } = useData();

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--spacing-lg)',
        right: 'var(--spacing-lg)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
      }}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            padding: 'var(--spacing-md) var(--spacing-lg)',
            borderRadius: 'var(--border-radius-md)',
            backgroundColor:
              notification.type === 'success'
                ? 'var(--color-success)'
                : notification.type === 'error'
                ? 'var(--color-danger)'
                : 'var(--color-primary)',
            color: 'white',
            boxShadow: 'var(--shadow-lg)',
            animation: 'slideIn 0.3s ease-in-out',
            maxWidth: '400px',
            wordWrap: 'break-word',
          }}
        >
          {notification.message}
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export function Skeleton({ width = '100%', height = '1rem', style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: 'var(--color-gray-200)',
        borderRadius: 'var(--border-radius-md)',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        ...style,
      }}
    >
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

export function SkeletonCard({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="card"
          style={{ marginBottom: 'var(--spacing-lg)' }}
        >
          <Skeleton width="60%" height="1.5rem" style={{ marginBottom: 'var(--spacing-md)' }} />
          <Skeleton width="100%" height="1rem" style={{ marginBottom: 'var(--spacing-md)' }} />
          <Skeleton width="80%" height="1rem" />
        </div>
      ))}
    </>
  );
}
