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
 * The Paging model module.
 * @module model/Paging
 * @version 1.1.0
 */
class Paging {
    /**
     * Constructs a new <code>Paging</code>.
     * @alias module:model/Paging
     * @param current {Number} 
     * @param pages {Number} 
     */
    constructor(current, pages) { 
        
        Paging.initialize(this, current, pages);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, current, pages) { 
        obj['current'] = current;
        obj['pages'] = pages;
    }

    /**
     * Constructs a <code>Paging</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Paging} obj Optional instance to populate.
     * @return {module:model/Paging} The populated <code>Paging</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Paging();

            if (data.hasOwnProperty('current')) {
                obj['current'] = ApiClient.convertToType(data['current'], 'Number');
            }
            if (data.hasOwnProperty('pages')) {
                obj['pages'] = ApiClient.convertToType(data['pages'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Paging</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Paging</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of Paging.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }

        return true;
    }


}

Paging.RequiredProperties = ["current", "pages"];

/**
 * @member {Number} current
 */
Paging.prototype['current'] = undefined;

/**
 * @member {Number} pages
 */
Paging.prototype['pages'] = undefined;






export default Paging;
