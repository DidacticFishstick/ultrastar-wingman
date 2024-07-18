# UltraStarWingman.UltraStarDeluxeApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUsdxKillApiUsdxKillPost**](UltraStarDeluxeApi.md#apiUsdxKillApiUsdxKillPost) | **POST** /api/usdx/kill | Kills any currently running Ultrastar Deluxe process
[**apiUsdxRestartApiUsdxRestartPost**](UltraStarDeluxeApi.md#apiUsdxRestartApiUsdxRestartPost) | **POST** /api/usdx/restart | Restarts UltraStar Deluxe without any parameters
[**apiUsdxStartApiUsdxStartPost**](UltraStarDeluxeApi.md#apiUsdxStartApiUsdxStartPost) | **POST** /api/usdx/start | Starts UltraStar Deluxe without any parameters



## apiUsdxKillApiUsdxKillPost

> BasicResponse apiUsdxKillApiUsdxKillPost()

Kills any currently running Ultrastar Deluxe process

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

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

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsdxRestartApiUsdxRestartPost

> BasicResponse apiUsdxRestartApiUsdxRestartPost()

Restarts UltraStar Deluxe without any parameters

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


## apiUsdxStartApiUsdxStartPost

> BasicResponse apiUsdxStartApiUsdxStartPost()

Starts UltraStar Deluxe without any parameters

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.UltraStarDeluxeApi();
apiInstance.apiUsdxStartApiUsdxStartPost((error, data, response) => {
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

