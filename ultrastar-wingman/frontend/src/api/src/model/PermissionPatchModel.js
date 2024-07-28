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
 * The PermissionPatchModel model module.
 * @module model/PermissionPatchModel
 * @version 1.1.0
 */
class PermissionPatchModel {
    /**
     * Constructs a new <code>PermissionPatchModel</code>.
     * @alias module:model/PermissionPatchModel
     */
    constructor() { 
        
        PermissionPatchModel.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>PermissionPatchModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PermissionPatchModel} obj Optional instance to populate.
     * @return {module:model/PermissionPatchModel} The populated <code>PermissionPatchModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PermissionPatchModel();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('min_access_level')) {
                obj['min_access_level'] = ApiClient.convertToType(data['min_access_level'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>PermissionPatchModel</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>PermissionPatchModel</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }

        return true;
    }


}



/**
 * The id for the permission.
 * @member {String} id
 */
PermissionPatchModel.prototype['id'] = undefined;

/**
 * The minimum access level for the permission.
 * @member {Number} min_access_level
 */
PermissionPatchModel.prototype['min_access_level'] = undefined;






export default PermissionPatchModel;

