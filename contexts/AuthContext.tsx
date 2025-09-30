import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

export interface User {
  id: string;
  email: string;
  name: string;
  photo: string | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = '@auth_user';
const USERS_STORAGE_KEY = '@users_db';

export const [AuthContext, useAuth] = createContextHook(() => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const user = JSON.parse(stored);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const register = useCallback(async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const usersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users: Record<string, { password: string; user: User }> = usersData ? JSON.parse(usersData) : {};

      if (users[email]) {
        return { success: false, error: 'El correo ya está registrado' };
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        photo: null,
      };

      users[email] = {
        password,
        user: newUser,
      };

      await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      console.error('Error registering:', error);
      return { success: false, error: 'Error al registrar usuario' };
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const usersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users: Record<string, { password: string; user: User }> = usersData ? JSON.parse(usersData) : {};

      const userRecord = users[email];

      if (!userRecord) {
        return { success: false, error: 'Usuario no encontrado' };
      }

      if (userRecord.password !== password) {
        return { success: false, error: 'Contraseña incorrecta' };
      }

      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userRecord.user));

      setAuthState({
        user: userRecord.user,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, error: 'Error al iniciar sesión' };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<Pick<User, 'name' | 'photo'>>) => {
    if (!authState.user) return;

    try {
      const updatedUser = { ...authState.user, ...updates };
      
      const usersData = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users: Record<string, { password: string; user: User }> = usersData ? JSON.parse(usersData) : {};
      
      if (users[authState.user.email]) {
        users[authState.user.email].user = updatedUser;
        await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }

      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));

      setAuthState({
        ...authState,
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }, [authState]);

  return useMemo(() => ({
    ...authState,
    register,
    login,
    logout,
    updateProfile,
  }), [authState, register, login, logout, updateProfile]);
});
