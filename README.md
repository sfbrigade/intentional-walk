# Intentional Walk

## Getting started with app development

1. Clone this repo to your computer.

2. Make sure you have a recent version of Node.js installed.
   https://nodejs.org/
   Note: Mac OS users can also install Node using Homebrew (https://brew.sh/)

3. Change into the IntentionalWalkApp directory and install packages
   ```
   intentional-walk % cd IntentionalWalkApp
   IntentionalWalkApp % npm install
   ```

4. For iOS development (Mac OS only), make sure you have CocoaPods installed.
   https://cocoapods.org/
   Note: You might want to use a tool like rvm (https://rvm.io/) to
   create separate ruby environments, called gemsets, for different projects

   Install pod dependencies in the iOS directory
   ```
   IntentionalWalkApp % cd ios
   ios % pod install
   ```

5. Start the React Native Metro Bundler and leave it running.
   ```
   IntentionalWalkApp % npm start
   ```

6. In another shell, build and run the app for your target platform.
   ```
   IntentionalWalkApp % npm run ios
   IntentionalWalkApp % npm run android
   ```
