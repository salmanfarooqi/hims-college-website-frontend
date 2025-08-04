// Default Profile Image Component
// Provides consistent unknown/default profile images across the application

import React from 'react';

interface DefaultProfileImageProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  type?: 'teacher' | 'student' | 'admin' | 'user';
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16', 
  lg: 'w-24 h-24',
  xl: 'w-32 h-32'
};

const typeColors = {
  teacher: {
    primary: '#3B82F6',
    secondary: '#1E40AF',
    accent: '#60A5FA'
  },
  student: {
    primary: '#10B981',
    secondary: '#047857',
    accent: '#34D399'
  },
  admin: {
    primary: '#8B5CF6',
    secondary: '#5B21B6',
    accent: '#A78BFA'
  },
  user: {
    primary: '#6B7280',
    secondary: '#374151',
    accent: '#9CA3AF'
  }
};

export const DefaultProfileImage: React.FC<DefaultProfileImageProps> = ({
  name = 'Unknown',
  size = 'md',
  type = 'user',
  className = ''
}) => {
  const colors = typeColors[type];
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const svgContent = `
    <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${type}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow-${type}">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.1"/>
        </filter>
      </defs>
      
      <!-- Background Circle -->
      <circle cx="100" cy="100" r="100" fill="url(#grad-${type})" filter="url(#shadow-${type})"/>
      
      <!-- Person Icon -->
      <g transform="translate(100, 100)">
        <!-- Head -->
        <circle cx="0" cy="-20" r="25" fill="white" opacity="0.9"/>
        <!-- Body -->
        <path d="M-35 20 Q-35 -5 0 -5 Q35 -5 35 20 L35 50 L-35 50 Z" fill="white" opacity="0.9"/>
      </g>
      
      <!-- Initials -->
      <text x="100" y="110" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="36" font-weight="bold" opacity="0.95">
        ${initials}
      </text>
      
      <!-- Type Badge -->
      <circle cx="160" cy="40" r="20" fill="${colors.accent}" opacity="0.9"/>
      <text x="160" y="46" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">
        ${type.charAt(0).toUpperCase()}
      </text>
    </svg>
  `;

  const dataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;

  return (
    <img
      src={dataUrl}
      alt={`${name} profile`}
      className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
      style={{ minWidth: sizeClasses[size].split(' ')[0].replace('w-', '').replace('[', '').replace(']', '') }}
    />
  );
};

// Helper function to generate default profile image URL
export const getDefaultProfileImageUrl = (
  name: string = 'Unknown',
  type: 'teacher' | 'student' | 'admin' | 'user' = 'user'
): string => {
  const colors = typeColors[type];
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const svgContent = `
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </linearGradient>
        <filter id="shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.15"/>
        </filter>
      </defs>
      
      <!-- Background Circle -->
      <circle cx="200" cy="200" r="200" fill="url(#grad)" filter="url(#shadow)"/>
      
      <!-- Person Icon -->
      <g transform="translate(200, 200)">
        <!-- Head -->
        <circle cx="0" cy="-40" r="50" fill="white" opacity="0.9"/>
        <!-- Body -->
        <path d="M-70 40 Q-70 -10 0 -10 Q70 -10 70 40 L70 100 L-70 100 Z" fill="white" opacity="0.9"/>
      </g>
      
      <!-- Initials -->
      <text x="200" y="220" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="72" font-weight="bold" opacity="0.95">
        ${initials}
      </text>
      
      <!-- Type Badge -->
      <circle cx="320" cy="80" r="40" fill="${colors.accent}" opacity="0.9"/>
      <text x="320" y="92" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
        ${type.charAt(0).toUpperCase()}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgContent)}`;
};

export default DefaultProfileImage;