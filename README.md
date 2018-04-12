# beSlider jQuery Plugin

## Demo & Examples

<https://mrygielski.github.io/jquery.baSlider/>

## Usage

Create an attribute called `data-repo`:

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
	handler: {
		position: "auto",
		offsetX: 0,
		offsetY: 0
	},
	height:  true,
	iconIssues: false
});
```

Attribute			| Type				| Default		| Description
---						| ---					| ---				| ---
`handler`		| *Array*		| `auto`		| Displays the number of stars in a repository.
`height`		| *Mixed*		| `auto`		| Available options: auto, value (px).
`imgHeight`	| *Mixed*		| `auto`		| Available options: auto, frame, value (px).

## Installation

You can install jquery.baSlider by using [Bower](http://bower.io/).

```bash
bower install jquery.baSlider
```

Or you can install it through [npm](https://www.npmjs.com/):

```
npm install --save jquery.baSlider
```

## License

This plugin is available under [the MIT license](http://mths.be/mit).

## Credits

* Icons made by (https://www.flaticon.com/authors/smashicons) is licensed by (http://creativecommons.org/licenses/by/3.0/)
* The pictures come from the site (http://www.afterbefore.pl) 
