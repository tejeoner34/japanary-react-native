import { Slot } from 'expo-router';
import React from 'react';
import { useRouteAuthGuard } from '@/hooks/use-route-auth-guard';

export default function PrivateLayout() {
	useRouteAuthGuard();

	return <Slot />;
}
