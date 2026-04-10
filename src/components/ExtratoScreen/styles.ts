import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled(motion.div)<{ $variant: 'income' | 'expense' | 'balance' }>`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid ${({ $variant }) => {
    switch ($variant) {
      case 'income': return 'rgba(16, 185, 129, 0.3)';
      case 'expense': return 'rgba(239, 68, 68, 0.3)';
      default: return 'rgba(129, 140, 248, 0.3)';
    }
  }};
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({ $variant }) => {
      switch ($variant) {
        case 'income': return '#34d399';
        case 'expense': return '#f87171';
        default: return '#818cf8';
      }
    }};
  }

  strong {
    font-size: 1.6rem;
    font-weight: 700;
    color: #fff;
  }
`;

export const FilterCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  min-width: 140px;
`;

export const FilterLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.4);
`;

export const FilterInput = styled.input`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.6rem 0.875rem;
  color: #ffffff;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:focus { border-color: #818cf8; }

  &[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

export const FilterSelect = styled.select`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.6rem 0.875rem;
  color: #ffffff;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
  width: 100%;
  box-sizing: border-box;

  &:focus { border-color: #818cf8; }

  option { background: #1e1b4b; color: white; }
`;

export const ClearButton = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 0.6rem 1rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  align-self: flex-end;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

export const TableCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 1.5rem;
  overflow: hidden;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Table = styled.table`
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
  text-align: left;
`;

export const TableHead = styled.thead`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Th = styled.th`
  padding: 0.875rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const TableRow = styled(motion.tr)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  &:last-child { border-bottom: none; }
  &:hover { background: rgba(255, 255, 255, 0.02); }
`;

export const Td = styled.td`
  padding: 1rem;
  font-size: 0.925rem;
  color: #ffffff;
`;

export const TypeBadge = styled.span<{ $type: 'entrance' | 'payment' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: ${({ $type }) => $type === 'entrance' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
  color: ${({ $type }) => $type === 'entrance' ? '#34d399' : '#f87171'};
  border: 1px solid ${({ $type }) => $type === 'entrance' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
`;

export const AmountText = styled.span<{ $type: 'entrance' | 'payment' }>`
  font-weight: 600;
  color: ${({ $type }) => $type === 'entrance' ? '#34d399' : '#f87171'};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.95rem;
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.95rem;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.9; }
  }
`;
