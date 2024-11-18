import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './Utils/supabase'; // Importando o supabase
import LoginPage from './pages/LoginPage'; // Página de login
import RegisterPage from './pages/RegisterPage'; // Página de registro
import MainPage from './pages/MainPage'; // Página principal

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Verificando o estado de autenticação do usuário no início
    const checkSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData);
    };

    checkSession();

    // Listener para mudanças no estado de autenticação (login ou logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Limpar o listener quando o componente for desmontado
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={session ? 'Main' : 'Login'}>
        {/* Se o usuário estiver autenticado, vai para 'Main', senão para 'Login' */}
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Main" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
