# UltraStarWingman.UltraStarDeluxeApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUsdxRestartApiUsdxRestartPost**](UltraStarDeluxeApi.md#apiUsdxRestartApiUsdxRestartPost) | **POST** /api/usdx/restart | Restarts UltraStar Deluxe



## apiUsdxRestartApiUsdxRestartPost

> BasicResponse apiUsdxRestartApiUsdxRestartPost()

Restarts UltraStar Deluxe

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.UltraStarDeluxeApi();
apiInstance.apiUsdxRestartApiUsdxRestartPost((error, data, response) => {
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

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

