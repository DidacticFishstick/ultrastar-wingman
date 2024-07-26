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

import ApiClient from '../ApiClient';

/**
 * The BearerResponse model module.
 * @module model/BearerResponse
 * @version 1.1.0
 */
class BearerResponse {
    /**
     * Constructs a new <code>BearerResponse</code>.
     * @alias module:model/BearerResponse
     * @param accessToken {String} 
     * @param tokenType {String} 
     */
    constructor(accessToken, tokenType) { 
        
        BearerResponse.initialize(this, accessToken, tokenType);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, accessToken, tokenType) { 
        obj['access_token'] = accessToken;
        obj['token_type'] = tokenType;
    }

    /**
     * Constructs a <code>BearerResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/BearerResponse} obj Optional instance to populate.
     * @return {module:model/BearerResponse} The populated <code>BearerResponse</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new BearerResponse();

            if (data.hasOwnProperty('access_token')) {
                obj['access_token'] = ApiClient.convertToType(data['access_token'], 'String');
            }
            if (data.hasOwnProperty('token_type')) {
                obj['token_type'] = ApiClient.convertToType(data['token_type'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>BearerResponse</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>BearerResponse</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of BearerResponse.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['access_token'] && !(typeof data['access_token'] === 'string' || data['access_token'] instanceof String)) {
            throw new Error("Expected the field `access_token` to be a primitive type in the JSON string but got " + data['access_token']);
        }
        // ensure the json data is a string
        if (data['token_type'] && !(typeof data['token_type'] === 'string' || data['token_type'] instanceof String)) {
            throw new Error("Expected the field `token_type` to be a primitive type in the JSON string but got " + data['token_type']);
        }

        return true;
    }


}

BearerResponse.RequiredProperties = ["access_token", "token_type"];

/**
 * @member {String} access_token
 */
BearerResponse.prototype['access_token'] = undefined;

/**
 * @member {String} token_type
 */
BearerResponse.prototype['token_type'] = undefined;






export default BearerResponse;
