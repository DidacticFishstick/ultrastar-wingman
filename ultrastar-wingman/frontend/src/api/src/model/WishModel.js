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
import Song from './Song';

/**
 * The WishModel model module.
 * @module model/WishModel
 * @version 2.0.0
 */
class WishModel {
    /**
     * Constructs a new <code>WishModel</code>.
     * @alias module:model/WishModel
     * @param song {module:model/Song} 
     */
    constructor(song) { 
        
        WishModel.initialize(this, song);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, song) { 
        obj['song'] = song;
    }

    /**
     * Constructs a <code>WishModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/WishModel} obj Optional instance to populate.
     * @return {module:model/WishModel} The populated <code>WishModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new WishModel();

            if (data.hasOwnProperty('count')) {
                obj['count'] = ApiClient.convertToType(data['count'], 'Number');
            }
            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'Number');
            }
            if (data.hasOwnProperty('song')) {
                obj['song'] = Song.constructFromObject(data['song']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>WishModel</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>WishModel</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of WishModel.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // validate the optional field `song`
        if (data['song']) { // data not null
          Song.validateJSON(data['song']);
        }

        return true;
    }


}

WishModel.RequiredProperties = ["song"];

/**
 * The number of wishes for this song.
 * @member {Number} count
 */
WishModel.prototype['count'] = undefined;

/**
 * The timestamp of the wish (the first timestamp for this song if count > 1).
 * @member {Number} date
 */
WishModel.prototype['date'] = undefined;

/**
 * @member {module:model/Song} song
 */
WishModel.prototype['song'] = undefined;






export default WishModel;

