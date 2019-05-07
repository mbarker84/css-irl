---
title: 'Part 2: What the fr(action)?'
series: 'Debugging CSS Grid'
date: '2019-06-05'
---

In the second part of the _Debugging CSS Grid_ series, we’ll take a look at _fr_ (or _fraction_) units. _fr_ units are very useful for sizing grid tracks, but there are a few ways they can trip you up.

## Introduction

The _fr_ unit is a new unit, currently exclusive to Grid. It allows you to size your grid tracks according to a proportion of the available space in the grid container. By using _fr_ units instead of percentages (or other fixed units), we can avoid messy and complicated _calc()_ functions to size our grid tracks. As a simple example, we can create four equal-width columns:

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

Now we can quite clearly see that the _1fr_ columns in the last example are _not_ the same size as those in the first example, despite using the same unit value!
