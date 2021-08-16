/**
 * WordPress dependencies
 */
import { createSlotFill } from '@wordpress/components';

const InspectorControlsDefault = createSlotFill( 'InspectorControls' );
const InspectorControlsBlock = createSlotFill( 'InspectorControlsBlock' );
const InspectorControlsAdvanced = createSlotFill( 'InspectorAdvancedControls' );
const InspectorControlsDimensions = createSlotFill(
	'InspectorDimensionsControls'
);

const groups = {
	default: InspectorControlsDefault,
	block: InspectorControlsBlock,
	advanced: InspectorControlsAdvanced,
	dimensions: InspectorControlsDimensions,
};

export default groups;
