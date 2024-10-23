# UltraStarWingman.SpotifyApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiSpotifyAuthorizeApiSpotifyAuthorizePost**](SpotifyApi.md#apiSpotifyAuthorizeApiSpotifyAuthorizePost) | **POST** /api/spotify/authorize | Sets the code for Spotify to get the token
[**apiSpotifyAuthorizeApiSpotifyAuthorizeUrlGet**](SpotifyApi.md#apiSpotifyAuthorizeApiSpotifyAuthorizeUrlGet) | **GET** /api/spotify/authorize_url | Gets the url to access for the authorization code
[**apiSpotifyLogoutApiSpotifyLogoutPost**](SpotifyApi.md#apiSpotifyLogoutApiSpotifyLogoutPost) | **POST** /api/spotify/logout | Logs out from Spotify, nothing happens if not logged in
[**apiSpotifyMeApiSpotifyMeGet**](SpotifyApi.md#apiSpotifyMeApiSpotifyMeGet) | **GET** /api/spotify/me | Information about the connected account



## apiSpotifyAuthorizeApiSpotifyAuthorizePost

> SpotifyMe apiSpotifyAuthorizeApiSpotifyAuthorizePost(spotifyAuthorize)

Sets the code for Spotify to get the token

Sets the code for Spotify to get the token

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.SpotifyApi();
let spotifyAuthorize = new UltraStarWingman.SpotifyAuthorize(); // SpotifyAuthorize | 
apiInstance.apiSpotifyAuthorizeApiSpotifyAuthorizePost(spotifyAuthorize, (error, data, response) => {
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
 **spotifyAuthorize** | [**SpotifyAuthorize**](SpotifyAuthorize.md)|  | 

### Return type

[**SpotifyMe**](SpotifyMe.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiSpotifyAuthorizeApiSpotifyAuthorizeUrlGet

> SpotifyAuthorizeUrl apiSpotifyAuthorizeApiSpotifyAuthorizeUrlGet()

Gets the url to access for the authorization code

Gets the url to access for the authorization code

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.SpotifyApi();
apiInstance.apiSpotifyAuthorizeApiSpotifyAuthorizeUrlGet((error, data, response) => {
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

[**SpotifyAuthorizeUrl**](SpotifyAuthorizeUrl.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiSpotifyLogoutApiSpotifyLogoutPost

> apiSpotifyLogoutApiSpotifyLogoutPost()

Logs out from Spotify, nothing happens if not logged in

Logs out from Spotify, nothing happens if not logged in

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.SpotifyApi();
apiInstance.apiSpotifyLogoutApiSpotifyLogoutPost((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## apiSpotifyMeApiSpotifyMeGet

> SpotifyMe apiSpotifyMeApiSpotifyMeGet()

Information about the connected account

Information about the connected account

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.SpotifyApi();
apiInstance.apiSpotifyMeApiSpotifyMeGet((error, data, response) => {
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

[**SpotifyMe**](SpotifyMe.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

