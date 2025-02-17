require 'json'

package = JSON.parse(File.read(File.join(__dir__, '..', 'package.json')))

Pod::Spec.new do |s|
  s.name           = 'ExpoTappay'
  s.version        = package['version']
  s.summary        = package['description']
  s.description    = package['description']
  s.license        = package['license']
  s.author         = package['author']
  s.homepage       = package['homepage']
  s.source         = { git: 'https://github.com/clarencetw/expo-tappay-ios' }
  
  s.platforms      = { :ios => '15.1' }
  s.swift_version  = '5.4'
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.frameworks = 'SafariServices'

  # Swift/Objective-C compatibility
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_COMPILATION_MODE' => 'wholemodule'
  }

  s.vendored_framework = "TPDirect.xcframework"
  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
  s.public_header_files = "*.{h}"
end
