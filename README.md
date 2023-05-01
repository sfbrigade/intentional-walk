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

      - For **macOS**, configure your shell environment to reference the newly installed
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
         to do so. If you get errors running sdkmanager, install Google Play Licensing Library
         in Android Studio -> Preferences -> Appearance & Behavior -> System Settings -> Android SDK
         -> SDK Tools.

      - For **Windows**, have the latest Android Studio installed. Note that this does include a JDK in its 
         installation, so there is no need to separately install a JDK.
         
         Within the SDK Manager (Android Studio -> File -> Settings -> Appearance & Behavior -> 
         System Settings -> Android SDK -> SDK Tools), have the following tools installed: 
         - `Android SDK Build Tools `
         - `Android Emulator `
         - `Android SDK Platform-Tools `
         - `Google Play Licensing Library `

            For **Intel** processors, having `Android Emulator` installed should be sufficient, although you may wish to
            install the Intel HAXM accelerator for improved performance.
            
            Although for **AMD** processors, `Android Emulator Hypervisor Driver for AMD Processors (installer)` also 
            must be installed. If the installation fails, check the following two items:
            1. Hyper-V must be disabled as a Windows feature.
            2. CPU Virtualization must be enabled in the BIOS
            
            More details of this installation after a failure can be found [here](https://github.com/google/android-emulator-hypervisor-driver-for-amd-processors/issues/10).

         Within the Device Manager (Android Studio -> Tools -> Device Manager), create a virtual device if none are created.
         We suggest using a recent Pixel phone. Use the Device Manager to launch the emulator.

         Set the following in your environment variables:

         ```
         ANDROID_SDK_ROOT          C:\Users\<my username>\AppData\Local\Android\SDK
         JAVA_HOME                 C:\Program Files\Android\Android Studio\jbr

         and within PATH    (new)  %ANDROID_SDK_ROOT%\platform-tools
                            (new)  %JAVA_HOME%\bin
         ```

         In Powershell, navigate to the repository and run `npm install`. Once installed run `npm run android`.
         This should build and be installed into the emulator. Notes can be found in the following 
         [issue](https://github.com/sfbrigade/intentional-walk/issues/204).

4. Copy one of the environment files (`.env.dev`, `.env.staging`, `.env.prod`) to `.env` depending upon
   which environment you wish to connect to. Note: currently, there are no "secrets" in our environment
   variables, but please DO NOT COMMIT secrets into any of the environment files. Instead, put a
   blank/empty placeholder, and store the value in a corresponding `.local` file which will be ignored
   by git (i.e. `.env.dev.local`, `.env.staging.local`, `.env.prod.local`).

   If you change your environment settings, you'll need to reset the Metro Bundler cache. Close it, if
   it is running, then restart it with: `npm start -- --reset-cache`

5. Start the React Native Metro Bundler and leave it running.
   ```
   intentional-walk % npm start
   ```

6. In another shell, build and run the app for your target platform.
   ```
   intentional-walk % npm run ios
   intentional-walk % npm run android
   ```
