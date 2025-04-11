import { computed, type Ref, type ComputedRef } from 'vue'
import type { MortgageInputs } from '../types/mortgage'

export interface CalculationResults {
  fee: ComputedRef<string>
  totalBuyingCost: ComputedRef<number>
  profit: ComputedRef<number>
  taxRate: ComputedRef<number>
  tax: ComputedRef<string>
  availableCash: ComputedRef<number>
  housingBudget: ComputedRef<string>
  loanAmount: ComputedRef<string>
  monthlyPayment: ComputedRef<string>
  totalPayment: ComputedRef<string>
  totalInterest: ComputedRef<string>
}

export function useMortgageCalculations(inputs: Ref<MortgageInputs>): CalculationResults {
  const fee = computed(() => (inputs.value.sellingPrice * 0.04).toFixed(2))
  
  const totalBuyingCost = computed(() => 
    inputs.value.buyingPrice + inputs.value.additionalCost
  )

  const profit = computed(() => 
    inputs.value.sellingPrice - totalBuyingCost.value
  )

  const taxRate = computed(() => {
    const years = inputs.value.holdingPeriod
    return years <= 2 ? 45 : years <= 5 ? 35 : years <= 10 ? 20 : 15
  })

  const tax = computed(() => 
    Math.max(0, profit.value * taxRate.value / 100).toFixed(2)
  )

  const availableCash = computed(() => 
    inputs.value.sellingPrice - Number(tax.value) + 
    inputs.value.additionalDownPayment - inputs.value.remainingLoan
  )

  const housingBudget = computed(() => 
    (availableCash.value / (1 - inputs.value.loanPercentage / 100)).toFixed(2)
  )

  const loanAmount = computed(() => 
    (Number(housingBudget.value) * inputs.value.loanPercentage / 100).toFixed(2)
  )

  const monthlyPayment = computed(() => {
    const p = Number(loanAmount.value)
    const t = inputs.value.loanTerm
    let r = inputs.value.interestRate
    r /= 1200
    return (p * r / (1 - Math.pow(1 + r, -t * 12))).toFixed(2)
  })

  const totalPayment = computed(() => 
    (Number(monthlyPayment.value) * inputs.value.loanTerm * 12).toFixed(2)
  )

  const totalInterest = computed(() => 
    (Number(totalPayment.value) - Number(loanAmount.value)).toFixed(2)
  )

  return {
    fee,
    totalBuyingCost,
    profit,
    taxRate,
    tax,
    availableCash,
    housingBudget,
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest
  }
}