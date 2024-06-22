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
import Score from './Score';
import SessionModel from './SessionModel';

/**
 * The ScoresModel model module.
 * @module model/ScoresModel
 * @version 1.1.0
 */
class ScoresModel {
    /**
     * Constructs a new <code>ScoresModel</code>.
     * @alias module:model/ScoresModel
     */
    constructor() { 
        
        ScoresModel.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ScoresModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ScoresModel} obj Optional instance to populate.
     * @return {module:model/ScoresModel} The populated <code>ScoresModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ScoresModel();

            if (data.hasOwnProperty('session')) {
                obj['session'] = ApiClient.convertToType(data['session'], SessionModel);
            }
            if (data.hasOwnProperty('scores')) {
                obj['scores'] = ApiClient.convertToType(data['scores'], [Score]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ScoresModel</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ScoresModel</code>.
     */
    static validateJSON(data) {
        // validate the optional field `session`
        if (data['session']) { // data not null
          SessionModel.validateJSON(data['session']);
        }
        if (data['scores']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['scores'])) {
                throw new Error("Expected the field `scores` to be an array in the JSON data but got " + data['scores']);
            }
            // validate the optional field `scores` (array)
            for (const item of data['scores']) {
                Score.validateJSON(item);
            };
        }

        return true;
    }


}



/**
 * The session this data is for.
 * @member {module:model/SessionModel} session
 */
ScoresModel.prototype['session'] = undefined;

/**
 * List of scores.
 * @member {Array.<module:model/Score>} scores
 */
ScoresModel.prototype['scores'] = undefined;






export default ScoresModel;
