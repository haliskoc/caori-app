import { Text as RNText, TextProps } from 'react-native';
import { styled } from 'nativewind';

const StyledText = styled(RNText);

interface Props extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  weight?: 'regular' | 'medium' | 'bold' | 'black';
  color?: string;
}

export function Text({ variant = 'body', weight = 'regular', className, style, ...props }: Props) {
  let baseStyle = 'text-gray-900 font-regular';
  
  switch (variant) {
    case 'h1': baseStyle = 'text-4xl font-black'; break;
    case 'h2': baseStyle = 'text-2xl font-bold'; break;
    case 'h3': baseStyle = 'text-xl font-bold'; break;
    case 'caption': baseStyle = 'text-xs text-gray-500'; break;
    default: baseStyle = 'text-base';
  }

  return (
    <StyledText 
      className={`${baseStyle} ${className}`} 
      style={style}
      {...props} 
    />
  );
}
