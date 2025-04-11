import type { FieldValidation } from '../types/mortgage'

export const mortgageValidations: Record<string, FieldValidation> = {
  sellingPrice: {
    label: '賣屋價格（萬）',
    rules: [
      {
        validator: (v: number) => v > 0,
        message: '價格必須大於 0'
      },
      {
        validator: (v: number) => v <= 99999,
        message: '價格不能超過 99999'
      }
    ]
  },
  buyingPrice: {
    label: '買屋價格（萬）',
    rules: [
      {
        validator: (v: number) => v > 0,
        message: '價格必須大於 0'
      }
    ]
  },
  holdingPeriod: {
    label: '持有時間（年）',
    rules: [
      {
        validator: (v: number) => v >= 0,
        message: '持有時間不能為負數'
      },
      {
        validator: (v: number) => v <= 100,
        message: '持有時間不能超過 100 年'
      }
    ]
  },
  loanPercentage: {
    label: '貸款成數（%）',
    rules: [
      {
        validator: (v: number) => v >= 0,
        message: '貸款成數不能為負數'
      },
      {
        validator: (v: number) => v <= 100,
        message: '貸款成數不能超過 100%'
      }
    ]
  },
  interestRate: {
    label: '貸款利率（%）',
    rules: [
      {
        validator: (v: number) => v >= 0,
        message: '利率不能為負數'
      },
      {
        validator: (v: number) => v <= 20,
        message: '利率不能超過 20%'
      }
    ]
  }
}

export function useFieldValidation(value: number, fieldName: string): string | true {
  const fieldValidation = mortgageValidations[fieldName]
  if (!fieldValidation) return true

  for (const rule of fieldValidation.rules) {
    const result = rule.validator(value)
    if (result !== true) {
      return rule.message
    }
  }

  return true
}