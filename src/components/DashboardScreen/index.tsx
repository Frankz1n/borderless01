import React, { useState, useMemo } from 'react';
import { LogOut } from 'lucide-react';
import {
  Container,
  TopBar,
  Title,
  LogoutButton,
  DashboardCard,
  FilterSection,
  SearchInput,
  SelectFilter,
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  StatusBadge
} from './styles';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  status: 'Concluído' | 'Pendente' | 'Falho';
  date: string;
}

const mockData: Transaction[] = [
  { id: 'TXN-001', description: 'Assinatura Finantree Pro', amount: 49.90, status: 'Concluído', date: '10/04/2026' },
  { id: 'TXN-002', description: 'Compra Mercado Vivo', amount: 124.50, status: 'Pendente', date: '09/04/2026' },
  { id: 'TXN-003', description: 'Pagamento Internet', amount: 99.90, status: 'Concluído', date: '08/04/2026' },
  { id: 'TXN-004', description: 'Estorno Compra Amazon', amount: 35.00, status: 'Falho', date: '07/04/2026' },
  { id: 'TXN-005', description: 'Recarga Celular', amount: 30.00, status: 'Concluído', date: '05/04/2026' },
];

interface DashboardScreenProps {
  onLogout: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'Todos' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  return (
    <Container>
      <TopBar>
        <Title>Dashboard</Title>
        <LogoutButton onClick={onLogout}>
          <LogOut size={18} /> Sair
        </LogoutButton>
      </TopBar>

      <DashboardCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <FilterSection>
          <SearchInput
            type="text"
            placeholder="Buscar por descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SelectFilter value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="Todos">Todos os status</option>
            <option value="Concluído">Concluído</option>
            <option value="Pendente">Pendente</option>
            <option value="Falho">Falho</option>
          </SelectFilter>
        </FilterSection>

        <TableContainer>
          <Table>
            <TableHead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Descrição</TableHeader>
                <TableHeader>Valor (R$)</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Data</TableHeader>
              </tr>
            </TableHead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.amount.toFixed(2).replace('.', ',')}</TableCell>
                    <TableCell>
                      <StatusBadge $status={item.status}>{item.status}</StatusBadge>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                    Nenhuma transação encontrada.
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </Container>
  );
};
