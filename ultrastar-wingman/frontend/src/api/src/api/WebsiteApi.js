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
import HTTPValidationError from '../model/HTTPValidationError';

/**
* Website service.
* @module api/WebsiteApi
* @version 1.1.0
*/
export default class WebsiteApi {

    /**
    * Constructs a new WebsiteApi. 
    * @alias module:api/WebsiteApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the avatarAvatarsAvatarGet operation.
     * @callback module:api/WebsiteApi~avatarAvatarsAvatarGetCallback
     * @param {String} error Error message, if any.
     * @param {Object} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Avatar
     * @param {Object} avatar 
     * @param {module:api/WebsiteApi~avatarAvatarsAvatarGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Object}
     */
    avatarAvatarsAvatarGet(avatar, callback) {
      let postBody = null;
      // verify the required parameter 'avatar' is set
      if (avatar === undefined || avatar === null) {
        throw new Error("Missing the required parameter 'avatar' when calling avatarAvatarsAvatarGet");
      }

      let pathParams = {
        'avatar': avatar
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
        '/avatars/{avatar}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the downloadDownloadGet operation.
     * @callback module:api/WebsiteApi~downloadDownloadGetCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Download
     * @param {Object} opts Optional parameters
     * @param {String} [view] 
     * @param {module:api/WebsiteApi~downloadDownloadGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    downloadDownloadGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'view': opts['view']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/html', 'application/json'];
      let returnType = 'String';
      return this.apiClient.callApi(
        '/download', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the indexGet operation.
     * @callback module:api/WebsiteApi~indexGetCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Index
     * @param {module:api/WebsiteApi~indexGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    indexGet(callback) {
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
      let accepts = ['text/html'];
      let returnType = 'String';
      return this.apiClient.callApi(
        '/', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the playersPlayersGet operation.
     * @callback module:api/WebsiteApi~playersPlayersGetCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Players
     * @param {module:api/WebsiteApi~playersPlayersGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    playersPlayersGet(callback) {
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
      let accepts = ['text/html'];
      let returnType = 'String';
      return this.apiClient.callApi(
        '/players', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the scoresScoresGet operation.
     * @callback module:api/WebsiteApi~scoresScoresGetCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Scores
     * @param {module:api/WebsiteApi~scoresScoresGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    scoresScoresGet(callback) {
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
      let accepts = ['text/html'];
      let returnType = 'String';
      return this.apiClient.callApi(
        '/scores', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the songsSongsGet operation.
     * @callback module:api/WebsiteApi~songsSongsGetCallback
     * @param {String} error Error message, if any.
     * @param {String} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Songs
     * @param {module:api/WebsiteApi~songsSongsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link String}
     */
    songsSongsGet(callback) {
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
      let accepts = ['text/html'];
      let returnType = 'String';
      return this.apiClient.callApi(
        '/songs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}