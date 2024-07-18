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
import AddToWishListModel from '../model/AddToWishListModel';
import BasicResponse from '../model/BasicResponse';
import HTTPValidationError from '../model/HTTPValidationError';
import WishlistModel from '../model/WishlistModel';

/**
* Wishlist service.
* @module api/WishlistApi
* @version 1.1.0
*/
export default class WishlistApi {

    /**
    * Constructs a new WishlistApi. 
    * @alias module:api/WishlistApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the apiWishlistClientDeleteApiWishlistClientDelete operation.
     * @callback module:api/WishlistApi~apiWishlistClientDeleteApiWishlistClientDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BasicResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a song from the wishlist
     * Deletes a song form the clients wishlist.  :param request: The request used to determine the client :param song_id: The id of the song to delete.
     * @param {String} songId The id of the song to delete.
     * @param {module:api/WishlistApi~apiWishlistClientDeleteApiWishlistClientDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BasicResponse}
     */
    apiWishlistClientDeleteApiWishlistClientDelete(songId, callback) {
      let postBody = null;
      // verify the required parameter 'songId' is set
      if (songId === undefined || songId === null) {
        throw new Error("Missing the required parameter 'songId' when calling apiWishlistClientDeleteApiWishlistClientDelete");
      }

      let pathParams = {
      };
      let queryParams = {
        'song_id': songId
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
        '/api/wishlist/client', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiWishlistClientGetApiWishlistClientGet operation.
     * @callback module:api/WishlistApi~apiWishlistClientGetApiWishlistClientGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/WishlistModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get the clients wishlist
     * Gets the songs on the wishlist for the current client.  :param request: The request used to determine the client
     * @param {module:api/WishlistApi~apiWishlistClientGetApiWishlistClientGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/WishlistModel}
     */
    apiWishlistClientGetApiWishlistClientGet(callback) {
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
      let returnType = WishlistModel;
      return this.apiClient.callApi(
        '/api/wishlist/client', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiWishlistClientPostApiWishlistClientPost operation.
     * @callback module:api/WishlistApi~apiWishlistClientPostApiWishlistClientPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/BasicResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Adds the given song_id to the wishlist of the client
     * Adds a new player name to the list.  :param request: The request used to determine the client :param add_to_wishlist: The information what to add to the wishlist
     * @param {module:model/AddToWishListModel} addToWishListModel 
     * @param {module:api/WishlistApi~apiWishlistClientPostApiWishlistClientPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/BasicResponse}
     */
    apiWishlistClientPostApiWishlistClientPost(addToWishListModel, callback) {
      let postBody = addToWishListModel;
      // verify the required parameter 'addToWishListModel' is set
      if (addToWishListModel === undefined || addToWishListModel === null) {
        throw new Error("Missing the required parameter 'addToWishListModel' when calling apiWishlistClientPostApiWishlistClientPost");
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
      let returnType = BasicResponse;
      return this.apiClient.callApi(
        '/api/wishlist/client', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the apiWishlistGlobalGetApiWishlistGlobalGet operation.
     * @callback module:api/WishlistApi~apiWishlistGlobalGetApiWishlistGlobalGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/WishlistModel} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get the global wishlist with the wishes for all players
     * Gets all the data for the specified session id.
     * @param {module:api/WishlistApi~apiWishlistGlobalGetApiWishlistGlobalGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/WishlistModel}
     */
    apiWishlistGlobalGetApiWishlistGlobalGet(callback) {
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
      let returnType = WishlistModel;
      return this.apiClient.callApi(
        '/api/wishlist/global', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
