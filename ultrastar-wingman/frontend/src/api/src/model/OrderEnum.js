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
* Enum class OrderEnum.
* @enum {}
* @readonly
*/
export default class OrderEnum {
    
        /**
         * value: "id"
         * @const
         */
        "id" = "id";

    
        /**
         * value: "artist"
         * @const
         */
        "artist" = "artist";

    
        /**
         * value: "title"
         * @const
         */
        "title" = "title";

    
        /**
         * value: "edition"
         * @const
         */
        "edition" = "edition";

    
        /**
         * value: "rating"
         * @const
         */
        "rating" = "rating";

    
        /**
         * value: "language"
         * @const
         */
        "language" = "language";

    
        /**
         * value: "views"
         * @const
         */
        "views" = "views";

    
        /**
         * value: "golden"
         * @const
         */
        "golden" = "golden";

    

    /**
    * Returns a <code>OrderEnum</code> enum value from a Javascript object name.
    * @param {Object} data The plain JavaScript object containing the name of the enum value.
    * @return {module:model/OrderEnum} The enum <code>OrderEnum</code> value.
    */
    static constructFromObject(object) {
        return object;
    }
}

