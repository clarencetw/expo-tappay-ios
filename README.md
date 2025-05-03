# expo-tappay-ios

> ⚠️ **This project has achieved its initial purpose and is no longer maintained**  
> For continuous updates or deeper integration, please refer to the following projects:  
> - [TapPay/tappay-ios-example](https://github.com/TapPay/tappay-ios-example)
> - [stanma9107/expo-tappay-apple-pay](https://github.com/stanma9107/expo-tappay-apple-pay)
>
> ⚠️ **本專案已達最初目的，不再維護**  
> 如需持續更新或深入整合，請參考以下專案：  
> - [TapPay/tappay-ios-example](https://github.com/TapPay/tappay-ios-example)
> - [stanma9107/expo-tappay-apple-pay](https://github.com/stanma9107/expo-tappay-apple-pay)

TapPay SDK for iOS

[Tappay](https://www.tappaysdk.com/en) is a great payment service provider which provide many popular payment method.

<img src="https://bingo.d.pr/8To8My.png" width="180">

This module is a wrapper around the [iOS Tappay SDK](https://github.com/TapPay/tappay-ios-example) (v2.19.0).

[English](#english) | [中文版](#中文版)

# English

A React Native module for integrating TapPay payment services in iOS applications.

This project is inspired by ![expo-tappay-apple-pay](https://github.com/stanma9107/expo-tappay-apple-pay), which provides an Expo-compatible implementation of TapPay with Apple Pay integration.

## Features

- Apple Pay integration
- Easy-to-use API
- Built for Expo managed and bare workflow

## Installation

### In managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation).

### In bare React Native projects

### 1. Install the package
```bash
npm install expo-tappay-ios
```

### 2. Configure iOS project
```bash
npx pod-install
```

## Configuration

Add the following to your `app.json`:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-tappay-ios",
        {
          "merchantId": "YOUR_MERCHANT_ID",
          "acceptNetworks": ["Visa", "MasterCard"],
          "appId": YOUR_APP_ID,
          "appKey": "YOUR_APP_KEY",
          "serverType": "sandbox"
        }
      ]
    ]
  }
}
```

## Basic Usage

```typescript
import expoTappay from 'expo-tappay-ios';

// 1. Setup merchant
await expoTappay.setupMerchant({
  name: "Your Store Name",
  capabilities: "3DS",
  merchantId: "merchant.com.your.id",
  countryCode: "TW",
  currencyCode: "TWD"
});

// 2. Check Apple Pay availability
const isApplePayAvailable = await expoTappay.isApplePayAvailable();

// 3. Start payment
await expoTappay.startPayment({
  cart: [{
    name: "Product Name",
    amount: 100
  }]
});

// 4. Handle payment result
expoTappay.addReceivePrimeListener((event) => {
  if (event.success) {
    console.log("Prime:", event.prime);
    console.log("Total Amount:", event.totalAmount);
    expoTappay.showResult(true);
  } else {
    console.error("Failed to get prime:", event.message);
    expoTappay.showResult(false);
  }
});
```

# 中文版

[Tappay](https://www.tappaysdk.com/en) 是一個優秀的支付服務提供商，提供多種流行的支付方式。

本專案受到 ![expo-tappay-apple-pay](https://github.com/stanma9107/expo-tappay-apple-pay) 的啟發，該專案提供與 Expo 相容的 TapPay 與 Apple Pay 整合實作。

<img src="https://bingo.d.pr/8To8My.png" width="180">

這個模組是基於 [iOS Tappay SDK](https://github.com/TapPay/tappay-ios-example) (v2.19.0) 的封裝。

用於在 iOS 應用程式中整合 TapPay 支付服務的 React Native 模組。

## 功能特點

- 支援 Apple Pay 整合
- 簡單易用的 API
- 支援 Expo managed 和 bare workflow

## 安裝方式

### 在 Expo managed 專案中安裝

對於 [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo 專案，請參考[最新版本的 API 文件](#api-documentation)中的安裝說明。

### 在 bare React Native 專案中安裝

## 安裝步驟

### 1. 安裝套件
```bash
npm install expo-tappay-ios
```

### 2. 配置 iOS 專案
```bash
npx pod-install
```

## 基本設定

在您的 `app.json` 中加入以下設定：
```json
{
  "expo": {
    "plugins": [
      [
        "expo-tappay-ios",
        {
          "merchantId": "您的商店ID",
          "acceptNetworks": ["Visa", "MasterCard"],
          "appId": 您的應用程式ID,
          "appKey": "您的應用程式金鑰",
          "serverType": "sandbox"
        }
      ]
    ]
  }
}
```

## 使用範例

```typescript
import expoTappay from 'expo-tappay-ios';

// 1. 設定商店資訊
await expoTappay.setupMerchant({
  name: "您的商店名稱",
  capabilities: "3DS",
  merchantId: "merchant.com.your.id",
  countryCode: "TW",
  currencyCode: "TWD"
});

// 2. 檢查 Apple Pay 可用性
const isApplePayAvailable = await expoTappay.isApplePayAvailable();

// 3. 開始付款
await expoTappay.startPayment({
  cart: [{
    name: "商品名稱",
    amount: 100
  }]
});

// 4. 處理付款結果
expoTappay.addReceivePrimeListener((event) => {
  if (event.success) {
    console.log("Prime:", event.prime);
    console.log("總金額:", event.totalAmount);
    expoTappay.showResult(true);
  } else {
    console.error("取得 prime 失敗:", event.message);
    expoTappay.showResult(false);
  }
});
```

## 相關資源
- [TapPay 官方 iOS SDK](https://github.com/TapPay/tappay-ios-sdk)
- [TapPay 開發者文件](https://docs.tappaysdk.com/)

## API Documentation

- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/tappay-ios/)
- [Documentation for the main branch](https://docs.expo.dev/versions/unversioned/sdk/tappay-ios/)

## Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).
