import React from 'react';

import { useNavigation } from '@react-navigation/native';

/**
 * Logical invisible component to handle DeepLink redirection
 */
export const DeepLinkRouterScreen = () => {
  const navigation = useNavigation();

  console.log(`DeepLinkRouter> `);

  return null;
};
