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

4. Set up your mobile operating system tools

   - For iOS development (Mac OS only), make sure you have Xcode and CocoaPods installed.
   
      https://developer.apple.com/xcode/

      https://cocoapods.org/

      Note: You might want to use a tool like rvm (https://rvm.io/) to
      create separate ruby environments, called gemsets, for different projects

      Install pod dependencies in the iOS directory
      ```
      IntentionalWalkApp % cd ios
      ios % pod install
      ```

   - For Android development, you'll need to set up an earlier version of the Java Development Kit (JDK), which you can do via [Homebrew](https://brew.sh)


      ```
      brew tap AdoptOpenJDK/openjdk
      brew cask install adoptopenjdk8
      ```

      Then, you'll also need to setup Android Studio. Specific instructions here: https://facebook.github.io/react-native/docs/getting-started

      You may need to update your `./bash_profile` to use the earlier version of Java by adding the following lines:

      ```
      # Set JAVA_HOME system environment variable value.
      export JAVA_HOME=/Library/Java/JavaVirtualMachines/adoptopenjdk-8.jdk/Contents/Home

      # Add java bin folder in PATH system environment variable value.
      export PATH=$PATH:$JAVA_HOME/bin
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
