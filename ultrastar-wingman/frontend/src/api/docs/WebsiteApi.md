# UltraStarWingman.WebsiteApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**avatarAvatarsAvatarGet**](WebsiteApi.md#avatarAvatarsAvatarGet) | **GET** /avatars/{avatar} | Avatar
[**downloadDownloadGet**](WebsiteApi.md#downloadDownloadGet) | **GET** /download | Download
[**indexGet**](WebsiteApi.md#indexGet) | **GET** / | Index
[**playersPlayersGet**](WebsiteApi.md#playersPlayersGet) | **GET** /players | Players
[**scoresScoresGet**](WebsiteApi.md#scoresScoresGet) | **GET** /scores | Scores
[**songsSongsGet**](WebsiteApi.md#songsSongsGet) | **GET** /songs | Songs



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


## downloadDownloadGet

> String downloadDownloadGet(opts)

Download

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.WebsiteApi();
let opts = {
  'view': "view_example" // String | 
};
apiInstance.downloadDownloadGet(opts, (error, data, response) => {
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
 **view** | **String**|  | [optional] 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html, application/json


## indexGet

> String indexGet()

Index

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.WebsiteApi();
apiInstance.indexGet((error, data, response) => {
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

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## playersPlayersGet

> String playersPlayersGet()

Players

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.WebsiteApi();
apiInstance.playersPlayersGet((error, data, response) => {
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

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## scoresScoresGet

> String scoresScoresGet()

Scores

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.WebsiteApi();
apiInstance.scoresScoresGet((error, data, response) => {
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

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html


## songsSongsGet

> String songsSongsGet()

Songs

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.WebsiteApi();
apiInstance.songsSongsGet((error, data, response) => {
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

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: text/html

