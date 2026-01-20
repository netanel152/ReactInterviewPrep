import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// --- 1. The Portal Component ---
// This renders its children into a specific DOM node (document.body)
// instead of where it is used in the React tree.
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        {children}
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 8px;
          min-width: 300px;
          position: relative;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          color: black;
          animation: slideUp 0.3s;
        }
        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #666;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>,
    document.body // Target DOM Node
  );
}

// --- 2. The Trap (Without Portals) ---
// Demonstrating why we need Portals: Overflow Hidden clipping
function BrokenModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ 
      height: 100, 
      width: 200, 
      overflow: 'hidden', // This will CLIP the modal if it's inside!
      border: '2px dashed red',
      padding: 10,
      position: 'relative',
      background: '#ffeeee'
    }}>
      <p style={{ margin: 0, fontSize: '0.8rem', color: 'red' }}>I have overflow: hidden!</p>
      <button onClick={() => setIsOpen(true)}>Open Broken Modal</button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 50,
          left: 50,
          background: 'white',
          border: '1px solid black',
          padding: 20,
          width: 200,
          height: 100,
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          color: 'black',
          zIndex: 9999
        }}>
          I am clipped! 😱
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

// --- 3. The Lab ---
export default function PortalsLab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h2>Lab K: React Portals</h2>
      <p>Portals let you render a component <strong>outside</strong> its parent's DOM hierarchy.</p>

      <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        
        {/* Scenario 1: The Problem */}
        <div>
          <h3>1. Without Portal (The Problem)</h3>
          <p>The modal gets clipped by the parent's `overflow: hidden`.</p>
          <BrokenModal />
        </div>

        {/* Scenario 2: The Solution */}
        <div>
          <h3>2. With Portal (The Solution)</h3>
          <p>The modal is rendered in `document.body`, escaping the container.</p>
          
          <div style={{ 
            height: 100, 
            width: 200, 
            overflow: 'hidden', 
            border: '2px dashed green',
            padding: 10,
            background: '#eeffee'
          }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'green' }}>I also have overflow: hidden!</p>
            <button onClick={() => setIsModalOpen(true)}>Open Portal Modal</button>
          </div>
          
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h3>I am a Portal! 🚪</h3>
            <p>I am legally outside the parent div, so `overflow: hidden` can't hurt me.</p>
            <p>Inspect the DOM to see that I am a direct child of `body`.</p>
            <div style={{ marginTop: 20, textAlign: 'right' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ background: '#007bff', color: 'white' }}>
                Awesome
              </button>
            </div>
          </Modal>
        </div>

      </div>
    </div>
  );
}
