import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled(motion.div)<{ $variant: 'income' | 'expense' | 'balance' }>`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid ${({ $variant }) =>
    $variant === 'income'
      ? 'rgba(16,185,129,0.3)'
      : $variant === 'expense'
      ? 'rgba(239,68,68,0.3)'
      : 'rgba(129,140,248,0.3)'};
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

export const StatIcon = styled.div<{ $variant: 'income' | 'expense' | 'balance' }>`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ $variant }) =>
    $variant === 'income'
      ? 'rgba(16,185,129,0.15)'
      : $variant === 'expense'
      ? 'rgba(239,68,68,0.15)'
      : 'rgba(129,140,248,0.15)'};
  color: ${({ $variant }) =>
    $variant === 'income' ? '#34d399' : $variant === 'expense' ? '#f87171' : '#818cf8'};
`;

export const StatLabel = styled.p`
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(255, 255, 255, 0.45);
  margin: 0 0 0.35rem;
`;

export const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
`;

export const ChartTitle = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 1.25rem;
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.95rem;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.9; }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.9rem;
  line-height: 1.6;
  display: flex;
  align-items: center;
  justify-content: center;
`;
