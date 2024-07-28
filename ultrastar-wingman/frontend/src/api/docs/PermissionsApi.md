# UltraStarWingman.PermissionsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiPermissionsGetApiPermissionsGet**](PermissionsApi.md#apiPermissionsGetApiPermissionsGet) | **GET** /api/permissions | Get all permissions
[**apiPermissionsPatchApiPermissionsPatch**](PermissionsApi.md#apiPermissionsPatchApiPermissionsPatch) | **PATCH** /api/permissions | Patch data for permissions



## apiPermissionsGetApiPermissionsGet

> PermissionsModel apiPermissionsGetApiPermissionsGet()

Get all permissions

Gets all the permissions.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.PermissionsApi();
apiInstance.apiPermissionsGetApiPermissionsGet((error, data, response) => {
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

[**PermissionsModel**](PermissionsModel.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiPermissionsPatchApiPermissionsPatch

> PermissionsPatchResponseModel apiPermissionsPatchApiPermissionsPatch(permissionsPatchModel)

Patch data for permissions

Patch permissions.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.PermissionsApi();
let permissionsPatchModel = new UltraStarWingman.PermissionsPatchModel(); // PermissionsPatchModel | 
apiInstance.apiPermissionsPatchApiPermissionsPatch(permissionsPatchModel, (error, data, response) => {
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
 **permissionsPatchModel** | [**PermissionsPatchModel**](PermissionsPatchModel.md)|  | 

### Return type

[**PermissionsPatchResponseModel**](PermissionsPatchResponseModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

