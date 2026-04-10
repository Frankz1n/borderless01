import React, { useState } from 'react';
import { Sidebar } from '../Sidebar';
import { Menu } from 'lucide-react';
import {
  PageLayout,
  MainArea,
  Container,
  TopBar,
  MenuButton,
  Title
} from './styles';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  onLogout: () => void;
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  onLogout,
  currentScreen,
  onNavigate
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageLayout>
      <Sidebar 
        onLogout={onLogout} 
        currentScreen={currentScreen} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={(screen) => {
          onNavigate(screen);
          setIsSidebarOpen(false);
        }}
      />
      <MainArea>
        <Container>
          <TopBar>
            <MenuButton onClick={() => setIsSidebarOpen(true)}>
              <Menu size={28} />
            </MenuButton>
            <Title>{title}</Title>
          </TopBar>
          
          {children}
        </Container>
      </MainArea>
    </PageLayout>
  );
};
