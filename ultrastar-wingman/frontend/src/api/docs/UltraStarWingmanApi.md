# UltraStarWingman.UltraStarWingmanApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUwStateApiUwStateGet**](UltraStarWingmanApi.md#apiUwStateApiUwStateGet) | **GET** /api/uw/state | The state of Ultrastar Wingman - new available version etc.



## apiUwStateApiUwStateGet

> UltrastarWingmanState apiUwStateApiUwStateGet()

The state of Ultrastar Wingman - new available version etc.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.UltraStarWingmanApi();
apiInstance.apiUwStateApiUwStateGet((error, data, response) => {
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

[**UltrastarWingmanState**](UltrastarWingmanState.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

