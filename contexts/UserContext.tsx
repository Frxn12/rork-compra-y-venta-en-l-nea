import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';

export interface UserProfile {
  name: string;
  photo: string | null;
}

const USER_STORAGE_KEY = '@user_profile';

export const [UserContext, useUser] = createContextHook(() => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    photo: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const stored = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    try {
      const newProfile = { ...profile, ...updates };
      setProfile(newProfile);
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newProfile));
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }, [profile]);

  return useMemo(() => ({
    profile,
    updateProfile,
    isLoading,
  }), [profile, updateProfile, isLoading]);
});
