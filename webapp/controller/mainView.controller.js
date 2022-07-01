sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/richtexteditor/RichTextEditor",
    "sap/m/Button",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, RichTextEditor, Button, MessageBox) {
        "use strict";

        return Controller.extend("com.bharath.dynamicritchtexteditor.controller.mainView", {
            onInit: function () {
            },

            onSelectionChange: function (oEvent) {
                var oModel = this.getView().getModel();
                var that = this;
                oModel.read("/Categories", {
                    success: function (data) {
                        // debugger;
                        var length = data.results.length;
                        that.createRTENode(length);
                    },
                    error: function (error) {
                        debugger;
                    }
                });
            },

            createRTENode: function (length) {
                var that = this;
                var data = "<p>Paragraph</p> <b>bharath</b> ";
                //creating entry

                var id1 = jQuery.sap.uid();
                var id2 = jQuery.sap.uid();

                
                 //adding buttons
                 var Button1 = new Button({
                    text: "Red",
                    type: sap.m.ButtonType.Reject,
                    press: "onRedPress"
                });
                Button1.data("id1", id1);
                Button1.data("id2", id2);
                that.getView().byId("idDetailsPanel").addContent(Button1);

                var Button2 = new Button({
                    text: "Yellow",
                    type: sap.m.ButtonType.Critical,
                    press: function (oEvent) {
                        that.onYellowPress(oEvent);
                    }
                });
                Button2.data("id1", id1);
                Button2.data("id2", id2);
                that.getView().byId("idDetailsPanel").addContent(Button2);

                var Button3 = new Button({
                    text: "Green",
                    type: sap.m.ButtonType.Accept,
                    press: "onGreenPress"
                });
                Button3.data("id1", id1);
                Button3.data("id2", id2);
                that.getView().byId("idDetailsPanel").addContent(Button3);


                that.oRichTextEditor = new RichTextEditor(id1, {
                    width: "45%",
                    height: "45%",
                    customToolbar: true,
                    showGroupFont: true,
                    showGroupLink: true,
                    showGroupInsert: true,
                    value: data,
                    ready: function () {
                        this.addButtonGroup("styleselect").addButtonGroup("table");
                    }
                });

                that.oRichTextEditor1 = new RichTextEditor(id2, {
                    width: "45%",
                    height: "45%",
                    customToolbar: true,
                    showGroupFont: true,
                    showGroupLink: true,
                    showGroupInsert: true,
                    editable: false,
                    value: data,
                    ready: function () {
                        this.addButtonGroup("styleselect").addButtonGroup("table");
                    }
                });


                //adding element to screen
                that.getView().byId("idDetailsPanel").addContent(that.oRichTextEditor);
                that.getView().byId("idDetailsPanel").addContent(that.oRichTextEditor1);
            },

            onYellowPress: function (oEvent) {
                try {
                    var id1 = oEvent.getSource().data("id1");
                    var id2 = oEvent.getSource().data("id2");
                    var ritchTextEditorValue = encodeURIComponent(sap.ui.getCore().byId(id1).getValue());

                    if (ritchTextEditorValue) {
                        var appendMessage = "<p>" + "sap.ushell.Container.getService('UserInfo').getUser().getFullName "
                            + "Time: " + Date() +
                            " : Yellow"
                            +"</p>";

                        sap.ui.getCore().byId(id2).setValue(appendMessage + decodeURIComponent(ritchTextEditorValue));

                    }
                    // }
                    debugger;
                } catch (error) {
                    MessageBox.error(error.toString());
                }
            }
        });
    });
