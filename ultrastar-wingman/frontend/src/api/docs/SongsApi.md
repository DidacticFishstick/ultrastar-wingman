# UltraStarWingman.SongsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiCoverApiSongsSongIdCoverGet**](SongsApi.md#apiCoverApiSongsSongIdCoverGet) | **GET** /api/songs/{song_id}/cover | Api Cover
[**apiMp3ApiSongsSongIdMp3Get**](SongsApi.md#apiMp3ApiSongsSongIdMp3Get) | **GET** /api/songs/{song_id}/mp3 | Api Mp3
[**apiSingSongApiSongsSongIdSingPost**](SongsApi.md#apiSingSongApiSongsSongIdSingPost) | **POST** /api/songs/{song_id}/sing | Starts UltraStar Deluxe and loads the song
[**apiSongsApiSongsGet**](SongsApi.md#apiSongsApiSongsGet) | **GET** /api/songs | Retrieve all downloaded songs



## apiCoverApiSongsSongIdCoverGet

> Object apiCoverApiSongsSongIdCoverGet(songId)

Api Cover

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.SongsApi();
let songId = null; // Object | 
apiInstance.apiCoverApiSongsSongIdCoverGet(songId, (error, data, response) => {
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
 **songId** | [**Object**](.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiMp3ApiSongsSongIdMp3Get

> Object apiMp3ApiSongsSongIdMp3Get(songId)

Api Mp3

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.SongsApi();
let songId = null; // Object | 
apiInstance.apiMp3ApiSongsSongIdMp3Get(songId, (error, data, response) => {
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
 **songId** | [**Object**](.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiSingSongApiSongsSongIdSingPost

> BasicResponse apiSingSongApiSongsSongIdSingPost(songId, singModel)

Starts UltraStar Deluxe and loads the song

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.SongsApi();
let songId = null; // Object | 
let singModel = new UltraStarWingman.SingModel(); // SingModel | 
apiInstance.apiSingSongApiSongsSongIdSingPost(songId, singModel, (error, data, response) => {
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
 **songId** | [**Object**](.md)|  | 
 **singModel** | [**SingModel**](SingModel.md)|  | 

### Return type

[**BasicResponse**](BasicResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiSongsApiSongsGet

> SongsResponse apiSongsApiSongsGet()

Retrieve all downloaded songs

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.SongsApi();
apiInstance.apiSongsApiSongsGet((error, data, response) => {
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

[**SongsResponse**](SongsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

