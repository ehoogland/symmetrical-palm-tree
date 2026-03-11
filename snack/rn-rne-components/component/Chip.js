import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const Chip = ({
  title,
  onPress,
  disabled = false,
  type = 'solid',
  icon,
  iconRight = false,
  backgroundColor = '#2196F3',
  textColor = '#FFFFFF',
  borderColor = '#2196F3',
  disabledBackgroundColor = '#E0E0E0',
  disabledTextColor = '#9E9E9E',
  size = 'medium',
  style,
  textStyle,
  ...props
}) => {
  const getChipStyle = () => {
    const baseStyle = [styles.chip];
    
    // Size styles
    if (size === 'small') {
      baseStyle.push(styles.smallChip);
    } else if (size === 'large') {
      baseStyle.push(styles.largeChip);
    } else {
      baseStyle.push(styles.mediumChip);
    }

    // Type and state styles
    if (disabled) {
      baseStyle.push({
        backgroundColor: type === 'outline' ? 'transparent' : disabledBackgroundColor,
        borderColor: disabledBackgroundColor,
      });
    } else {
      if (type === 'outline') {
        baseStyle.push(styles.outlineChip, {
          borderColor: borderColor,
          backgroundColor: 'transparent',
        });
      } else {
        baseStyle.push({
          backgroundColor: backgroundColor,
        });
      }
    }

    return [...baseStyle, style];
  };

  const getTextStyle = () => {
    const baseStyle = [styles.chipText];
    
    // Size text styles
    if (size === 'small') {
      baseStyle.push(styles.smallText);
    } else if (size === 'large') {
      baseStyle.push(styles.largeText);
    } else {
      baseStyle.push(styles.mediumText);
    }

    // Color styles
    if (disabled) {
      baseStyle.push({ color: disabledTextColor });
    } else {
      if (type === 'outline') {
        baseStyle.push({ color: borderColor });
      } else {
        baseStyle.push({ color: textColor });
      }
    }

    return [...baseStyle, textStyle];
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    const IconComponent = icon.component || View;
    const iconProps = {
      ...icon,
      style: [
        styles.icon,
        icon.style,
        disabled && { opacity: 0.5 }
      ]
    };

    return <IconComponent {...iconProps} />;
  };

  const ChipComponent = onPress ? TouchableOpacity : View;

  return (
    <ChipComponent
      style={getChipStyle()}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <>
        {!iconRight && renderIcon()}
        <Text style={getTextStyle()}>{title}</Text>
        {iconRight && renderIcon()}
      </>
    </ChipComponent>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: 12,
  },
  smallChip: {
    paddingVertical: 4,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  mediumChip: {
    paddingVertical: 6,
    borderRadius: 16,
    paddingHorizontal: 12,
  },
  largeChip: {
    paddingVertical: 8,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  outlineChip: {
    borderWidth: 1,
  },
  chipText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  icon: {
    marginHorizontal: 4,
  },
});

export default Chip;