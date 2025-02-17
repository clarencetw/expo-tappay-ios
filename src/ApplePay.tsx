import {
  EventEmitter,
  Subscription,
  UnavailabilityError,
} from "expo-modules-core";

import * as ApplePayTypes from "./ApplePay.type";
import ExpoTappay from "./ExpoApplePay";

const emitter = new EventEmitter(ExpoTappay);

const checkAvailability = (methodName: string) => {
  if (!ExpoTappay || !ExpoTappay.isApplePayAvailable()) {
    throw new UnavailabilityError("expo-tappay-ios", methodName);
  }
};

function removeListener(subscription: Subscription): void {
  checkAvailability("removeListener");
  emitter.removeSubscription(subscription);
}

/* Receive Prime Listener */
function addReceivePrimeListener(
  listener: (payload: ApplePayTypes.OnReceivePrimeEvent) => void,
): Subscription {
  checkAvailability("addReceivePrimeListener");
  return emitter.addListener("onReceivePrime", listener);
}

/* Apple Pay Start Listener */
function addApplePayStartListener(
  listener: (payload: ApplePayTypes.OnApplePayGeneralEvent) => void,
): Subscription {
  checkAvailability("addApplePayStartListener");
  return emitter.addListener("onApplePayStart", listener);
}

/* Apple Pay Cancel Listener */
function addApplePayCancelListener(
  listener: (payload: ApplePayTypes.OnApplePayGeneralEvent) => void,
): Subscription {
  checkAvailability("addApplePayCancelListener");
  return emitter.addListener("onApplePayCancel", listener);
}

/* Apple Pay Success Listener */
function addApplePaySuccessListener(
  listener: (payload: ApplePayTypes.OnApplePayTransactionEvent) => void,
): Subscription {
  checkAvailability("addApplePaySuccessListener");
  return emitter.addListener("onApplePaySuccess", listener);
}

/* Apple Pay Failed Listener */
function addApplePayFailedListener(
  listener: (payload: ApplePayTypes.OnApplePayTransactionEvent) => void,
): Subscription {
  checkAvailability("addApplePayFailedListener");
  return emitter.addListener("onApplePayFailed", listener);
}

/* Apple Pay Finished Listener */
function addApplePayFinishedListener(
  listener: (payload: ApplePayTypes.OnApplePayGeneralEvent) => void,
): Subscription {
  checkAvailability("addApplePayFinishedListener");
  return emitter.addListener("onApplePayFinished", listener);
}

function isApplePayAvailable(): boolean {
  if (!ExpoTappay) {
    return false;
  }
  return ExpoTappay.isApplePayAvailable();
}

async function setupMerchant(
  props: ApplePayTypes.MerchantOptions,
): Promise<void> {
  checkAvailability("setupMerchant");
  return await ExpoTappay.setupMerchant(
    props.name,
    props.capabilities,
    props.merchantId,
    props.countryCode,
    props.currencyCode,
  );
}

async function clearCart(): Promise<void> {
  checkAvailability("clearCart");
  return await ExpoTappay.clearCart();
}

async function addToCart(item: ApplePayTypes.CartItem): Promise<void> {
  checkAvailability("addToCart");
  return await ExpoTappay.addToCart(item.name, item.amount);
}

async function startPayment(
  props: ApplePayTypes.StartPaymentOptions,
): Promise<void> {
  checkAvailability("startPayment");
  await clearCart();
  for (const item of props.cart) {
    await addToCart(item);
  }
  return await ExpoTappay.startPayment();
}

function showResult(isSuccess: boolean): void {
  checkAvailability("showResult");
  ExpoTappay.showResult(isSuccess);
}

function showSetup(): void {
  checkAvailability("showSetup");
  ExpoTappay.showSetup();
}

export default {
  isApplePayAvailable,
  setupMerchant,
  startPayment,
  clearCart,
  addToCart,
  showResult,
  showSetup,
  removeListener,
  addReceivePrimeListener,
  addApplePayStartListener,
  addApplePayCancelListener,
  addApplePaySuccessListener,
  addApplePayFailedListener,
  addApplePayFinishedListener,
};