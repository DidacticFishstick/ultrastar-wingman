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


import ApiClient from './ApiClient';
import AccessLevel from './model/AccessLevel';
import AddToWishListModel from './model/AddToWishListModel';
import BasicResponse from './model/BasicResponse';
import BearerResponse from './model/BearerResponse';
import BodyResetForgotPasswordAuthForgotPasswordPost from './model/BodyResetForgotPasswordAuthForgotPasswordPost';
import BodyResetResetPasswordAuthResetPasswordPost from './model/BodyResetResetPasswordAuthResetPasswordPost';
import BodyVerifyRequestTokenAuthRequestVerifyTokenPost from './model/BodyVerifyRequestTokenAuthRequestVerifyTokenPost';
import BodyVerifyVerifyAuthVerifyPost from './model/BodyVerifyVerifyAuthVerifyPost';
import ErrorModel from './model/ErrorModel';
import HTTPValidationError from './model/HTTPValidationError';
import OrderEnum from './model/OrderEnum';
import Paging from './model/Paging';
import PermissionModel from './model/PermissionModel';
import PermissionPatchModel from './model/PermissionPatchModel';
import PermissionsModel from './model/PermissionsModel';
import PermissionsPatchModel from './model/PermissionsPatchModel';
import PermissionsPatchResponseModel from './model/PermissionsPatchResponseModel';
import PlayerConfig from './model/PlayerConfig';
import PlayerCreation from './model/PlayerCreation';
import PlayersModel from './model/PlayersModel';
import RegisteredPlayerModel from './model/RegisteredPlayerModel';
import RegisteredPlayerPatchModel from './model/RegisteredPlayerPatchModel';
import RegisteredPlayerWithIdPatchModel from './model/RegisteredPlayerWithIdPatchModel';
import RegisteredPlayersModel from './model/RegisteredPlayersModel';
import RegisteredPlayersPatchModel from './model/RegisteredPlayersPatchModel';
import Score from './model/Score';
import ScoresModel from './model/ScoresModel';
import SessionModel from './model/SessionModel';
import SessionsListModel from './model/SessionsListModel';
import SingModel from './model/SingModel';
import Song from './model/Song';
import SongsResponse from './model/SongsResponse';
import USDBSong from './model/USDBSong';
import USDBSongsResponse from './model/USDBSongsResponse';
import UdEnum from './model/UdEnum';
import UltrastarWingmanState from './model/UltrastarWingmanState';
import UnregisteredPlayerModel from './model/UnregisteredPlayerModel';
import UsdbId from './model/UsdbId';
import UsdbIdsList from './model/UsdbIdsList';
import UserCreate from './model/UserCreate';
import UserRead from './model/UserRead';
import UserUpdate from './model/UserUpdate';
import ValidationError from './model/ValidationError';
import WishModel from './model/WishModel';
import WishlistModel from './model/WishlistModel';
import AuthApi from './api/AuthApi';
import DefaultApi from './api/DefaultApi';
import PermissionsApi from './api/PermissionsApi';
import PlayersApi from './api/PlayersApi';
import ScoresApi from './api/ScoresApi';
import SongsApi from './api/SongsApi';
import USDBApi from './api/USDBApi';
import UltraStarDeluxeApi from './api/UltraStarDeluxeApi';
import UltraStarWingmanApi from './api/UltraStarWingmanApi';
import UsersApi from './api/UsersApi';
import WishlistApi from './api/WishlistApi';


/**
* JS API client generated by OpenAPI Generator.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var UltraStarWingman = require('index'); // See note below*.
* var xxxSvc = new UltraStarWingman.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new UltraStarWingman.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new UltraStarWingman.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new UltraStarWingman.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 2.0.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The AccessLevel model constructor.
     * @property {module:model/AccessLevel}
     */
    AccessLevel,

    /**
     * The AddToWishListModel model constructor.
     * @property {module:model/AddToWishListModel}
     */
    AddToWishListModel,

    /**
     * The BasicResponse model constructor.
     * @property {module:model/BasicResponse}
     */
    BasicResponse,

    /**
     * The BearerResponse model constructor.
     * @property {module:model/BearerResponse}
     */
    BearerResponse,

    /**
     * The BodyResetForgotPasswordAuthForgotPasswordPost model constructor.
     * @property {module:model/BodyResetForgotPasswordAuthForgotPasswordPost}
     */
    BodyResetForgotPasswordAuthForgotPasswordPost,

    /**
     * The BodyResetResetPasswordAuthResetPasswordPost model constructor.
     * @property {module:model/BodyResetResetPasswordAuthResetPasswordPost}
     */
    BodyResetResetPasswordAuthResetPasswordPost,

    /**
     * The BodyVerifyRequestTokenAuthRequestVerifyTokenPost model constructor.
     * @property {module:model/BodyVerifyRequestTokenAuthRequestVerifyTokenPost}
     */
    BodyVerifyRequestTokenAuthRequestVerifyTokenPost,

    /**
     * The BodyVerifyVerifyAuthVerifyPost model constructor.
     * @property {module:model/BodyVerifyVerifyAuthVerifyPost}
     */
    BodyVerifyVerifyAuthVerifyPost,

    /**
     * The ErrorModel model constructor.
     * @property {module:model/ErrorModel}
     */
    ErrorModel,

    /**
     * The HTTPValidationError model constructor.
     * @property {module:model/HTTPValidationError}
     */
    HTTPValidationError,

    /**
     * The OrderEnum model constructor.
     * @property {module:model/OrderEnum}
     */
    OrderEnum,

    /**
     * The Paging model constructor.
     * @property {module:model/Paging}
     */
    Paging,

    /**
     * The PermissionModel model constructor.
     * @property {module:model/PermissionModel}
     */
    PermissionModel,

    /**
     * The PermissionPatchModel model constructor.
     * @property {module:model/PermissionPatchModel}
     */
    PermissionPatchModel,

    /**
     * The PermissionsModel model constructor.
     * @property {module:model/PermissionsModel}
     */
    PermissionsModel,

    /**
     * The PermissionsPatchModel model constructor.
     * @property {module:model/PermissionsPatchModel}
     */
    PermissionsPatchModel,

    /**
     * The PermissionsPatchResponseModel model constructor.
     * @property {module:model/PermissionsPatchResponseModel}
     */
    PermissionsPatchResponseModel,

    /**
     * The PlayerConfig model constructor.
     * @property {module:model/PlayerConfig}
     */
    PlayerConfig,

    /**
     * The PlayerCreation model constructor.
     * @property {module:model/PlayerCreation}
     */
    PlayerCreation,

    /**
     * The PlayersModel model constructor.
     * @property {module:model/PlayersModel}
     */
    PlayersModel,

    /**
     * The RegisteredPlayerModel model constructor.
     * @property {module:model/RegisteredPlayerModel}
     */
    RegisteredPlayerModel,

    /**
     * The RegisteredPlayerPatchModel model constructor.
     * @property {module:model/RegisteredPlayerPatchModel}
     */
    RegisteredPlayerPatchModel,

    /**
     * The RegisteredPlayerWithIdPatchModel model constructor.
     * @property {module:model/RegisteredPlayerWithIdPatchModel}
     */
    RegisteredPlayerWithIdPatchModel,

    /**
     * The RegisteredPlayersModel model constructor.
     * @property {module:model/RegisteredPlayersModel}
     */
    RegisteredPlayersModel,

    /**
     * The RegisteredPlayersPatchModel model constructor.
     * @property {module:model/RegisteredPlayersPatchModel}
     */
    RegisteredPlayersPatchModel,

    /**
     * The Score model constructor.
     * @property {module:model/Score}
     */
    Score,

    /**
     * The ScoresModel model constructor.
     * @property {module:model/ScoresModel}
     */
    ScoresModel,

    /**
     * The SessionModel model constructor.
     * @property {module:model/SessionModel}
     */
    SessionModel,

    /**
     * The SessionsListModel model constructor.
     * @property {module:model/SessionsListModel}
     */
    SessionsListModel,

    /**
     * The SingModel model constructor.
     * @property {module:model/SingModel}
     */
    SingModel,

    /**
     * The Song model constructor.
     * @property {module:model/Song}
     */
    Song,

    /**
     * The SongsResponse model constructor.
     * @property {module:model/SongsResponse}
     */
    SongsResponse,

    /**
     * The USDBSong model constructor.
     * @property {module:model/USDBSong}
     */
    USDBSong,

    /**
     * The USDBSongsResponse model constructor.
     * @property {module:model/USDBSongsResponse}
     */
    USDBSongsResponse,

    /**
     * The UdEnum model constructor.
     * @property {module:model/UdEnum}
     */
    UdEnum,

    /**
     * The UltrastarWingmanState model constructor.
     * @property {module:model/UltrastarWingmanState}
     */
    UltrastarWingmanState,

    /**
     * The UnregisteredPlayerModel model constructor.
     * @property {module:model/UnregisteredPlayerModel}
     */
    UnregisteredPlayerModel,

    /**
     * The UsdbId model constructor.
     * @property {module:model/UsdbId}
     */
    UsdbId,

    /**
     * The UsdbIdsList model constructor.
     * @property {module:model/UsdbIdsList}
     */
    UsdbIdsList,

    /**
     * The UserCreate model constructor.
     * @property {module:model/UserCreate}
     */
    UserCreate,

    /**
     * The UserRead model constructor.
     * @property {module:model/UserRead}
     */
    UserRead,

    /**
     * The UserUpdate model constructor.
     * @property {module:model/UserUpdate}
     */
    UserUpdate,

    /**
     * The ValidationError model constructor.
     * @property {module:model/ValidationError}
     */
    ValidationError,

    /**
     * The WishModel model constructor.
     * @property {module:model/WishModel}
     */
    WishModel,

    /**
     * The WishlistModel model constructor.
     * @property {module:model/WishlistModel}
     */
    WishlistModel,

    /**
    * The AuthApi service constructor.
    * @property {module:api/AuthApi}
    */
    AuthApi,

    /**
    * The DefaultApi service constructor.
    * @property {module:api/DefaultApi}
    */
    DefaultApi,

    /**
    * The PermissionsApi service constructor.
    * @property {module:api/PermissionsApi}
    */
    PermissionsApi,

    /**
    * The PlayersApi service constructor.
    * @property {module:api/PlayersApi}
    */
    PlayersApi,

    /**
    * The ScoresApi service constructor.
    * @property {module:api/ScoresApi}
    */
    ScoresApi,

    /**
    * The SongsApi service constructor.
    * @property {module:api/SongsApi}
    */
    SongsApi,

    /**
    * The USDBApi service constructor.
    * @property {module:api/USDBApi}
    */
    USDBApi,

    /**
    * The UltraStarDeluxeApi service constructor.
    * @property {module:api/UltraStarDeluxeApi}
    */
    UltraStarDeluxeApi,

    /**
    * The UltraStarWingmanApi service constructor.
    * @property {module:api/UltraStarWingmanApi}
    */
    UltraStarWingmanApi,

    /**
    * The UsersApi service constructor.
    * @property {module:api/UsersApi}
    */
    UsersApi,

    /**
    * The WishlistApi service constructor.
    * @property {module:api/WishlistApi}
    */
    WishlistApi
};
