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
 * The SingModel model module.
 * @module model/SingModel
 * @version 1.1.0
 */
class SingModel {
    /**
     * Constructs a new <code>SingModel</code>.
     * @alias module:model/SingModel
     */
    constructor() { 
        
        SingModel.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>SingModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SingModel} obj Optional instance to populate.
     * @return {module:model/SingModel} The populated <code>SingModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SingModel();

            if (data.hasOwnProperty('force')) {
                obj['force'] = ApiClient.convertToType(data['force'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>SingModel</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>SingModel</code>.
     */
    static validateJSON(data) {

        return true;
    }


}



/**
 * Force a song change if another song is currently playing.
 * @member {Boolean} force
 * @default false
 */
SingModel.prototype['force'] = false;






export default SingModel;
