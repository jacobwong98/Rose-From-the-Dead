"use strict";
// Note: Use CTRL+K CTRL+L to collapse region in Visual Studio Code.
//#region Header
/*:
╔════════╗
║ #Index ║
╚════════╝
#Index
@help
#Version History
Plugin #Initialization
#Parameters & Variables
#Utilities
#Game Player
	#Stamina adjusting
	#Update Stamina Stuff
Game #Screen
Scene #Base
Scene #Map
#Game Map
#Stamina Regen/Deplete Items
#Stamina Window #Definition
	#Drawing
	#Show, #Hide & #Slide
#Create Stamina Window
Play #SFX
#Saving & #Loading
Plugin #Command

╔════════════════╗
║ Plugin Manager ║
╚════════════════╝
 * @plugindesc v2.04 Basic dashing stamina script.
 * @author Squirting Elephant
 *
 * @param General
 *
 * @param ShowStaminaWindow
 * @text Show Stamina Window
 * @desc Show the stamina window?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 *
 * @param SFXDefaultVolume
 * @text Default SFX Volume
 * @desc The default volume level for all ItemLog SFX. Use the value -1 to use the "live AudioManager.seVolume" instead.
 * @parent General
 * @type number
 * @min -1
 * @default -1
 *
 * @param SFXStaminaDecreaseTiled
 * @text Stamina Decrease Tiled SFX
 * @desc The SFX to play whenever stamina is decreased (only works when "Stamina Decrease Mode" is set to "Tile". Use "None" w/o quotes to disable this.
 * @parent General
 * @default Switch1
 * 
 * @param PauseStaminaDuringDialog
 * @text Freeze Stamina During GameMessage
 * @desc Stops stamina regeneration and such when a GameMessage (=dialog) is active.
 * @parent General
 * @type boolean
 * @on Freeze
 * @off Don't freeze
 * @default true
 * 
 *
 * @param Positioning & Size
 *
 * @param Window_X
 * @text Window X
 * @desc X-location of stamina window. If window-alignment is set to Right, this will act as an offset value instead
 * @parent Positioning & Size
 * @type number
 * @default 10
 *
 * @param Window_Y
 * @text Window Y
 * @desc Y-location of stamina window. If window-alignment is set to Top, this will act as an offset value instead
 * @parent Positioning & Size
 * @type number
 * @default 10
 *
 * @param WindowWidth
 * @text Window Width
 * @desc width of the stamina window
 * @parent Positioning & Size
 * @type number
 * @min 0
 * @default 170
 *
 * @param WindowHeight
 * @text Window Height
 * @desc height of the stamina window
 * @parent Positioning & Size
 * @type number
 * @min 0
 * @default 72
 *
 * @param WindowAlignment_Horizontal
 * @text Window Horizontal Alignment
 * @parent Positioning & Size
 * @type select
 * @option Left
 * @option Right
 * @default Left
 *
 * @param WindowAlignment_Vertical
 * @text Window Vertical Alignment
 * @parent Positioning & Size
 * @type select
 * @option Top
 * @option Bottom
 * @default Top
 *
 * @param StaminaGaugeRect
 * @text Stamina Gauge Rectangle
 * @desc The gauge rectangle.
 * @parent Positioning & Size
 * @type struct<SEGaugeRect>
 * @default {"x":"0","y":"-20","width":"132","height":"24"}
 * 
 * @param Stamina Pool
 *
 * @param StaminaDecreaseMode
 * @text Stamina Decrease Mode
 * @desc Use "Default" to decrease while moving. Use "Tile" to decrease stamina whenever the player enters a new tile.
 * @parent Stamina Pool
 * @type select
 * @option Default
 * @option Tile
 * @default Default
 *
 * @param StaminaDecreaseAmountDefault
 * @text Stamina Decrease Amount Default
 * @desc Amount of stamina subtracted per update (use a positive number) while in default mode.
 * @parent Stamina Pool
 * @type number
 * @min 0
 * @default 1
 * 
 * @param StaminaDecreaseAmountTiled
 * @text Stamina Decrease Amount Tiled
 * @desc Amount of stamina subtracted per update (use a positive number) while in tiled mode.
 * @parent Stamina Pool
 * @type number
 * @min 0
 * @default 10
 *
 * @param StaminaMax
 * @text Max Stamina
 * @desc The maximum amount of stamina.
 * @parent Stamina Pool
 * @type number
 * @min 1
 * @default 300
 *
 * @param StaminaRecoveryDelay
 * @text Stamina Recovery Delay
 * @desc delay in update-calls before recovering stamina when not dashing.
 * @parent Stamina Pool
 * @type number
 * @min 0
 * @default 180
 *
 * @param StaminaRecoveryRate
 * @text Stamina Recovery Rate
 * @desc How fast stamina is recovered (only when recovering).
 * @parent Stamina Pool
 * @type number
 * @min 0
 * @decimals 2
 * @default 0.30
 *
 * @param StaminaAutoDashThreshold
 * @text Stamina AutoDash Threshold
 * @desc Do not automatically dash again before stamina is above this threshold (in %, 0-100) when recovering stamina.
 * @parent Stamina Pool
 * @type number
 * @min 0
 * @max 100
 * @default 15
 *
 * @param UsesCustomStaminaRegenFormula
 * @text Use Custom Stamina Regen Formula?
 * @desc Use a custom stamina regeneration formula? If true, then the parameter "Stamina Regen Formula" is used as the formula. When false the default formula is used (which executes slightly faster).
 * @parent Stamina Pool
 * @type boolean
 * @on Yes
 * @off No
 * @default false
 *
 * @param StaminaRegenFormula
 * @text Stamina Regen Formula
 * @desc The formula for how fast to regenerate stamina over longer period of time. "Base" is the recovery rate. Case sensitive!
 * @parent Stamina Pool
 * @default base + Math.sqrt(x/50);
 *
 * @param Visuals
 *
 * @param StaminaGaugeColor_1
 * @text Stamina Gauge Color 1
 * @desc Bar gradient color1 (start of bar) in hex.
 * @parent Visuals
 * @default #009900
 *
 * @param StaminaGaugeColor_2
 * @text Stamina Gauge Color 2
 * @desc Bar gradient color2 (end of bar) in hex.
 * @parent Visuals
 * @default #CC0000
 *
 * @param StaminaValueRenderType
 * @text Draw Stamina Value
 * @desc Draw text in stamina bar? Accepted values: absolute/percentage/both/none
 * @parent Visuals
 * @type select
 * @option none
 * @option absolute
 * @option percentage
 * @option both
 * @default percentage
 *
 * @param FontSize
 * @text Font Size
 * @desc Font size for stamina value.
 * @parent Visuals
 * @type number
 * @min 1
 * @default 20
 *
 * @param Window Prefix Text
 *
 * @param WindowText
 * @text Window Text
 * @desc Use :none to disable this.
 * @parent Window Prefix Text
 * @default :none
 *
 * @param WindowTextOffset_Y
 * @text Window Text Offset Y
 * @desc y-coordinate for the text.
 * @parent Window Prefix Text
 * @type number
 * @default 19
 *
 * @param WindowTextSpacing_X
 * @text Window Text Spacing X
 * @desc The amount of room in coordinates between text and gauge.
 * @parent Window Prefix Text
 * @type number
 * @min 0
 * @default 4
 *
 * @param Hiding
 * 
 * @param AutoHideStaminaWindow
 * @text Auto Hide Stamina Window
 * @desc Automatically hide the stamina window if it's at max stamina for a specific period of time?
 * @parent Hiding
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * 
 * @param HideStaminaWindowDelay
 * @text Hide Stamina Window Delay
 * @desc After how many updates the stamina window should hide itself (if it remains at max stamina).
 * @parent Hiding
 * @type number
 * @min 0
 * @default 180
 * 
 * @param IsHiddenDuringGameMessage
 * @text Hide During Game Message
 * @desc Hide the stamina window when a GameMessage (=dialog, choice, etc.) is active?
 * @parent Hiding
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * 
 * @param Window
 *
 * @param StaminaWindowOpacity
 * @text Stamina Window Opacity
 * @desc Stamina window opacity between 0-255. Set to 0 to hide the window (will still show the bar).
 * @parent Window
 * @type number
 * @min 0
 * @max 255
 * @default 255
 *
 * @param WindowSlideoutDirection
 * @text Window Slide-out Direction
 * @desc What direction to slide the stamina window out to.
 * @parent Window
 * @type select
 * @option Disabled
 * @option Up
 * @option Right
 * @option Down
 * @option Left
 * @default Left 
 *
 * @param WindowSlideSpeed
 * @text Window Slide Speed
 * @desc How fast the window slides in & out.
 * @parent Window
 * @type number
 * @min 0
 * @decimals 1
 * @default 2.0
 *
 * @param Advanced
 *
 * @param CommonEvent_StaminaValue_ActivationDelta
 * @text Common Event Stamina Value Activation Delta
 * @desc How big the difference in stamina value must be between now and the last time a common event was ran. A value of 0 will run the Common Event every frame (if it matches the stamina value).
 * @parent Advanced
 * @type number
 * @min 0
 * @default 5
 *
 * @param GameVariableNumberStamina
 * @text Game Variable Number
 * @desc Use a value of 0 to disable this. The GameVariable # to store the current stamina value into.
 * @parent Advanced
 * @type number
 * @min 0
 * @default 0
 * 
 * @param DisableStaminaConsumptionGameSwitch
 * @text Disable Stamina Consumption GameSwitch
 * @desc The gameswitch to use to disable stamina consumption (or -1 to use none). A switch status of "ON" means: disabled.
 * @parent Advanced
 * @type number
 * @min -1
 * @default -1
 *
 * @param Window_Z_Index
 * @text Window Z-Index
 * @desc Window Z-Index.
 * @parent Advanced
 * @type number
 * @min 1
 * @default 1
 *
 * @param PluginCommandIdentifier
 * @text Plugin Command Identifier
 * @desc Do not change if you do not know what this is!
 * @parent Advanced
 * @default stamina
 * 
 * @param CommonEventsAtStaminaValues
 * @text Common Events At Stamina Values
 * @desc Example to run common event 15 at 0 stamina and common event 17 at 100% stamina: 0 15 100% 17.
 * @parent Advanced
 * 
 * @param DebugEnabled
 * @desc Enables/Disables debugging. Note that this may cost extra performance when enabled.
 * @parent Advanced
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default false
 * @text Debugging Enabled
 *
   ╔══════╗
   ║ Help ║
   ╚══════╝
 * @help
 * -------------------------------------
 * Plugin Commands (not case sensitive):
 * -------------------------------------
 * Stamina Refill
 * Instantly refills all of your stamina.
 *
 * Stamina SetAbs <value>
 * Instantly sets your stamina to the specified absolute value. The value will be automatically clamped to a sensible value.
 * Example to set your stamina bar to 25: Stamina SetAbs 25
 * 
 * Stamina Set <value>
 * Instantly sets your stamina to the specified percentage. Use a value between 0 and 100.
 * Example to set your stamina bar to 64%: Stamina Set 64
 * 
 * Stamina Increase <value>
 * Instantly increases your stamina by the specified percentage. The result will be automatically clamped to a sensible value.
 * Example: Stamina Increase 25
 * 
 * Stamina Decrease <value>
 * Instantly decreases your stamina by the specified percentage. The result will be automatically clamped to a sensible value.
 * Example: Stamina Decrease 25
 * 
 * Stamina IncreaseAbs <value>
 * Instantly increases your stamina by the specified value. The result will be automatically clamped to a sensible value.
 * Example: Stamina Increase 100
 * 
 * Stamina DecreaseAbs <value>
 * Instantly decreases your stamina by the specified value. The result will be automatically clamped to a sensible value.
 * Example: Stamina Decrease 100
 *
 * Stamina SetVar <variableIndex>
 * Instantly sets your stamina to the specified percentage (0-100).
 * Example to set the stamina using game-variable #10: Stamina SetVar 10
 *
 * Stamina SetEval <eval>
 * Instantly sets your stamina to the specified percentage (0-100).
 * Example: Example Stamina SetEval ($gameVariables.value(10) + 1) / 2
 *
 * Stamina Deplete
 * Instantly sets your stamina to 0.
 *
 * Stamina ShowWindow
 * Shows the stamina window. Does not work if you disabled the stamina window.
 *
 * Stamina HideWindow
 * Hides the stamina window. Does not work if you disabled the stamina window.
 * Also does not work if the stamina is currently regenerating.
 *
 * Stamina RefillHide
 * Instantly refills all of your stamina and also hides the stamina window.
 *
 * Stamina SetMax <value>
 * Sets a new max-stamina value.
 *
 * Stamina SetMaxVar <variableIndex>
 * Sets a new max-stamina value.
 * Example to set the max-stamina using game-variable #10: Stamina SetMaxVar 10
 *
 * Stamina SetMaxEval <eval>
 * Sets a new max-stamina value. But this time it evaluates the code you enter as <eva>.
 * Example: Stamina SetMaxEval ($gameVariables.value(10) + 1) / 2
 * The above example assigns a new max-stamina using the game-variable 10 and then adding a 1 and then dividing it all by 2.
 *
 * Stamina IncreaseMax <value>
 * Increases max stamina by the specified value. You can also use negative values.
 *
 * Stamina EnableDashing <true/false/toggle>
 * Allows or prohibits dashing on the map.
 * Examples:
 * Stamina EnableDashing true
 * Stamina EnableDashing false
 * Stamina EnableDashing toggle
 *
 * Stamina ForceHide <true/false>
 * Example: 
 * Stamina ForceHide true
 * 
 * Stamina SetDecreaseMode <Default/Tile>
 * Examples:
 * Stamina SetDecreaseMode Default
 * Stamina SetDecreaseMode Tile
 * 
 * Stamina ToggleDecreaseMode
 * Toggles the DecreaseMode between Default and Tile.
 * 
 * Stamina Regen <option>
 * [option] can be either: enabled, true, disabled, false, toggle
 * Examples:
 * Stamina Regen Enabled
 * Stamina Regen Disabled
 * Stamina Regen Toggle
 *
 * -------------------------------------
 * Map Notetags
 * -------------------------------------
 * <dstam_disable>
 * Prevents stamina consumption on this map. Not that if the "Disable Stamina Consumption GameSwitch"
 * is turned ON then you consume no stamina anyway.
 *
 * <disable_dashing>
 * Prevents dashing on the map (with or without stamina).
 *
 * -------------------------------------
 * Item Notetags (not case sensitive)
 * -------------------------------------
 * <dash_stamina:command (value)>
 * Available commands:
 *  - Add (may have a negative value)
 *  - Refill
 *  - Deplete
 *  - IncreaseMax (may have a negative value)
 * Examples:
 * <dash_stamina:Add 10>
 * <dash_stamina:Add -10>
 * <dash_stamina:Refill>
 * <dash_stamina:Deplete>
 * <dash_stamina:IncreaseMax 1500>
 * Note that those only work from the menu, not from battle
 *
 *--------------------------------------
 * Aliases created for:
 *--------------------------------------
 * * DataManager.extractSaveContents()
 * * DataManager.makeSaveContents()
 * * Game_Action.prototype.testApply()
 * * Game_Interpreter.prototype.pluginCommand()
 * * Game_Map.prototype.setup()
 * * Game_Message.prototype.add()
 * * Game_Player.prototype.initialize()
 * * Game_Player.prototype.updateDashing()
 * * Game_Player.prototype.updateMove()
 * * Game_Screen.prototype.updateFadeOut()
 * * Scene_Base.prototype.startFadeIn()
 * * Scene_ItemBase.prototype.useItem()
 * * Scene_Map.prototype.createDisplayObjects()
 * * Scene_Map.prototype.updateMain()
 * 
 *--------------------------------------
 * #Version History:
 *--------------------------------------
 * v2.04 (14 November 2019)
 * - Bugfix: The stamina variable is (if parameter "Game Variable Number" is > 0) now set when starting a new game.
 * - 5 new plugin commands: "Stamina SetAbs <value>", "Stamina Increase <value>", Stamina Decrease <value>, "Stamina IncreaseAbs <value>" and "Stamina DecreaseAbs <value>".
 * 
 * v2.03 (12 November 2019)
 * - Bugfix: Fixed a crash when using the Stamina Game Variable ($gamePlayer is sometimes null).
 * - Bugfix: if the "Window Slide-out Direction" parameter was set to Disabled, the stamina window would never appear ingame.
 * - Added a new PluginCommand: Stamina Regen <option>.
 * 
 * v2.02 (10 November 2019)
 * - Fixed a bug that prevented the game from saving.
 *
 * v2.01 (24 October 2019)
 * - Fixed a fatal error caused when this plugin is loaded before any of my other plugins.
 * 
 * v2.00 (17 October 2019) [Parameters Changed]
 * - The stamina window can now automatically hide itself during dialogs (with a new parameter).
 * - Added another new parameter: "Freeze Stamina During GameMessage".
 * - Added an index for developers.
 * - A lot of refactoring and 'upgrade' to Javascript ECMA 6 which is now supported by RMMV.
 * - Merged the "GameVariable Addon" into this script.
 * - Added a new plugin command: Stamina SetDecreaseMode <default/tile>.
 * - Added a new plugin command: Stamina ToggleDecreaseMode.
 * - Changed the default "Stamina AutoDash Threshold" value from 40 --> 15 and "Hide Stamina Window Delay" from 160 --> 180.
 * - Renamed Parameter "Stamina Decrease Amount" --> "Stamina Decrease Amount Default" and added a new parameter "Stamina Decrease Amount Tiled".
 * - Fixed a console-warning from the visibility check when the window was fully slided out.
 * 
 * v1.21 (29 September 2019)
 * - This time I upgraded the correct version of the script... Please don't use v1.20.
 *  
 * v1.20 (28 September 2019)
 * - Updated this plugin for the latest version of RMMV.
 * 
 * v1.10 (05 June 2016)
 * - Added a new plugin command to enforce to hide the stamina-bar (for cut-scenes and such): Stamina ForceHide true/false.
 * - Fixed a bug that wouldn't correctly render the stamina window when setting "Autohide" to false. Consuming stamina at least once also used to fix this.
 *
 * v1.09 (11 April 2016)
 * - Refactoring & minor performance optimizations.
 *
 * v1.08 (03 April 2016) [Parameters Changed]
 * - Added an optional SFX to the tile-mode.
 * - Added two new parameters: "Default SFX Volume" and "Stamina Decrease Tiled SFX".
 *
 * v1.07a (01 April 2016) [Parameters Changed]
 * - Added a new parameter to run common events at certain stamina values/percentages.
 * - Added a new parameter "Use Custom Stamina Regen Formula?" for those who need more optimization. By default it does NOT use the custom formula (faster).
 * - Added more comments to the code.
 *
 * v1.06 (26 March 2016)
 * - Added new plugin commands: SetVar, SetEval, SetMaxEval & SetMaxVar.
 * - The plugin command "Stamina EnableDashing" now accepts a third value: toggle.
 *
 * v1.05 (21 March 2016)
 * - Added a new parameter "Stamina Decrease Mode". Now stamina can also be decreased on a per-tile-basis instead of only on a per-update-cycle-basis.
 * - Added new functions and a new alias to accomodate the above new feature.
 *
 * v1.04 (03 February 2016)
 * - Fixed a crash when transferring between maps using an autorun event with manual fading in or out (autorun stops execution of other events and some scripts like this one, which caused the crash).
 *
 * v1.03 (01 January 2016)
 * - Used my new coding standards & refactored.
 * - Switched to the Imported variable.
 * - Fixed an accidental duplicate alias.
 * - Fixed a bug in Scene_Map.prototype.updateMain() (which just so happened to cause no side-effects).
 *
 * v1.02 (12 December 2015)
 * - Dashing for the current map can now be entirely disabled with a map-notetag and switched with a plugin command at any time.
 * - Created a simple plugin addon to store the player-stamina in a global game-variable.
 * - Enabled custom text to be drawn in front of the Stamina Window.
 * - New feature: items can replenish, lower, refill and deplete stamina (only in the menu, not in battle).
 *
 * v1.01 (1 December 2015)
 * - Removed strict-mode because... Possible bug in RPG Maker...
 * - Refactored and fixed semicolons and missing var-keywords.
 *
 * v1.00 (26 November 2015)
 * - First release.
 * Alpha (November 2015)
 * - First alpha release.
 *
 */

/*~struct~SEGaugeRect:
 * @param x
 * @type number
 * @default 0
 *
 * @param y
 * @type number
 * @default -20
 *
 * @param width
 * @type number
 * @min 0
 * @default 132
 *
 * @param height
 * @type number
 * @min 0
 * @default 24
 */
//#endregion
/*╔════════════════════════╗
  ║ Plugin #Initialization ║
  ╚════════════════════════╝*/
var Imported = Imported || {};
Imported.SE_DashStamina = { name: 'SE_DashStamina', version: 2.04, author: 'Squirting Elephant', date:'2019-11-14'};
var SE = SE || {};
SE.Alias = SE.Alias || {};
SE.Params = SE.Params || {};

(function()
{
/*╔═════════════════════════╗
  ║ #Parameters & Variables ║
  ╚═════════════════════════╝*/
//#region Parameters & Variables

	const NO_SFX = 'none';

	// Enums
	var ESlideState = Object.freeze({
		'none' : 0, // Means that the window is currently not sliding, but it can slide if the conditions are right.
		'in'   : 1,        // Means that it is currently sliding in.
		'out'  : 2         // Means that it is currently sliding out.
	});
	var ESlideDir = Object.freeze({
		'up'       : 1,
		'right'    : 2,
		'down'     : 3,
		'left'     : 4
	});
	var EDirectionValue = Object.freeze({
		'none'   : Object.freeze({x:  0, y:  0 }), // Shallow cloning: https://stackoverflow.com/questions/39736397/is-this-a-good-way-to-clone-an-object-in-es6
		'up'     : Object.freeze({x:  0, y: -1 }),
		'right'  : Object.freeze({x:  1, y:  0 }),
		'down' : Object.freeze({x:  0, y:  1 }),
		'left'   : Object.freeze({x: -1, y:  0 })
	});
	var EAlign = Object.freeze({
		'top'    : 0,
		'right'  : 1,
		'bottom' : 2,
		'left'   : 3
	});
	var EDrawStaminaValue = Object.freeze({
		'none'       : 0,
		'absolute'   : 1,
		'percentage' : 2,
		'both'       : 3
		
	});
	var EStaminaDecreaseMode = Object.freeze({
		'default' : 0,
		'tile'    : 1
	});

    function parseParameters(string)
    {
        try
        {
            return JSON.parse(string, (key, value) => {
                try { return parseParameters(value); }
                catch (e) { return value; }
            });
        } catch (e) { return string; }
    };

    SE.Params.DashStamina = PluginManager.parameters('SE_DashStamina');
    for (var key in SE.Params.DashStamina) { SE.Params.DashStamina[key] = SE.Params.DashStamina[key].replace('\r', ''); } // Because: fix stupid RMMV bug (https://forums.rpgmakerweb.com/index.php?threads/parameter-string-does-not-equal-string.113697/)
    SE.Params.DashStamina = parseParameters(JSON.stringify(SE.Params.DashStamina));
	SE.DashStamina = {};

    // Make a shorter params alias for ease of use.
    var params = SE.Params.DashStamina;

    // Non-parameters
    SE.DashStamina.Window = null;
    SE.DashStamina.ScreenIsFading = false;
    SE.DashStamina.DashingDisabled = false;
    SE.DashStamina.CommonEvents = [];
    SE.DashStamina.HasCommonEvents = false;
    // General
    SE.DashStamina.ShowWindow                = params.ShowStaminaWindow;
    SE.DashStamina.DefaultVolume             = params.SFXDefaultVolume
	SE.DashStamina.TiledStaminaDecreaseSFX   = params.SFXStaminaDecreaseTiled;
	SE.DashStamina.PauseStaminaDuringDialog  = params.PauseStaminaDuringDialog;
    // Positioning & Size
    SE.DashStamina.Window_X                  = params.Window_X;
    SE.DashStamina.Window_Y                  = params.Window_Y;
    SE.DashStamina.WindowWidth               = params.WindowWidth;
    SE.DashStamina.WindowHeight              = params.WindowHeight;
    SE.DashStamina.WindowHorizontalAlignment = EAlign[params.WindowAlignment_Horizontal.toLowerCase()];
	SE.DashStamina.WindowVerticalAlignment   = EAlign[params.WindowAlignment_Vertical.toLowerCase()];

	var gaugeStruct = params.StaminaGaugeRect;
	SE.DashStamina.StaminaGaugeRectangle     = { x: gaugeStruct.x, y: gaugeStruct.y, width: gaugeStruct.width, height: gaugeStruct.height }; // 'clone' the object by creating a new one with the same values.
    // Stamina Pool
    SE.DashStamina.DecreaseMode              = EStaminaDecreaseMode[params.StaminaDecreaseMode.toLowerCase()];
	SE.DashStamina.StaminaDecreaseDefault    = params.StaminaDecreaseAmountDefault;
	SE.DashStamina.StaminaDecreaseTiled      = params.StaminaDecreaseAmountTiled;
    SE.DashStamina.StaminaMax                = params.StaminaMax;
    SE.DashStamina.StaminaRecoveryDelay      = params.StaminaRecoveryDelay;
    SE.DashStamina.StaminaRecoveryRate       = params.StaminaRecoveryRate;
    SE.DashStamina.StaminaAutoDashThreshold  = params.StaminaAutoDashThreshold;
    SE.DashStamina.UseCustomRegenFormula     = params.UsesCustomStaminaRegenFormula;
    SE.DashStamina.RegenFormula              = params.StaminaRegenFormula
    // Visuals
    SE.DashStamina.StaminaGaugeColor1        = params.StaminaGaugeColor_1.toUpperCase();
    SE.DashStamina.StaminaGaugeColor2        = params.StaminaGaugeColor_2.toUpperCase();
    SE.DashStamina.DrawStaminaValue          = EDrawStaminaValue[params.StaminaValueRenderType.toLowerCase()];
    SE.DashStamina.FontSize                  = params.FontSize;
    // Window Prefix Text
    SE.DashStamina.WindowText                = params.WindowText;
    SE.DashStamina.WindowTextOffsetY         = params.WindowTextOffset_Y;
	SE.DashStamina.WindowTextGaugeSpacingX   = params.WindowTextSpacing_X;
	// Hiding
	SE.DashStamina.IsHiddenDuringGameMessage = params.IsHiddenDuringGameMessage;
    // Window
    SE.DashStamina.AutoHideStaminaWindow     = params.AutoHideStaminaWindow;
    SE.DashStamina.HideStaminaWindowDelay    = params.HideStaminaWindowDelay;
	SE.DashStamina.WindowOpacity             = params.StaminaWindowOpacity;
	SE.DashStamina.SlidingEnabled            = (params.WindowSlideoutDirection.toLowerCase() !== 'disabled'); // Note that this is not actually a parameter.
	SE.DashStamina.WindowSlideOutDir         = SE.DashStamina.SlidingEnabled ? ESlideDir[params.WindowSlideoutDirection.toLowerCase()] : ESlideDir.left;
	if (SE.DashStamina.WindowSlideOutDir === undefined) { console.log('Something went wrong assigning to  SE.DashStamina.WindowSlideOutDir. Got raw parameter: ' + params.WindowSlideoutDirection.toLowerCase()); }
    SE.DashStamina.WindowSlideSpeed          = params.WindowSlideSpeed;
    // Advanced
	SE.DashStamina.CE_Delta                  = params.CommonEvent_StaminaValue_ActivationDelta;
	SE.DashStamina.GameVariableNumberStamina = params.GameVariableNumberStamina;
    SE.DashStamina.DisableGameSwitch         = params.DisableStaminaConsumptionGameSwitch;
    SE.DashStamina.Window_Z                  = params.Window_Z_Index;
	SE.DashStamina.PluginCmdId               = params.PluginCommandIdentifier;
	SE.DashStamina.IsDebug                   = params.DebugEnabled;
    // Non-parameters
	SE.DashStamina.ForcedHidden              = false;
	SE.DashStamina.PutStaminaIntoGameVar     = SE.DashStamina.GameVariableNumberStamina > 0;

// Convert&store data for running common events at certain stamina percentages
	var splitted = params.CommonEventsAtStaminaValues.split(' ');
	for (var ceIdx=0; ceIdx<splitted.length; ceIdx+=2)
	{
		var threshold = splitted[ceIdx];
		var thresholdIsPerc = false;
		if (~threshold.indexOf('%'))
		{
			thresholdIsPerc = true;
			threshold = parseInt(threshold.slice(0, -1)); // Remove % character
		}
		else
		{
			threshold = parseInt(threshold);
		}
		var commonEventID = parseInt(splitted[ceIdx + 1]);
		
		SE.DashStamina.CommonEvents[ceIdx / 2] = { threshold:threshold, thresholdIsPerc:thresholdIsPerc, commonEventID:commonEventID, lastRunStaminaAmount:null };
	}
	SE.DashStamina.HasCommonEvents = (SE.DashStamina.CommonEvents.length > 0);
//#endregion

/*╔═══════════════╗
  ║ Sanity Checks ║
  ╚═══════════════╝*/
	if ((SE.DashStamina.DecreaseMode !== EStaminaDecreaseMode.default) && (SE.DashStamina.DecreaseMode !== EStaminaDecreaseMode.tile)) { throw new Error('Invalid parameter-value for "Decrease Mode": ' + SE.DashStamina.DecreaseMode + '.'); }

/*╔════════════╗
  ║ #Utilities ║
  ╚════════════╝*/
//#region Utilities
	function debugLog(msg)
	{
		if (SE.DashStamina.IsDebug === true) { console.log(msg); }
	};

	// Usage: alert( hexToRgb("#0033ff").g ); // "51"; 
	function hexToRgb(hex)
	{
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	};

	function clamp(value, min, max)
	{		
		return Math.min(Math.max(value, min), max);
	};
//#endregion

/*╔══════════════╗
  ║ #Game Player ║
  ╚══════════════╝*/
	SE.Alias.DashStamina_Game_Player_prototype_initialize = Game_Player.prototype.initialize;
	Game_Player.prototype.initialize = function()
	{
		SE.Alias.DashStamina_Game_Player_prototype_initialize.apply(this, arguments);

		this.dashStaminaMax = SE.DashStamina.StaminaMax; // Do this before calling fillStamina().
		this.fillStamina();
		this.updateGameVarStaminaIfRequired(); // Yes this function call is manually required here.
		
		this.staminaRecoveryDelayCnt = 0; // Counter for when to start recovering stamina.
		this.staminaRegenerationTimeCnt = 0; // Counter for how long the player has been recovering stamina (in frames).
		this.isTryingToRecoverStamina = false;
		this.dashStaminaPerc = 1.0;
		this.hideStaminaWindowDelayCnt = 0;
		this.requiresThresholdAmount = false;
		this.wasDashing = false;
		this.staminaRegenEnabled = true;
	};

	Game_Player.prototype.updateGameVarStaminaIfRequired = function()
	{
		if (SE.DashStamina.PutStaminaIntoGameVar === true)
		{
			$gameVariables.setValue(SE.DashStamina.GameVariableNumberStamina, this.dashStamina);
		}
	}

	//------------------------------------------------------------------------------------------------------------------------------------
	// Can the player possibly consume stamina?
	//------------------------------------------------------------------------------------------------------------------------------------
	Game_Player.prototype.hasStaminaConsumption = function()
	{
		if ($gameSwitches.value(SE.DashStamina.DisableGameSwitch)) { return false; }
		if (!this.mapConsumeStamina) { return false; }
		return true;
	};

	// Alias for whenever the player entered a new tile
	SE.Alias.DashStamina_Game_Player_prototype_updateMove = Game_Player.prototype.updateMove;
	Game_Player.prototype.updateMove = function()
	{
		SE.Alias.DashStamina_Game_Player_prototype_updateMove.apply(this, arguments);
		if ((SE.DashStamina.DecreaseMode === EStaminaDecreaseMode.tile) && !this.isMoving() && this.isDashing() && this.hasStaminaConsumption())
		{
			debugLog('Player entered new tile.');
			// Consume stamina for the tile-decrease-mode
			this.decreaseStamina(SE.DashStamina.StaminaDecreaseTiled);
			SE.DashStamina.Window.forceRedraw = true;
			if (SE.DashStamina.TiledStaminaDecreaseSFX.toLowerCase() !== NO_SFX) { Play_SE(SE.DashStamina.TiledStaminaDecreaseSFX); }
		}
	};

	// Is & can the player consume stamina?
	Game_Player.prototype.isConsumingStamina = function()
	{
		return (this.isDashing() && this.isMoving() && this.hasStaminaConsumption());
	};

  /*╔════════════════════╗
    ║ #Stamina adjusting ║
	╚════════════════════╝*/
//#region Stamina Adjusting

	// newPercValue must be between 0 - 100.
	Game_Player.prototype.setStaminaByPerc = function(newPercValue)
	{
		var perc = Math.max(0, Math.min(100, newPercValue)); // clamp value between 0-100
		this.setStamina(this.dashStaminaMax * (perc / 100.0));
	}

	Game_Player.prototype.setStamina = function(newValue)
	{
		var oldStamina = this.dashStamina;
		this.dashStamina = clamp(newValue, 0, this.dashStaminaMax);
		if (this.dashStamina < oldStamina)
		{
			this.postDecreaseStaminaHandling();
		} else if (this.dashStamina > oldStamina)
		{
			this.postIncreaseStaminaHandling();
		}

		if (oldStamina !== this.dashStamina) { this.onStaminaValueChanged(oldStamina, this.dashStamina); }
	};

	// Changes the MAXIMUM stamina (not the current stamina).
	Game_Player.prototype.setMaxStamina = function(newMaxValue)
	{
		this.dashStaminaMax = newMaxValue;
		if (this.dashStaminaMax < 1) { this.dashStaminaMax = 1; }
		this.setStamina(this.dashStamina); // For clamping and calling stuff in case the this.dashStamina changes.
		this.calcStaminaPerc(); // This one might be called twice if the stamina value also changes but we have to call it in case it didn't change.
	}

	// Call this when the stamina value changes (NOT when only the percentage changes, like for example by changing the this.dashStaminaMax).
	Game_Player.prototype.onStaminaValueChanged = function(oldVal, newVal)
	{
		this.updateGameVarStaminaIfRequired();
		this.calcStaminaPerc();
	}

	// Increases the stamina by a flat value.
	Game_Player.prototype.increaseStamina = function(amount)
	{
		if (amount === 0) { return; } // Do nothing.

		this.setStamina(this.dashStamina + amount);
	}

	// Decreases the stamina by a flat value.
	Game_Player.prototype.decreaseStamina = function(amount)
	{
		if (amount === 0) { return; } // Do nothing.
		
		this.setStamina(this.dashStamina - amount);
	};

	// Increases the stamina by a percentage value. It will be converted to a flat value and then set. A negative value is allowed.
	Game_Player.prototype.increaseStaminaByPerc = function(addedPerc)
	{
		var flatValue = (this.dashStaminaMax / 100.0) * addedPerc;
		this.increaseStamina(flatValue);
	}

	Game_Player.prototype.fillStamina = function()
	{
		this.setStamina(this.dashStaminaMax);
	}

	Game_Player.prototype.depleteStamina = function()
	{
		this.setStamina(0);
	};

	Game_Player.prototype.isRecoveringStamina = function()
	{
		return (this.isTryingToRecoverStamina === true) && (this.staminaRegenEnabled === true);
	};

	//------------------------------------------------------------------------------------------------------------------------------------
	// Call this method after increasing the stamina (and only call this if the stamina-value actually changed).
	//------------------------------------------------------------------------------------------------------------------------------------
	Game_Player.prototype.postIncreaseStaminaHandling = function()
	{
		if (this.staminaIsFull())
		{
			this.isTryingToRecoverStamina = false;
		}
		else
		{
			SE.DashStamina.Window.attemptToSlideIn();
		}
	}

	//------------------------------------------------------------------------------------------------------------------------------------
	// Call this method after decreasing the stamina (and only call this if the stamina-value actually changed).
	//------------------------------------------------------------------------------------------------------------------------------------
	Game_Player.prototype.postDecreaseStaminaHandling = function()
	{
		this.isTryingToRecoverStamina = false;
		SE.DashStamina.Window.attemptToSlideIn();
	};
//#endregion

	//------------------------------------------------------------------------------------------------------------------------------------
	// Check if #Common Events (CE) need running and do so if applicable
	//------------------------------------------------------------------------------------------------------------------------------------
	Game_Player.prototype.staminaEventChecks = function()
	{
		if (SE.DashStamina.HasCommonEvents)
		{
			var staminaPercRounded = Math.round(this.dashStaminaPerc * 100);
			for (var ceIdx=0; ceIdx<SE.DashStamina.CommonEvents.length; ceIdx++)
			{
				if (SE.DashStamina.CommonEvents[ceIdx].lastRunStaminaAmount === null)
				{
					if (SE.DashStamina.CommonEvents[ceIdx].thresholdIsPerc)
					{
						if (staminaPercRounded === SE.DashStamina.CommonEvents[ceIdx].threshold) { this.staminaRunCE(ceIdx); }
					}
					else
					{
						if (this.dashStamina === SE.DashStamina.CommonEvents[ceIdx].threshold) { this.staminaRunCE(ceIdx); }
					}
				}
				else
				{
					if (Math.abs(SE.DashStamina.CommonEvents[ceIdx].lastRunStaminaAmount - this.dashStamina) >= (SE.DashStamina.CE_Delta - 1))
					{
						SE.DashStamina.CommonEvents[ceIdx].lastRunStaminaAmount = null; // Allow this CE to be run again next time
					}
				}
			}
		}
	};

	Game_Player.prototype.staminaRunCE = function(ceIdx)
	{
		$gameTemp.reserveCommonEvent(SE.DashStamina.CommonEvents[ceIdx].commonEventID);
		SE.DashStamina.CommonEvents[ceIdx].lastRunStaminaAmount = this.dashStamina;
	};

	//------------------------------------------------------------------------------------------------------------------------------------
	// #Update Stamina Stuff
	//------------------------------------------------------------------------------------------------------------------------------------
	Game_Player.prototype.updateStamina = function()
	{
		// If a dialog is active and the stamina should be paused during that, then do nothing.
		if (SE.DashStamina.PauseStaminaDuringDialog && ($gameMessage.isBusy() === true)) { return; }

		this.oldDashStamina = this.dashStamina;

		var isConsumingStamina = this.isConsumingStamina();
		if (isConsumingStamina)
		{
			this.hideStaminaWindowDelayCnt = 0;

			// Only consume stamina here if the decrease-mode is set to default
			if (SE.DashStamina.DecreaseMode === EStaminaDecreaseMode.default)
			{
				this.decreaseStamina(SE.DashStamina.StaminaDecreaseDefault);
			} 
		}
		else // Not currently consuming stamina.
		{		
			if (this.staminaRegenEnabled === true)
			{
				if (this.isTryingToRecoverStamina === true)
				{
					this.hideStaminaWindowDelayCnt = 0;
					this.staminaRegenerationTimeCnt++;
					this.RegenerateStamina();
				}
				else
				{
					this.attemptToStartStaminaRegeneration();
				}
			}

			// If still not recovering stamina, increase the counter for sliding the window out and slide it out if needed (if not already sliding out).
			if ((this.isTryingToRecoverStamina === false) &&
				(SE.DashStamina.Window.wSliding.state !== ESlideState.out) &&
				(SE.DashStamina.ShowWindow === true) &&
				(SE.DashStamina.AutoHideStaminaWindow === true))
			{
				this.hideStaminaWindowDelayCnt += 1;
				if (this.hideStaminaWindowDelayCnt >= SE.DashStamina.HideStaminaWindowDelay)
				{
					this.hideStaminaWindowDelayCnt = 0;
					SE.DashStamina.Window.attemptToSlideOut();
				}
			}
		}
	
		// Threshold
		if (!isConsumingStamina)
		{
			this.requiresThresholdAmount = this.dashStaminaPerc * 100 < SE.DashStamina.StaminaAutoDashThreshold;
		}
		
		var staminaChanged = this.oldDashStamina !== this.dashStamina;
		if ((staminaChanged === true) || SE.DashStamina.Window.forceRedraw)
		{ 
			SE.DashStamina.Window.forceRedraw = false;
			if (SE.DashStamina.Window) { SE.DashStamina.Window.onAfterStaminaChanged(); }
		}

		this.staminaEventChecks();
	};

	Game_Player.prototype.calcStaminaPerc = function()
	{
		this.dashStaminaPerc = this.dashStamina / parseFloat(this.dashStaminaMax);
	};

	Game_Player.prototype.RegenerateStamina = function()
	{
		this.increaseStamina(this.calculateStaminaRegen(SE.DashStamina.StaminaRecoveryRate));
	};

	Game_Player.prototype.staminaIsFull = function()
	{
		return this.dashStamina >= this.dashStaminaMax;
	};

	// When not already recovering stamina, find out when to start recovering it and do so if required.
	Game_Player.prototype.attemptToStartStaminaRegeneration = function()
	{
		if ((this.isTryingToRecoverStamina === true) || this.staminaIsFull()) { return; } // Safety check.

		this.staminaRecoveryDelayCnt += 1;
		if (this.staminaRecoveryDelayCnt >= SE.DashStamina.StaminaRecoveryDelay)
		{
			//this.hideStaminaWindowDelayCnt = 0;
			this.staminaRecoveryDelayCnt = 0;
			this.staminaRegenerationTimeCnt = 0;
			this.isTryingToRecoverStamina = true;
		}
	};

	//------------------------------------------------------------------------------------------------------------------------------------
	// Regeneration Formula
	//------------------------------------------------------------------------------------------------------------------------------------
	Game_Player.prototype.calculateStaminaRegen = function()
	{
		if (!SE.DashStamina.UseCustomRegenFormula) { return this.calculateStaminaRegenEval();	}
		else { return this.calculateStaminaRegenNoEval();}
	};
		
	Game_Player.prototype.calculateStaminaRegenEval = function()
	{
		var base = SE.DashStamina.StaminaRecoveryRate;
		var x = this.staminaRegenerationTimeCnt;
		return eval(SE.DashStamina.RegenFormula);
	};

	Game_Player.prototype.calculateStaminaRegenNoEval = function()
	{
		return SE.DashStamina.StaminaRecoveryRate + Math.sqrt(this.staminaRegenerationTimeCnt / 50);
	};

	//------------------------------------------------------------------------------------------------------------------------------------
	// Is the player currently allowed to dash?
	//------------------------------------------------------------------------------------------------------------------------------------
	Game_Player.prototype.dashingAllowed = function()
	{
		if (this.dashStamina === 0 ||
		(!this.wasDashing && this.requiresThresholdAmount)) // Do not allow to dash if the player was not dashing the previous frame AND if the threshold was passed.
		{
			return false;
		}
		
		return true;
	};

	//------------------------------------------------------------------------------------------------------------------------------------
	// Alias for disallowing dashing
	//------------------------------------------------------------------------------------------------------------------------------------
	SE.Alias.DashStamina_Game_Player_prototype_updateDashing = Game_Player.prototype.updateDashing;
	Game_Player.prototype.updateDashing = function()
	{
		SE.Alias.DashStamina_Game_Player_prototype_updateDashing.apply(this, arguments);
		
		if (SE.DashStamina.DashingDisabled)
		{
			this._dashing = false;
			return;
		}
		
		if (!this.dashingAllowed()) { this._dashing = false; }
		this.wasDashing = this._dashing;
	};

/*╔══════════════╗
  ║ Game #Screen ║
  ╚══════════════╝*/
	// Do not just show the minimap on top of a faded-out screen.
	SE.Alias.DashStamina_Game_Screen_prototype_updateFadeOut = Game_Screen.prototype.updateFadeOut;
	Game_Screen.prototype.updateFadeOut = function()
	{
		SE.Alias.DashStamina_Game_Screen_prototype_updateFadeOut.apply(this, arguments);
		
		if (this._brightness < 255) // (this._fadeOutDuration > 0)
		{
			if (SE.DashStamina.Window !== null) { SE.DashStamina.Window.visible = false; }
			SE.DashStamina.ScreenIsFading = true;
		}
		else
		{
			SE.DashStamina.ScreenIsFading = false;
		}
	};

/*╔═════════════╗
  ║ Scene #Base ║
  ╚═════════════╝*/
	SE.Alias.DashStamina_Scene_Base_prototype_startFadeIn = Scene_Base.prototype.startFadeIn;
	Scene_Base.prototype.startFadeIn = function()
	{
		SE.Alias.DashStamina_Scene_Base_prototype_startFadeIn.apply(this, arguments);
		if (SE.DashStamina.Window !== null) { SE.DashStamina.Window.visible = false; }
	};

/*╔════════════╗
  ║ Scene #Map ║
  ╚════════════╝*/
	// Hook into the main loop
	SE.Alias.DashStamina_Scene_Map_prototype_updateMain = Scene_Map.prototype.updateMain;
	Scene_Map.prototype.updateMain = function()
	{
		SE.Alias.DashStamina_Scene_Map_prototype_updateMain.apply(this, arguments);
		$gamePlayer.updateStamina();
		if (SE.DashStamina.ShowWindow) { SE.DashStamina.Window.update(); }
	};

/*╔═══════════╗
  ║ #Game Map ║
  ╚═══════════╝*/
	// Disable Dashing?
	SE.Alias.DashStamina_Game_Map_prototype_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId)
	{
		SE.Alias.DashStamina_Game_Map_prototype_setup.apply(this, arguments);
		SE.DashStamina.DashingDisabled = ('disable_dashing' in $dataMap.meta);
	};

/*╔══════════════════════════════╗
  ║ #Stamina Regen/Deplete Items ║
  ╚══════════════════════════════╝*/
	SE.Alias.DashStamina_Scene_ItemBase_prototype_useItem = Scene_ItemBase.prototype.useItem;
	Scene_ItemBase.prototype.useItem = function()
	{
		var item = this.item();
		if ('dash_stamina' in item.meta)
		{
			var args = item.meta.dash_stamina.split(' ');
			switch(args[0].toLowerCase())
			{
				case 'add':
					if (args.length < 2) { throw 'Item-add-command is missing the value-argument.'; }
					$gamePlayer.increaseStamina(parseInt(args[1]));
					break;
				case 'refill':
					$gamePlayer.fillStamina();
					break;
				case 'deplete':
					$gamePlayer.depleteStamina();
					break;
				case 'increasemax':
					if (args.length < 2) { throw 'Item-increasemax-command is missing the value-argument.'; }
					$gamePlayer.setMaxStamina(parseInt(args[1]));
					break;
				default:
					throw 'Unknown dash_stamina itemnotetag: ' + item.meta;
			}
			
		}
		
		SE.Alias.DashStamina_Scene_ItemBase_prototype_useItem.apply(this, arguments);
	};

	SE.Alias.DashStamina_Game_Action_prototype_testApply = Game_Action.prototype.testApply;
	Game_Action.prototype.testApply = function(target)
	{
		if ('dash_stamina' in this.item().meta)
		{
			return true;
		}
		else
		{
			return SE.Alias.DashStamina_Game_Action_prototype_testApply.apply(this, arguments);
		}
	};

/*╔═════════════════════════════╗
  ║ #Stamina Window #Definition ║
  ╚═════════════════════════════╝*/
	function Window_DashStamina() { this.initialize.apply(this, arguments); }
	Window_DashStamina.prototype = Object.create(Window_Base.prototype);
	Window_DashStamina.prototype.constructor = Window_DashStamina;
	// Font Size
	Window_DashStamina.prototype.standardFontSize = function() { return SE.DashStamina.FontSize; };

	// #Initialize
	Window_DashStamina.prototype.initialize = function(x, y, width, height)
	{
		Window_Base.prototype.initialize.call(this, x, y, width, height);
		this._helpWindow = null;
		this._handlers = {};
		this._touching = false;
		this.deactivate();
		this.opacity = SE.DashStamina.WindowOpacity;
		this.gaugeText = '';
		this.forceRedraw = false;

		// Window Sliding
		this.wSliding =
		{
			enabled: SE.DashStamina.SlidingEnabled,
			state: ESlideState.none,
			slideDirValue: EDirectionValue.none, // Holds the x and y direction values (-1, 0 or 1).
			originalWinLoc: {x: x, y: y},
			state: ESlideState.none,
			isFullySlidedOut: false,
			isFullySlidedIn: true,
			isSliding: function() { return (this.state === ESlideState.in) || (this.state === ESlideState.out); }
		};
		
		if (SE.DashStamina.WindowText != ':none')
		{
			this.windowText = SE.DashStamina.WindowText;
			this.windowTextWidth = this.contents.measureTextWidth(this.windowText);
			this.windowTextGaugeSpacingX = SE.DashStamina.WindowTextGaugeSpacingX;
		}
		else
		{
			this.windowText = null;
			this.windowTextWidth = 0;
			this.windowTextGaugeSpacingX = SE.DashStamina.WindowTextGaugeSpacingX;
		}
		
		this.calculateGaugeFillColour();
		this.update();
		this.onAfterStaminaChanged();
	};

	//------------------------------------------------------------------------------------------------------------------------------------
	// Stamina Window Update
	//------------------------------------------------------------------------------------------------------------------------------------
	Window_DashStamina.prototype.update = function()
	{
		if (SE.DashStamina.ScreenIsFading)
		{
			this.visible = false;
		}
		else
		{
			Window_Base.prototype.update.call(this);
			this.drawStaminaWindow(0, 0);
			this.updateSliding();
		}
	};

	//------------------------------------------------------------------------------------------------------------------------------------
	// Stamina Window Drawing Optimizations (are not called every frame, unless the stamina is changing every frame of course)
	//------------------------------------------------------------------------------------------------------------------------------------
	Window_DashStamina.prototype.setGaugeFillWidth = function(rate)
	{
		this.gaugeFillWidth = Math.floor(SE.DashStamina.StaminaGaugeRectangle.width * rate);
	};

	// Set the desired gauge-text variable
	Window_DashStamina.prototype.setGaugeText = function()
	{
		switch(SE.DashStamina.DrawStaminaValue)
		{
			case EDrawStaminaValue.absolute:
				this.gaugeText = parseInt($gamePlayer.dashStamina) + '/' + parseInt($gamePlayer.dashStaminaMax);
				break;
			case EDrawStaminaValue.percentage:
				this.gaugeText = Math.round($gamePlayer.dashStaminaPerc * 100) + '%';
				break;
			case EDrawStaminaValue.both:
				this.gaugeText = parseInt($gamePlayer.dashStamina) + '/' + parseInt($gamePlayer.dashStaminaMax) + ' (' + Math.round($gamePlayer.dashStaminaPerc * 100) + '%)';
				break;
			case EDrawStaminaValue.none:
				this.gaugeText = '';
				return;
			default:
				throw 'ERROR: drawStaminaWindow missing case-statement or incorrect SE.DashStamina.DrawStaminaValue value. Value: ' + SE.DashStamina.DrawStaminaValue;
		}
	};

	Window_DashStamina.prototype.onAfterStaminaChanged = function()
	{
		this.calculateGaugeFillColour();
		this.setGaugeFillWidth($gamePlayer.dashStaminaPerc);
		this.setGaugeText();
	};

	//------------------------------------------------------------------------------------------------------------------------------------
	// Stamina Window #Drawing
	//------------------------------------------------------------------------------------------------------------------------------------
	Window_DashStamina.prototype.drawStaminaGauge = function(x, y)
	{
		var gaugeY = y + this.lineHeight() - 8;
		this.contents.fillRect(x, gaugeY, SE.DashStamina.StaminaGaugeRectangle.width, SE.DashStamina.StaminaGaugeRectangle.height, this.gaugeBackColor());
		this.contents.fillRect(x, gaugeY, this.gaugeFillWidth, SE.DashStamina.StaminaGaugeRectangle.height, this.gaugeFillColour);
	};

	Window_DashStamina.prototype.drawStaminaWindow = function(x, y)
	{
		this.contents.clear();
		// Draw the prefix text (if applicable)
		if (this.windowText !== null)
		{
			this.contents.drawText(this.windowText, 0, SE.DashStamina.WindowTextOffsetY, this.windowTextWidth, 0);
		}

		// Draw gauge
		this.drawStaminaGauge(SE.DashStamina.StaminaGaugeRectangle.x + this.windowTextWidth + this.windowTextGaugeSpacingX, SE.DashStamina.StaminaGaugeRectangle.y);
		
		this.resetTextColor();
		this.drawText(this.gaugeText, x + this.windowTextWidth + this.windowTextGaugeSpacingX, y + 1, SE.DashStamina.StaminaGaugeRectangle.width, 'center');
	};

	// Calculate what colour the gauge should be between the two colours depending on the percentage value of the current-stamina value.
	Window_DashStamina.prototype.calculateGaugeFillColour = function()
	{
		var c1 = hexToRgb(SE.DashStamina.StaminaGaugeColor1);
		var c2 = hexToRgb(SE.DashStamina.StaminaGaugeColor2);
			
		var ratio = $gamePlayer.dashStaminaPerc;
		var hex = function(x) {
			x = x.toString(16);
			return (x.length === 1) ? '0' + x : x;
		};

		var r = Math.ceil(c1.r * ratio + c2.r * (1-ratio));
		var g = Math.ceil(c1.g * ratio + c2.g * (1-ratio));
		var b = Math.ceil(c1.b * ratio + c2.b * (1-ratio));

		var middle = '#' + hex(r) + hex(g) + hex(b);
		this.gaugeFillColour = middle;
	};

	//------------------------------------------------------------------------------------------------------------------------------------
	// Stamina Window #Show, #Hide & #Slide
	//------------------------------------------------------------------------------------------------------------------------------------
	// Calculates and sets the visibility of this window.
	Window_DashStamina.prototype.updateVisibility = function()
	{
		this.visible = this.shouldThisBeVisible();
	}
	
	// Alias for re-checking the stamina window visibility when a dialog is active (because we may want to hide it during a dialog).
	SE.Alias.DashStamina_Game_Message_prototype_add = Game_Message.prototype.add;
	Game_Message.prototype.add = function(text)
	{
		SE.Alias.DashStamina_Game_Message_prototype_add.apply(this, arguments);
		if (SE.DashStamina.Window) { SE.DashStamina.Window.updateVisibility(); }
	}

	// Calculates whether this window should be visible or not.
	Window_DashStamina.prototype.shouldThisBeVisible = function()
	{
		// Hide if...
		if (
			// The stamina window should never be visible anyway.
			((SE.DashStamina.ShowWindow === false)) ||

			// The user forced it to be hidden.
			(SE.DashStamina.ForcedHidden === true) ||
			
			// It should be hidden during an active GameMessage and if the parameter is set to do so.
			((SE.DashStamina.IsHiddenDuringGameMessage === true) && ($gameMessage.isBusy() === true)) ||

			// The screen is currently fading out.
			(SE.DashStamina.ScreenIsFading === true) ||

			// If the window can slide and the window is fully slided-out and is currently not sliding, therefor there is no point in rendering.
			((this.wSliding.enabled === true) && (this.wSliding.isFullySlidedOut === true) && (this.wSliding.isSliding() === false))
			)
		{
			return false
		};

		// Show if...
		if (
			// Fully slided-in OR if it does not slide OR if it is currently sliding.
			(this.wSliding.isFullySlidedIn === true) || (this.wSliding.isSliding() === true) ||

			// The stamina window does not slide.
			(this.wSliding.SlidingEnabled === false) ||

			// The player is recovering stamina.
			($gamePlayer.isRecoveringStamina())
			)
		{
			return true;
		}
		
		// We probably missed some conditional-check so just return true.
		console.log('Warning: "Window_DashStamina.prototype.shouldThisBeVisible" defaulted to true.')
		return true;
	}
	
	/* Regarding sliding: 
	 * ONLY slide if:
	 * 1. Sliding is enabled in the parameters.
	 * 2. The stamina window is visible.
	 * 3. The screen is not fading.
	 * 
	 * ONLY start sliding-in if the above points 1-3 plus:
	 * A. The window is not already sliding-in.
	 * 
	 * ONLY start sliding-out if the above points 1-3 plus:
	 * B. The window is not already sliding-out.
	 * 
	 * Sliding is started by calling either attemptToSlideIn() or attemptToSlideOut()
	 * 
	 * attemptToSlideIn() should be called when:
	 * - Stamina is increasing or decreasing.
	 * 
	 * attemptToSlideOut() should be called when:
	 * - Stamina hasn't changed for at least SE.DashStamina.HideStaminaWindowDelay (not in seconds but in updates) time.
	 * - SE.DashStamina.AutoHideStaminaWindow is true.
	 */
	Window_DashStamina.prototype.canSlidingStart = function()
	{
		// Do nothing if...
		if (
			// There is no sliding desired.
			(SE.DashStamina.SlidingEnabled === false) ||

			// The window is not visible.
			(SE.DashStamina.ShowWindow === false) ||

			// The screen is fading.
			(SE.DashStamina.ScreenIsFading === true)
			)
		{
			return false;
		}

		return true;
	}

	Window_DashStamina.prototype.canSlidingInStart = function()
	{
		return ((this.wSliding.state !== ESlideState.in) && this.canSlidingStart());
	}

	Window_DashStamina.prototype.canSlidingOutStart = function()
	{
		return ((this.wSliding.state !== ESlideState.out) && this.canSlidingStart() && ($gamePlayer.isRecoveringStamina() === false));
	}

	// Attempt to slide the window further in.
	Window_DashStamina.prototype.attemptToSlideIn = function()
	{
		if (this.canSlidingInStart() === false) { return; }
		
		debugLog('Starting to slide-in.');
		switch (SE.DashStamina.WindowSlideOutDir)
		{
			// We'll use inverted values compared to the Switch from attemptToSlideOut().
			case ESlideDir.up:
				this.wSliding.slideDirValue = EDirectionValue.down;
				break;
			case ESlideDir.left:
				this.wSliding.slideDirValue = EDirectionValue.right;
				break;
			case ESlideDir.right:
				this.wSliding.slideDirValue = EDirectionValue.left;
				break;
			case ESlideDir.down:
				this.wSliding.slideDirValue = EDirectionValue.up;
				break;
			default:
				throw 'Window_DashStamina.prototype.attemptToSlideIn: Unknown switch value: ' + SE.DashStamina.WindowSlideOutDir;
		}
		this.wSliding.state = ESlideState.in;
		this.updateVisibility();
	};

	// Attempt to slide the window further out.
	Window_DashStamina.prototype.attemptToSlideOut = function()
	{
		if (this.canSlidingOutStart() === false) { return; }
		
		debugLog('Starting to slide-out.');
		switch (SE.DashStamina.WindowSlideOutDir)
		{
			case ESlideDir.up:
				this.wSliding.slideDirValue = EDirectionValue.up;
				break;
			case ESlideDir.left:
				this.wSliding.slideDirValue = EDirectionValue.left;
				break;
			case ESlideDir.right:
				this.wSliding.slideDirValue = EDirectionValue.right;
				break;
			case ESlideDir.down:
				this.wSliding.slideDirValue = EDirectionValue.down;
				break;
			default:
				throw 'Window_DashStamina.prototype.attemptToSlideOut: Unknown switch value: ' + SE.DashStamina.WindowSlideOutDir;
		}
		this.wSliding.state = ESlideState.out;
		this.updateVisibility();
	};

	Window_DashStamina.prototype.handleSlidingEnd = function()
	{
		if (this.wSliding.state === ESlideState.in)
		{
			// Stop sliding in
			if ((this.wSliding.slideDirValue.x  ===  1) && (this.x >= this.wSliding.originalWinLoc.x) ||
				(this.wSliding.slideDirValue.x  === -1) && (this.x <= this.wSliding.originalWinLoc.x) ||
				(this.wSliding.slideDirValue.y  ===  1) && (this.y >= this.wSliding.originalWinLoc.y) ||
				(this.wSliding.slideDirValue.y  === -1) && (this.y <= this.wSliding.originalWinLoc.y))
			{
				debugLog('The window fully slided-in.');
				this.wSliding.state = ESlideState.none;
				this.restoreOriginalWindowLocation();
				this.wSliding.isFullySlidedIn = true;
				this.updateVisibility();
			}
		}
		else
		{
			// Stop sliding out
			if ((this.x < -this.width)  || (this.x > Graphics._width + this.width) ||
				(this.y < -this.height) || (this.x > Graphics._height + this.height))
			{
				debugLog('The window fully slided-out.');
				this.wSliding.state = ESlideState.none;
				this.wSliding.isFullySlidedOut = true;
				this.updateVisibility();
			}
		}
	};

	Window_DashStamina.prototype.restoreOriginalWindowLocation = function()
	{
		this.x = this.wSliding.originalWinLoc.x;
		this.y = this.wSliding.originalWinLoc.y;
	}

	Window_DashStamina.prototype.updateSliding = function()
	{
		if ((this.wSliding.state === ESlideState.disabled) || (this.wSliding.state === ESlideState.none)) { return; }

		this.x += this.wSliding.slideDirValue.x * SE.DashStamina.WindowSlideSpeed;
		this.y += this.wSliding.slideDirValue.y * SE.DashStamina.WindowSlideSpeed;
		
		this.wSliding.isFullySlidedOut = false;
		this.wSliding.isFullySlidedIn = false;
		
		this.handleSlidingEnd();
	};

/*╔════════════════════════╗
  ║ #Create Stamina Window ║
  ╚════════════════════════╝*/
	Scene_Map.prototype.createDashWindow = function()
	{
		// Dispose the old window, if any
		if (SE.DashStamina.Window !== null) { this.removeWindow(SE.DashStamina.Window); }
		
		// Does the map consume stamina?
		$gamePlayer.mapConsumeStamina = !('dstam_disable' in $dataMap.meta);
		if(SE.DashStamina.ShowWindow)
		{
			var x = 0;
			if (SE.DashStamina.WindowHorizontalAlignment === EAlign.right) { x = Graphics.width - SE.DashStamina.WindowWidth; }
			var y = 0;
			if (SE.DashStamina.WindowVerticalAlignment === EAlign.bottom) { y = Graphics.height - SE.DashStamina.WindowHeight; }
			
			SE.DashStamina.Window = new Window_DashStamina(x + SE.DashStamina.Window_X, y + SE.DashStamina.Window_Y, SE.DashStamina.WindowWidth, SE.DashStamina.WindowHeight);
			this.addChildAt(SE.DashStamina.Window, Math.min(SE.DashStamina.Window_Z, this.children.length));
			if (SE.DashStamina.AutoHideStaminaWindow)
			{
				SE.DashStamina.Window.visible = SE.DashStamina.Window.wSliding.enabled ? false : true;
			}
		}
	};

	// Omg why does RPG Maker not have this method by default...
	Scene_Base.prototype.removeWindow = function(window)
	{
		var index = this.children.indexOf(window);
		if (index > -1) { this.children.splice(index, 1); }
	};

	SE.Alias.DashStamina_Scene_Map_prototype_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
	Scene_Map.prototype.createDisplayObjects = function()
	{
		SE.Alias.DashStamina_Scene_Map_prototype_createDisplayObjects.apply(this, arguments);
		this.createDashWindow();
	};
/*╔═══════════╗
  ║ Play #SFX ║
  ╚═══════════╝*/
	function Play_SE(filename)
	{
		var volume = (SE.DashStamina.DefaultVolume > -1) ? SE.DashStamina.DefaultVolume : AudioManager.seVolume;
		AudioManager.playSe({name: filename, volume: volume, pitch: 100, pan: 0});
	}

/*╔════════════════════╗
  ║ #Saving & #Loading ║
  ╚════════════════════╝*/
	SE.Alias.DashStamina_DataManager_makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = function()
	{
		var contents = SE.Alias.DashStamina_DataManager_makeSaveContents.apply(this, arguments);
		contents.dashStamina = $gamePlayer.dashStamina;
		contents.dashStaminaMax = $gamePlayer.dashStaminaMax;
		contents.staminaRegenEnabled = $gamePlayer.staminaRegenEnabled;
		return contents;
	};

	SE.Alias.DashStamina_DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents)
	{
		SE.Alias.DashStamina_DataManager_extractSaveContents.apply(this, arguments);
		$gamePlayer.dashStamina = contents.dashStamina;
		$gamePlayer.dashStaminaMax = contents.dashStaminaMax;
		$gamePlayer.staminaRegenEnabled = contents.staminaRegenEnabled;
	};

/*╔═════════════════╗
  ║ Plugin #Command ║
  ║                 ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════╗
  ║ Note: The items are separated by spaces. The command is the first word and any following words are args. args is an array.  ║
  ╚═════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝*/
	SE.Alias.DashStamina_Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		SE.Alias.DashStamina_Game_Interpreter_prototype_pluginCommand.apply(this, arguments);
		if (command.toLowerCase() === SE.DashStamina.PluginCmdId) { SE.DashStamina.PluginCommand(command, args); }
	};

	// Concatenate the 'arguments' starting at a specific index because they are all part of an eval.
	SE.DashStamina.concatArgs = function(args, startIdx)
	{
		var evalstr = '';
		for (var argIdx = startIdx; argIdx < args.length; argIdx++)
		{
			evalstr += args[argIdx] + ' ';
		}
		return evalstr;
	};

	SE.DashStamina.PluginCommand = function(cmd, args)
	{
		switch(args[0].toLowerCase())
		{
			case 'refill':
				$gamePlayer.fillStamina();
				SE.DashStamina.Window.forceRedraw = true;
				break;
			case 'deplete':
				$gamePlayer.depleteStamina();
				SE.DashStamina.Window.forceRedraw = true;
				break;
			case 'setabs':
				$gamePlayer.setStamina(parseInt(args[1]));
				SE.DashStamina.Window.forceRedraw = true;
				break;
			case 'set':
				$gamePlayer.setStaminaByPerc(parseInt(args[1]));
				SE.DashStamina.Window.forceRedraw = true;
			break;
			case 'setvar':
				$gamePlayer.setStaminaByPerc(parseInt($gameVariables.value(args[1])));
				SE.DashStamina.Window.forceRedraw = true;
			break;
			case 'seteval':
				var perc = parseInt(eval(SE.DashStamina.concatArgs(args, 1)));
				if (isNaN(perc)) { throw new Error('Plugin command: "Stamina SetEval" evaled to a NaN value: ' + perc + '.'); }
				$gamePlayer.setStaminaByPerc(perc);
				SE.DashStamina.Window.forceRedraw = true;
			break;
			case 'increase':
				$gamePlayer.increaseStaminaByPerc(parseInt(args[1]));
				SE.DashStamina.Window.forceRedraw = true;
			break;
			case 'decrease':
				$gamePlayer.increaseStaminaByPerc(-parseInt(args[1]));
				SE.DashStamina.Window.forceRedraw = true;
			break;
			case 'increaseabs':
				$gamePlayer.increaseStamina(parseInt(args[1]));
				SE.DashStamina.Window.forceRedraw = true;
			break;
			case 'decreaseabs':
				$gamePlayer.decreaseStamina(parseInt(args[1]));
				SE.DashStamina.Window.forceRedraw = true;
			break;
			case 'showwindow':
				if (SE.DashStamina.Window !== null)
				{
					$gamePlayer.hideStaminaWindowDelayCnt = 0;
					SE.DashStamina.Window.visible = (!SE.DashStamina.ForcedHidden);
				}
				break;
			case 'refillhide':
				$gamePlayer.setStamina($gamePlayer.dashStaminaMax);
				// NO break-statement here! We want to hide the window as well!
			case 'hidewindow':
				if (SE.DashStamina.Window !== null)
				{
					$gamePlayer.hideStaminaWindowDelayCnt = SE.DashStamina.HideStaminaWindowDelay;
					SE.DashStamina.Window.visible = false;
				}
				break;
			case 'setmax':
				$gamePlayer.setMaxStamina(parseInt(args[1]));
				SE.DashStamina.Window.forceRedraw = true;
				break;
			case 'setmaxeval':
				$gamePlayer.setMaxStamina(parseInt(eval(SE.DashStamina.concatArgs(args, 1))));
				SE.DashStamina.Window.forceRedraw = true;
				break;
			case 'setmaxvar':
				$gamePlayer.setMaxStamina(parseInt($gameVariables.value(args[1])));
				SE.DashStamina.Window.forceRedraw = true;
				break;
			case 'increasemax':
				$gamePlayer.setMaxStamina($gamePlayer.dashStaminaMax + parseInt(args[1]));
				SE.DashStamina.Window.forceRedraw = true;
				break;
			case 'enabledashing':
				switch(args[1].toLowerCase())
				{
					case 'true':
						SE.DashStamina.DashingDisabled = false;
						break;
					case 'false':
						SE.DashStamina.DashingDisabled = true;
						break;
					case 'toggle':
						SE.DashStamina.DashingDisabled = !SE.DashStamina.DashingDisabled;
						break;
					default:
						throw new Error('"Stamina EnableDashing" received an unknown argument: ' + args[1] + '. Expected: True, False or Toggle.');
				}
				break;
			case 'forcehide':
				SE.DashStamina.ForcedHidden = (args[1].toLowerCase() === 'true');
				if (SE.DashStamina.Window !== null)
				{
					SE.DashStamina.Window.visible = !SE.DashStamina.ForcedHidden;
				}
				break;
			case 'setdecreasemode':
				SE.DashStamina.DecreaseMode = (args[1].toLowerCase() === 'default') ?  EStaminaDecreaseMode.default : EStaminaDecreaseMode.tile;
				break;
			case 'toggledecreasemode':
				SE.DashStamina.DecreaseMode = (SE.DashStamina.DecreaseMode === EStaminaDecreaseMode.default) ? EStaminaDecreaseMode.tile : EStaminaDecreaseMode.default;
				break;
			case 'regen':
				var staminaRegenParam = args[1].toLowerCase();
				switch (staminaRegenParam)
				{
					case 'enabled':
					case 'true':
						if ($gamePlayer !== null) { $gamePlayer.staminaRegenEnabled = true; }
						else { console.log("The Stamina Regen Enabled command failed because $gamePlayer is null."); }
						break;
					case 'disabled':
					case 'false':
						if ($gamePlayer !== null) { $gamePlayer.staminaRegenEnabled = false; }
						else { console.log("The Stamina Regen Disabled command failed because $gamePlayer is null."); }
						break;
					case 'toggle':
						if ($gamePlayer !== null) { $gamePlayer.staminaRegenEnabled = !$gamePlayer.staminaRegenEnabled; }
						else { console.log("The Stamina Regen Toggle command failed because $gamePlayer is null."); }
						break;
					default:
						throw 'Received unkown parameter for Plugin Command "StaminaRegen": : ' + staminaRegenParam;
				}
				break;
			default:
				throw 'Stamina PluginCommand invalid command: ' + args[0];
		} 
	};

})();
/*╔═════════════╗
  ║ End of File ║
  ╚═════════════╝*/