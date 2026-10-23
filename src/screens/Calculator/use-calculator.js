import { useState } from 'react'

const OPERATORS = {
    '+': (a, b) => a + b,
    '−': (a, b) => a - b,
    '×': (a, b) => a * b,
    '÷': (a, b) => (b === 0 ? NaN : a / b)
}

function formatNumber(value) {
    if (!Number.isFinite(value)) return 'Error'

    const stringValue = String(value)
    if (stringValue.includes('e')) return stringValue

    const [integer, fraction] = stringValue.split('.')
    if (!fraction) return integer

    const trimmed = fraction.replace(/0+$/, '')
    return trimmed ? `${integer}.${trimmed}` : integer
}

export function useCalculator() {
    const [display, setDisplay] = useState('0')
    const [previousValue, setPreviousValue] = useState(null)
    const [operator, setOperator] = useState(null)
    const [waitingForOperand, setWaitingForOperand] = useState(false)
    const [expression, setExpression] = useState('')

    const clearAll = () => {
        setDisplay('0')
        setPreviousValue(null)
        setOperator(null)
        setWaitingForOperand(false)
        setExpression('')
    }

    const inputDigit = (digit) => {
        if (display === 'Error') {
            setDisplay(String(digit))
            setWaitingForOperand(false)
            setExpression('')
            return
        }

        if (waitingForOperand) {
            setDisplay(String(digit))
            setWaitingForOperand(false)
            return
        }

        if (display === '0') {
            setDisplay(String(digit))
            return
        }

        if (display.replace('-', '').replace('.', '').length >= 12) return

        setDisplay(display + digit)
    }

    const inputDecimal = () => {
        if (display === 'Error') {
            setDisplay('0.')
            setWaitingForOperand(false)
            setExpression('')
            return
        }

        if (waitingForOperand) {
            setDisplay('0.')
            setWaitingForOperand(false)
            return
        }

        if (!display.includes('.')) {
            setDisplay(display + '.')
        }
    }

    const toggleSign = () => {
        if (display === 'Error' || display === '0') return
        setDisplay(display.startsWith('-') ? display.slice(1) : `-${display}`)
    }

    const inputPercent = () => {
        if (display === 'Error') return
        const value = parseFloat(display) / 100
        setDisplay(formatNumber(value))
    }

    const deleteLast = () => {
        if (waitingForOperand || display === 'Error') {
            clearAll()
            return
        }

        if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
            setDisplay('0')
            return
        }

        setDisplay(display.slice(0, -1))
    }

    const performOperation = (nextOperator) => {
        if (display === 'Error') {
            clearAll()
            return
        }

        const inputValue = parseFloat(display)

        if (previousValue === null) {
            setPreviousValue(inputValue)
            setOperator(nextOperator)
            setWaitingForOperand(true)
            setExpression(`${formatNumber(inputValue)} ${nextOperator}`)
            return
        }

        if (waitingForOperand) {
            setOperator(nextOperator)
            setExpression(`${formatNumber(previousValue)} ${nextOperator}`)
            return
        }

        const result = OPERATORS[operator](previousValue, inputValue)

        if (!Number.isFinite(result)) {
            setDisplay('Error')
            setPreviousValue(null)
            setOperator(null)
            setWaitingForOperand(false)
            setExpression('')
            return
        }

        const formatted = formatNumber(result)
        setDisplay(formatted)
        setPreviousValue(result)
        setOperator(nextOperator)
        setWaitingForOperand(true)
        setExpression(`${formatted} ${nextOperator}`)
    }

    const calculate = () => {
        if (operator === null || previousValue === null || waitingForOperand || display === 'Error') {
            return
        }

        const inputValue = parseFloat(display)
        const result = OPERATORS[operator](previousValue, inputValue)

        if (!Number.isFinite(result)) {
            setDisplay('Error')
            setPreviousValue(null)
            setOperator(null)
            setWaitingForOperand(false)
            setExpression('')
            return
        }

        const formatted = formatNumber(result)
        setExpression(`${formatNumber(previousValue)} ${operator} ${formatNumber(inputValue)} =`)
        setDisplay(formatted)
        setPreviousValue(null)
        setOperator(null)
        setWaitingForOperand(true)
    }

    return {
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
    }
}
