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
 * The RegisteredPlayerModel model module.
 * @module model/RegisteredPlayerModel
 * @version 1.1.0
 */
class RegisteredPlayerModel {
    /**
     * Constructs a new <code>RegisteredPlayerModel</code>.
     * @alias module:model/RegisteredPlayerModel
     */
    constructor() { 
        
        RegisteredPlayerModel.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>RegisteredPlayerModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RegisteredPlayerModel} obj Optional instance to populate.
     * @return {module:model/RegisteredPlayerModel} The populated <code>RegisteredPlayerModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RegisteredPlayerModel();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('access_level')) {
                obj['access_level'] = ApiClient.convertToType(data['access_level'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>RegisteredPlayerModel</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>RegisteredPlayerModel</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }

        return true;
    }


}



/**
 * The id for the player.
 * @member {String} id
 */
RegisteredPlayerModel.prototype['id'] = undefined;

/**
 * The name of the player.
 * @member {String} name
 */
RegisteredPlayerModel.prototype['name'] = undefined;

/**
 * The access level for the player.
 * @member {Number} access_level
 */
RegisteredPlayerModel.prototype['access_level'] = undefined;






export default RegisteredPlayerModel;

