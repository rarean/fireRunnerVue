# FireRunnerVue
A mobile app to facilitate incident data gathering in the field.
This was purposly built for Castroville Voluntieer Fire Department, but could
be modified to meet your needs.

# Contributing
This project adheres to the [Contributor](./Contributing.mg) Covenant [code of conduct](./CodeOfConduct.md). By participating
, you are expected to uphold this code.

# Features
* Send worksheet via built-in share (Android/iOS)
* Capture digital signatures from device

# Getting Started
These instructions will get you a copy of the project to running on your local machine for development and testing.

## Prerequisites
* [NodeJs](https://nodejs.org/en/) tested with v14.10.1
* [Expo](https://expo.io/learn)
* [Android Studio](https://developer.android.com/studio) for AVD emulator

## Installation & Run
* Fork & clone repo `git clone https://github.com/rarean/fireRunnerVue`
* Change into the repo dir `cd fireRunnerVue`
* Install packages `npm install`
* Install Expo Cli `npm install -g expo-cli`
* Open Adroid Stuido and AVD manager (create new device if don't have one already)
* Start with Expo Cli or npm `expo start` or `npm run android`
* Use expo browser instructions to connect to Android AVD

# License
[GPL 3.0](./LICENSE.md)

## Dependencies/Packages
Additional npm packages used beyond base Expo SDK 38

* Expo File System
* Expo Screen Orientation
* Expo Font
* Expo Share
* Lodash
* Native Base
* PDFMake
* react-native-gesture-handler: 1.6.0,
* react-native-paper: 3.8.0,
* react-native-reanimated: 1.9.0,
* react-native-screens: 2.9.0,
* react-native-signature-panel: 1.0.13,
* react-native-svg: 12.1.0,
* react-native-view-shot: 3.1.2,
* vue-native-core: 0.1.4,
* vue-native-helper: 0.1.4,
* vue-native-router: 0.1.1,
* vuex: 3.5.1
