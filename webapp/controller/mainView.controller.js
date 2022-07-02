sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/richtexteditor/RichTextEditor",
    "sap/m/Button",
    "sap/m/MessageBox",
    "sap/m/Panel",
    "sap/m/Toolbar",
    "sap/m/OverflowToolbar",
    "sap/m/Title",
    "sap/m/ToolbarSpacer",
    "sap/m/HBox",
    "sap/m/VBox",
    "sap/ui/core/CustomData",
    "sap/m/FormattedText"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, RichTextEditor, Button, MessageBox, Panel, Toolbar, OverflowToolbar, Title, ToolbarSpacer, HBox, VBox, CustomData, FormattedText) {
        "use strict";

        return Controller.extend("com.bharath.dynamicritchtexteditor.controller.mainView", {
            onInit: function () {
            },

            getValue: function () {
                var noOfNodesToBeMade = this.getView().byId("inputId").getValue();
                this.createRTENode(noOfNodesToBeMade);
            },

            onSelectionChange: function (oEvent) {
                var oModel = this.getView().getModel();
                var that = this;
                oModel.read("/Categories", {
                    success: function (data) {
                        var length = data.results.length;
                        that.createRTENode(length);
                    },
                    error: function (error) {
                        MessageBox.error("error: ", error.stringify());
                    }
                });
            },

            getNewId: function () {
                return jQuery.sap.uid();
            },

            createLayout: function (panelHeader, data) {
                var panelId1 = this.getNewId(),
                    panelId2 = this.getNewId(),
                    panelId3 = this.getNewId(),
                    RTEId1 = this.getNewId(),
                    RTEId2 = this.getNewId(),
                    redButtonId = this.getNewId(),
                    yellowButtonId = this.getNewId(),
                    greenButtonId = this.getNewId();
                var that = this;

                return new Panel(panelId1, {
                    content: [
                        new Toolbar({
                            content: [
                                new OverflowToolbar({
                                    style: "Clear",
                                    width: "65%", //adjust this as per the required button position
                                    content: [
                                        new Title({
                                            text: panelHeader
                                        })]
                                }),
                            ]
                        }),

                        new HBox({
                            justifyContent: "Inherit",
                            items: [
                                new VBox({
                                    width: "100%",
                                    items: [
                                        new Panel(panelId2, {
                                            content: [
                                                new FormattedText({
                                                    htmlText: "<div style='padding-bottom:12px !important'>Ammababoi</div></br>"
                                                }),
                                                new Button({    //using this just for proper alignment
                                                    text: "",
                                                    type: sap.m.ButtonType.Ghost,
                                                    enabled: false
                                                }),
                                                new ToolbarSpacer(),
                                                new RichTextEditor(RTEId1, {
                                                    width: "95%",
                                                    value: data,
                                                    busy: true,
                                                    ready: function (oEvent) { oEvent.getSource().setBusy(false); }
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new VBox({
                                    width: "100%",
                                    items: [
                                        new Panel(panelId3, {
                                            content: [
                                                new Button(redButtonId, {
                                                    text: "Red",
                                                    type: sap.m.ButtonType.Reject,
                                                    press: function (oEvent) { that.onRedPress(oEvent); },
                                                    customData: [
                                                        new CustomData({ key: "RTEid1", value: RTEId1 }),
                                                        new CustomData({ key: "RTEid2", value: RTEId2 })
                                                    ]
                                                }),
                                                new Button(yellowButtonId, {
                                                    text: "Yellow",
                                                    type: sap.m.ButtonType.Attention,
                                                    press: function (oEvent) { that.onYellowPress(oEvent) },
                                                    customData: [
                                                        new CustomData({ key: "RTEid1", value: RTEId1 }),
                                                        new CustomData({ key: "RTEid2", value: RTEId2 })
                                                    ]
                                                }),
                                                new Button(greenButtonId, {
                                                    text: "Green",
                                                    type: sap.m.ButtonType.Accept,
                                                    press: function (oEvent) { that.onGreenPress(oEvent) },
                                                    customData: [
                                                        new CustomData({ key: "RTEid1", value: RTEId1 }),
                                                        new CustomData({ key: "RTEid2", value: RTEId2 })
                                                    ]
                                                }),
                                                new ToolbarSpacer(),

                                                new RichTextEditor(RTEId2, {
                                                    width: "95%",
                                                    editable: false,
                                                    busy: true,
                                                    ready: function (oEvent) { oEvent.getSource().setBusy(false); }
                                                })
                                            ]
                                        })
                                    ]
                                })]
                        })]
                });

            },

            createRTENode: function (noOfNodesToBeMade) {
                // destroying existing content first if any
                try {
                    var entries = this.getView().byId("idScrollContainer").getContent();
                    entries.forEach(function (RTEditor) {
                        RTEditor.destroy();
                    });
                } catch (error) {
                    MessageBox.error("Unable to destroy existing instances of RitchText Editor instances!");
                }

                var that = this;

                for (var i = 1; i <= noOfNodesToBeMade; i++) {
                    //Creating Panel
                    var panelHeader = "Panel" + i;
                    var testData = "<p>Hi this is</p> <b>Bharath</b>" + i;
                    var panelInstance = this.createLayout(panelHeader, testData);

                    //adding panel to scroll controller
                    that.getView().byId("idScrollContainer").addContent(panelInstance);
                }
            },

            onRedPress: function (oEvent) {
                oEvent.getSource().setIcon("sap-icon://message-error");
                var RTEId1 = oEvent.getSource().data("RTEid1"),
                    RTEId2 = oEvent.getSource().data("RTEid2");

                var ritchTextEditorValue = encodeURIComponent(sap.ui.getCore().byId(RTEId1).getValue());
                if (ritchTextEditorValue) {
                    var appendMessage = "<p>" + "sap.ushell.Container.getService('UserInfo').getUser().getFullName "
                        + "Time: " + Date() +
                        " : RED"
                        + "</p>";

                    sap.ui.getCore().byId(RTEId2).setValue(appendMessage + decodeURIComponent(ritchTextEditorValue));
                }
            },

            onYellowPress: function (oEvent) {
                oEvent.getSource().setIcon("sap-icon://message-warning");
                var RTEId1 = oEvent.getSource().data("RTEid1"),
                    RTEId2 = oEvent.getSource().data("RTEid2");

                var ritchTextEditorValue = encodeURIComponent(sap.ui.getCore().byId(RTEId1).getValue());
                if (ritchTextEditorValue) {
                    var appendMessage = "<p>" + "sap.ushell.Container.getService('UserInfo').getUser().getFullName "
                        + "Time: " + Date() +
                        " : YELLOW"
                        + "</p>";

                    sap.ui.getCore().byId(RTEId2).setValue(appendMessage + decodeURIComponent(ritchTextEditorValue));
                }
            },

            onGreenPress: function (oEvent) {
                oEvent.getSource().setIcon("sap-icon://message-success");
                var RTEId1 = oEvent.getSource().data("RTEid1"),
                    RTEId2 = oEvent.getSource().data("RTEid2");

                var ritchTextEditorValue = encodeURIComponent(sap.ui.getCore().byId(RTEId1).getValue());
                if (ritchTextEditorValue) {
                    var appendMessage = "<p>" + "sap.ushell.Container.getService('UserInfo').getUser().getFullName "
                        + "Time: " + Date() +
                        " : GREEN"
                        + "</p>";

                    sap.ui.getCore().byId(RTEId2).setValue(appendMessage + decodeURIComponent(ritchTextEditorValue));
                }
            }
        });
    });
