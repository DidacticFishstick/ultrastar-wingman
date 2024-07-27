# UltraStarWingman.PlayersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet**](PlayersApi.md#apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet) | **GET** /api/players/avatars/default/{color} | Api Get Default Avatar
[**apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet**](PlayersApi.md#apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet) | **GET** /api/players/registered/{player}/avatar | Api Get Player Avatar
[**apiPlayersAddApiPlayersPost**](PlayersApi.md#apiPlayersAddApiPlayersPost) | **POST** /api/players | Add a New Player
[**apiPlayersApiPlayersGet**](PlayersApi.md#apiPlayersApiPlayersGet) | **GET** /api/players | Retrieve Players
[**apiPlayersDeleteApiPlayersDelete**](PlayersApi.md#apiPlayersDeleteApiPlayersDelete) | **DELETE** /api/players | Delete a Player
[**apiPostPlayerAvatarApiPlayersRegisteredPlayerAvatarPost**](PlayersApi.md#apiPostPlayerAvatarApiPlayersRegisteredPlayerAvatarPost) | **POST** /api/players/registered/{player}/avatar | Upload an avatar for the player



## apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet

> Object apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet(color)

Api Get Default Avatar

The default avatars (cat pictures)  :param color: The color

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.PlayersApi();
let color = null; // Object | 
apiInstance.apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet(color, (error, data, response) => {
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
 **color** | [**Object**](.md)|  | 

### Return type

**Object**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet

> Object apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet(player)

Api Get Player Avatar

The avatar for the given player  :param player: The player id

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.PlayersApi();
let player = null; // Object | 
apiInstance.apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet(player, (error, data, response) => {
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
 **player** | [**Object**](.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiPlayersAddApiPlayersPost

> UnregisteredPlayerModel apiPlayersAddApiPlayersPost(playerCreation)

Add a New Player

Adds a new temporary player name to the list. If the operation is successful, it returns a success message. Otherwise, it raises an HTTPException.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.PlayersApi();
let playerCreation = new UltraStarWingman.PlayerCreation(); // PlayerCreation | 
apiInstance.apiPlayersAddApiPlayersPost(playerCreation, (error, data, response) => {
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
 **playerCreation** | [**PlayerCreation**](PlayerCreation.md)|  | 

### Return type

[**UnregisteredPlayerModel**](UnregisteredPlayerModel.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## apiPlayersApiPlayersGet

> PlayerConfig apiPlayersApiPlayersGet()

Retrieve Players

Retrieves a list of all unique player names and the available colors.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.PlayersApi();
apiInstance.apiPlayersApiPlayersGet((error, data, response) => {
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

[**PlayerConfig**](PlayerConfig.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiPlayersDeleteApiPlayersDelete

> BasicResponse apiPlayersDeleteApiPlayersDelete(id)

Delete a Player

Deletes a player name from the list. If the operation is successful, it returns a success message.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.PlayersApi();
let id = "id_example"; // String | The id of the player to delete.
apiInstance.apiPlayersDeleteApiPlayersDelete(id, (error, data, response) => {
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
 **id** | **String**| The id of the player to delete. | 

### Return type

[**BasicResponse**](BasicResponse.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiPostPlayerAvatarApiPlayersRegisteredPlayerAvatarPost

> BasicResponse apiPostPlayerAvatarApiPlayersRegisteredPlayerAvatarPost(player, file)

Upload an avatar for the player

Sets the avatar for the given player  :param player: The player id :param user: The current user

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';
let defaultClient = UltraStarWingman.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2PasswordBearer
let OAuth2PasswordBearer = defaultClient.authentications['OAuth2PasswordBearer'];
OAuth2PasswordBearer.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new UltraStarWingman.PlayersApi();
let player = null; // Object | 
let file = "/path/to/file"; // File | 
apiInstance.apiPostPlayerAvatarApiPlayersRegisteredPlayerAvatarPost(player, file, (error, data, response) => {
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
 **player** | [**Object**](.md)|  | 
 **file** | **File**|  | 

### Return type

[**BasicResponse**](BasicResponse.md)

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

