export type Capability = "debit" | "credit" | "emv" | "3DS";

export interface CartItem {
  name: string;
  amount: number;
}

export interface MerchantOptions {
  name: string;
  capabilities: Capability;
  merchantId: string;
  countryCode: string;
  currencyCode: string;
}

export interface StartPaymentOptions {
  cart: CartItem[];
}

export interface OnSuccessReceivePrimeEvent {
  success: true;
  prime: string;
  totalAmount: number;
  clientIP: string;
}

export interface OnFailureReceivePrimeEvent {
  success: false;
  message: string;
}

export interface OnApplePayGeneralEvent {
  status: number;
  message: string;
}

export interface OnApplePayTransactionEvent {
  status: number;
  message: string;
  amount: number;
  paymentMethod?: {
    displayName?: string;
    network?: string;
    type?: string;
  };
}

export type OnReceivePrimeEvent =
  | OnSuccessReceivePrimeEvent
  | OnFailureReceivePrimeEvent;

export type ApplePayEventName =
  | "onApplePayStart"
  | "onApplePayCancel"
  | "onApplePaySuccess"
  | "onReceivePrime"
  | "onApplePayFailed"
  | "onApplePayFinished";