import styled from 'styled-components';

export const PageLayout = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const MainArea = styled.main`
  flex: 1;
  min-width: 0;
  height: 100vh;
  overflow-y: auto;
  background: transparent;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const MenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: -0.5rem;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
`;
