// import './data-source';
/* jshint esversion: 6 */
/**
 * Default Zoom and Pan sample
 */



    //Toolbar functionality
    function handleToolbarClick(args) {
        switch (args.item.tooltipText) {
            case 'Zoom In':
                var zoomin = { type: 'ZoomIn', zoomFactor: 0.2 };
                diagram.zoomTo(zoomin);
                break;
            case 'Zoom Out':
                var zoomout = { type: 'ZoomOut', zoomFactor: 0.2 };
                diagram.zoomTo(zoomout);
                break;
            case 'Reset':
                diagram.reset();
                break;
            case 'Pan Tool':
                diagram.tool = ej.diagrams.DiagramTools.ZoomPan;
                diagram.clearSelection();
                break;
            case 'Pointer':
                diagram.clearSelection();
                diagram.drawingObject = {};
                diagram.tool = ej.diagrams.DiagramTools.SingleSelect | ej.diagrams.DiagramTools.MultipleSelect;
                break;
            case 'Fit To Page':
                diagram.fitToPage();
                break;
            case 'Bring Into View':
                //(EJ2-70843-sampleIssue)- while clicking the bring Into view without selectiong nodes means exception occurs and it is resolved
                if (diagram.selectedItems.nodes.length > 0) {
                    var bound = diagram.selectedItems.nodes[0].wrapper.bounds;
                    diagram.bringIntoView(bound);
                }
                break;
            case 'Bring Into Center':
                if (diagram.selectedItems.nodes.length > 0) {
                    var bounds = diagram.selectedItems.nodes[0].wrapper.bounds;
                    diagram.bringToCenter(bounds);
                }
                break;
        }
    }

    //customize the visual representation of nodes within a diagram.
    function setNodeTemplate(node) {
        // Create an outer stack panel to contain image and text elements
        var stackcontent = new ej.diagrams.StackPanel();
        stackcontent.id = node.id + '_outerstack';
        stackcontent.orientation = 'Horizontal';
        stackcontent.style.strokeColor = 'gray';
        stackcontent.padding = { left: 5, right: 10, top: 5, bottom: 5 };

        // Create an image element to display employee image
        var imageElement = new ej.diagrams.ImageElement();
        imageElement.width = 50;
        imageElement.height = 50;
        imageElement.style.strokeColor = 'none';
        imageElement.source = node.data.ImageUrl;
        imageElement.id = node.id + '_pic';

        // Create an inner stack panel to organize text elements
        var innerStackPanel = new ej.diagrams.StackPanel();
        innerStackPanel.style.strokeColor = 'none';
        innerStackPanel.margin = { left: 5, right: 0, top: 0, bottom: 0 };
        innerStackPanel.id = node.id + '_innerstack';

        // Create a text element for displaying employee name
        var textElement = new ej.diagrams.TextElement();
        textElement.content = node.data.Name;
        textElement.style.color = 'black';
        textElement.style.bold = true;
        textElement.style.strokeColor = 'none';
        textElement.horizontalAlignment = 'Left';
        textElement.style.fill = 'none';
        textElement.id = node.id + '_text1';

        // Create a TextElement for the node's designation
        var desigTextElement = new ej.diagrams.TextElement();
        desigTextElement.margin = { left: 0, right: 0, top: 5, bottom: 0 };
        desigTextElement.content = node.data.Designation;
        desigTextElement.style.color = 'black';
        desigTextElement.style.strokeColor = 'none';
        desigTextElement.style.fontSize = 12;
        desigTextElement.style.fill = 'none';
        desigTextElement.horizontalAlignment = 'Left';
        desigTextElement.style.textWrapping = 'Wrap';
        desigTextElement.id = node.id + '_desig';

        // Add text elements to the inner StackPanel
        innerStackPanel.children = [textElement, desigTextElement];

        // Add image element and inner StackPanel to the outer StackPanel
        stackcontent.children = [imageElement, innerStackPanel];

        // Return the StackPanel containing the node's content
        return stackcontent;
    }
    //Initializes diagram control
    var diagram = new ej.diagrams.Diagram({
        width: '1180', height: '500px',
        rulerSettings:{showRulers:true},
        snapSettings: { constraints: 0 },
        //Configrues hierarchical tree layout
        layout: {
            type: 'OrganizationalChart', margin: { top: 20 },
            getLayoutInfo: function (tree) {
                if (!tree.hasSubTree) {
                    tree.orientation = 'Vertical';
                    tree.type = 'Right';
                }
            }
        },
        dataSourceSettings: {
            id: 'Id', parentId: 'ReportingPerson', dataSource: new ej.data.DataManager(window.overviewData)
        },
        //Sets the default values of Nodes.
        getNodeDefaults: function (node) {
            node.height = 50;
            node.style = { fill: 'transparent', strokeWidth: 2 };
            return node;
        },
        //Sets the default values of connectors.
        getConnectorDefaults: function (connector) {
            connector.targetDecorator.shape = 'None';
            connector.type = 'Orthogonal';
            connector.style.strokeColor = 'gray';
            return connector;
        },
        //customization of the node.
        setNodeTemplate: function (node) {
            return setNodeTemplate(node);
        }
    });
    // Appends the diagram to a specified element
    diagram.appendTo('#diagram');

    /*eslint esversion: 6 */
    // method to disable toolbar items 
    function selectionChange(args) {
        if (args.state === 'Changed') {
            var selectedItems = diagram.selectedItems.nodes;
            // Disables toolbar items if no nodes are selected
            if (selectedItems.length === 0) {
                toolbarEditor.items.find(item => item.id === 'BringIntoView').disabled = true;
                toolbarEditor.items.find(item => item.id === 'BringIntoCenter').disabled = true;
            }
            // Enables toolbar items if node is selected
            if (selectedItems.length > 0) {
                toolbarEditor.items.find(item => item.id === 'BringIntoView').disabled = false;
                toolbarEditor.items.find(item => item.id === 'BringIntoCenter').disabled = false;
            }
        }
    }

    document.getElementById('zoom').onclick = () =>{
        diagram.zoomTo({zoomFactor:0.5,type:'ZoomIn',});
    }

const TOUCH_FRAMES = [
    {
        start0: { pageX: 580, pageY: 239 },
        start1: { pageX: 576, pageY: 156.5 },
        move0: { pageX: 580, pageY: 239 },
        move1: { pageX: 579.5, pageY: 146.5 }
    },
    {
        start0: { pageX: 580, pageY: 239 },
        start1: { pageX: 579.5, pageY: 146.5 },
        move0: { pageX: 580, pageY: 239 },
        move1: { pageX: 579.5, pageY: 144.5 }
    },
    {
        start0: { pageX: 580, pageY: 239 },
        start1: { pageX: 579.5, pageY: 144.5 },
        move0: { pageX: 580, pageY: 239 },
        move1: { pageX: 579.5, pageY: 142.5 }
    },
    {
        start0: { pageX: 580, pageY: 239 },
        start1: { pageX: 579.5, pageY: 142.5 },
        move0: { pageX: 580, pageY: 239 },
        move1: { pageX: 579.5, pageY: 141.5 }
    },
    {
        start0: { pageX: 580, pageY: 239 },
        start1: { pageX: 579.5, pageY: 141.5 },
        move0: { pageX: 585.5, pageY: 245.5 },
        move1: { pageX: 579.5, pageY: 140 }
    },
    {
        start0: { pageX: 585.5, pageY: 245.5 },
        start1: { pageX: 579.5, pageY: 140 },
        move0: { pageX: 585.5, pageY: 246.5 },
        move1: { pageX: 579.5, pageY: 139.5 }
    },
    {
        start0: { pageX: 585.5, pageY: 246.5 },
        start1: { pageX: 579.5, pageY: 139.5 },
        move0: { pageX: 585.5, pageY: 247.5 },
        move1: { pageX: 579.5, pageY: 138.5 }
    },
    {
        start0: { pageX: 585.5, pageY: 247.5 },
        start1: { pageX: 579.5, pageY: 138.5 },
        move0: { pageX: 585.5, pageY: 248.5 },
        move1: { pageX: 579.5, pageY: 137.5 }
    },
    {
        start0: { pageX: 585.5, pageY: 248.5 },
        start1: { pageX: 579.5, pageY: 137.5 },
        move0: { pageX: 585.5, pageY: 249.5 },
        move1: { pageX: 579.5, pageY: 137 }
    },
    {
        start0: { pageX: 585.5, pageY: 249.5 },
        start1: { pageX: 579.5, pageY: 137 },
        move0: { pageX: 585.5, pageY: 251 },
        move1: { pageX: 579.5, pageY: 137 }
    },
    {
        start0: { pageX: 585.5, pageY: 251 },
        start1: { pageX: 579.5, pageY: 137 },
        move0: { pageX: 585.5, pageY: 252.5 },
        move1: { pageX: 579.5, pageY: 136 }
    },
    {
        start0: { pageX: 585.5, pageY: 252.5 },
        start1: { pageX: 579.5, pageY: 136 },
        move0: { pageX: 585.5, pageY: 253.5 },
        move1: { pageX: 579.5, pageY: 135.5 }
    },
    {
        start0: { pageX: 585.5, pageY: 253.5 },
        start1: { pageX: 579.5, pageY: 135.5 },
        move0: { pageX: 585.5, pageY: 255.5 },
        move1: { pageX: 579.5, pageY: 135 }
    },
    {
        start0: { pageX: 585.5, pageY: 255.5 },
        start1: { pageX: 579.5, pageY: 135 },
        move0: { pageX: 585.5, pageY: 257 },
        move1: { pageX: 579, pageY: 135 }
    },
    {
        start0: { pageX: 585.5, pageY: 257 },
        start1: { pageX: 579, pageY: 135 },
        move0: { pageX: 585.5, pageY: 258.5 },
        move1: { pageX: 578.5, pageY: 134 }
    },
    {
        start0: { pageX: 585.5, pageY: 258.5 },
        start1: { pageX: 578.5, pageY: 134 },
        move0: { pageX: 585, pageY: 260.5 },
        move1: { pageX: 578.5, pageY: 133.5 }
    },
    {
        start0: { pageX: 585, pageY: 260.5 },
        start1: { pageX: 578.5, pageY: 133.5 },
        move0: { pageX: 585, pageY: 261.5 },
        move1: { pageX: 578, pageY: 132.5 }
    },
    {
        start0: { pageX: 585, pageY: 261.5 },
        start1: { pageX: 578, pageY: 132.5 },
        move0: { pageX: 585, pageY: 263 },
        move1: { pageX: 578, pageY: 132.5 }
    },
    {
        start0: { pageX: 585, pageY: 263 },
        start1: { pageX: 578, pageY: 132.5 },
        move0: { pageX: 585, pageY: 263.5 },
        move1: { pageX: 578, pageY: 132 }
    },
    {
        start0: { pageX: 585, pageY: 263.5 },
        start1: { pageX: 578, pageY: 132 },
        move0: { pageX: 585, pageY: 264 },
        move1: { pageX: 578, pageY: 131.5 }
    },
    {
        start0: { pageX: 585, pageY: 264 },
        start1: { pageX: 578, pageY: 131.5 },
        move0: { pageX: 585, pageY: 264.5 },
        move1: { pageX: 578, pageY: 131 }
    },
    {
        start0: { pageX: 585, pageY: 264.5 },
        start1: { pageX: 578, pageY: 131 },
        move0: { pageX: 585, pageY: 264.5 },
        move1: { pageX: 578, pageY: 130 }
    },
    {
        start0: { pageX: 585, pageY: 264.5 },
        start1: { pageX: 578, pageY: 130 },
        move0: { pageX: 585, pageY: 264.5 },
        move1: { pageX: 578, pageY: 129.5 }
    },
    {
        start0: { pageX: 585, pageY: 264.5 },
        start1: { pageX: 578, pageY: 129.5 },
        move0: { pageX: 585, pageY: 264.5 },
        move1: { pageX: 578, pageY: 129 }
    },
    {
        start0: { pageX: 585, pageY: 264.5 },
        start1: { pageX: 578, pageY: 129 },
        move0: { pageX: 585, pageY: 265 },
        move1: { pageX: 578, pageY: 129 }
    }
];

document.getElementById('test').onclick = () => {

    for (let i = 0; i < TOUCH_FRAMES.length; i++) {
        var startTouch0 = TOUCH_FRAMES[i].start0;
        var startTouch1 = TOUCH_FRAMES[i].start1;
        var moveTouch0 = TOUCH_FRAMES[i].move0;
        var moveTouch1 = TOUCH_FRAMES[i].move1;
        console.log('startTouch0:', startTouch0);
        console.log('startTouch1:', startTouch1);
        console.log('moveTouch0:', moveTouch0);
        console.log('moveTouch1:', moveTouch1);
    



    var scale = this.getDistance(moveTouch0, moveTouch1) / this.getDistance(startTouch0, startTouch1);


    var touches = [moveTouch0, moveTouch1];

    var getPinchMidPointRelativeToElement = function (touches, element) {
        if (!touches || touches.length < 2) return null;

        const rect = element.getBoundingClientRect();

        const x =
            ((touches[0].pageX + touches[1].pageX) / 2) - rect.left;
        const y =
            ((touches[0].pageY + touches[1].pageY) / 2) - rect.top;

        return { x, y };
    }

    var focusPoint = getPinchMidPointRelativeToElement(touches, this.diagram.element);


    // 927527: Diagram flickers while performing pinch zoom
    if (scale !== 1) {
        diagram.commandHandler.zoom(scale, 0, 0, focusPoint);
    }
}
}

function getDistance(touch1, touch2) {
    var x = touch2.pageX - touch1.pageX;
    var y = touch2.pageY - touch1.pageY;
    return Math.sqrt((x * x) + (y * y));
};

    // //create the Toolbar and adding items in ToolBar.
    // var toolbarEditor = new ej.navigations.Toolbar({
    //     clicked: handleToolbarClick, // Event handler for toolbar item click
    //     items: [
    //         {
    //             id: 'ZoomIn',
    //             type: 'Button',
    //             tooltipText: 'Zoom In',
    //             prefixIcon: 'e-icons e-zoom-in',
    //         },
    //         {
    //             id: 'ZoomOut',
    //             type: 'Button',
    //             tooltipText: 'Zoom Out',
    //             prefixIcon: 'e-icons e-zoom-out',
    //         },
    //         {
    //             id: 'Separator1', type: 'Separator'
    //         },
    //         {
    //             id: 'Pointer',
    //             type: 'Button',
    //             tooltipText: 'Pointer',
    //             prefixIcon: 'e-icons e-mouse-pointer',
    //         },
    //         {
    //             id: 'PanTool',
    //             type: 'Button',
    //             tooltipText: 'Pan Tool',
    //             prefixIcon: 'e-icons e-pan',
    //         },
    //         {
    //             id: 'Separator2', type: 'Separator'
    //         },
    //         {
    //             id: 'Reset',
    //             type: 'Button',
    //             tooltipText: 'Reset',
    //             prefixIcon: 'e-icons e-reset',
    //         },
    //         {
    //             id: 'FitToPage',
    //             type: 'Button',
    //             tooltipText: 'Fit To Page',
    //             prefixIcon: 'e-icons e-zoom-to-fit',
    //         },
    //         {
    //             id: 'Separator3', type: 'Separator'
    //         },
    //         {
    //             id: 'BringIntoView',
    //             type: 'Button',
    //             tooltipText: 'Bring Into View',
    //             prefixIcon: 'e-icons e-bring-to-view',
    //             disabled: true
    //         },
    //         {
    //             id: 'BringIntoCenter',
    //             type: 'Button',
    //             tooltipText: 'Bring Into Center',
    //             prefixIcon: 'e-icons e-bring-to-center',
    //             disabled: true
    //         },
    //     ]
    // });
    // toolbarEditor.appendTo('#toolbar');

