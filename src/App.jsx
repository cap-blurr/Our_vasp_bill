import { useState, useEffect } from 'react';
import Header from './components/Header';
import BillAnalysisTab from './components/BillAnalysisTab';
import ProposeTab from './components/ProposeTab';
import ProposalsTab from './components/ProposalsTab';
import { COLORS, FONT } from './constants';

export default function App() {
  // If a proposal deep-link is in the URL (?p=ID), open Community tab directly
  const [targetProposalId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('p') || null;
  });

  const [activeTab, setActiveTab] = useState(() =>
    new URLSearchParams(window.location.search).get('p') ? 'community' : 'analysis'
  );

  const [user, setUser] = useState(() => {
    const name = localStorage.getItem('vasp_user_name');
    const phone = localStorage.getItem('vasp_user_phone');
    const phoneHash = localStorage.getItem('vasp_user_phone_hash');
    return name && phone && phoneHash ? { name, phone, phoneHash } : null;
  });

  // When navigating from Analysis → Propose, carry the regulation to pre-select
  const [pendingReg, setPendingReg] = useState(null);

  const handleSetUser = (userData) => {
    if (userData === null) {
      localStorage.removeItem('vasp_user_name');
      localStorage.removeItem('vasp_user_phone');
      localStorage.removeItem('vasp_user_phone_hash');
    } else {
      localStorage.setItem('vasp_user_name',      userData.name);
      localStorage.setItem('vasp_user_phone',     userData.phone);
      localStorage.setItem('vasp_user_phone_hash',userData.phoneHash);
    }
    setUser(userData);
  };

  // Called from BillAnalysisTab when user clicks "Propose for this provision"
  const handleNavigateToPropose = (reg) => {
    setPendingReg(reg);
    setActiveTab('propose');
  };

  // Called from ProposeTab once it has consumed the pending reg
  const handlePendingRegConsumed = () => {
    setPendingReg(null);
  };

  const TABS = [
    { id: 'analysis',  label: 'Bill Analysis' },
    { id: 'propose',   label: 'Propose' },
    { id: 'community', label: 'Community' },
  ];

  return (
    <div style={{ background: '#F1F5F9', minHeight: '100vh', fontFamily: FONT }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        <Header user={user} onSetUser={handleSetUser} />

        {/* Public participation location banner — animated & attention-grabbing */}
        <style>{`
          @keyframes bannerShimmer {
            0%   { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes edgePulse {
            0%, 100% { box-shadow: inset 0 0 12px rgba(251,146,60,0.2), 0 0 10px rgba(251,146,60,0.08); }
            50%      { box-shadow: inset 0 0 24px rgba(251,146,60,0.4), 0 0 22px rgba(251,146,60,0.2); }
          }
          @keyframes pinBounce {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-4px); }
          }
          @keyframes arrowSlide {
            0%, 100% { transform: translateX(0); opacity: 1; }
            50%      { transform: translateX(4px); opacity: 0.6; }
          }
          .venue-banner {
            position: relative;
            display: block;
            background: linear-gradient(135deg, #7C2D12 0%, #9A3412 30%, #B45309 60%, #92400E 100%);
            padding: 20px 20px;
            text-decoration: none;
            cursor: pointer;
            overflow: hidden;
            animation: edgePulse 3s ease-in-out infinite;
            border-bottom: 2px solid #FB923C;
            border-top: 2px solid #FB923C;
          }
          .venue-banner::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(
              90deg,
              transparent 0%,
              rgba(251,191,36,0.1) 25%,
              rgba(251,146,60,0.22) 50%,
              rgba(251,191,36,0.1) 75%,
              transparent 100%
            );
            background-size: 200% 100%;
            animation: bannerShimmer 3s ease-in-out infinite;
            pointer-events: none;
          }
          .venue-banner::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 1px;
            background: linear-gradient(
              90deg,
              transparent,
              rgba(251,191,36,0.6),
              rgba(251,146,60,0.9),
              rgba(251,191,36,0.6),
              transparent
            );
            background-size: 200% 100%;
            animation: bannerShimmer 3s ease-in-out infinite;
          }
          .venue-banner:hover {
            background: linear-gradient(135deg, #92400E 0%, #B45309 30%, #D97706 60%, #B45309 100%);
          }
          .venue-pin {
            animation: pinBounce 2s ease-in-out infinite;
          }
          .venue-arrow {
            animation: arrowSlide 1.5s ease-in-out infinite;
          }
        `}</style>
        <a
          href="https://maps.app.goo.gl/SRnynCauAAqhnXnd6"
          target="_blank"
          rel="noopener noreferrer"
          className="venue-banner"
        >
          <div style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}>
            <span className="venue-pin" style={{
              fontSize: 32,
              lineHeight: 1,
              filter: 'drop-shadow(0 0 8px rgba(251,146,60,0.6))',
            }}>📍</span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#FBBF24',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: 4,
              }}>
                Public Participation Venue
              </div>
              <div style={{
                fontSize: 17,
                fontWeight: 700,
                color: '#FEF3C7',
                lineHeight: 1.3,
              }}>
                Co-operative University of Kenya
              </div>
              <div style={{
                fontSize: 13,
                color: '#FDE68A',
                marginTop: 3,
              }}>
                Karen, Nairobi
              </div>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}>
              <span className="venue-arrow" style={{
                display: 'inline-block',
                fontSize: 13,
                color: '#FEF3C7',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                background: 'rgba(251,191,36,0.2)',
                border: '1px solid rgba(251,191,36,0.4)',
                borderRadius: 6,
                padding: '6px 14px',
              }}>
                View Map →
              </span>
            </div>
          </div>
        </a>

        {/* Tab bar */}
        <div style={{
          display: 'flex',
          background: COLORS.bg,
          borderBottom: `1px solid ${COLORS.border}`,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '13px 8px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id
                  ? `2px solid ${COLORS.accent}`
                  : '2px solid transparent',
                color: activeTab === tab.id ? COLORS.accent : COLORS.textSecondary,
                fontSize: 13,
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer',
                fontFamily: FONT,
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ padding: 16 }}>
          {activeTab === 'analysis' && (
            <BillAnalysisTab
              onNavigateToPropose={handleNavigateToPropose}
            />
          )}
          {activeTab === 'propose' && (
            <ProposeTab
              user={user}
              onSetUser={handleSetUser}
              onSwitchToCommunity={() => setActiveTab('community')}
              pendingReg={pendingReg}
              onPendingRegConsumed={handlePendingRegConsumed}
            />
          )}
          {activeTab === 'community' && (
            <ProposalsTab
              user={user}
              onSetUser={handleSetUser}
              targetProposalId={targetProposalId}
            />
          )}
        </div>

      </div>
    </div>
  );
}
