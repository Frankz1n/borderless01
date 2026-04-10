import React, { useEffect, useState, useMemo } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import {
  PageWrapper,
  SummaryGrid,
  SummaryCard,
  FilterCard,
  FilterGroup,
  FilterLabel,
  FilterInput,
  FilterSelect,
  ClearButton,
  TableCard,
  TableWrapper,
  Table,
  TableHead,
  Th,
  TableRow,
  Td,
  TypeBadge,
  AmountText,
  EmptyState,
  LoadingState
} from './styles';

interface Transaction {
  id: string;
  type: 'entrance' | 'payment';
  amount: number;
  description: string;
  category: string;
  transactionDate?: string;
  paymentDate?: string;
  createdAt: string;
}

export const ExtratoScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Real-time listener on Firestore
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Transaction[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      } as Transaction));
      setTransactions(data);
      setLoading(false);
    }, (error) => {
      console.error('Erro ao carregar extrato:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearFilters = () => {
    setTypeFilter('all');
    setCategoryFilter('');
    setDateFrom('');
    setDateTo('');
  };

  // Apply filters client-side
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const date = t.transactionDate || t.paymentDate || t.createdAt.substring(0, 10);

      if (typeFilter !== 'all' && t.type !== typeFilter) return false;
      if (categoryFilter && !t.category.toLowerCase().includes(categoryFilter.toLowerCase())) return false;
      if (dateFrom && date < dateFrom) return false;
      if (dateTo && date > dateTo) return false;
      return true;
    });
  }, [transactions, typeFilter, categoryFilter, dateFrom, dateTo]);

  // Summary totals (based on ALL transactions, not filtered)
  const totalIncome = useMemo(() =>
    transactions
      .filter((t) => t.type === 'entrance')
      .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(() =>
    transactions
      .filter((t) => t.type === 'payment')
      .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpense;

  const formatCurrency = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const formatDate = (t: Transaction) => {
    const raw = t.transactionDate || t.paymentDate || t.createdAt.substring(0, 10);
    if (!raw) return '—';
    const [year, month, day] = raw.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <PageWrapper>
      {/* Summary Cards */}
      <SummaryGrid>
        <SummaryCard
          $variant="income"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.4 }}
        >
          <span>↑ Total de Entradas</span>
          <strong>{formatCurrency(totalIncome)}</strong>
        </SummaryCard>

        <SummaryCard
          $variant="expense"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <span>↓ Total de Saídas</span>
          <strong>{formatCurrency(totalExpense)}</strong>
        </SummaryCard>

        <SummaryCard
          $variant="balance"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <span>⚖ Saldo Geral</span>
          <strong>{formatCurrency(balance)}</strong>
        </SummaryCard>
      </SummaryGrid>

      {/* Filters */}
      <FilterCard>
        <FilterGroup>
          <FilterLabel>Tipo</FilterLabel>
          <FilterSelect value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">Todos</option>
            <option value="entrance">Entradas</option>
            <option value="payment">Pagamentos</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Categoria</FilterLabel>
          <FilterInput
            type="text"
            placeholder="Filtrar por categoria..."
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>De</FilterLabel>
          <FilterInput
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Até</FilterLabel>
          <FilterInput
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </FilterGroup>

        <ClearButton onClick={clearFilters}>
          <X size={14} style={{ display: 'inline', marginRight: 4 }} />
          Limpar
        </ClearButton>
      </FilterCard>

      {/* Table */}
      <TableCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {loading ? (
          <LoadingState>Carregando extrato...</LoadingState>
        ) : (
          <TableWrapper>
            <Table>
              <TableHead>
                <tr>
                  <Th>Tipo</Th>
                  <Th>Descrição</Th>
                  <Th>Categoria</Th>
                  <Th>Data</Th>
                  <Th>Valor</Th>
                </tr>
              </TableHead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      <EmptyState>Nenhuma transação encontrada para os filtros aplicados.</EmptyState>
                    </td>
                  </tr>
                ) : (
                  filtered.map((t, i) => (
                    <TableRow
                      key={t.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                    >
                      <Td>
                        <TypeBadge $type={t.type}>
                          {t.type === 'entrance'
                            ? <><TrendingUp size={12} /> Entrada</>
                            : <><TrendingDown size={12} /> Saída</>
                          }
                        </TypeBadge>
                      </Td>
                      <Td>{t.description || <span style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>}</Td>
                      <Td>{t.category || <span style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>}</Td>
                      <Td>{formatDate(t)}</Td>
                      <Td>
                        <AmountText $type={t.type}>
                          {t.type === 'entrance' ? '+' : '-'} {formatCurrency(t.amount)}
                        </AmountText>
                      </Td>
                    </TableRow>
                  ))
                )}
              </tbody>
            </Table>
          </TableWrapper>
        )}
      </TableCard>
    </PageWrapper>
  );
};
