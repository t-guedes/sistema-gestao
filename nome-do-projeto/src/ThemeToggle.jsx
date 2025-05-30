import React from 'react';

export default function ThemeToggle({ temaEscuro, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      title={temaEscuro ? "Tema Claro" : "Tema Escuro"}
      aria-label="Alternar tema"
    >
      {temaEscuro ? (
        // Ícone de lua (tema escuro ativo)
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
            fill="#b9fbc0"/>
        </svg>
      ) : (
        // Ícone de sol (tema claro ativo)
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="5" fill="#ffb703"/>
          <g stroke="#ffb703" strokeWidth="2">
            <line x1="12" x2="12" y1="1" y2="3"/>
            <line x1="12" x2="12" y1="21" y2="23"/>
            <line x1="4.22" x2="5.64" y1="4.22" y2="5.64"/>
            <line x1="18.36" x2="19.78" y1="18.36" y2="19.78"/>
            <line x1="1" x2="3" y1="12" y2="12"/>
            <line x1="21" x2="23" y1="12" y2="12"/>
            <line x1="4.22" x2="5.64" y1="19.78" y2="18.36"/>
            <line x1="18.36" x2="19.78" y1="5.64" y2="4.22"/>
          </g>
        </svg>
      )}
    </button>
  );
}