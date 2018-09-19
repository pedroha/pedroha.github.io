// Global dependencies: canvas, brush

(function() {
    
    var canvasMouseListener = {
        init : function () {
    	    canvas.addEventListener('mousedown', onCanvasMouseDown, false);
        },
        update : function ( fn ) {
    	    fn.call(canvas, 'mousemove', onCanvasMouseMove, false);
    	    fn.call(canvas, 'mouseup', onCanvasMouseUp, false);
        },
        add : function () {
            this.update( canvas.addEventListener );
        },
        remove : function () {
            this.update( canvas.removeEventListener );
        }
	};
	
    var canvasTouchListener = {
        init : function () {
    	    canvas.addEventListener('touchstart', onCanvasTouchStart, false);
        },
        update : function (fn) {
            fn.call(canvas, 'touchmove', onCanvasTouchMove, false);
            fn.call(canvas, 'touchend', onCanvasTouchEnd, false);
        },
        add : function () {
            this.update( canvas.addEventListener );
        },
        remove : function () {
            this.update( canvas.removeEventListener );
        }
    };
    
    function get_mouse_pos (event) {
        return {
            x : event.clientX + document.body.scrollLeft, // document.body.scrollLeft = window.pageXOffset
            y : event.clientY + document.body.scrollTop  // document.body.scrollTop = window.pageYOffset
        };
    }
    
    function get_touch_pos (event) {            
		var touch = event.touches[0];
        return {
            x : touch.pageX,
            y : touch.pageY
        };
    }
    
    function onCanvasMouseDown ( event ) {                
        var p = get_mouse_pos(event);
    	brush.strokeStart( p.x, p.y );
    	canvasMouseListener.add();
    }
    
    function onCanvasMouseMove ( event ) {
        var p = get_mouse_pos(event);
    	brush.stroke( p.x, p.y );
    }

    function onCanvasMouseUp() {
    	brush.strokeEnd();
    	canvasMouseListener.remove();
	}
    
    // Touch Events ----------------------------------------------
    
    function onCanvasTouchStart ( event ) {
        if (event.touches.length == 1) {
    		event.preventDefault();

            var p = get_touch_pos(event);
    		brush.strokeStart( p.x, p.y );
    		
    		canvasTouchListener.add();
    	}
    }

    function onCanvasTouchMove ( event ) {
    	if (event.touches.length == 1) {
    		event.preventDefault();

            var p = get_touch_pos(event);
    		brush.stroke( p.x, p.y );
    	}
    }

    function onCanvasTouchEnd ( event ) {
    	if (event.touches.length == 0) {
    		event.preventDefault();

    		brush.strokeEnd();		
    		canvasTouchListener.remove();
    	}
    }
    
    canvasMouseListener.init();
	canvasTouchListener.init();
	
})();
