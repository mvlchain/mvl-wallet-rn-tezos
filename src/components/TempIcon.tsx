import React from 'react';
import { Avatar } from 'react-native-paper';

function TempIcon({ size }: { size: number }) {
  return <Avatar.Text size={size} label={`${size}`} />;
}

export default TempIcon;
