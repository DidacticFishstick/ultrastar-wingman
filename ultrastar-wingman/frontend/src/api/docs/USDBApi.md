# UltraStarWingman.USDBApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiUsdbDownloadApiUsdbDownloadPost**](USDBApi.md#apiUsdbDownloadApiUsdbDownloadPost) | **POST** /api/usdb/download | Downloads the song with the given USDB ID
[**apiUsdbIdsApiUsdbIdsGet**](USDBApi.md#apiUsdbIdsApiUsdbIdsGet) | **GET** /api/usdb/ids | Gets the list of all downloaded USDB IDs
[**apiUsdbSongsApiUsdbSongsGet**](USDBApi.md#apiUsdbSongsApiUsdbSongsGet) | **GET** /api/usdb/songs | Search Songs



## apiUsdbDownloadApiUsdbDownloadPost

> BasicResponse apiUsdbDownloadApiUsdbDownloadPost(usdbId)

Downloads the song with the given USDB ID

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.USDBApi();
let usdbId = new UltraStarWingman.UsdbId(); // UsdbId | 
apiInstance.apiUsdbDownloadApiUsdbDownloadPost(usdbId, (error, data, response) => {
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
 **usdbId** | [**UsdbId**](UsdbId.md)|  | 

### Return type

[**BasicResponse**](BasicResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiUsdbIdsApiUsdbIdsGet

> UsdbIdsList apiUsdbIdsApiUsdbIdsGet()

Gets the list of all downloaded USDB IDs

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.USDBApi();
apiInstance.apiUsdbIdsApiUsdbIdsGet((error, data, response) => {
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

[**UsdbIdsList**](UsdbIdsList.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiUsdbSongsApiUsdbSongsGet

> USDBSongsResponse apiUsdbSongsApiUsdbSongsGet(opts)

Search Songs

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.USDBApi();
let opts = {
  'artist': "artist_example", // String | Filter songs by the artist's name.
  'title': "title_example", // String | Filter songs by title.
  'edition': "edition_example", // String | Filter by the song's edition.
  'language': "language_example", // String | Filter songs by language.
  'genre': "genre_example", // String | Filter songs by genre.
  'order': new UltraStarWingman.OrderEnum(), // OrderEnum | Sort the result by this order criteria.
  'ud': new UltraStarWingman.UdEnum(), // UdEnum | Sort order: ascending (asc) or descending (desc).
  'golden': false, // Boolean | 
  'songcheck': false, // Boolean | 
  'limit': 30, // Number | The number of songs to return per page.
  'page': 1 // Number | Page number for pagination.
};
apiInstance.apiUsdbSongsApiUsdbSongsGet(opts, (error, data, response) => {
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
 **artist** | **String**| Filter songs by the artist&#39;s name. | [optional] 
 **title** | **String**| Filter songs by title. | [optional] 
 **edition** | **String**| Filter by the song&#39;s edition. | [optional] 
 **language** | **String**| Filter songs by language. | [optional] 
 **genre** | **String**| Filter songs by genre. | [optional] 
 **order** | [**OrderEnum**](.md)| Sort the result by this order criteria. | [optional] 
 **ud** | [**UdEnum**](.md)| Sort order: ascending (asc) or descending (desc). | [optional] 
 **golden** | **Boolean**|  | [optional] [default to false]
 **songcheck** | **Boolean**|  | [optional] [default to false]
 **limit** | **Number**| The number of songs to return per page. | [optional] [default to 30]
 **page** | **Number**| Page number for pagination. | [optional] [default to 1]

### Return type

[**USDBSongsResponse**](USDBSongsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

