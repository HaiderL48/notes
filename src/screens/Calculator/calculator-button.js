import { Pressable, StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'
import { Typography } from '@/components'
import { COMMONS, TRANSPARENT } from '@/constants'

export function CalculatorButton({
    label,
    onPress,
    flex = 1,
    variant = 'default'
}) {
    const { colors } = useTheme()

    const backgrounds = {
        default: colors.surface,
        operator: colors.surfaceVariant,
        accent: colors.tertiary,
        ghost: colors.background
    }

    const textColors = {
        default: colors.onBackground,
        operator: colors.onBackground,
        accent: colors.onTertiary,
        ghost: colors.onBackground
    }

    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: colors.onBackground + TRANSPARENT[10] }}
            style={[
                styles.button,
                {
                    flex,
                    backgroundColor: backgrounds[variant]
                }
            ]}
        >
            <Typography
                bold
                variant='subtitle'
                color={textColors[variant]}
            >
                {label}
            </Typography>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 72,
        borderRadius: COMMONS.radius,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4
    }
})
