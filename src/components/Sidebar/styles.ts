import styled from 'styled-components';

export const SidebarContainer = styled.aside<{ $isOpen?: boolean }>`
  width: 280px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  transition: transform 0.3s ease;
  z-index: 999;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    background: rgba(15, 23, 42, 0.95);
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem 2rem 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  h2 {
    color: #ffffff;
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

export const NavItem = styled.li<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)')};
  background: ${({ $active }) => ($active ? 'rgba(99, 102, 241, 0.2)' : 'transparent')};
  transition: all 0.2s ease;
  font-weight: ${({ $active }) => ($active ? '600' : '500')};

  svg {
    color: ${({ $active }) => ($active ? '#818cf8' : 'rgba(255, 255, 255, 0.4)')};
    transition: color 0.2s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    
    svg {
      color: #818cf8;
    }
  }
`;

export const LogoutButton = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  color: #f87171;
  transition: all 0.2s ease;
  font-weight: 500;
  margin-top: auto;

  svg {
    color: #fca5a5;
  }

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    
    svg {
      color: #ef4444;
    }
  }
`;

export const Overlay = styled.div<{ $isOpen?: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;

  @media (min-width: 769px) {
    display: none;
  }
`;
