---
title: 'How to Accessibly Split Text'
date: '2019-08-23'
tags: ['html', 'typography']
---

I recently published an article on [animating variable fonts](/variable-font-animation-with-css-and-splitting-js) with the help of the Javascript library [Splitting.js](). A couple of people asked about the accessibility implications of this, so in this article we’ll take a look at why splitting a string of text can be problematic from an accessibility point of view, and what we can do about it.

## Splitting.js recap

Let’s say you have a word, a heading, a paragraph or a sentence and you want to change the style on a per-letter basis. The way that _Splitting.js_ works by default is by wrapping each character (including whitespace characters) in a `<span>` tag and adding various attributes that allow you to more easily target and manipulate each one. It also wraps each word in its own span, so you can target them individually too. There are many creative possibilities!

## Why is this an accessibility concern?

Some people who are blind, partially-sighted, or find reading on the web difficult or problematic for different reasons might use screen reader software to assist them in navigating and exploring a website. Screen readers announce the content of the webpage aurally to a user. To better understand the experience of a person using a screen reader, I recommend watching [How A Screen Reader User Accesses The Web](https://www.smashingmagazine.com/2019/02/accessibility-webinar/), an accessibility webinar from Smashing Magazine.

This is one reason why semantic HTML is especially important: not everyone is accessing your webpage visually, so using the right HTML elements for the right purpose makes navigating the page and finding relevant content much easier.

We might want to split a string of text for presentation purposes, but changing the markup within (for example) a heading can affect how screenreaders interpret the text and read it back to the user. Consider the following markup – a simple `<h1>` heading tag:

```html
<h1>Oh hello there</h1>
```

Now let’s look at the same heading split into `span`s:

```html
<h1>
	<span>O</span>
	<span>h</span>
	<span> </span>
	<span>H</span>
	<span>e</span>
	<span>l</span>
	<span>l</span>
	<span>o</span>
	<span></span>
	<span>T</span>
	<span>h</span>
	<span>e</span>
	<span>r</span>
	<span>e</span>
</h1>
```

With each character wrapped in an individual tag, some screenreaders will not interpret each word, but instead announce each letter individually. This would not be a very helpful experience for someone navigating the page using a screenreader!

This behaviour is not consistent between screenreaders. I initially tested this with VoiceOver on Safari, which has no problems reading the text as intended. Chrome, however, omits the word breaks and reads it as a single long word.

## Making it accessible with WAI-ARIA

Luckily, these accessibility concerns _don’t_ mean that we can’t use cool libraries like Splitting.js. We just need to go to a tiny bit more effort to ensure our text is accessible to everyone.

[WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) provides us with attributes for defining how elements should be presented to assistive technologies. While it is designed to help make websites more accessible, it is not a substitute for semantic HTML. It should be used when semantic HTML alone is not enough.

### aria-label

In the case of our example heading, we can provide an accessible text label for screen readers with the `aria-label` attribute:

```html
<h1 aria-label="Oh hello there">
	<span>O</span>
	<span>h</span>
	<span> </span>
	<span>H</span>
	<span>e</span>
	<span>l</span>
	<span>l</span>
	<span>o</span>
	<span></span>
	<span>T</span>
	<span>h</span>
	<span>e</span>
	<span>r</span>
	<span>e</span>
</h1>
```

Using `aria-label` alone can cause some screen readers to read out the text to read out both the text label _and_ the text content. This is far from ideal, so we need to hide the element’s inner content from screen readers, which we can do using `aria-hidden`.

### aria-hidden

`aria-hidden` hides the element from the accessibility tree, so a screen reader will ignore it. We can’t hide the element itself, as then it won’t be read at all – but we can hide its direct children. Because we’re using _Spitting.js_ to create those child elements, we can add a little function to add `aria-hidden="true"` to each word:

```js
Splitting().forEach(s => {
	s.words.forEach(word => {
		word.setAttribute('aria-hidden', true)
	})
})
```

This is equivalent to doing this:

```html
<h1 aria-label="Oh hello there">
	<span aria-hidden="true">
		<span>O</span>
		<span>h</span>
	</span>
	<span> </span>
	<span aria-hidden="true">
		<span>H</span>
		<span>e</span>
		<span>l</span>
		<span>l</span>
		<span>o</span>
	</span>
	<span></span>
	<span aria-hidden="true">
		<span>T</span>
		<span>h</span>
		<span>e</span>
		<span>r</span>
		<span>e</span>
	</span>
</h1>
```

The user only hears the contents of the `aria-label` attribute, not the text inside the element itself. That takes care of our accessibility concerns and means we can split the text content of the element safely, knowing that it will be accessible to all.

It would be great if _Splitting.js_ could do this by default, although there are a lot of different considerations to take into account for different types of text. There is currently an [open Github issue](https://github.com/shshaw/Splitting/issues/19) for adding this feature.

_Thanks to [Andy Bell](https://andy-bell.design/) for signposting this accessibility solution in my twitter feed after I published the original post!_
