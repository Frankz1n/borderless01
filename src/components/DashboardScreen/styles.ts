import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem;
  margin: 0 auto;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
`;

export const LogoutButton = styled.button`
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.2);
  }
`;

export const DashboardCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: #ffffff;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  outline: none;

  &:focus {
    border-color: #818cf8;
    background: rgba(0, 0, 0, 0.3);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const SelectFilter = styled.select`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  color: #ffffff;
  font-size: 0.95rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #818cf8;
  }
  
  option {
    background: #1e1b4b; /* Dark background to match aesthetic */
    color: white;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const TableHead = styled.thead`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const TableHeader = styled.th`
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TableRow = styled(motion.tr)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.95rem;
  color: #ffffff;
`;

export const StatusBadge = styled.span<{ $status: 'Concluído' | 'Pendente' | 'Falho' }>`
  background: ${({ $status }) => {
    switch ($status) {
      case 'Concluído': return 'rgba(16, 185, 129, 0.2)';
      case 'Pendente': return 'rgba(245, 158, 11, 0.2)';
      case 'Falho': return 'rgba(239, 68, 68, 0.2)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  color: ${({ $status }) => {
    switch ($status) {
      case 'Concluído': return '#34d399';
      case 'Pendente': return '#fbbf24';
      case 'Falho': return '#f87171';
      default: return '#ffffff';
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
`;
