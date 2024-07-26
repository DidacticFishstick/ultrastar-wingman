# UltraStarWingman.AuthApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authJwtLoginAuthJwtLoginPost**](AuthApi.md#authJwtLoginAuthJwtLoginPost) | **POST** /auth/jwt/login | Auth:Jwt.Login
[**authJwtLogoutAuthJwtLogoutPost**](AuthApi.md#authJwtLogoutAuthJwtLogoutPost) | **POST** /auth/jwt/logout | Auth:Jwt.Logout
[**registerRegisterAuthRegisterPost**](AuthApi.md#registerRegisterAuthRegisterPost) | **POST** /auth/register | Register:Register
[**resetForgotPasswordAuthForgotPasswordPost**](AuthApi.md#resetForgotPasswordAuthForgotPasswordPost) | **POST** /auth/forgot-password | Reset:Forgot Password
[**resetResetPasswordAuthResetPasswordPost**](AuthApi.md#resetResetPasswordAuthResetPasswordPost) | **POST** /auth/reset-password | Reset:Reset Password
[**verifyRequestTokenAuthRequestVerifyTokenPost**](AuthApi.md#verifyRequestTokenAuthRequestVerifyTokenPost) | **POST** /auth/request-verify-token | Verify:Request-Token
[**verifyVerifyAuthVerifyPost**](AuthApi.md#verifyVerifyAuthVerifyPost) | **POST** /auth/verify | Verify:Verify



## authJwtLoginAuthJwtLoginPost

> BearerResponse authJwtLoginAuthJwtLoginPost(username, password, opts)

Auth:Jwt.Login

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.AuthApi();
let username = "username_example"; // String | 
let password = "password_example"; // String | 
let opts = {
  'grantType': "grantType_example", // String | 
  'scope': "''", // String | 
  'clientId': "clientId_example", // String | 
  'clientSecret': "clientSecret_example" // String | 
};
apiInstance.authJwtLoginAuthJwtLoginPost(username, password, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **username** | **String**|  | 
 **password** | **String**|  | 
 **grantType** | **String**|  | [optional] 
 **scope** | **String**|  | [optional] [default to &#39;&#39;]
 **clientId** | **String**|  | [optional] 
 **clientSecret** | **String**|  | [optional] 

### Return type

[**BearerResponse**](BearerResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/x-www-form-urlencoded
- **Accept**: application/json


## authJwtLogoutAuthJwtLogoutPost

> Object authJwtLogoutAuthJwtLogoutPost()

Auth:Jwt.Logout

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.AuthApi();
apiInstance.authJwtLogoutAuthJwtLogoutPost((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## registerRegisterAuthRegisterPost

> UserRead registerRegisterAuthRegisterPost(userCreate)

Register:Register

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.AuthApi();
let userCreate = new UltraStarWingman.UserCreate(); // UserCreate | 
apiInstance.registerRegisterAuthRegisterPost(userCreate, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userCreate** | [**UserCreate**](UserCreate.md)|  | 

### Return type

[**UserRead**](UserRead.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## resetForgotPasswordAuthForgotPasswordPost

> Object resetForgotPasswordAuthForgotPasswordPost(bodyResetForgotPasswordAuthForgotPasswordPost)

Reset:Forgot Password

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.AuthApi();
let bodyResetForgotPasswordAuthForgotPasswordPost = new UltraStarWingman.BodyResetForgotPasswordAuthForgotPasswordPost(); // BodyResetForgotPasswordAuthForgotPasswordPost | 
apiInstance.resetForgotPasswordAuthForgotPasswordPost(bodyResetForgotPasswordAuthForgotPasswordPost, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bodyResetForgotPasswordAuthForgotPasswordPost** | [**BodyResetForgotPasswordAuthForgotPasswordPost**](BodyResetForgotPasswordAuthForgotPasswordPost.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## resetResetPasswordAuthResetPasswordPost

> Object resetResetPasswordAuthResetPasswordPost(bodyResetResetPasswordAuthResetPasswordPost)

Reset:Reset Password

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.AuthApi();
let bodyResetResetPasswordAuthResetPasswordPost = new UltraStarWingman.BodyResetResetPasswordAuthResetPasswordPost(); // BodyResetResetPasswordAuthResetPasswordPost | 
apiInstance.resetResetPasswordAuthResetPasswordPost(bodyResetResetPasswordAuthResetPasswordPost, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bodyResetResetPasswordAuthResetPasswordPost** | [**BodyResetResetPasswordAuthResetPasswordPost**](BodyResetResetPasswordAuthResetPasswordPost.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## verifyRequestTokenAuthRequestVerifyTokenPost

> Object verifyRequestTokenAuthRequestVerifyTokenPost(bodyVerifyRequestTokenAuthRequestVerifyTokenPost)

Verify:Request-Token

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.AuthApi();
let bodyVerifyRequestTokenAuthRequestVerifyTokenPost = new UltraStarWingman.BodyVerifyRequestTokenAuthRequestVerifyTokenPost(); // BodyVerifyRequestTokenAuthRequestVerifyTokenPost | 
apiInstance.verifyRequestTokenAuthRequestVerifyTokenPost(bodyVerifyRequestTokenAuthRequestVerifyTokenPost, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bodyVerifyRequestTokenAuthRequestVerifyTokenPost** | [**BodyVerifyRequestTokenAuthRequestVerifyTokenPost**](BodyVerifyRequestTokenAuthRequestVerifyTokenPost.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## verifyVerifyAuthVerifyPost

> UserRead verifyVerifyAuthVerifyPost(bodyVerifyVerifyAuthVerifyPost)

Verify:Verify

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.AuthApi();
let bodyVerifyVerifyAuthVerifyPost = new UltraStarWingman.BodyVerifyVerifyAuthVerifyPost(); // BodyVerifyVerifyAuthVerifyPost | 
apiInstance.verifyVerifyAuthVerifyPost(bodyVerifyVerifyAuthVerifyPost, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bodyVerifyVerifyAuthVerifyPost** | [**BodyVerifyVerifyAuthVerifyPost**](BodyVerifyVerifyAuthVerifyPost.md)|  | 

### Return type

[**UserRead**](UserRead.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

