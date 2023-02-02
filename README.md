# Intentional Walk

## Getting started with app development

1. Clone this repo to your computer.

2. Install packages.
   ```
   intentional-walk % npm install
   ```

3. Set up your mobile operating system tools

   - For **iOS** development (Mac OS only), make sure you have Xcode and CocoaPods installed.

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

      - For **Mac OS X**, configure your shell environment to reference the newly installed
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

            For **Intel** processors, having `Android Emulator` installed should be sufficient. 
            
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

4. Start the React Native Metro Bundler and leave it running.
   ```
   intentional-walk % npm start
   ```

5. In another shell, build and run the app for your target platform.
   ```
   intentional-walk % npm run ios
   intentional-walk % npm run android
   ```
