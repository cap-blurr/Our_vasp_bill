import { useState } from 'react';
import Header from './components/Header';
import BillAnalysisTab from './components/BillAnalysisTab';
import ProposeTab from './components/ProposeTab';
import ProposalsTab from './components/ProposalsTab';
import { COLORS, FONT } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState('analysis');
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
            />
          )}
        </div>

      </div>
    </div>
  );
}
