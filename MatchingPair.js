;
(function () {


    connections = [],
    updateConnections = function (conn, remove) {
        if (!remove) connections.push(conn);
        else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
                if (connections[i] == conn) {
                    idx = i;
                    break;
                }
            }
            if (idx != -1) connections.splice(idx, 1);
        }
    };

    jsPlumb.ready(function () {

        var instance = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            PaintStyle: { stroke: '#666' },
            EndpointHoverStyle: { fill: "dimgray" },
            HoverPaintStyle: { stroke: "dimgray" },
            EndpointStyle: { width: 20, height: 16, stroke: '#666' },
            dragDropEndPoints: "Rectangle",
            Anchors: ["TopCenter", "TopCenter"],
            Container: "canvas"
        });

        // suspend drawing and initialise.
        instance.batch(function () {

            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
                updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
                updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
                //  only remove here, because a 'connection' event is also fired.
                // in a future release of jsplumb this extra connection event will not
                // be fired.
                updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var dropOptions = {
                tolerance: "touch",
                hoverClass: "dropHover",
                activeClass: "dragActive"
            };

            var match = [false, false, false, false];

            var color = "rgb(128, 128, 128)";
            var dragDropEndPoints = {
                dragDropEndPoints: ["Dot", {radius: 10} ],
                paintStyle: { fill: color, opacity: 1.0 },
                isSource: true,
                scope: 'grey',
                connectorStyle: {
                    stroke: color,
                    strokeWidth: 4
                },
                connector: "Straight",
                isTarget: true,
                dropOptions: dropOptions,
                beforeDrop: function (params) {
                    var source = params.sourceId.substr(0, params.sourceId.length -2);
                    var target = params.targetId.substr(0, params.targetId.length -2);
                    if(source == target) {
                        return false;
                    } else {
                        var sourceNo = params.sourceId[params.sourceId.length -1];
                        var targetNo = params.targetId[params.targetId.length -1];
                        if(sourceNo == targetNo)
                            match[sourceNo]=true;
                        if((connections.length+1) == 3) {
                            var ans1, ans2, ans3;
                            if(match[1]==true)
                                ans1 = "Answer 1 is Correct\n";
                            else
                                ans1 = "Answer 1 is Wrong\n";
                            if(match[2]==true)
                                ans2 = "Answer 2 is Correct\n";
                            else
                                ans2 = "Answer 2 is Wrong\n";
                            if(match[3]==true)
                                ans3 = "Answer 3 is Correct\n";
                            else
                                ans3 = "Answer 3 is Wrong\n";
                            alert(ans1 + ans2 + ans3);
                        }
                        return true;   
                    }
                },
            };
            instance.addEndpoint("question1", { anchor: "RightMiddle" }, dragDropEndPoints);
            instance.addEndpoint("question2", { anchor: "RightMiddle" }, dragDropEndPoints);
            instance.addEndpoint("question3", { anchor: "RightMiddle" }, dragDropEndPoints);
            instance.addEndpoint('answer1', { anchor: "LeftMiddle" }, dragDropEndPoints);        
            instance.addEndpoint('answer2', { anchor: "LeftMiddle" }, dragDropEndPoints);
            instance.addEndpoint('answer3', { anchor: "LeftMiddle" }, dragDropEndPoints);
        });
        jsPlumb.fire("jsPlumbDemoLoaded", instance);
    });
})();