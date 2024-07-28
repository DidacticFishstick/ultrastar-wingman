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
 * The RegisteredPlayerPatchModel model module.
 * @module model/RegisteredPlayerPatchModel
 * @version 1.1.0
 */
class RegisteredPlayerPatchModel {
    /**
     * Constructs a new <code>RegisteredPlayerPatchModel</code>.
     * @alias module:model/RegisteredPlayerPatchModel
     */
    constructor() { 
        
        RegisteredPlayerPatchModel.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>RegisteredPlayerPatchModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RegisteredPlayerPatchModel} obj Optional instance to populate.
     * @return {module:model/RegisteredPlayerPatchModel} The populated <code>RegisteredPlayerPatchModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RegisteredPlayerPatchModel();

            if (data.hasOwnProperty('access_level')) {
                obj['access_level'] = ApiClient.convertToType(data['access_level'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>RegisteredPlayerPatchModel</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>RegisteredPlayerPatchModel</code>.
     */
    static validateJSON(data) {

        return true;
    }


}



/**
 * The access level for the player.
 * @member {Number} access_level
 */
RegisteredPlayerPatchModel.prototype['access_level'] = undefined;






export default RegisteredPlayerPatchModel;
