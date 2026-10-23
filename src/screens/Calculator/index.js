import { View, StyleSheet, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'react-native-paper'
import * as Haptics from 'expo-haptics'
import { Typography } from '@/components'
import { CalculatorButton } from './calculator-button'
import { useCalculator } from './use-calculator'

export function Calculator() {
    const { colors } = useTheme()
    const insets = useSafeAreaInsets()
    const {
        display,
        expression,
        clearAll,
        inputDigit,
        inputDecimal,
        toggleSign,
        inputPercent,
        deleteLast,
        performOperation,
        calculate
    } = useCalculator()

    const withHaptic = (action) => () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        }
        action()
    }

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <View style={styles.display}>
                <Typography
                    variant='caption'
                    opacity={0.5}
                    textAlign='right'
                    numberOfLines={1}
                >
                    {expression || ' '}
                </Typography>
                <Typography
                    bold
                    fontSize={48}
                    textAlign='right'
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    color={colors.onBackground}
                >
                    {display}
                </Typography>
            </View>

            <View style={styles.pad}>
                <View style={styles.row}>
                    <CalculatorButton label='AC' variant='ghost' onPress={withHaptic(clearAll)} />
                    <CalculatorButton label='⌫' variant='ghost' onPress={withHaptic(deleteLast)} />
                    <CalculatorButton label='%' variant='ghost' onPress={withHaptic(inputPercent)} />
                    <CalculatorButton label='÷' variant='operator' onPress={withHaptic(() => performOperation('÷'))} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton label='7' onPress={withHaptic(() => inputDigit(7))} />
                    <CalculatorButton label='8' onPress={withHaptic(() => inputDigit(8))} />
                    <CalculatorButton label='9' onPress={withHaptic(() => inputDigit(9))} />
                    <CalculatorButton label='×' variant='operator' onPress={withHaptic(() => performOperation('×'))} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton label='4' onPress={withHaptic(() => inputDigit(4))} />
                    <CalculatorButton label='5' onPress={withHaptic(() => inputDigit(5))} />
                    <CalculatorButton label='6' onPress={withHaptic(() => inputDigit(6))} />
                    <CalculatorButton label='−' variant='operator' onPress={withHaptic(() => performOperation('−'))} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton label='1' onPress={withHaptic(() => inputDigit(1))} />
                    <CalculatorButton label='2' onPress={withHaptic(() => inputDigit(2))} />
                    <CalculatorButton label='3' onPress={withHaptic(() => inputDigit(3))} />
                    <CalculatorButton label='+' variant='operator' onPress={withHaptic(() => performOperation('+'))} />
                </View>
                <View style={styles.row}>
                    <CalculatorButton label='+/−' onPress={withHaptic(toggleSign)} />
                    <CalculatorButton label='0' onPress={withHaptic(() => inputDigit(0))} />
                    <CalculatorButton label='.' onPress={withHaptic(inputDecimal)} />
                    <CalculatorButton label='=' variant='accent' onPress={withHaptic(calculate)} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        justifyContent: 'flex-end'
    },
    display: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        gap: 8
    },
    pad: {
        gap: 0
    },
    row: {
        flexDirection: 'row'
    }
})
