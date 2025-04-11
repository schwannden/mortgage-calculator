import { type ComputedRef } from 'vue'

export interface MortgageInputs {
  sellingPrice: number
  buyingPrice: number
  holdingPeriod: number
  additionalCost: number
  remainingLoan: number
  loanPercentage: number
  loanTerm: number
  interestRate: number
  additionalDownPayment: number
}

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

export interface ValidationRule {
  validator: (value: number) => boolean | string
  message: string
}

export interface FieldValidation {
  label: string
  rules: ValidationRule[]
}