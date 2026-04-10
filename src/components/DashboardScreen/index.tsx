import React, { useEffect, useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import {
  DashboardWrapper,
  SummaryRow,
  StatCard,
  StatIcon,
  StatLabel,
  StatValue,
  ChartsRow,
  ChartCard,
  ChartTitle,
  LoadingState,
  EmptyState,
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

// Tooltip personalizado para o gráfico de área
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: '0.75rem 1rem',
        fontSize: '0.85rem',
        color: '#fff'
      }}>
        <p style={{ marginBottom: 4, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.color, margin: '2px 0' }}>
            {p.name}: R$ {Number(p.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const DashboardScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'asc')
    );

    const unsub = onSnapshot(q, (snap) => {
      setTransactions(snap.docs.map(d => ({ id: d.id, ...d.data() } as Transaction)));
      setLoading(false);
    }, () => setLoading(false));

    return () => unsub();
  }, []);

  const totalIncome = useMemo(() =>
    transactions.filter(t => t.type === 'entrance').reduce((s, t) => s + t.amount, 0),
    [transactions]);

  const totalExpense = useMemo(() =>
    transactions.filter(t => t.type === 'payment').reduce((s, t) => s + t.amount, 0),
    [transactions]);

  const balance = totalIncome - totalExpense;

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  // Agrupa por mês para o gráfico de área
  const monthlyData = useMemo(() => {
    const map: Record<string, { month: string; Entradas: number; Saídas: number }> = {};

    transactions.forEach(t => {
      const raw = t.transactionDate || t.paymentDate || t.createdAt.substring(0, 10);
      if (!raw) return;
      const [year, month] = raw.split('-');
      const key = `${year}-${month}`;
      const label = new Date(`${year}-${month}-01`).toLocaleString('pt-BR', { month: 'short', year: '2-digit' });

      if (!map[key]) map[key] = { month: label, Entradas: 0, Saídas: 0 };
      if (t.type === 'entrance') map[key].Entradas += t.amount;
      else map[key].Saídas += t.amount;
    });

    return Object.values(map).slice(-6); // últimos 6 meses
  }, [transactions]);

  // Agrupa por categoria para o gráfico de pizza (top 5)
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};

    transactions
      .filter(t => t.type === 'payment' && t.category)
      .forEach(t => {
        const cat = t.category || 'Outros';
        map[cat] = (map[cat] || 0) + t.amount;
      });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const PIE_COLORS = ['#818cf8', '#34d399', '#f87171', '#fbbf24', '#c084fc'];

  return (
    <DashboardWrapper>
      {/* Cards de resumo */}
      <SummaryRow>
        <StatCard $variant="income"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <StatIcon $variant="income"><TrendingUp size={22} /></StatIcon>
          <div>
            <StatLabel>Total de Entradas</StatLabel>
            <StatValue>{loading ? '...' : fmt(totalIncome)}</StatValue>
          </div>
        </StatCard>

        <StatCard $variant="expense"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <StatIcon $variant="expense"><TrendingDown size={22} /></StatIcon>
          <div>
            <StatLabel>Total de Saídas</StatLabel>
            <StatValue>{loading ? '...' : fmt(totalExpense)}</StatValue>
          </div>
        </StatCard>

        <StatCard $variant="balance"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatIcon $variant="balance"><Wallet size={22} /></StatIcon>
          <div>
            <StatLabel>Saldo Atual</StatLabel>
            <StatValue>{loading ? '...' : fmt(balance)}</StatValue>
          </div>
        </StatCard>
      </SummaryRow>

      {loading ? (
        <LoadingState>Carregando dados do Firebase...</LoadingState>
      ) : transactions.length === 0 ? (
        <EmptyState>Nenhuma transação encontrada. Registre entradas ou pagamentos para ver os gráficos aqui.</EmptyState>
      ) : (
        <ChartsRow>
          {/* Gráfico de área — Entradas vs Saídas por mês */}
          <ChartCard
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ChartTitle>Entradas vs Saídas por Mês</ChartTitle>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorSaidas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `R$${(v / 1000).toFixed(1)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ paddingTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.6)' }} />
                <Area type="monotone" dataKey="Entradas" stroke="#34d399" strokeWidth={2} fill="url(#colorEntradas)" />
                <Area type="monotone" dataKey="Saídas" stroke="#f87171" strokeWidth={2} fill="url(#colorSaidas)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Gráfico de pizza — Gastos por categoria */}
          <ChartCard
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <ChartTitle>Saídas por Categoria</ChartTitle>
            {categoryData.length === 0 ? (
              <EmptyState style={{ height: 260 }}>Registre pagamentos com categoria para ver este gráfico.</EmptyState>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => fmt(v)}
                    contentStyle={{
                      background: 'rgba(15,23,42,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      color: '#fff',
                      fontSize: 13
                    }}
                  />
                  <Legend
                    formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </ChartsRow>
      )}
    </DashboardWrapper>
  );
};
