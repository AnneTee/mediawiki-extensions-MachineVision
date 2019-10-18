var pathToWidget = '../../../resources/widgets/SuggestedTagsPage.js',
	hooks = require( '../support/hooks.js' ),
	sinon = require( 'sinon' );

QUnit.module( 'SuggestedTagsPage', hooks );

QUnit.test( 'Constructor test', function ( assert ) {
	var SuggestedTagsPage = require( pathToWidget ),
		widget = new SuggestedTagsPage();
	assert.ok( true );
} );

QUnit.test( 'Tabs do not load for anonymous user', function ( assert ) {
	var SuggestedTagsPage = require( pathToWidget ),
		widget,
		sandbox = sinon.createSandbox();

	sandbox.stub( global.mw.config, 'get' )
		.withArgs( 'wgUserName' ).returns( null )
		.withArgs( 'wgUserGroups' ).returns( [ null ] );

	widget = new SuggestedTagsPage();
	assert.strictEqual( widget.tabs, null );
} );

QUnit.test( 'Tabs do not load for un-autoconfirmed user', function ( assert ) {
	var SuggestedTagsPage = require( pathToWidget ),
		widget,
		sandbox = sinon.createSandbox();

	sandbox.stub( global.mw.config, 'get' )
		.withArgs( 'wgUserName' ).returns( 'UserName' )
		.withArgs( 'wgUserGroups' ).returns( null );

	widget = new SuggestedTagsPage();
	assert.strictEqual( widget.tabs, null );
} );

QUnit.test( 'Tabs load for authenticated and autoconfirmed user', function ( assert ) {
	var SuggestedTagsPage = require( pathToWidget ),
		widget,
		sandbox = sinon.createSandbox();

	sandbox.stub( global.mw.config, 'get' )
		.withArgs( 'wgUserName' ).returns( 'UserName' )
		.withArgs( 'wgUserGroups' ).returns( [ '*', 'user', 'autoconfirmed' ] );

	widget = new SuggestedTagsPage();
	assert.strictEqual( widget.tabs instanceof OO.ui.IndexLayout, true );
} );