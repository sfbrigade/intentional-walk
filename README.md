# Intentional Walk

## Getting started with app development

1. Clone this repo to your computer.

2. Make sure you have a recent version of Node.js installed.

   https://nodejs.org/

   Note: Mac OS users can also install Node using Homebrew (https://brew.sh/)

3. Install packages.
   ```
   intentional-walk % npm install
   ```

4. Set up your mobile operating system tools

   - For iOS development (Mac OS only), make sure you have Xcode and CocoaPods installed.

      https://developer.apple.com/xcode/

      https://cocoapods.org/

      Note: You might want to use a tool like rvm (https://rvm.io/) to
      create separate ruby environments, called gemsets, for different projects

      Install pod dependencies in the iOS directory
      ```
      intentional-walk % cd ios
      ios % pod install
      ```

   - For Android development, first install Android Studio: https://developer.android.com/studio

      For Mac OS X, configure your shell environment to reference the newly installed
      developer tools. In the standard Mac OS Terminal, edit (or create, if needed)
      your .bash_profile in your home directory and add the following (assuming
      default installation locations):

      ```
      export JAVA_HOME=/Applications/Android\ Studio.app/Contents/jre/jdk/Contents/Home/
      export ANDROID_SDK_ROOT=~/Library/Android/sdk
      export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
      export PATH=$PATH:$ANDROID_SDK_ROOT/tools
      export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
      export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
      ```

      Close and re-open your Terminal, or run ```source ~/.bash_profile``` to
      set the newly configured environment variables.

      If you are installing the tools for the very first time, you may need to
      accept the SDK license agreements. Run: ```sdkmanager --licenses```
      to do so.

5. Start the React Native Metro Bundler and leave it running.
   ```
   intentional-walk % npm start
   ```

6. In another shell, build and run the app for your target platform.
   ```
   intentional-walk % npm run ios
   intentional-walk % npm run android
   ```
