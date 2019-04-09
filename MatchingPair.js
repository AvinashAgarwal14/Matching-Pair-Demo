;
(function () {

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

            // configure some drop options for use by all endpoints.
            var dropOptions = {
                tolerance: "touch",
                hoverClass: "dropHover",
                activeClass: "dragActive"
            };

            var numberOfQuestions = 0;
            var match = ["","",""];

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
                    if(numberOfQuestions == 3) {
                        console.log(match);
                    } else {
                        numberOfQuestions++;
                        var sourceNo = params.sourceId[params.sourceId.length -1];
                        var targetNo = params.targetId[params.targetId.length -1];
                        // console.log(sourceNo);
                        match[sourceNo-1] = targetNo;
                    }
                    return true;
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