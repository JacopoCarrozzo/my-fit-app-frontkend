import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { UserProfileProvider, useUserProfile } from '@/src/context/UserContext';
import Colors from '@/src/constants/Colors';
import { Provider } from 'react-redux';
import { store } from '@/src/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Provider store={store}>
      <UserProfileProvider>
        <RootLayoutNav />
      </UserProfileProvider>
    </Provider>
  );
}

function RootLayoutNav() {
  const { profile, isLoading } = useUserProfile();
  const segments = useSegments(); // A "GPS" to prevent infinite redirect loops: if the user is in 'app/onboarding.tsx', segments[0] will be 'onboarding'.
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const isOnboarding = segments[0] === 'onboarding';

    // CASE 1: Redirect to onboarding if no profile is found and user is not already there.
    if (!profile && !isOnboarding) {
      router.replace('/onboarding');
    }
    // CASE 2: Redirect to main app if profile is complete but user is still in onboarding.
    else if (profile && isOnboarding) {
      router.replace('/(tabs)');
    }
  }, [profile, isLoading, segments]);

  if (isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.light.background } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
