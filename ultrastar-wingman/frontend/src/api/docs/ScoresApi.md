# UltraStarWingman.ScoresApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiScoresGetApiScoresGet**](ScoresApi.md#apiScoresGetApiScoresGet) | **GET** /api/scores | Get session scores
[**apiScoresGetApiScoresSessionIdGet**](ScoresApi.md#apiScoresGetApiScoresSessionIdGet) | **GET** /api/scores/{session_id} | Get session scores
[**apiSessionsGetApiSessionsGet**](ScoresApi.md#apiSessionsGetApiSessionsGet) | **GET** /api/sessions | Get all sessions



## apiScoresGetApiScoresGet

> ScoresModel apiScoresGetApiScoresGet(opts)

Get session scores

Gets all the data for the specified session id.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.ScoresApi();
let opts = {
  'sessionId': 56 // Number | 
};
apiInstance.apiScoresGetApiScoresGet(opts, (error, data, response) => {
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
 **sessionId** | **Number**|  | [optional] 

### Return type

[**ScoresModel**](ScoresModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiScoresGetApiScoresSessionIdGet

> ScoresModel apiScoresGetApiScoresSessionIdGet(sessionId)

Get session scores

Gets all the data for the specified session id.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.ScoresApi();
let sessionId = 56; // Number | 
apiInstance.apiScoresGetApiScoresSessionIdGet(sessionId, (error, data, response) => {
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
 **sessionId** | **Number**|  | 

### Return type

[**ScoresModel**](ScoresModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiSessionsGetApiSessionsGet

> SessionsListModel apiSessionsGetApiSessionsGet()

Get all sessions

Gets all the sessions.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.ScoresApi();
apiInstance.apiSessionsGetApiSessionsGet((error, data, response) => {
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

[**SessionsListModel**](SessionsListModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

