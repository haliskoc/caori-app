lenovo@lenovo:~/.gemini/anti
lenovo@lenovo:~/.gemini/antigravity/scratch/cal ai/apps/mobile$ 
 *  History restored 

lenovo@lenovo:~/.gemini/antigravity/scratch/cal ai/apps/mobile$ 
 *  History restored 

lenovo@lenovo:~/.gemini/antigravity/scratch/cal ai/apps/mobile$ pnpm run dev

> @calai/mobile@1.0.0 dev /home/lenovo/.gemini/antigravity/scratch/cal ai/apps/mobile
> expo start

env: load .env
env: export EXPO_PUBLIC_USDA_API_KEY EXPO_PUBLIC_API_URL EXPO_PUBLIC_API_URL_PRODUCTION EXPO_PUBLIC_APP_NAME EXPO_PUBLIC_APP_VERSION EXPO_PUBLIC_ENABLE_VOICE_INPUT EXPO_PUBLIC_ENABLE_OFFLINE_MODE EXPO_PUBLIC_ENABLE_PUSH_NOTIFICATIONS
Starting project at /home/lenovo/.gemini/antigravity/scratch/cal ai/apps/mobile
Starting Metro Bundler
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀▄█▀ ██  █ ▄▄▄▄▄ █
█ █   █ █▄   ▄█▄▄██ █   █ █
█ █▄▄▄█ █ ▀█▀█ ▀ ██ █▄▄▄█ █
█▄▄▄▄▄▄▄█ ▀▄█ █▄█▄█▄▄▄▄▄▄▄█
█  ▀▄▀▀▄ ██ ▀█ ▀██▀  ▄▀▄▄▀█
█▀▄ ██ ▄█ ▄▄██▀█▀▄▄▀ ▀▀█▄▄█
█▄▄ █  ▄  █▀▀   █▀█ ▄█ ██▀█
█▄▀█▄▀▄▄▀▀▀▀█  ██ ▄▄ ▀▀██▄█
█▄▄██▄█▄█ ▄▄▄▄█▄  ▄▄▄ █ ▄ █
█ ▄▄▄▄▄ █▄ █▀██▄  █▄█  ▀▄▄█
█ █   █ █▀  ▄█ ▀▀▄ ▄▄ █▀▄██
█ █▄▄▄█ █▀▄██▄  █  █▄  ▄█▄█
█▄▄▄▄▄▄▄█▄▄█▄█▄▄█▄███▄▄█▄▄█

› Metro waiting on exp://192.168.16.107:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Web is waiting on http://localhost:8081

› Using Expo Go
› Press s │ switch to development build

› Press a │ open Android
› Press w │ open web

› Press j │ open debugger
› Press r │ reload app
› Press m │ toggle menu
› shift+m │ more tools
› Press o │ open project code in your editor

› Press ? │ show all commands

Logs for your project will appear below. Press Ctrl+C to exit.
Android Bundled 1879ms node_modules/expo-router/entry.js (4163 modules)
 WARN  SafeAreaView has been deprecated and will be removed in a future release. Please use 'react-native-safe-area-context' instead. See https://github.com/th3rdwave/react-native-safe-area-context
 WARN  setLayoutAnimationEnabledExperimental is currently a no-op in the New Architecture.
 LOG  Network error - offline mode
 LOG  Database initialized successfully
 LOG  Network error - offline mode
 LOG  Offline mode: using local summary
 ERROR  Local DB Error: [Error: Call to function 'NativeDatabase.prepareAsync' has been rejected.
→ Caused by: java.lang.NullPointerException: java.lang.NullPointerException] 

Code: construct.js
  2 | var setPrototypeOf = require("./setPrototypeOf.js");
  3 | function _construct(t, e, r) {
> 4 |   if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    |                                                                 ^
  5 |   var o = [null];
  6 |   o.push.apply(o, e);
  7 |   var p = new (t.bind.apply(t, o))();
Call Stack
  construct (apps/mobile/<native>)
  apply (apps/mobile/<native>)
  _construct (node_modules/@babel/runtime/helpers/construct.js:4:65)
  Wrapper (node_modules/@babel/runtime/helpers/wrapNativeSuper.js:15:23)
  construct (apps/mobile/<native>)
  _callSuper (node_modules/@babel/runtime/helpers/callSuper.js:5:108)
  constructor (node_modules/expo-modules-core/src/errors/CodedError.ts:11:5)
 LOG  Network error - offline mode
 LOG  Network error - offline mode
 LOG  Network error - offline mode
 ERROR  The action 'GO_BACK' was not handled by any navigator.

Is there any screen to go back to?

This is a development-only warning and won't be shown in production. 

Code: construct.js
  2 | var setPrototypeOf = require("./setPrototypeOf.js");
  3 | function _construct(t, e, r) {
> 4 |   if (isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    |                                                                 ^
  5 |   var o = [null];
  6 |   o.push.apply(o, e);
  7 |   var p = new (t.bind.apply(t, o))();
Call Stack
  construct (apps/mobile/<native>)
  apply (apps/mobile/<native>)
  _construct (node_modules/@babel/runtime/helpers/construct.js:4:65)
  Wrapper (node_modules/@babel/runtime/helpers/wrapNativeSuper.js:15:23)
  construct (apps/mobile/<native>)
  _callSuper (node_modules/@babel/runtime/helpers/callSuper.js:5:108)
  NamelessError (node_modules/@expo/metro-runtime/src/metroServerLogs.native.ts:102:20)
  captureCurrentStack (node_modules/@expo/metro-runtime/src/metroServerLogs.native.ts:106:27)
  HMRClient.log (node_modules/@expo/metro-runtime/src/metroServerLogs.native.ts:39:79)
  console.level (node_modules/react-native/Libraries/Core/setUpDeveloperTools.js:41:24)
  onUnhandledAction (node_modules/expo-router/build/ExpoRoot.js:199:22)
  useLatestCallback$argument_0 (node_modules/@react-navigation/core/lib/module/useNavigationBuilder.js:501:28)
  apply (apps/mobile/<native>)
  latestCallback (node_modules/use-latest-callback/lib/src/index.js:21:33)
  dispatch (node_modules/@react-navigation/core/lib/module/useNavigationHelpers.js:29:26)
  listeners.focus._$argument_0 (node_modules/@react-navigation/core/lib/module/BaseNavigationContainer.js:110:59)
  listener (node_modules/@react-navigation/core/lib/module/useFocusedListenersChildrenAdapter.js:31:25)
  listener (node_modules/@react-navigation/core/lib/module/useFocusedListenersChildrenAdapter.js:21:21)
  listener (node_modules/@react-navigation/core/lib/module/useFocusedListenersChildrenAdapter.js:21:21)
  useLatestCallback$argument_0 (node_modules/@react-navigation/core/lib/module/BaseNavigationContainer.js:110:25)
  apply (apps/mobile/<native>)
  latestCallback (node_modules/use-latest-callback/lib/src/index.js:21:33)
  exports.routingQueue.run (node_modules/expo-router/build/global-state/routing.js:92:37)
  <anonymous> (node_modules/expo-router/build/imperative-api.js:27:35)
  callCreate.reactStackBottomFrame (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:15973:26)
  runWithFiberInDEV (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:683:21)
  commitHookEffectListMount (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:9661:46)
  commitHookPassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:9782:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10925:42)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:11048:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10918:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10918:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10918:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10918:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:11048:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10918:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10918:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:11048:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10918:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10918:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:11048:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10918:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:11048:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10918:49)
  recursivelyTraversePassiveMountEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10899:36)
  commitPassiveMountOnFiber (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:10937:49)
  flushPassiveEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:12726:34)
  flushPendingEffects (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:12691:33)
  flushSpawnedWork (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:12657:30)
  commitRoot (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:12491:25)
  commitRootWhenReady (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:11740:17)
  performWorkOnRoot (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:11702:34)
  performSyncWorkOnRoot (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:3088:24)
  flushSyncWorkAcrossRoots_impl (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:2942:42)
  processRootScheduleInMicrotask (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:2973:36)
  scheduleMicrotask$argument_0 (node_modules/react-native/Libraries/Renderer/implementations/ReactFabric-dev.js:3108:47) 

Code: wrap-jsx.js
  18 |             type = api_1.interopComponents.get(type) ?? type;
  19 |         }
> 20 |         return jsx.call(jsx, type, props, ...rest);
     |                        ^
  21 |     };
  22 | }
  23 | //# sourceMappingURL=wrap-jsx.js.map
Call Stack
  call (apps/mobile/<native>)
  apply (apps/mobile/<native>)
  <anonymous> (node_modules/react-native-css-interop/dist/runtime/wrap-jsx.js:20:24)
  ContextNavigator (node_modules/expo-router/build/ExpoRoot.js:144:7)
  call (apps/mobile/<native>)
  apply (apps/mobile/<native>)
  <anonymous> (node_modules/react-native-css-interop/dist/runtime/wrap-jsx.js:20:24)
  ExpoRoot (node_modules/expo-router/build/ExpoRoot.js:87:12)
  call (apps/mobile/<native>)
  apply (apps/mobile/<native>)
  <anonymous> (node_modules/react-native-css-interop/dist/runtime/wrap-jsx.js:20:24)
  App (node_modules/expo-router/build/qualified-entry.js:21:7)
  call (apps/mobile/<native>)
  apply (apps/mobile/<native>)
  <anonymous> (node_modules/react-native-css-interop/dist/runtime/wrap-jsx.js:20:24)
  WithDevTools (node_modules/expo/src/launch/withDevTools.tsx:21:12)
 LOG  Network error - offline mode
 LOG  Network error - offline mode
 ERROR  Failed to fetch profile {"code": "ERR_NETWORK", "config": {"adapter": ["xhr", "http", "fetch"], "allowAbsoluteUrls": true, "baseURL": "http://localhost:3000/api/v1", "data": undefined, "env": {"Blob": [Function Blob], "FormData": [Function FormData]}, "headers": [Object], "maxBodyLength": -1, "maxContentLength": -1, "method": "get", "timeout": 30000, "transformRequest": [[Function transformRequest]], "transformResponse": [[Function transformResponse]], "transitional": {"clarifyTimeoutError": false, "forcedJSONParsing": true, "silentJSONParsing": true}, "url": "/profile", "validateStatus": [Function validateStatus], "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN"}, "event": {"_bubbles": false, "_cancelable": false, "_composed": false, "_defaultPrevented": false, "_timeStamp": 63167796.700687, "_type": "error", Symbol(composedPath): [], Symbol(currentTarget): null, Symbol(eventPhase): 0, Symbol(inPassiveListenerFlag): false, Symbol(isTrusted): true, Symbol(stopPropagationFlag): false, Symbol(stopPropagationFlag): false, Symbol(target): {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": true, "_headers": [Object], "_incrementalEvents": false, "_lowerCaseResponseHeaders": [Object], "_method": "GET", "_perfKey": "network_XMLHttpRequest_http://localhost:3000/api/v1/profile", "_performanceLogger": [PerformanceLogger], "_requestId": null, "_response": "Failed to connect to localhost/127.0.0.1:3000", "_responseType": "", "_sent": true, "_startTime": 63167300.982533, "_subscriptions": [Array], "_timedOut": false, "_url": "http://localhost:3000/api/v1/profile", "readyState": 4, "responseHeaders": undefined, "status": 0, "timeout": 30000, "upload": [XMLHttpRequestEventTarget], "withCredentials": true, Symbol(bubblingListeners): [Map], Symbol(eventHandlerAttributeMap): [Map]}, Symbol(Event.dispatch): false}, "isNetworkError": true, "message": "Bağlantı hatası. İnternet bağlantınızı kontrol edin.", "name": "AxiosError", "request": {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": true, "_headers": {"accept": "application/json, text/plain, */*"}, "_incrementalEvents": false, "_lowerCaseResponseHeaders": {}, "_method": "GET", "_perfKey": "network_XMLHttpRequest_http://localhost:3000/api/v1/profile", "_performanceLogger": {"_closed": false, "_extras": [Object], "_pointExtras": [Object], "_points": [Object], "_timespans": [Object]}, "_requestId": null, "_response": "Failed to connect to localhost/127.0.0.1:3000", "_responseType": "", "_sent": true, "_startTime": 63167300.982533, "_subscriptions": [], "_timedOut": false, "_url": "http://localhost:3000/api/v1/profile", "readyState": 4, "responseHeaders": undefined, "status": 0, "timeout": 30000, "upload": {}, "withCredentials": true, Symbol(bubblingListeners): Map {"loadend" => [Map], "abort" => [Map], "error" => [Map], "timeout" => [Map]}, Symbol(eventHandlerAttributeMap): Map {"loadend" => [Object], "abort" => [Object], "error" => [Object], "timeout" => [Object]}}} 

Code: profile.slice.ts
  75 |       }
  76 |     } catch (error) {
> 77 |       console.error("Failed to fetch profile", error);
     |                    ^
  78 |     } finally {
  79 |       set({ profileLoading: false });
  80 |     }
Call Stack
  fetchProfile (apps/mobile/src/store/slices/profile.slice.ts:77:20)
 LOG  Network error - offline mode
 ERROR  Failed to fetch profile {"code": "ERR_NETWORK", "config": {"adapter": ["xhr", "http", "fetch"], "allowAbsoluteUrls": true, "baseURL": "http://localhost:3000/api/v1", "data": undefined, "env": {"Blob": [Function Blob], "FormData": [Function FormData]}, "headers": [Object], "maxBodyLength": -1, "maxContentLength": -1, "method": "get", "timeout": 30000, "transformRequest": [[Function transformRequest]], "transformResponse": [[Function transformResponse]], "transitional": {"clarifyTimeoutError": false, "forcedJSONParsing": true, "silentJSONParsing": true}, "url": "/profile", "validateStatus": [Function validateStatus], "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN"}, "event": {"_bubbles": false, "_cancelable": false, "_composed": false, "_defaultPrevented": false, "_timeStamp": 63169904.925226, "_type": "error", Symbol(composedPath): [], Symbol(currentTarget): null, Symbol(eventPhase): 0, Symbol(inPassiveListenerFlag): false, Symbol(isTrusted): true, Symbol(stopPropagationFlag): false, Symbol(stopPropagationFlag): false, Symbol(target): {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": true, "_headers": [Object], "_incrementalEvents": false, "_lowerCaseResponseHeaders": [Object], "_method": "GET", "_perfKey": "network_XMLHttpRequest_http://localhost:3000/api/v1/profile", "_performanceLogger": [PerformanceLogger], "_requestId": null, "_response": "Failed to connect to localhost/127.0.0.1:3000", "_responseType": "", "_sent": true, "_startTime": 63167793.630456, "_subscriptions": [Array], "_timedOut": false, "_url": "http://localhost:3000/api/v1/profile", "readyState": 4, "responseHeaders": undefined, "status": 0, "timeout": 30000, "upload": [XMLHttpRequestEventTarget], "withCredentials": true, Symbol(bubblingListeners): [Map], Symbol(eventHandlerAttributeMap): [Map]}, Symbol(Event.dispatch): false}, "isNetworkError": true, "message": "Bağlantı hatası. İnternet bağlantınızı kontrol edin.", "name": "AxiosError", "request": {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": true, "_headers": {"accept": "application/json, text/plain, */*"}, "_incrementalEvents": false, "_lowerCaseResponseHeaders": {}, "_method": "GET", "_perfKey": "network_XMLHttpRequest_http://localhost:3000/api/v1/profile", "_performanceLogger": {"_closed": false, "_extras": [Object], "_pointExtras": [Object], "_points": [Object], "_timespans": [Object]}, "_requestId": null, "_response": "Failed to connect to localhost/127.0.0.1:3000", "_responseType": "", "_sent": true, "_startTime": 63167793.630456, "_subscriptions": [], "_timedOut": false, "_url": "http://localhost:3000/api/v1/profile", "readyState": 4, "responseHeaders": undefined, "status": 0, "timeout": 30000, "upload": {}, "withCredentials": true, Symbol(bubblingListeners): Map {"loadend" => [Map], "abort" => [Map], "error" => [Map], "timeout" => [Map]}, Symbol(eventHandlerAttributeMap): Map {"loadend" => [Object], "abort" => [Object], "error" => [Object], "timeout" => [Object]}}} 

Code: profile.slice.ts
  75 |       }
  76 |     } catch (error) {
> 77 |       console.error("Failed to fetch profile", error);
     |                    ^
  78 |     } finally {
  79 |       set({ profileLoading: false });
  80 |     }
Call Stack
  fetchProfile (apps/mobile/src/store/slices/profile.slice.ts:77:20)
 LOG  Network error - offline mode
 ERROR  Failed to fetch profile {"code": "ERR_NETWORK", "config": {"adapter": ["xhr", "http", "fetch"], "allowAbsoluteUrls": true, "baseURL": "http://localhost:3000/api/v1", "data": undefined, "env": {"Blob": [Function Blob], "FormData": [Function FormData]}, "headers": [Object], "maxBodyLength": -1, "maxContentLength": -1, "method": "get", "timeout": 30000, "transformRequest": [[Function transformRequest]], "transformResponse": [[Function transformResponse]], "transitional": {"clarifyTimeoutError": false, "forcedJSONParsing": true, "silentJSONParsing": true}, "url": "/profile", "validateStatus": [Function validateStatus], "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN"}, "event": {"_bubbles": false, "_cancelable": false, "_composed": false, "_defaultPrevented": false, "_timeStamp": 63172253.011457, "_type": "error", Symbol(composedPath): [], Symbol(currentTarget): null, Symbol(eventPhase): 0, Symbol(inPassiveListenerFlag): false, Symbol(isTrusted): true, Symbol(stopPropagationFlag): false, Symbol(stopPropagationFlag): false, Symbol(target): {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": true, "_headers": [Object], "_incrementalEvents": false, "_lowerCaseResponseHeaders": [Object], "_method": "GET", "_perfKey": "network_XMLHttpRequest_http://localhost:3000/api/v1/profile", "_performanceLogger": [PerformanceLogger], "_requestId": null, "_response": "Failed to connect to localhost/127.0.0.1:3000", "_responseType": "", "_sent": true, "_startTime": 63167795.963149, "_subscriptions": [Array], "_timedOut": false, "_url": "http://localhost:3000/api/v1/profile", "readyState": 4, "responseHeaders": undefined, "status": 0, "timeout": 30000, "upload": [XMLHttpRequestEventTarget], "withCredentials": true, Symbol(bubblingListeners): [Map], Symbol(eventHandlerAttributeMap): [Map]}, Symbol(Event.dispatch): false}, "isNetworkError": true, "message": "Bağlantı hatası. İnternet bağlantınızı kontrol edin.", "name": "AxiosError", "request": {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": true, "_headers": {"accept": "application/json, text/plain, */*"}, "_incrementalEvents": false, "_lowerCaseResponseHeaders": {}, "_method": "GET", "_perfKey": "network_XMLHttpRequest_http://localhost:3000/api/v1/profile", "_performanceLogger": {"_closed": false, "_extras": [Object], "_pointExtras": [Object], "_points": [Object], "_timespans": [Object]}, "_requestId": null, "_response": "Failed to connect to localhost/127.0.0.1:3000", "_responseType": "", "_sent": true, "_startTime": 63167795.963149, "_subscriptions": [], "_timedOut": false, "_url": "http://localhost:3000/api/v1/profile", "readyState": 4, "responseHeaders": undefined, "status": 0, "timeout": 30000, "upload": {}, "withCredentials": true, Symbol(bubblingListeners): Map {"loadend" => [Map], "abort" => [Map], "error" => [Map], "timeout" => [Map]}, Symbol(eventHandlerAttributeMap): Map {"loadend" => [Object], "abort" => [Object], "error" => [Object], "timeout" => [Object]}}} 

Code: profile.slice.ts
  75 |       }
  76 |     } catch (error) {
> 77 |       console.error("Failed to fetch profile", error);
     |                    ^
  78 |     } finally {
  79 |       set({ profileLoading: false });
  80 |     }
Call Stack
  fetchProfile (apps/mobile/src/store/slices/profile.slice.ts:77:20)
