<template>
  <div class="container mx-auto max-w-4xl px-4">
    <h1 class="text-3xl font-bold text-center mb-8 text-blue-600">換屋計算機</h1>

    <section class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-xl font-semibold mb-4 border-b pb-2">輸入參數</h2>

      <div class="space-y-6">
        <!-- 原屋相關 -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-700 mb-4 border-b pb-2">原屋相關</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField v-model.number="sellingPrice" label="賣屋價格（萬）" />
            <InputField v-model.number="buyingPrice" label="買屋價格（萬）" />
            <InputField v-model.number="holdingPeriod" label="持有時間（年）" />
            <InputField v-model.number="additionalCost" label="購屋額外花費（萬）" />
            <InputField v-model.number="remainingLoan" label="剩餘房貸（萬）" />
          </div>
        </div>

        <!-- 新屋相關 -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-700 mb-4 border-b pb-2">新屋相關</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField v-model.number="loanPercentage" label="貸款成數（%）" />
            <InputField v-model.number="loanTerm" label="貸款年限（年）" />
            <InputField v-model.number="interestRate" label="貸款利率（%）" step="0.01" />
            <InputField v-model.number="additionalDownPayment" label="額外頭期款（萬）" />
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-semibold mb-4 border-b pb-2">計算結果</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div class="bg-gray-50 p-4 rounded-md">
          <h3 class="font-medium text-gray-700 mb-4">銷售相關</h3>
          <div>
            <ResultItem label="手續費(萬)" :value="fee" tooltip="手續費計算公式" formula="賣屋價格 × 4%" />
            <ResultItem label="獲利(萬)" :value="profit" :positive="profit >= 0" tooltip="獲利計算公式" formula="賣屋價格 - (買屋價格 + 購屋額外花費)" />
            <ResultItem label="合一稅率" :value="taxRate + '%'" tooltip="合一稅率判定" formula="持有年限 ≤ 2年：45%
2年 < 持有年限 ≤ 5年：35%
5年 < 持有年限 ≤ 10年：20%
持有年限 > 10年：15%" />
            <ResultItem label="合一稅(萬)" :value="tax" tooltip="合一稅計算公式" formula="獲利 × 稅率" />
            <ResultItem label="總購屋成本(萬)" :value="totalBuyingCost" tooltip="總購屋成本計算公式" formula="買屋價格 + 購屋額外花費" />
          </div>
        </div>

        <div class="bg-gray-50 p-4 rounded-md">
          <h3 class="font-medium text-gray-700 mb-4">購屋相關</h3>
          <div>
            <ResultItem label="可用現金(萬)" :value="availableCash" tooltip="可用現金計算公式" formula="賣屋價格 - 合一稅 - 剩餘房貸 + 額外頭期款" />
            <ResultItem label="買房預算(萬)" :value="housingBudget" highlight tooltip="買房預算計算公式" formula="可用現金 ÷ (1 - 貸款成數%)

例：可用現金 500萬，貸款成數 80%
可買：500萬 ÷ (1 - 80%) = 2,500萬" />
          </div>
        </div>
      </div>

      <div class="bg-blue-50 p-4 rounded-md">
        <h3 class="font-medium text-blue-700 mb-4">貸款資訊</h3>
        <div>
          <ResultItem label="貸款金額" :value="loanAmount" tooltip="貸款金額計算公式" formula="買房預算 × 貸款成數%" />
          <ResultItem label="月付金額" :value="monthlyPayment" tooltip="每月還款金額計算公式" formula="貸款金額 × 月利率 × (1 + 月利率)^期數
÷ ((1 + 月利率)^期數 - 1)

其中：
月利率 = 年利率% ÷ 12
期數 = 貸款年限 × 12個月" />
          <ResultItem label="總還款額" :value="totalPayment" tooltip="總還款金額計算公式" formula="每月還款金額 × 貸款年限 × 12" />
          <ResultItem label="總利息" :value="totalInterest" tooltip="總利息計算公式" formula="總還款金額 - 貸款金額" />
        </div>
      </div>

      <div class="mt-6 bg-yellow-50 p-4 rounded-md text-sm text-yellow-800">
        <p class="font-medium">注意事項：</p>
        <p>本計算結果僅供參考，實際金額可能因個別情況而異。計算不包含地價稅、房屋稅等其他相關稅費。</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import InputField from './components/InputField.vue';
import ResultItem from './components/ResultItem.vue';

const sellingPrice = ref(1900);
const buyingPrice = ref(1600);
const holdingPeriod = ref(3);
const additionalCost = ref(25);
const remainingLoan = ref(1300);
const loanPercentage = ref(80);
const loanTerm = ref(30);
const interestRate = ref(2.7);
const additionalDownPayment = ref(0);

const calculateTaxRate = (years) =>
  years <= 2 ? 45 : years <= 5 ? 35 : years <= 10 ? 20 : 15;

const fee = computed(() => (sellingPrice.value * 0.04).toFixed(2));
const totalBuyingCost = computed(() => buyingPrice.value + additionalCost.value);
const profit = computed(() => sellingPrice.value - totalBuyingCost.value);
const taxRate = computed(() => calculateTaxRate(holdingPeriod.value));
const tax = computed(() => Math.max(0, profit.value * taxRate.value / 100).toFixed(2));
const availableCash = computed(() => sellingPrice.value - tax.value + additionalDownPayment.value - remainingLoan.value);
const housingBudget = computed(() => (availableCash.value / (1 - loanPercentage.value / 100)).toFixed(2));
const loanAmount = computed(() => (housingBudget.value * loanPercentage.value / 100).toFixed(2));

const calculateMonthlyPayment = (p, r, t) =>
  ((r /= 1200), p * r / (1 - (1 + r) ** (-t * 12))).toFixed(2);

const monthlyPayment = computed(() => calculateMonthlyPayment(loanAmount.value, interestRate.value, loanTerm.value));
const totalPayment = computed(() => (monthlyPayment.value * loanTerm.value * 12).toFixed(2));
const totalInterest = computed(() => (totalPayment.value - loanAmount.value).toFixed(2));
</script>
