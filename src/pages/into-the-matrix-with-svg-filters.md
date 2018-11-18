---
title: 'Into the Matrix with SVG Filters'
date: '2018-11-18'
---

If you’re writing CSS regularly there’s a good chance you will have come across [blend modes](https://developer.mozilla.org/en-US/docs/Web/CSS/blend-mode). The `background-blend-mode` and `mix-blend-mode` properties allow us to blend a background and a foreground element together, and when used on images can help create some interesting effects, similar to the way image editing programs like Photoshop do. You can get really creative and even replicate Instagram’s filters, [like Una Kravets has done here](https://una.im/CSSgram/). You can even create [duotone images](https://jmperezperez.com/duotone-using-css-blend-modes/) using `mix-blend-mode` on pseudo-elements (another trick from Una!);

<!-- https://blog.logrocket.com/advanced-effects-with-css-background-blend-modes-4b750198522a
http://bennettfeely.com/filters-gallery/ -->

CSS blend modes have pretty good browser support (excluding IE11 and below), so are an excellent enhancement where they suit the design. However, sometimes they’re not quite enough on their own. Sometimes we might want a bit more control over things like blur, contrast and colour manipulation, which aren’t possible with blend modes alone. CSS filters can help us with this, and there’s a [great introduction on CSS Tricks](https://css-tricks.com/almanac/properties/f/filter/), which explains some of their capabilities. However, there are some limits to what CSS filters can do. CSS filters, while incredibly useful and a great tool to have in CSS, are a simplified implementation of what SVG filters can do – and knowing about SVG filters can give us superpowers when it comes to image manipulation! Even better, support for SVG filters is excellent, going right back to IE10.

## FeColorMatrix

SVG filters open up a whole new world of image effects, but the one I want to focus on in this article is the `feColorMatrix` filter, which allows us to manipulate the red, green, blue and alpha channels of an image by adding different amounts of red, green, blue or alpha into them. Still with me? `feColorMatrix` (`fe` stands for “Filter Effect” in SVG filters) allows for highly nuanced colour adjustment.

### Syntax

SVG filters can be written inline in your HTML like this:

The filter needs an `id`, which we can reference in our CSS to apply a filter, like this:

```
.fig {
	filter: url(#myFilter);
}
```

Here’s an example of an `feColorMatrix` filter:

The syntax looks quite complicated at first glance, but it’s helpful if we visualise it like this:

The y axis shows the colour values we can manipulate, and the x axis represents the channels of our original image. The final value on the x axis is the multiplication factor.

For the original image the matrix will look like this:

This is because the red, green, blue and alpha values are all in their original channels - so the red pixels will be red, the green pixels will be green, and so on.

To colourise images we can introduce different amounts of red, green or blue into other channels. For example, we can add blue to each channel like this:

We can turn a colour image greyscale by removing red, green and blue from all channels except one:

I won’t got into all the maths behind `feColorMatrix` as these two articles do a great job of explaining far better than I could:

The best way to really understand `feColorMatrix` is to play around with the values yourself. Here’s a demo with just a few examples of the creative possibilities:

There is a tool made by ... to help you experiment with `feColorMatrix` too:

[Filter playground](https://kazzkiq.github.io/svg-color-filter/)

### Colorising parts of an image with masking

`feColorMatrix` works great for colourising an entire image, but what about if we just want to colourise a section of it? We could clip out a section with `clip-path` and overlay it on the original image, but that means loading the image twice - not great for performance.

A better solution is to use an image element within the SVG itself, which allows us to mask parts of the image to apply the filter. This article from Sitepoint demonstrates how.

As Ana Tudor enquired recently on Twitter, image loading within SVGs when using `<image>` is not detectable with JavaScript, so if you want your images lazyloaded you’re probably out of luck. Like everything on the web, it’s a trade off!

I hope you’ll now feel a bit more confident applying SVG filters for creative image effects.
