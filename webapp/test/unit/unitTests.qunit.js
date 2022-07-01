/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"combharath/dynamic_ritchtext_editor/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
