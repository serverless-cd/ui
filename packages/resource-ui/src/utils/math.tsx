import * as math from 'mathjs';

export function addd(num1, num2) {
  return Number(math.add(math.bignumber(num1), math.bignumber(num2)));
}

export function subtract(num1, num2) {
  return Number(math.subtract(math.bignumber(num1), math.bignumber(num2)));
}

export function multiply(num1, num2) {
  return Number(math.multiply(math.bignumber(num1), math.bignumber(num2)));
}

export function divide(num1, num2) {
  return Number(math.divide(math.bignumber(num1), math.bignumber(num2)));
}
