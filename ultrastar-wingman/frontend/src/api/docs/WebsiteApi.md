# UltraStarWingman.WebsiteApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**avatarAvatarsAvatarGet**](WebsiteApi.md#avatarAvatarsAvatarGet) | **GET** /avatars/{avatar} | Avatar



## avatarAvatarsAvatarGet

> Object avatarAvatarsAvatarGet(avatar)

Avatar

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.WebsiteApi();
let avatar = null; // Object | 
apiInstance.avatarAvatarsAvatarGet(avatar, (error, data, response) => {
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
 **avatar** | [**Object**](.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

