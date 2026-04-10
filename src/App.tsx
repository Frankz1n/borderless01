import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { auth } from './config/firebase';
import { signOut } from 'firebase/auth';

type ScreenState = 'login' | 'register' | 'dashboard';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('login');

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
        <DashboardScreen onLogout={async () => {
          try {
            await signOut(auth);
            setCurrentScreen('login');
          } catch (error) {
            console.error('Logout error', error);
          }
        }} />
      )}
    </>
  );
};

export default App;
