/**
 * UltraStar Wingman
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import BasicResponse from '../model/BasicResponse';
import HTTPValidationError from '../model/HTTPValidationError';
import PlayerConfig from '../model/PlayerConfig';
import PlayerCreation from '../model/PlayerCreation';
import PlayerList from '../model/PlayerList';

/**
* Players service.
* @module api/PlayersApi
* @version 1.1.0
*/
export default class PlayersApi {

    /**
    * Constructs a new PlayersApi. 
    * @alias module:api/PlayersApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet operation.
     * @callback module:api/PlayersApi~apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Api Get Default Avatar
     * The default avatars (cat pictures)  :param color: The color
     * @param {Object} color 
     * @param {module:api/PlayersApi~apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet(color, callback) {
      let postBody = null;
      // verify the required parameter 'color' is set
      if (color === undefined || color === null) {
        throw new Error("Missing the required parameter 'color' when calling apiGetDefaultAvatarApiPlayersAvatarsDefaultColorGet");
      }

      let pathParams = {
        'color': color
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/api/players/avatars/default/{color}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet operation.
     * @callback module:api/PlayersApi~apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Api Get Player Avatar
     * The avatar for the given player  :param player: The player name
     * @param {Object} player 
     * @param {module:api/PlayersApi~apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet(player, callback) {
      let postBody = null;
      // verify the required parameter 'player' is set
      if (player === undefined || player === null) {
        throw new Error("Missing the required parameter 'player' when calling apiGetPlayerAvatarApiPlayersRegisteredPlayerAvatarGet");
      }

      let pathParams = {
        'player': player
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Object;
      return this.apiClient.callApi(
        '/api/players/registered/{player}/avatar', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiPlayersAddApiPlayersPost operation.
     * @callback module:api/PlayersApi~apiPlayersAddApiPlayersPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PlayerList} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a New Player
     * Adds a new player name to the list.  - **name**: The name of the player to add. It is taken from the form data.  This endpoint writes the new player's name to the players file, appending it to the end. If the operation is successful, it returns a success message. Otherwise, it raises an HTTPException.
     * @param {module:model/PlayerCreation} playerCreation 
     * @param {module:api/PlayersApi~apiPlayersAddApiPlayersPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PlayerList}
     */
    apiPlayersAddApiPlayersPost(playerCreation, callback) {
      let postBody = playerCreation;
      // verify the required parameter 'playerCreation' is set
      if (playerCreation === undefined || playerCreation === null) {
        throw new Error("Missing the required parameter 'playerCreation' when calling apiPlayersAddApiPlayersPost");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = PlayerList;
      return this.apiClient.callApi(
        '/api/players', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiPlayersApiPlayersGet operation.
     * @callback module:api/PlayersApi~apiPlayersApiPlayersGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PlayerConfig} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve Players
     * Retrieves a list of all unique player names and the available colors.
     * @param {module:api/PlayersApi~apiPlayersApiPlayersGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PlayerConfig}
     */
    apiPlayersApiPlayersGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = PlayerConfig;
      return this.apiClient.callApi(
        '/api/players', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiPlayersDeleteApiPlayersDelete operation.
     * @callback module:api/PlayersApi~apiPlayersDeleteApiPlayersDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BasicResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a Player
     * Deletes a player name from the list.  - **name**: The name of the player to delete.  This endpoint reads all player names, filters out the specified name, and rewrites the file without it. If the operation is successful, it returns a success message.
     * @param {String} name The name of the player to delete.
     * @param {module:api/PlayersApi~apiPlayersDeleteApiPlayersDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BasicResponse}
     */
    apiPlayersDeleteApiPlayersDelete(name, callback) {
      let postBody = null;
      // verify the required parameter 'name' is set
      if (name === undefined || name === null) {
        throw new Error("Missing the required parameter 'name' when calling apiPlayersDeleteApiPlayersDelete");
      }

      let pathParams = {
      };
      let queryParams = {
        'name': name
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = BasicResponse;
      return this.apiClient.callApi(
        '/api/players', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
