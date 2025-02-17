import ExpoModulesCore
import TPDirect

let APPLE_PAY_START_EVENT_NAME = "onApplePayStart"
let APPLE_PAY_CANCEL_EVENT_NAME = "onApplePayCancel"
let APPLE_PAY_SUCCESS_EVENT_NAME = "onApplePaySuccess"
let APPLE_PAY_RECEIVE_PRIME_EVENT_NAME = "onReceivePrime"
let APPLE_PAY_FAILED_EVENT_NAME = "onApplePayFailed"
let APPLE_PAY_FINISH_EVENT_NAME = "onApplePayFinished"

public class ExpoTappayModule: Module  {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    Name("ExpoTappay")
      
    Events(APPLE_PAY_START_EVENT_NAME)
    Events(APPLE_PAY_CANCEL_EVENT_NAME)
    Events(APPLE_PAY_SUCCESS_EVENT_NAME)
    Events(APPLE_PAY_RECEIVE_PRIME_EVENT_NAME)
    Events(APPLE_PAY_FAILED_EVENT_NAME)
    Events(APPLE_PAY_FINISH_EVENT_NAME)
        
    var applePay: TPDApplePay!
    let merchant: TPDMerchant = TPDMerchant()
    let consumer: TPDConsumer = TPDConsumer()
    var cart: TPDCart = TPDCart()
    let networks = (Bundle.main.object(forInfoDictionaryKey: "TPDApplePayPaymentNetworks") as? [String] ?? ["Visa", "MasterCard", "JCB"]).map { PKPaymentNetwork(rawValue: $0) }
      
    Function("isApplePayAvailable") { () -> Bool in
        return TPDApplePay.canMakePayments()
    }
      
    Function("setupMerchant") { (name: String, merchantCapability: String, merchantId: String, countryCode: String, currencyCode: String) in
        merchant.merchantName = name
        
        // Merchant Capacility
        switch merchantCapability {
        case "debit":
            merchant.merchantCapability = .debit
        case "credit":
            merchant.merchantCapability = .credit
        case "emv":
            merchant.merchantCapability = .emv
        default:
            merchant.merchantCapability = .threeDSecure
        }
        
        // Merchant Identifier
        merchant.applePayMerchantIdentifier = merchantId
        
        // Country Code & Currency Code
        merchant.countryCode = countryCode
        merchant.currencyCode = currencyCode
        
        // Merchant Support Networks
        merchant.supportedNetworks = networks
    }
      
    Function("clearCart") {
        cart = TPDCart()
    }
      
    Function("addToCart") { (name: String, amount: Int) in
        let amountValue = NSDecimalNumber(value: amount)
        cart.add(TPDPaymentItem(itemName: name, withAmount: amountValue))
    }
      
    AsyncFunction("startPayment") { (promise: Promise) in
        let applePayDelegate = ApplePayDelegate() { (name: String, body: [String: Any?]) -> Void in
            debugPrint(name)
            self.sendEvent(name, body)
        }
        applePay = TPDApplePay.setupWthMerchant(merchant, with: consumer, with: cart, withDelegate: applePayDelegate)
        
        applePay.startPayment()
    }
      
    Function("showSetup") {
      TPDApplePay.showSetupView()
    }
      
    Function("showResult") { (isSuccess: Bool) in
      applePay.showPaymentResult(isSuccess)
    }
  }
}