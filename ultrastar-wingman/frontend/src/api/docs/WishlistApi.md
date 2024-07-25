# UltraStarWingman.WishlistApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiWishlistClientDeleteApiWishlistClientDelete**](WishlistApi.md#apiWishlistClientDeleteApiWishlistClientDelete) | **DELETE** /api/wishlist/client | Delete a song from the wishlist
[**apiWishlistClientGetApiWishlistClientGet**](WishlistApi.md#apiWishlistClientGetApiWishlistClientGet) | **GET** /api/wishlist/client | Get the clients wishlist
[**apiWishlistClientPostApiWishlistClientPost**](WishlistApi.md#apiWishlistClientPostApiWishlistClientPost) | **POST** /api/wishlist/client | Adds the given song_id to the wishlist of the client
[**apiWishlistGlobalGetApiWishlistGlobalGet**](WishlistApi.md#apiWishlistGlobalGetApiWishlistGlobalGet) | **GET** /api/wishlist/global | Get the global wishlist with the wishes for all players



## apiWishlistClientDeleteApiWishlistClientDelete

> BasicResponse apiWishlistClientDeleteApiWishlistClientDelete(songId)

Delete a song from the wishlist

Deletes a song form the clients wishlist.  :param request: The request used to determine the client :param song_id: The id of the song to delete.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.WishlistApi();
let songId = "songId_example"; // String | The id of the song to delete.
apiInstance.apiWishlistClientDeleteApiWishlistClientDelete(songId, (error, data, response) => {
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
 **songId** | **String**| The id of the song to delete. | 

### Return type

[**BasicResponse**](BasicResponse.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiWishlistClientGetApiWishlistClientGet

> WishlistModel apiWishlistClientGetApiWishlistClientGet()

Get the clients wishlist

Gets the songs on the wishlist for the current client.  :param request: The request used to determine the client

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.WishlistApi();
apiInstance.apiWishlistClientGetApiWishlistClientGet((error, data, response) => {
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

[**WishlistModel**](WishlistModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiWishlistClientPostApiWishlistClientPost

> BasicResponse apiWishlistClientPostApiWishlistClientPost(addToWishListModel)

Adds the given song_id to the wishlist of the client

Adds a song to the list.  :param request: The request used to determine the client :param add_to_wishlist: The information what to add to the wishlist

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.WishlistApi();
let addToWishListModel = new UltraStarWingman.AddToWishListModel(); // AddToWishListModel | 
apiInstance.apiWishlistClientPostApiWishlistClientPost(addToWishListModel, (error, data, response) => {
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
 **addToWishListModel** | [**AddToWishListModel**](AddToWishListModel.md)|  | 

### Return type

[**BasicResponse**](BasicResponse.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiWishlistGlobalGetApiWishlistGlobalGet

> WishlistModel apiWishlistGlobalGetApiWishlistGlobalGet()

Get the global wishlist with the wishes for all players

Gets the global wishlist.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.WishlistApi();
apiInstance.apiWishlistGlobalGetApiWishlistGlobalGet((error, data, response) => {
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

[**WishlistModel**](WishlistModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

