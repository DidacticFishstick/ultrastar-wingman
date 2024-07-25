# UltraStarWingman.UltraStarDeluxeApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUsdxKillApiUsdxKillPost**](UltraStarDeluxeApi.md#apiUsdxKillApiUsdxKillPost) | **POST** /api/usdx/kill | Kills any currently running Ultrastar Deluxe process



## apiUsdxKillApiUsdxKillPost

> BasicResponse apiUsdxKillApiUsdxKillPost()

Kills any currently running Ultrastar Deluxe process

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.UltraStarDeluxeApi();
apiInstance.apiUsdxKillApiUsdxKillPost((error, data, response) => {
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

[**BasicResponse**](BasicResponse.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

