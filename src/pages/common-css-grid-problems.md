---
title: 'Common CSS Grid problems (and how to avoid them) – Part 1'
date: '2019-04-16'
---

When observing people getting to grips with CSS Grid, I’ve noticed a couple of issues that seem to come up regularly. Let’s dive into these common problems and look at how we can avoid them in the future.

## Accidental implicit tracks

The biggest issue I’ve seen people struggle with is accidentally creating extra grid tracks, which can throw an entire layout into disarray. These extra tracks are known as _implicit_ tracks, and they are created by placing an item outside of the _explicit_ grid’s boundary. To get the most out of Grid, it’s a good idea to understand the concepts of the _explicit_ and _implicit_ grid, and their relationship to each other.

### The explicit grid

The explicit grid is defined using the `grid-template-rows` and `grid-template-columns` properties (or shorthand `grid-template` if you prefer):

```css
.grid {
	display: grid;
	grid-template-rows: repeat(4, 150px);
	grid-template-columns: repeat(4, 1fr);
}
```

Here we’re defining a grid with four rows and four columns, and we can know that our grid will have _at least_ four rows and four columns, no matter what. Even if we don’t have any grid children to place, so that our grid is completely empty, it will still take up the space of four rows and four columns that we’ve defined above.

If we omitted the `grid-template-rows` property, our grid rows would all have a height of `auto` – so if we had no grid children then our rows would still exist, they would just collapse down to a height of `0` without any content to fill them. If we added a row gap (e.g. `row-gap: 40px`) then the combined height of the gaps between the rows would make up the height of our grid – so without any content it might look like an extra large margin or padding value somewhere that was breaking your layout!

### What are implicit tracks

Implicit tracks are only created by placing items. They can be very useful. If you have a grid with four columns that we want to fill with an indeterminate number of items (e.g. a news feed), then we won’t know how many rows we need. By default, grid items are placed into the next available grid cell. We can simply omit the `grid-template-rows` property and allow Grid’s auto-placement to create the right number of rows for our content.

[Illustration]()

We can control the behaviour of implicit tracks with `grid-auto-rows` and `grid-auto-columns`.

```css
.grid {
	display: grid;
	grid-template-rows: repeat(4, 150px);
	grid-template-columns: repeat(4, 1fr);
	grid-auto-rows: 150px;
}
```

The above code, in addition to defining four explicit column and row tracks, instructs Grid that any implicit rows created should have a fixed height of 150px. This is optional, and in many case the default `auto` may be all you need.

### Placing items

To place an item on the grid we’ve just created, we could do something like this:

```css
.item {
	grid-column: 1 / 4;
	grid-row: 3 / 5;
}
```

We’re using start and end lines to place the grid item at the bottom left of our grid.

[Illustration]()

We could instead use the shorthand `grid-area` to save ourselves a line of code:

```css
.item {
	/* grid-row-start / grid-column-start / grid-row-end / grid-column-end */
	grid-area: 3 / 1 / 5 / 4;
}
```

This is not going to cause any problems because we are explicitly placing items by grid line number. We know that our grid has four rows and four columns (therefore five grid lines in either direction), so we’re unlikely to accidentally to unintentionally use a higher line number and accidentally create implicit tracks.

If, on the other hand, we use the _span_ keyword in place of a start or end line, the line number we’re placing the item on might be less obvious.

```css
.item {
	grid-column: 1 / 4;
	grid-row: 3 / span 4;
}
```

Here we’re using `span` in place of the `grid-row-end` line. Placing the item at line 3 with a span of 4 means the item is taking up more tracks than we’ve defined in our grid – and whoops! We’ve created an implicit track!

In another scenario, our items might disappear entirely. A friend of mine was using Grid to position two elements, one on top of the other, but offset by one row:

```css
.item-1 {
	/* grid-row-start / grid-column-start / grid-row-end / grid-column-end */
	grid-area: 3 / 1 / 5 / 4;
}

.item-2 {
	grid-area: 3 / span 2 / 5;
}
```

### Preventing our layouts breaking

So, how can we avoid this problem? I don’t mean to imply that you should avoid the _span_ keyword entirely, as it is very useful. But it’s good to understand which parts of Grid might trip you up if you’re not careful.

#### Naming grid lines

One way that helps me be more intentional with my grid placement is naming grid lines. Let’s say the item we want to place is an image. We could do this:

```css
.grid {
	display: grid;
	grid-template-rows:
		repeat(2, 150px) [image-start] repeat(2, 150px)
		[image-end];
	grid-template-columns: [image-start] repeat(3, 1fr) [image-end] 1fr;
	grid-auto-rows: 150px;
}
```

Using _-start_ and _-end_ as a suffix for our line names creates a grid area, which makes placing our image very simple:

```css
.image {
	grid-area: image;
}
```

#### Placing by end line

Sometimes placing by end line number (as opposed to start line number) can help avoid the problem of creating accidental implicit tracks. Taking our example above, perhaps we know that we want the image to span three grid tracks, so we’re using the _span_ keyword as the `grid-column-end` value. But it might be better to use _span_ as the `grid-column-start` value and explicitly place it on its end line:

```css
.image {
	/* The image will end at line 4 on the column axis: */
	grid-column: span 3 / 4;
}
```

This can be helpful if we have a very large grid. Imaging our grid has 20 columns instead of just four, we might know that it needs to be placed one line away from the end, but we don’t want to have to calculate what the start line should be each time – that would be annoying and prone to error!

#### Negative grid lines

A technique I find very useful (and something I’ve [written about before]()), which ties in with the last tip, is using negative line numbers to place grid items. Negative line number represent the lines of your grid in reverse. So in a grid of four tracks (which would have five grid lines), line -1 is the equivalent to line 5, line -2 is the equivalent to line 4, and so on.

[Illustration]()

Again, this can come in very handy when working with a large grid. If we know and item needs to align to the end of the grid then we can simply use grid line -1, instead of having to remember that the last line is line 21, for example.

### Debugging with dev tools

I thoroughly recommend the Firefox dev tools for inspecting and debugging problems with CSS Grid. The grid inspector allows you to switch on line numbers, so even if the sizes of your implicit tracks have collapsed right down to zero you will still be able to see that they have been created.
