import { INSTALLMENTS } from '../../shared/catalog';
export const money = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const installment = (v: number) => `${INSTALLMENTS}x de ${money(v / INSTALLMENTS)} sem juros`;
