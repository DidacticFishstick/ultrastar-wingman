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

import ApiClient from '../ApiClient';

/**
 * The ValidationError model module.
 * @module model/ValidationError
 * @version 2.0.0
 */
class ValidationError {
    /**
     * Constructs a new <code>ValidationError</code>.
     * @alias module:model/ValidationError
     * @param loc {Array.<String>} 
     * @param msg {String} 
     * @param type {String} 
     */
    constructor(loc, msg, type) { 
        
        ValidationError.initialize(this, loc, msg, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, loc, msg, type) { 
        obj['loc'] = loc;
        obj['msg'] = msg;
        obj['type'] = type;
    }

    /**
     * Constructs a <code>ValidationError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ValidationError} obj Optional instance to populate.
     * @return {module:model/ValidationError} The populated <code>ValidationError</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ValidationError();

            if (data.hasOwnProperty('loc')) {
                obj['loc'] = ApiClient.convertToType(data['loc'], ['String']);
            }
            if (data.hasOwnProperty('msg')) {
                obj['msg'] = ApiClient.convertToType(data['msg'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ValidationError</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ValidationError</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of ValidationError.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is an array
        if (!Array.isArray(data['loc'])) {
            throw new Error("Expected the field `loc` to be an array in the JSON data but got " + data['loc']);
        }
        // ensure the json data is a string
        if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
            throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
        }

        return true;
    }


}

ValidationError.RequiredProperties = ["loc", "msg", "type"];

/**
 * @member {Array.<String>} loc
 */
ValidationError.prototype['loc'] = undefined;

/**
 * @member {String} msg
 */
ValidationError.prototype['msg'] = undefined;

/**
 * @member {String} type
 */
ValidationError.prototype['type'] = undefined;






export default ValidationError;

