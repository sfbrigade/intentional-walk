# Intentional Walk

## Getting started with app development

1. Install Node.js (https://nodejs.org) **v16** (newer versions are not currently compatible). If you need to manage multiple versions of Node.js for different projects, use a Node Version Manager:

   nvm (macOS)  
   https://github.com/nvm-sh/nvm  
   Can also be installed on macOS using Homebrew
   
   nvm-windows (Windows)  
   https://github.com/coreybutler/nvm-windows

2. Clone this repo to a directory on your computer, and navigate to the repo directory in Terminal (macOS) or PowerShell (Windows). Install the library dependencies with npm (installed with Node.js above):
   
   ```
   npm install
   ```

3. Set up your mobile operating system tools

   - For **iOS** development (macOS only), make sure you have Xcode and CocoaPods installed.

      https://developer.apple.com/xcode/

      https://cocoapods.org/

      Note: You might want to use a tool like rvm (https://rvm.io/) to
      create separate ruby environments, called gemsets, for different projects

      Install pod dependencies in the iOS directory
      ```
      intentional-walk % cd ios
      ios % pod install
      ```

   - For **Android** development, first install Android Studio: https://developer.android.com/studio

      - Launch Android Studio. On the Welcome screen, choose "More Actions..." then "SDK Manager". Take note of your Android SDK Location.

        - In the SDK Platforms tab, make sure at least one "Android SDK Platform ##" is checked.

        - In the SDK Tools tab, make sure that "Android SDK Build-Tools", "Android SDK Command-line Tools", "Android Emulator", "Android SDK Platform-Tools", and "Google Play Licensing Library" are checked.

        - Click on "Apply" or "OK" to save any changes.

      - To use the Android Emulator, configure an Android Virtual Device: https://developer.android.com/studio/run/managing-avds

      - For the version of React Native used by this codebase, also install an older version
        of Java, such as OpenJDK 11.

        On **macOS**, you can install and use Homebrew to install OpenJDK. Install Homebrew per the instructions on its website: https://brew.sh/. Then run `brew install openjdk@11`

        On **Windows**, you can download installers for older versions of JDK from Microsoft:
        https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-11. Download and run
        the MSI installer for OpenJDK 11. Select the option in the installer to let it set
        the JAVA_HOME environment variable.

      - For **macOS**, configure your shell environment to reference the newly installed
         developer tools. In the standard Mac OS Terminal, edit (or create, if needed)
         your .zprofile in your home directory and add the following (assuming
         default installation locations):

         ```
         export JAVA_HOME=/opt/homebrew/opt/openjdk@11
         export ANDROID_SDK_ROOT=~/Library/Android/sdk
         export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
         export PATH=$PATH:$ANDROID_SDK_ROOT/tools
         export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
         export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
         ```

         Close and re-open your Terminal shell to set the newly configured environment variables.

         If you are installing the tools for the very first time, you may need to
         accept the SDK license agreements. Run: ```sdkmanager --licenses```
         to do so.

      - For **Windows**, make sure the following environment variables are set in either the System or User variables sections, if not add them:

         ```
         ANDROID_SDK_ROOT          C:\Users\<my username>\AppData\Local\Android\Sdk
         JAVA_HOME                 C:\Program Files\Microsoft\jdk-11.0.21.9-hotspot

         and within PATH    (new)  %ANDROID_SDK_ROOT%\platform-tools
                            (new)  %JAVA_HOME%\bin
         ```

4. Copy one of the environment files (`.env.dev`, `.env.staging`, `.env.prod`) to `.env` depending upon
   which environment you wish to connect to. Note: currently, there are no "secrets" in our environment
   variables, but please DO NOT COMMIT secrets into any of the environment files. Instead, put a
   blank/empty placeholder, and store the value in a corresponding `.local` file which will be ignored
   by git (i.e. `.env.dev.local`, `.env.staging.local`, `.env.prod.local`).

   To start, use the `.env.staging` environment. Note that the staging server may go to sleep and take
   some seconds to start up again when connecting. The `.env.dev` environment is for developers who
   are also running the server codebase on the same machine and wish to connect to it. The
   `.env.prod` environment connects to the live production server. Please sign up with either the
   first and/or last name "Tester" to have your account flagged as a test account on production.

   If you change your environment settings, you'll need to reset the Metro Bundler cache. Close it, if
   it is running, then restart it with: `npm start -- --reset-cache`

5. Start the React Native Metro Bundler and leave it running.
   ```
   intentional-walk % npm start
   ```

6. In another shell, build and run the app for your target platform. For iOS, the default is to run in
   the iPhone 12 simulator, you should specify a newer version that is included with your installation
   of Xcode. For Android, it should launch the emulator running in a configured Android Virtual Device-
   note that the installation may fail if the device is still booting, if so, wait for the emulator
   to fully boot to the lock/home screen, and run the command again.

   ```
   intentional-walk % npm run ios -- --simulator="iPhone 15"
   intentional-walk % npm run android
   ```
