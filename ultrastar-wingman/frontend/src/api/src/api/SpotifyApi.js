/**
 * UltraStar Wingman
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import HTTPValidationError from '../model/HTTPValidationError';
import SpotifyAuthorize from '../model/SpotifyAuthorize';
import SpotifyAuthorizeUrl from '../model/SpotifyAuthorizeUrl';
import SpotifyMe from '../model/SpotifyMe';
import SpotifyPlaylistItems from '../model/SpotifyPlaylistItems';
import SpotifyPlaylists from '../model/SpotifyPlaylists';

/**
* Spotify service.
* @module api/SpotifyApi
* @version 2.0.0
*/
export default class SpotifyApi {

    /**
    * Constructs a new SpotifyApi. 
    * @alias module:api/SpotifyApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the apiSpotifyAuthorizeApiSpotifyAuthorizePost operation.
     * @callback module:api/SpotifyApi~apiSpotifyAuthorizeApiSpotifyAuthorizePostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SpotifyMe} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Sets the code for Spotify to get the token
     * Sets the code for Spotify to get the token
     * @param {module:model/SpotifyAuthorize} spotifyAuthorize 
     * @param {module:api/SpotifyApi~apiSpotifyAuthorizeApiSpotifyAuthorizePostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SpotifyMe}
     */
    apiSpotifyAuthorizeApiSpotifyAuthorizePost(spotifyAuthorize, callback) {
      let postBody = spotifyAuthorize;
      // verify the required parameter 'spotifyAuthorize' is set
      if (spotifyAuthorize === undefined || spotifyAuthorize === null) {
        throw new Error("Missing the required parameter 'spotifyAuthorize' when calling apiSpotifyAuthorizeApiSpotifyAuthorizePost");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['OAuth2PasswordBearer'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = SpotifyMe;
      return this.apiClient.callApi(
        '/api/spotify/authorize', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiSpotifyAuthorizeApiSpotifyAuthorizeUrlGet operation.
     * @callback module:api/SpotifyApi~apiSpotifyAuthorizeApiSpotifyAuthorizeUrlGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SpotifyAuthorizeUrl} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Gets the url to access for the authorization code
     * Gets the url to access for the authorization code
     * @param {module:api/SpotifyApi~apiSpotifyAuthorizeApiSpotifyAuthorizeUrlGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SpotifyAuthorizeUrl}
     */
    apiSpotifyAuthorizeApiSpotifyAuthorizeUrlGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['OAuth2PasswordBearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = SpotifyAuthorizeUrl;
      return this.apiClient.callApi(
        '/api/spotify/authorize_url', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiSpotifyLogoutApiSpotifyLogoutPost operation.
     * @callback module:api/SpotifyApi~apiSpotifyLogoutApiSpotifyLogoutPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Logs out from Spotify, nothing happens if not logged in
     * Logs out from Spotify, nothing happens if not logged in
     * @param {module:api/SpotifyApi~apiSpotifyLogoutApiSpotifyLogoutPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    apiSpotifyLogoutApiSpotifyLogoutPost(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['OAuth2PasswordBearer'];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;
      return this.apiClient.callApi(
        '/api/spotify/logout', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiSpotifyMeApiSpotifyMeGet operation.
     * @callback module:api/SpotifyApi~apiSpotifyMeApiSpotifyMeGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SpotifyMe} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Information about the connected account
     * Information about the connected account
     * @param {module:api/SpotifyApi~apiSpotifyMeApiSpotifyMeGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SpotifyMe}
     */
    apiSpotifyMeApiSpotifyMeGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['OAuth2PasswordBearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = SpotifyMe;
      return this.apiClient.callApi(
        '/api/spotify/me', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiSpotifyPlaylistsApiSpotifyPlaylistsGet operation.
     * @callback module:api/SpotifyApi~apiSpotifyPlaylistsApiSpotifyPlaylistsGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SpotifyPlaylists} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * All saved Spotify playlists
     * All saved Spotify playlists
     * @param {module:api/SpotifyApi~apiSpotifyPlaylistsApiSpotifyPlaylistsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SpotifyPlaylists}
     */
    apiSpotifyPlaylistsApiSpotifyPlaylistsGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['OAuth2PasswordBearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = SpotifyPlaylists;
      return this.apiClient.callApi(
        '/api/spotify/playlists', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiSpotifyPlaylistsItemsApiSpotifyPlaylistsPlaylistIdGet operation.
     * @callback module:api/SpotifyApi~apiSpotifyPlaylistsItemsApiSpotifyPlaylistsPlaylistIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SpotifyPlaylistItems} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * The songs in the playlist, use /api/spotify/playlists/saved for the users saved songs
     * The songs in the playlist  If playlist_id is saved, the users saved songs will be used
     * @param {String} playlistId 
     * @param {Object} opts Optional parameters
     * @param {Number} [limit = 50)] 
     * @param {Number} [offset = 0)] 
     * @param {module:api/SpotifyApi~apiSpotifyPlaylistsItemsApiSpotifyPlaylistsPlaylistIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SpotifyPlaylistItems}
     */
    apiSpotifyPlaylistsItemsApiSpotifyPlaylistsPlaylistIdGet(playlistId, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'playlistId' is set
      if (playlistId === undefined || playlistId === null) {
        throw new Error("Missing the required parameter 'playlistId' when calling apiSpotifyPlaylistsItemsApiSpotifyPlaylistsPlaylistIdGet");
      }

      let pathParams = {
        'playlist_id': playlistId
      };
      let queryParams = {
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['OAuth2PasswordBearer'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = SpotifyPlaylistItems;
      return this.apiClient.callApi(
        '/api/spotify/playlists/{playlist_id}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
