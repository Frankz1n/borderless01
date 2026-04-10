import React from 'react';
import {
  LayoutDashboard,
  FileText,
  User,
  Wallet,
  Receipt,
  ArrowDownToLine,
  LogOut,
  Hexagon
} from 'lucide-react';
import {
  SidebarContainer,
  Brand,
  NavList,
  NavItem,
  LogoutButton,
  Overlay
} from './styles';

interface SidebarProps {
  onLogout: () => void;
  currentScreen?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate?: (screen: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onLogout,
  currentScreen = 'Dashboard',
  isOpen = false,
  onClose,
  onNavigate
}) => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Extrato', icon: <FileText size={20} /> },
    { name: 'Perfil', icon: <User size={20} /> },
    { name: 'Registro de conta', icon: <Wallet size={20} /> },
    { name: 'Registro de entrada', icon: <ArrowDownToLine size={20} /> },
    { name: 'Registro de Pagamento', icon: <Receipt size={20} /> }
  ];

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <Brand>
          <Hexagon size={28} color="#818cf8" />
          <h2>Borderless</h2>
        </Brand>

        <NavList>
          {menuItems.map((item) => (
            <NavItem 
              key={item.name} 
              $active={currentScreen === item.name} 
              onClick={() => {
                if(onNavigate) onNavigate(item.name);
                if(onClose) onClose();
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavItem>
          ))}
        </NavList>

        <LogoutButton onClick={onLogout}>
          <LogOut size={20} />
          <span>Sair do painel</span>
        </LogoutButton>
      </SidebarContainer>
    </>
  );
};
