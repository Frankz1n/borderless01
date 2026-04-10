import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { DashboardLayout } from './components/DashboardLayout';
import { AccountRegistrationScreen } from './components/AccountRegistrationScreen';
import { PaymentRegistrationScreen } from './components/PaymentRegistrationScreen';
import { IncomeRegistrationScreen } from './components/IncomeRegistrationScreen';
import { ExtratoScreen } from './components/ExtratoScreen';
import { auth } from './config/firebase';
import { signOut } from 'firebase/auth';

type ScreenState = 'login' | 'register' | 'dashboard';
type DashboardView = 'Dashboard' | 'Extrato' | 'Perfil' | 'Registro de conta' | 'Registro de entrada' | 'Registro de Pagamento';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('login');
  const [currentDashboardView, setCurrentDashboardView] = useState<DashboardView>('Dashboard');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentScreen('login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  return (
    <>
      {currentScreen === 'login' && (
        <LoginScreen 
          onNavigateRegister={() => setCurrentScreen('register')} 
          onSuccess={() => setCurrentScreen('dashboard')} 
        />
      )}
      {currentScreen === 'register' && (
        <RegisterScreen 
          onNavigateLogin={() => setCurrentScreen('login')} 
          onSuccess={() => setCurrentScreen('dashboard')} 
        />
      )}
      {currentScreen === 'dashboard' && (
        <DashboardLayout 
          title={currentDashboardView}
          onLogout={handleLogout}
          currentScreen={currentDashboardView}
          onNavigate={(screen) => setCurrentDashboardView(screen as DashboardView)}
        >
          {currentDashboardView === 'Dashboard' && <DashboardScreen />}
          {currentDashboardView === 'Extrato' && <ExtratoScreen />}
          {currentDashboardView === 'Registro de conta' && <AccountRegistrationScreen />}
          {currentDashboardView === 'Registro de entrada' && <IncomeRegistrationScreen />}
          {currentDashboardView === 'Registro de Pagamento' && <PaymentRegistrationScreen />}
        </DashboardLayout>
      )}
    </>
  );
};

export default App;
