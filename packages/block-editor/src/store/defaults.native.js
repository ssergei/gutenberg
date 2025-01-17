/**
 * Internal dependencies
 */
import {
	PREFERENCES_DEFAULTS,
	SETTINGS_DEFAULTS as SETTINGS,
} from './defaults.js';

const SETTINGS_DEFAULTS = {
	...SETTINGS,
	alignWide: true,
	supportsLayout: false,
};

export { PREFERENCES_DEFAULTS, SETTINGS_DEFAULTS };
