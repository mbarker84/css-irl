---
title: 'My CSS Grid Wishlist'
date: '2019-02-03'
---

If you follow this blog you’ll know I’m a big fan of CSS Grid, and without a doubt it’s given us developers more power than ever before when it comes to tackling layout on the web. But there are a few of my CSS layout needs that Grid hasn’t quite managed to fulfill just yet – here’s hoping some of these get implemented down the road!

## Styling row and column gaps

There aren’t any grid properties that allow you to apply styles directly to the row and column gaps. It would be great to be able to apply something like a background or border style here. At the moment, if you want to do something like the example below, you need to hack your way around it with borders, backgrounds or pseudo-elements on the grid items themselves. You _could_ set a background on your grid and a solid colour on your grid items – that’s all well and good unless you want your items to have a transparent background and the content behind to show through.

Something like the `column-rule` property (from the Multi-Column spec) would at least be a start.

## Multiple gap values

I’ve come across a number of cases where it would have been incredibly useful to be able to set multiple value for the `column-gap` and `row-gap` properties. In one of my previous articles, [Solving a Tricky Layout Problem with CSS Grid](https://css-irl.info/solving-a-tricky-layout-problem/), rather than creating empty rows I could have done something like this:

```css
.grid {
	row-gap: 0 40px 40px 0;
}
```

## Auto flow patterns

This is a big one, and probably the trickiest to implement – but would undoubtedly be extremely useful. Suppose I have a layout like this:

I’d like to be able to instruct Grid to place the items in a repeating pattern, so that I don’t have to place each item explicitly – often necessary when dealing with user-generated content. Using `nth-child` generally works OK when dealing with a single axis (rows _or_ columns), but if you want certain items to span multiple tracks on the cross axis then you might run into trouble, as the item that follows will be placed in the next available space. In this example using `nth-child` to place items, but the layout is completely thrown after an item that spans two rows, as the next item is auto-placed on the same row, rather than the row below. I don’t want to have to explicity place it on the row axis, as I don’t know how many rows there will be!

I’m imagining something similar to the `grid-template-areas` property, where Grid interprets the “areas” as an `nth-child`-type pattern:

```css
.grid {
	grid-template-pattern:
		'. . 1 1 2'
		'1 1 2 . .'
		'1 1 . . .';
}
```

Any following items would simply repeat this pattern.

## Calc() with the fr unit

The `fr` unit in Grid is incredibly useful, but at the moment it isn’t possible to use it in combination with `calc()`. Being able to do so would make it much easier to use CSS variables in some situations.

```scss
:root {
	--multiplier: 1;
	--itemSize: calc(var(--multiplier * 2fr));

	@media (min-width: 1400px) {
		--multiplier: 2;
	}
}

.grid {
	grid-template-columns: var(--itemSize) repeat(3, 1fr);
}
```

## Special mentions

### Masonry

### Subgrid
