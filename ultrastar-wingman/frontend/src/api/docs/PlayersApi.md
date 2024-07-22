# UltraStarWingman.PlayersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet**](PlayersApi.md#apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet) | **GET** /api/players/avatars/default/{color} | Api Get Default Avatar
[**apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet**](PlayersApi.md#apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet) | **GET** /api/players/registered/{player}/avatar | Api Get Player Avatar
[**apiPlayersAddApiPlayersPost**](PlayersApi.md#apiPlayersAddApiPlayersPost) | **POST** /api/players | Add a New Player
[**apiPlayersApiPlayersGet**](PlayersApi.md#apiPlayersApiPlayersGet) | **GET** /api/players | Retrieve Players
[**apiPlayersDeleteApiPlayersDelete**](PlayersApi.md#apiPlayersDeleteApiPlayersDelete) | **DELETE** /api/players | Delete a Player



## apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet

> Object apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet(color)

Api Get Default Avatar

The default avatars (cat pictures)  :param color: The color

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

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

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet

> Object apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet(player)

Api Get Player Avatar

The avatar for the given player  :param player: The player name

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

> PlayerList apiPlayersAddApiPlayersPost(playerCreation)

Add a New Player

Adds a new player name to the list.  - **name**: The name of the player to add. It is taken from the form data.  This endpoint writes the new player&#39;s name to the players file, appending it to the end. If the operation is successful, it returns a success message. Otherwise, it raises an HTTPException.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

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

[**PlayerList**](PlayerList.md)

### Authorization

No authorization required

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

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## apiPlayersDeleteApiPlayersDelete

> BasicResponse apiPlayersDeleteApiPlayersDelete(name)

Delete a Player

Deletes a player name from the list.  - **name**: The name of the player to delete.  This endpoint reads all player names, filters out the specified name, and rewrites the file without it. If the operation is successful, it returns a success message.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.PlayersApi();
let name = "name_example"; // String | The name of the player to delete.
apiInstance.apiPlayersDeleteApiPlayersDelete(name, (error, data, response) => {
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
 **name** | **String**| The name of the player to delete. | 

### Return type

[**BasicResponse**](BasicResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

