---
title: 'Controlling widow Grid items with pseudo-selectors'
date: '2019-04-11'
---

I recently wrote about [some of the cases where you might want to use Grid instead of flexbox](), and vice-versa. One of the scenarios I pointed out _might_ be a better case for using flexbox is when you want to control the behaviour of any leftover grid items that don’t fill an entire row.

[Illustration]()

In the typographic world, words at the end of a paragraph that don’t take up a full line are called [widows](). These grid items behave in a similar way, so that’s how I’m referring to them here. (Side note: The CSS properties `widows` and `orphans` deal with these typographic behaviours in paged media and multi-column layout.)

## Why would we want to use Grid here?

To my mind, using grid is often the better choice when it comes to defining a fixed number of columns that each need to take up a proportion of the available space. We can use the _fr_ unit here, which is designed for this purpose:

```css
.grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 20px;
}
```

This will give us three equal width columns that utilise all the space available. Doing this with Grid is a lot cleaner than the flexbox solution, which would require `calc()` and negative margins to get the same effect.

[Demo]()

We don’t need to explicitly place each item, they will all be placed into the next available cell using Grid’s default auto-placement, which is helpful if we don’t know the number of items in our Grid.

The problem arises if we want to control the behaviour of any widow items. If there is just one widow, perhaps we want it to fill the entire row, or maybe we’d prefer to align it to the right instead of the left. Or if there are two items, maybe we want to center them:

[Illustration]()

We can’t achieve this by relying solely on auto-placement, but we _can_ still get the behaviours we want using with only a little bit of extra code.

## _nth-child_ combinators

By using _nth-child_ smartly, we can detect whether an item is a widow or not and adjust our styles accordingly. [Heydon Pickering]() uses a similar technique, which he refers to as _quantity queries_ in [this A List Apart article](). We’re going to use them slightly differently here, but the principle is the same: We’re going to detect whether an item is both a _last-child_ _and_ comes immediately after a child that is a multiple of three (i.e. it’s the first item in a row). (We can’t use `:last-child` alone, as this would select the last item regardless of whether it’s a widow or not.)

Then we can target that item with our styles, e.g. setting it to span three grid tracks:

```css
li:last-child:nth-child(3n - 2) {
	grid-column: span 3;
}
```

You can see it in action in this demo:

<p class="codepen" data-height="391" data-theme-id="0" data-default-tab="result" data-user="michellebarker" data-slug-hash="KEXErp" style="height: 391px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="CSS Grid + nth-child to control last row behaviour">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/KEXErp/">
  CSS Grid + nth-child to control last row behaviour</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

In the first of the two examples shown I’m targeting the last child item if it is also the _second_ item in a row and making that span two columns, while the second example targets the last child if it is the _first_ item in the row:

```css
/* Target the second item on the last row, as long as it is the last item in the grid */
li:last-child:nth-child(3n - 1) {
	grid-column: span 2;
}

/* Target the first item on the last row, if it is the last item */
li:last-child:nth-child(3n - 2) {
	grid-column: span 3;
}
```
