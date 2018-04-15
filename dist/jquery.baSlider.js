/* ===================================================
 *  jquery.baSlider.js v1.0.0
 *  https://github.com/mrygielski/baSlider
 * ===================================================
 *  Copyright (c) 2018 Michał Rygielski
 *  The MIT License (MIT)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.*
 *
 *  Usage:
 *
 *  <script>
 *
 *      $(document).ready(
 *          $('.baSlider').baSlider();
 *      );
 *
 *  </script>
 * ========================================================== */

(function ( $ ) {

    $.fn.baSlider = function(options) {

        var opts = $.extend( {}, $.fn.baSlider.defaults, options );
        var _baSlider = {};

        var baSliderHandler = this.find('[baSlider-handler]'),
        baSliderImage = this.find('[baSlider-image]'),
        baSliderWidth = this.width(),
        baSliderHeight = this.height(),
        frame = this.find('.frame'),
        after = this.find('.after'),
        before = this.find('.before'),
        afterFrame = this.find('.after').find('div'),
        drag = { elem: null, x: 0, y: 0, state: false},
        delta = { x: 0, y: 0},
        setWidth = opts.width == 'auto' ?  baSliderWidth : "100%",
        setHeight = opts.height == 'auto' ?  baSliderHeight : opts.height;

        imageDimensions = function($img) {
            var w_w = baSliderWidth,
            w_h = baSliderHeight,
            r_w = w_h / w_w,
            i_w = $img.width(),
            i_h = $img.height(),
            r_i = i_h / i_w,
            new_w, new_h, new_left, new_top;
            if (r_w > r_i) {
                new_h = w_h;
                new_w = w_h / r_i
            } else {
                new_h = w_w * r_i;
                new_w = w_w
            }
            return {
                width: new_w + 'px',
                height: (new_h) + 'px',
                left: (w_w - new_w) / 2 + 'px',
                top: (w_h - new_h) / 2 + 'px'
            }
        };
        
        _baSlider = {

            tmpAfterWidth : 0,
            tmpAfterHeight : 0,
            rel : "",

            init : function() {
                if (opts.align == "horizontal") {
                    after.width(opts.start.horizontal);
                    after.height(setHeight);
                } else {
                    after.width(setWidth);
                    after.height(opts.start.vertical);
                }
                frame.width(baSliderWidth);
                frame.height(setHeight);
                afterFrame.width(baSliderWidth);
                afterFrame.height(setHeight);
                this.tmpAfterWidth = parseInt(after.width());
                this.tmpAfterHeight = parseInt(after.height());
            },

            /**
            * Set handler position
            * @param fn
            */
            handlerPosition : function(fn) {
                switch(opts.handler.position) {
                    case "auto":
                        if (opts.align == "horizontal") {
                            baSliderHandler.css("left", parseInt(after.width()) - (((baSliderHandler.width() / 2) + opts.handler.offsetX)));
                            baSliderHandler.css("top", (parseInt(after.height() / 2)) - (((baSliderHandler.height() / 2) + opts.handler.offsetY)));
                        } else {
                            baSliderHandler.css("left", parseInt(after.width() / 2) - (((baSliderHandler.width() / 2) + opts.handler.offsetX)));
                            baSliderHandler.css("top", (parseInt((after.height()))) - (((baSliderHandler.height() / 2) + opts.handler.offsetY)));
                        }
                    break;

                    case "top":
                        baSliderHandler.css("left", parseInt(after.width()) - (((baSliderHandler.width() / 2) + opts.handler.offsetX)));
                        baSliderHandler.css("top", parseInt(0 + opts.handler.offsetY));
                    break;

                    case "bottom":
                        baSliderHandler.css("left", parseInt(after.width()) - (((baSliderHandler.width() / 2) + opts.handler.offsetX)));
                        baSliderHandler.css("bottom", parseInt(0 + opts.handler.offsetY));
                    break;

                    case "left":
                        baSliderHandler.css("left", parseInt(opts.handler.offsetX));
                        baSliderHandler.css("top", (parseInt((after.height()))) - (((baSliderHandler.height() / 2) + opts.handler.offsetY)));
                    break;

                    case "right":
                        baSliderHandler.css("right", parseInt(opts.handler.offsetX));
                        baSliderHandler.css("top", (parseInt((after.height()))) - (((baSliderHandler.height() / 2) + opts.handler.offsetY)));
                    break;
                }
            },

            bounce : function() {

				var _this = this;

				if (opts.anim.play) {

					if (!drag.state) {

						this.rel = setTimeout(function () {

							if (opts.align == "horizontal") {

								for (var i = 0; i < opts.anim.times; i++) {
									after.animate({width: '-=' + Math.abs(opts.anim.distance)}, opts.anim.speed)
											.animate({width: '+=' + Math.abs(opts.anim.distance)}, opts.anim.speed);

									baSliderHandler.animate({left: '-=' + Math.abs(opts.anim.distance)}, opts.anim.speed)
											.animate({left: '+=' + Math.abs(opts.anim.distance)}, opts.anim.speed);
								}

							} else {

								for (var i = 0; i < opts.anim.times; i++) {
									after.animate({height: '-=' + Math.abs(opts.anim.distance)}, opts.anim.speed)
											.animate({height: '+=' + Math.abs(opts.anim.distance)}, opts.anim.speed);

									baSliderHandler.animate({top: '-=' + Math.abs(opts.anim.distance)}, opts.anim.speed)
											.animate({top: '+=' + Math.abs(opts.anim.distance)}, opts.anim.speed);
								}

							}

							setTimeout(function () {
								_this.bounce();
							}, opts.anim.startDelay);

						}, opts.anim.startDelay);

					}

				}

            },

            move : function(fn) {

				var _this = this;

                var moveElement = function(e) {
                    if (drag.state) {
                        drag.elem.style.opacity = '0.5';

                        delta.x = (e.type == 'mousemove' ? e.pageX : e.originalEvent.touches[0].pageX) - drag.x;
                        delta.y = (e.type == 'mousemove' ? e.pageY : e.originalEvent.touches[0].pageY) - drag.y;

                        var cur_offset = $(drag.elem).offset();

                        if (opts.align == "horizontal") {
                            $(drag.elem).offset({
                                left: (cur_offset.left + delta.x)
                            });
                            baSliderHandler.css("left", drag.x - delta.x - after.offset().left - ((baSliderHandler.width() / 2) + opts.handler.offsetX));
                        } else {
                            $(drag.elem).offset({
                                top: (cur_offset.top + delta.y)
                            });
                            baSliderHandler.css("top", drag.y - delta.y - after.offset().top - ((baSliderHandler.height() / 2) + opts.handler.offsetY));
                        }
                        
                        if (opts.align == "horizontal") after.width(drag.x - delta.x - after.offset().left);
                        else after.height(drag.y - delta.y - after.offset().top);
                        drag.x = (e.type == 'mousemove' ? e.pageX : e.originalEvent.touches[0].pageX);
                        drag.y = (e.type == 'mousemove' ? e.pageY : e.originalEvent.touches[0].pageY);
                    }
                }

                /* Miuser move event handler */
                $(document).mousemove(function(e) { moveElement(e); });

                baSliderHandler.on("mouseup mousedown touchstart touchmove touchend", function(e) {

                    /* Stop drag handler */
                    if (e.type == 'mouseup' || e.type == 'touchend') {
                        if (drag.state) {
                            drag.elem.style.opacity = '1';
                            drag.state = false;

                            if (opts.reverse) {
									
								if (opts.align == "horizontal") {
									baSliderHandler.animate({
										"left": parseInt(_this.tmpAfterWidth) - ((baSliderHandler.width() / 2) + opts.handler.offsetX)
									}, opts.speed);
									after.animate({"width": parseInt(_this.tmpAfterWidth)}, opts.speed);
								} else {
									baSliderHandler.animate({
										"top": parseInt(_this.tmpAfterHeight) - ((baSliderHandler.height() / 2) + opts.handler.offsetY)
									}, opts.speed);                                
									after.animate({"height": parseInt(_this.tmpAfterHeight)}, opts.speed);
								}

							}
							
                            _this.bounce();
                        }
                    }

                    /* Start drag handler */
                    if (e.type == 'mousedown' || e.type == 'touchstart') {
                        if (!drag.state) {
                            drag.elem = this;
                            after.clearQueue().stop();
                            baSliderHandler.clearQueue().stop();
							clearTimeout(this.rel);
                            this.style.opacity = '0.5';
                            drag.x = (e.type == 'mousedown' ? e.pageX : e.originalEvent.touches[0].pageX);
                            drag.y = (e.type == 'mousedown' ? e.pageY : e.originalEvent.touches[0].pageY);
                            drag.state = true;
                        }
                        return false;
                    }

                    /* Touch move event handler */
                    if (e.type == 'touchmove') moveElement(e);

                });

            },

            scaleImages : function(fn) {
                var dim = imageDimensions(baSliderImage);
                baSliderImage.css({
                    width: dim.width,
                    height: opts.imgHeight == 'auto' ? dim.height : opts.imgHeight == 'frame' ?
                    opts.height : opts.imgHeight,
                    left: dim.left,
                    top: dim.top
                });
            }

        };

        return {
            init: _baSlider.init(),
            handler: _baSlider.handlerPosition(),
            bounce: _baSlider.bounce(),
            move: _baSlider.move(),
            scaleImages: _baSlider.scaleImages()
        };
    };

    $.fn.baSlider.defaults = {
        /**
        * align of scroll
        */
        align: "horizontal",
        
        /**
        * place of dividing the photo horizontally & vertically
        */
        start: {
            horizontal: "50%",
            vertical: "50%"
        },

		/**
	    * animation configuration
	    */
        anim: {
			play: true,
            startDelay: 5000,
            delay: 10000,
            speed: 500,
            distance: 15,
            times: 2
        },
        
        /**
        * handler position settings
        */
        handler: {
            position: "auto",
            offsetX: 0,
            offsetY: 0
        },

        /**
        * return to the starting place
        */
        reverse: true,

        /**
        * speed of animation return
        */
        speed: 300,

        /**
        * height of frame
        * available options: auto, value (px)
        */
        height: "auto",

        /**
        * height of images
        *
        * available options: auto, frame, value (px)
        *
        * auto - gets the height of images
        * frame - sets the height of images relative to height frame
        * value - defined value
        */
        imgHeight: "auto"
    };

}( jQuery ));