/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import {
	InnerBlocks,
	useBlockProps,
	InspectorAdvancedControls,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	useSetting,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { SelectControl, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function GroupEdit( { attributes, setAttributes, clientId } ) {
	const { hasInnerBlocks, themeSupportsLayout } = useSelect(
		( select ) => {
			const { getBlock, getSettings } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
				themeSupportsLayout: getSettings()?.supportsLayout,
			};
		},
		[ clientId ]
	);
	const defaultLayout = useSetting( 'layout' ) || {};
	const { tagName: TagName = 'div', templateLock, layout = {} } = attributes;
	const usedLayout = !! layout && layout.inherit ? defaultLayout : layout;

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		themeSupportsLayout
			? blockProps
			: { className: 'wp-block-group__inner-container' },
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
			__experimentalLayout: themeSupportsLayout ? usedLayout : undefined,
		}
	);

	return (
		<>
			<InspectorAdvancedControls>
				<div className="block-library-group-block-html-element-control">
					<SelectControl
						label={ __( 'HTML element' ) }
						options={ [
							{ label: __( 'Default (<div>)' ), value: 'div' },
							{ label: '<header>', value: 'header' },
							{ label: '<main>', value: 'main' },
							{ label: '<section>', value: 'section' },
							{ label: '<article>', value: 'article' },
							{ label: '<aside>', value: 'aside' },
							{ label: '<footer>', value: 'footer' },
						] }
						value={ TagName }
						onChange={ ( value ) =>
							setAttributes( { tagName: value } )
						}
					/>
					<HTMLElementCheckerMessage element={ TagName } />
				</div>
			</InspectorAdvancedControls>
			{ themeSupportsLayout && <TagName { ...innerBlocksProps } /> }
			{ /* Ideally this is not needed but it's there for backward compatibility reason
				to keep this div for themes that might rely on its presence */ }
			{ ! themeSupportsLayout && (
				<TagName { ...blockProps }>
					<div { ...innerBlocksProps } />
				</TagName>
			) }
		</>
	);
}

function HTMLElementCheckerMessage( { element } ) {
	const messages = {
		header: __(
			'The <header> element should represent introductory content, typically a group of introductory or navigational aids.'
		),
		main: __(
			'The <main> element should be used for the primary content of your document only. '
		),
		section: __(
			"The <section> element should represent a standalone portion of the document that can't be better represented by another element."
		),
		article: __(
			'The <article> element should represent a self contained, syndicatable portion of the document.'
		),
		aside: __(
			"The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."
		),
		footer: __(
			'The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'
		),
	};

	const msg = messages[ element ];

	if ( ! msg ) {
		return null;
	}

	return (
		<div className="block-library-group-block-html-element-control__notice">
			<Notice status="warning" isDismissible={ false }>
				{ msg }
			</Notice>
		</div>
	);
}

export default GroupEdit;
