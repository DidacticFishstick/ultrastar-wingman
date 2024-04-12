# UltraStarWingman.SongsApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**coverApiSongsSongIdCoverGet**](SongsApi.md#coverApiSongsSongIdCoverGet) | **GET** /api/songs/{song_id}/cover | Cover



## coverApiSongsSongIdCoverGet

> Object coverApiSongsSongIdCoverGet(songId)

Cover

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.SongsApi();
let songId = null; // Object | 
apiInstance.coverApiSongsSongIdCoverGet(songId, (error, data, response) => {
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

