---
title: 'Part 2: What the Fr(action)?'
series: 'Debugging CSS Grid'
date: '2019-06-05'
---

In the second part of the _Debugging CSS Grid_ series, we’ll take a look at _fr_ (or _fraction_) units. _fr_ units are very useful for sizing grid tracks, but there are a few ways they can trip you up if you don’t understand how they work.

## Introduction

The _fr_ unit is a new unit, exclusive to Grid. It allows you to size your grid tracks according to a proportion of the available space in the grid container. By using _fr_ units instead of percentages (or other fixed units), we can avoid messy and complicated _calc()_ functions to size our grid tracks. As a simple example, we can create four equal-width columns:

```css
.grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 20px;
}
```

The grid takes into account the 20px gap between each column track and distributes the remaining space equally. You can also use it alongside fixed tracks:

```css
.grid {
	display: grid;
	grid-template-columns: repeat(3, 200px) 1fr;
	column-gap: 20px;
}
```

This will give us three fixed columns of 200px and a fourth column, sized with the _fr_ unit, which will take up the remaining space.

We can use multiples of the _fr_ unit to create tracks that are proportionally larger or smaller. In this example, the second track will be twice the width, and the fourth track will be three times the width of the first and third tracks.

```css
.grid {
	display: grid;
	grid-template-columns: 1fr 2fr 1fr 3fr;
	column-gap: 20px;
}
```

## All fr units are not created equal

A common mistake is to assume that all tracks sized with the same number of _fr_ units will be the same size. This is certainly what you would expect if you were using percentages for track sizing, for example. But if we compare the first and last examples above, we can quite clearly see that the _1fr_ columns in the last example are _not_ the same size as those in the first example, despite using the same value! To understand why, we can refer to the [specification](). This states that _fr_ units are _flexible_ units. They do not behave as lengths, like pixels, rems, ems and others, which is why they cannot be used in `calc()` functions. To quote directly from the spec:

> Tracks sized with fr units are called “flexible tracks”, as they flex in response to leftover space similar to how flex items fill space in a flex container.

Flexible tracks are resolved last according to Grid’s sizing algorithm. The browser takes into account all of the fixed tracks and column or row gaps, plus the maximum size of any tracks sized using expressions like `minmax()`, then distributes the remaining space accordingly.

Consider the following example:

```css
.grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(20px, 300px)) 1fr;
}
```

We have three columns sized with `minmax()` (with a maximum size of 300px), plus one column of _1fr_. If the width of the grid container is less than the sum of the three columns (900px) then the last row will have a resolved width of 0 – so it will be invisible. It’s only when our grid container is larger than 900px (e.g. for larger viewports) that we will see that _1fr_ column, which will fill the remaining space in the grid.

## Fractions of fractions

It might be useful to know that you don’t need to distribute _all_ of the available space in a grid. We can also size tracks using values of less than 1fr. If we have three grid tracks at 0.5fr each, they will only take up half the width of the available space – a fraction of a fraction!

```css
.grid {
	display: grid;
	grid-template-columns: repeat(3, 0.5fr);
}
```

## Intrinsic and extrinsic sizing

We’ve seen that the size of _fr_ tracks is influenced by the rest of the grid: The sizes of other tracks, and the `gap` values. This is known as _extrinsic_ sizing – where the size is determined by context. But the size of an _fr_ track is also dependent on its content. If you have three columns of 1fr, and you place an item in one of those columns whose horizontal size is larger than the equal distributed space then that track will grow to accommodate the content, while the others will become smaller to make space. This is _intrinsic_ sizing. (The [Intrinsic and Extrinsic sizing specification](https://www.w3.org/TR/css-sizing-3) offers a full explanation.)

In this example we have a grid with three child items, and one of those children contains an image with a width of 400px:

<iframe height="504" style="width: 100%;" scrolling="no" title="Fr units" src="//codepen.io/michellebarker/embed/LoRGBj/?height=504&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/LoRGBj/'>Fr units</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

We can see that the track containing the image is larger than the other two tracks, despite being sized with the same unit.
