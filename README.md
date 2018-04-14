# baSlider jQuery Plugin

## Demo & Examples

<https://mrygielski.github.io/jquery.baSlider/>

## Usage

```html
<div class='baSlider'>
	<div class='frame'>
		<div baSlider-handler><img src="images/drag.svg" alt=""></div>
		<div class='before'>
			<img src='images/before.jpg' baSlider-image>
		</div>  
		<div class='after'>
			<div>
				<img src='images/after.jpg' baSlider-image>
			</div>
		</div>  
	</div>
</div>
```

Include jQuery:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
```

Include plugin's CSS and JS:

```html
<link rel="stylesheet" href="src/jquery.baSlider.csss">
<script src="src/jquery.baSlider.js"></script>
```

Call the plugin:

```javascript
$('.baSlider').baSlider();
```

## Options

Here's a list of available settings.

```javascript
$('.baSlider').baSlider({
	align: "horizontal",
    start: {
        horizontal: "50%",
        vertical: "50%"
    },
	handler: {
		position: "auto",
		offsetX: 0,
		offsetY: 0
	},
    speed: 300,
	height: auto,
	imgHeight: auto
});
```

Attribute			| Type				| Default		| Description
---						| ---					| ---				| ---
`align`		| *String*		| `horizontal`		| Align of scroll.
`start`		| *Array*		| `50%`		| Place of dividing the photo horizontally & vertically.
`handler`		| *Array*		| `auto`		| Displays the number of stars in a repository.
`speed`		| *Number*		| `auto`		| Speed of animation: value (px).
`height`		| *String*		| `auto`		| Available options: auto, value (px).
`imgHeight`	| *String*		| `auto`		| Available options: auto, frame, value (px).

## Installation

You can install jquery.baSlider by using [Bower](http://bower.io/).

```bash
bower install jquery.baSlider
```

Or you can install it through [npm](https://www.npmjs.com/):

```
npm install --save jquery.baslider
```

## License

This plugin is available under [the MIT license](https://opensource.org/licenses/mit-license.php).

## Credits

* Icons made by (https://www.flaticon.com/authors/smashicons) is licensed by (http://creativecommons.org/licenses/by/3.0/)
* The pictures come from the site (http://www.afterbefore.pl) 
