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

			init : function() {
				after.width("50%");
				after.height(setHeight);
				frame.width(baSliderWidth);
				frame.height(setHeight);
				afterFrame.width(baSliderWidth);
				afterFrame.height(setHeight);
			},

			/**
			 * Set handler position
			 * @param fn
             */
			handlerPosition : function(fn) {
				switch(opts.handler.position) {
					case "auto":
						baSliderHandler.css("left", parseInt(frame.width() / 2) - (((baSliderHandler.width() / 2) + opts.handler.offsetX)));
						baSliderHandler.css("top", (parseInt((frame.height())) / 2) - (((baSliderHandler.height() / 2) + opts.handler.offsetY)));
						break;

					case "top":
						baSliderHandler.css("left", parseInt(frame.width() / 2) - (((baSliderHandler.width() / 2) + opts.handler.offsetX)));
						baSliderHandler.css("top", parseInt(0 + opts.handler.offsetY));
						break;

					case "bottom":
						baSliderHandler.css("left", parseInt(frame.width() / 2) - (((baSliderHandler.width() / 2) + opts.handler.offsetX)));
						baSliderHandler.css("bottom", parseInt(0 + opts.handler.offsetY));
						break;
				}
			},

			move : function(fn) {
				/* Stop drag handler */
				baSliderHandler.mouseup(function() {
					if (drag.state) {
						drag.elem.style.opacity = '1';
						drag.state = false;

						baSliderHandler.animate({
							"left": parseInt(baSliderWidth / 2) - ((baSliderHandler.width() / 2) + opts.handler.offsetX)
						});
						after.animate({"width": parseInt(baSliderWidth / 2)});
					}
				});
				
				/* Move event handler */
				$(document).mousemove(function(e) {
					if (drag.state) {
						drag.elem.style.opacity = '0.5';

						delta.x = e.pageX - drag.x;
						delta.y = e.pageY - drag.y;
						
						var cur_offset = $(drag.elem).offset();

						$(drag.elem).offset({
							left: (cur_offset.left + delta.x)/*,
							top: (cur_offset.top + delta.y)*/
						});
						baSliderHandler.css("left", drag.x - after.offset().left - ((baSliderHandler.width() / 2) + opts.handler.offsetX));

						after.width(drag.x - delta.x - after.offset().left);
						drag.x = e.pageX;
						drag.y = e.pageY;
					}
				});

				/* Start drag handler */
				baSliderHandler.mousedown(function(e) {
					if (!drag.state) {
						drag.elem = this;
						this.style.opacity = '0.5';
						drag.x = e.pageX;
						drag.y = e.pageY;
						drag.state = true;
					}
					return false;
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
			move: _baSlider.move(),
			scaleImages: _baSlider.scaleImages()
		};
    };
			
	$.fn.baSlider.defaults = {
		/**
		 * handler position settings
		 */
		handler: {
			position: "auto",
			offsetX: 0,
			offsetY: 0
		},

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