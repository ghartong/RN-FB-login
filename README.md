# Get Going
- Create RN project `react-native init yourApp`
- Install JS packages `npm install`
- Install react-native-fbsdk `npm i --save react-native-fbsdk`
- Link SDK to configure the iOS and Android project `react-native link react-native-fbsdk`

# Configure Porjects
## Android
Assuming you have [Android Studio](http://developer.android.com/sdk/index.html) installed, open the project with Android Studio.

Go to `MainApplication.java` and `MainActivity.java` under `app/src/main/java/com/<project name>/` to complete setup.

In `MainApplication.java`,

Add an instance variable of type `CallbackManager` and its getter.

```java
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
...

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
    //...
```

If you want to use AppEventsLogger to log events, override `onCreate()` method and add

```java
@Override
public void onCreate() {
  super.onCreate();
  AppEventsLogger.activateApp(this);
  //...
}
```

Register SDK package in method `getPackages()`.

```java
private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new FBSDKPackage(mCallbackManager)
      );
    }
};
```

In `MainActivity.java`

Override `onActivityResult()` method

```java
import android.content.Intent;

public class MainActivity extends ReactActivity {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
    //...
```

Also you need to add in your `settings.gradle`:

```
include ':react-native-fbsdk'
project(':react-native-fbsdk').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fbsdk/android')
```

And add react-native-fbsdk to dependencies in your app `build.gradle`:

```
dependencies {
    ...
    implementation 'com.facebook.android:facebook-android-sdk:4.34.0'
    implementation project(':react-native-fbsdk')
}
```
- Open your `/app/res/values/strings.xml` file.
- Add a string element with the name attribute facebook_app_id and value as your Facebook App ID to the file. For example
```
<string name="facebook_app_id">Facebook App ID</string>
```

- Open `/app/manifests/AndroidManifest.xml`
- Add a uses-permission element to the manifest: 
```
<uses-permission android:name="android.permission.INTERNET"/>
```
- Add a meta-data element to the application element: 
```
<application android:label="@string/app_name" ...>
    ...
    <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
    ...
</application>
```

## iOS
The `react-native-fbsdk` has been linked by `react-native link`. The next step will be downloading and linking the native Facebook SDK for iOS.

Make sure you have the latest [Xcode](https://developer.apple.com/xcode/) installed. Open the .xcodeproj in Xcode found in the `ios` subfolder from your project's root directory. Now, follow ***all the steps except the pod install (Step 2)*** in the [Getting Started Guide](https://developers.facebook.com/docs/ios/getting-started/) for Facebook SDK for iOS. Along with `FBSDKCoreKit.framework`, don't forget to import `FBSDKShareKit.framework` and `FBSDKLoginKit.framework` into your Xcode project.

**If you're using React Native's RCTLinkingManager**

The `AppDelegate.m` file can only have one method for `openUrl`. If you're also using `RCTLinkingManager` to handle deep links, you should handle both results in your `openUrl` method.

```
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
    sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {

  BOOL handledFB = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:sourceApplication
    annotation:annotation
  ];

  BOOL handledRCT = [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];

  return handledFB || handledRCT;
}
```
