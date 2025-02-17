import { useEffect, useState } from 'react';
import expoTappay from 'expo-tappay-ios';
import { Button, SafeAreaView, ScrollView, Text, View, Platform } from 'react-native';

export default function App() {
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);

  useEffect(() => {
    const checkApplePayAvailability = async () => {
      if (Platform.OS === "ios") {
        const available = await expoTappay.isApplePayAvailable();
        setIsApplePayAvailable(available);
      }
    };

    checkApplePayAvailability();
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios" && isApplePayAvailable) {
      const primeSubscription = expoTappay.addReceivePrimeListener((event) => {
        console.log("收到 prime 事件:", event);
        if (event.success) {
          console.log("Prime:", event.prime);
          console.log("總金額:", event.totalAmount);
          console.log("客戶端 IP:", event.clientIP);
          expoTappay.showResult(true);
        } else {
          console.error("取得 prime 失敗:", event.message);
          expoTappay.showResult(false);
        }
      });

      const startSubscription = expoTappay.addApplePayStartListener((event) => {
        console.log("Apple Pay 開始:", event);
      });

      const cancelSubscription = expoTappay.addApplePayCancelListener((event) => {
        console.log("Apple Pay 取消:", event);
      });

      const successSubscription = expoTappay.addApplePaySuccessListener((event) => {
        console.log("付款成功:", event);
      });

      const failedSubscription = expoTappay.addApplePayFailedListener((event) => {
        console.log("付款失敗:", event);
      });

      return () => {
        expoTappay.removeListener(primeSubscription);
        expoTappay.removeListener(startSubscription);
        expoTappay.removeListener(cancelSubscription);
        expoTappay.removeListener(successSubscription);
        expoTappay.removeListener(failedSubscription);
      };
    }
  }, [isApplePayAvailable]);

  const handlePayment = async () => {
    try {
      await expoTappay.setupMerchant({
        name: "TapPay!", // 商店名稱
        capabilities: "3DS", 
        merchantId: "merchant.tech.cherri.global.test", // Your Apple Pay Merchant ID (https://developer.apple.com/account/ios/identifier/merchant)
        countryCode: "TW", // 國家代碼
        currencyCode: "TWD" // 貨幣代碼
      });


      await expoTappay.clearCart();

      await expoTappay.startPayment({
        cart: [{
          name: "商品名稱",
          amount: 100
        }]
      });
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Apple Pay 範例</Text>
        
        <Group name="Apple Pay 狀態">
          <Text>
            {isApplePayAvailable ? "此裝置支援 Apple Pay" : "此裝置不支援 Apple Pay"}
          </Text>
        </Group>

        {isApplePayAvailable && (
          <Group name="付款">
            <Button
              title="使用 Apple Pay 付款"
              onPress={handlePayment}
            />
          </Group>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
};
