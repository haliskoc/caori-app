import { TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Text } from './Text';

interface Props extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  label: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({ variant = 'primary', label, loading, icon, className, ...props }: Props) {
  let containerStyle = 'h-14 rounded-3xl flex-row items-center justify-center px-6';
  let textStyle = 'font-bold text-lg';
  let textColor = '';

  switch (variant) {
    case 'primary':
      containerStyle += ' bg-emerald-600 shadow-lg shadow-emerald-200';
      textColor = 'text-white';
      break;
    case 'secondary':
      containerStyle += ' bg-emerald-100';
      textColor = 'text-emerald-700';
      break;
    case 'outline':
      containerStyle += ' bg-transparent border-2 border-emerald-600';
      textColor = 'text-emerald-600';
      break;
    case 'ghost':
      containerStyle += ' bg-transparent';
      textColor = 'text-gray-600';
      break;
  }

  return (
    <TouchableOpacity 
      className={`${containerStyle} ${loading ? 'opacity-80' : ''} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#10b981'} />
      ) : (
        <>
          {icon}
          <Text className={`${textStyle} ${textColor} ${icon ? 'ml-2' : ''}`}>
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
