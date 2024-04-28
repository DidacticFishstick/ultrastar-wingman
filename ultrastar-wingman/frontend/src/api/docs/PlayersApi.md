# UltraStarWingman.PlayersApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**apiPlayersAddApiPlayersPost**](PlayersApi.md#apiPlayersAddApiPlayersPost) | **POST** /api/players | Add a New Player
[**apiPlayersApiPlayersGet**](PlayersApi.md#apiPlayersApiPlayersGet) | **GET** /api/players | Retrieve Players
[**apiPlayersSubmitApiPlayersSubmitPost**](PlayersApi.md#apiPlayersSubmitApiPlayersSubmitPost) | **POST** /api/players/submit | Submit Player Names
[**deleteNameApiPlayersDelete**](PlayersApi.md#deleteNameApiPlayersDelete) | **DELETE** /api/players | Delete a Player



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


## apiPlayersSubmitApiPlayersSubmitPost

> BasicResponse apiPlayersSubmitApiPlayersSubmitPost(playerList)

Submit Player Names

Submits a list of player names.  - **names**: A list of names to be submitted.  Accepts a list of names in the request body and submits them.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.PlayersApi();
let playerList = new UltraStarWingman.PlayerList(); // PlayerList | 
apiInstance.apiPlayersSubmitApiPlayersSubmitPost(playerList, (error, data, response) => {
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
 **playerList** | [**PlayerList**](PlayerList.md)|  | 

### Return type

[**BasicResponse**](BasicResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteNameApiPlayersDelete

> BasicResponse deleteNameApiPlayersDelete(name)

Delete a Player

Deletes a player name from the list.  - **name**: The name of the player to delete.  This endpoint reads all player names, filters out the specified name, and rewrites the file without it. If the operation is successful, it returns a success message.

### Example

```javascript
import UltraStarWingman from 'ultra_star_wingman';

let apiInstance = new UltraStarWingman.PlayersApi();
let name = "name_example"; // String | The name of the player to delete.
apiInstance.deleteNameApiPlayersDelete(name, (error, data, response) => {
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

