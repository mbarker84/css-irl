---
title: 'Part 3: Auto-flow, Order and Item Placement'
series: 'Debugging CSS Grid'
date: '2019-07-05'
tags: ['css grid']
---

When it comes to building a layout, CSS Grid offers us a number of different choices for placing items. In this article we’ll take a look at the different placement methods, how to use auto-flow to avoid having to explicitly place every item, and why sometimes grid items might not be placed where you expect them to be.

I like to think of using Grid as two distinct parts:

1. Scaffolding – or building the structure of the grid itself. This involves defining the properties acting on the grid container, beginning with `display: grid`, and describing the shape of the grid and how it should behave using any combination of `grid-template-columns`, `grid-template-rows`, `grid-auto-columns` and `grid-auto-rows` (or `grid` / `grid-template` if using the shorthand).
2. Furnishing the grid – telling the browser where each child of our grid container should be placed.

Let’s get a deeper understanding of grid item placement to see why that is.

## Different ways to place a grid item

### Explicit placement

The properties that allow us to explicitly place items on a grid are:

- `grid-column-start`
- `grid-column-end`
- `grid-row-start`
- `grid-row-end`
- `grid-column` (shorthand for `grid-column-start` / `grid-column-end`)
- `grid-row` (shorthand for `grid-row-start` / `grid-row-end`)
- `grid-area` (shorthand for `grid-row-start` / `grid-column-start` / `grid-row-end` / `grid-column-end`)

The above properties that are defined on the _items_ themselves, and possible values could be a grid line number, line name, span value or area name.

```css
```

### grid-template-areas

Additionally, we have `grid-template-areas`. This property it is defined on the _grid container_. It allows us to define grid area, then reference those grid areas on the items themselves:

```css
```

This is pretty cool, as it means we could change the layout significantly by only altering this property value. We don’t need to add or change any properties on the items themselves. Potentially a big win for responsive design!

Using `grid-template-areas` we could place every item explicitly, and avoid the problem of unexpected item placement. But one disadvantage, is you can’t define overlapping areas. Creating a layout like the one below could not be done with `grid-template-areas` alone.

![Image]()

However, we _could_ use `grid-template-areas` _in addition_ to placing items by line name or area.

```css
```

### Auto placement

If we don’t explicity place items on our grid, they will be auto-placed. By default each grid items have a span of 1 on both the row and the column axis, so they will each be placed into the next available grid cell. We can use this to our advantage: If we have something like a news feed, we don’t want to have to place each item explicitly, especially if we don’t know how many items there will be.

![Image]()

## Common problems

Just what _is_ the next available grid cell? If we have some items that are explicitly placed, and others that we want to be auto placed, how do we identify the cells they will be placed into?

If I place an item on my grid using `grid-column: 2 / span 2` I might expect that any auto placed items succeeding that one will be placed _after_ the one I’m placing:

![Image]()

In fact, this _does_ happens if we place an item only on the column axis:

![Image]()

What _actually_ happens with the above code is the succeeding items are placed _before_ the placed item. They are placed into the first available cells, which happen to be the first two in our grid.

![Image]()

So _why_ is the placement different? If we understand the rules of auto placement, things become clearer.

## Understanding flow

A good way to think about this is to think of your grid as a flowing river. Any explicitly placed items are boats anchored in the river. Auto placed items flow around these.

![Image]()

Grid items that are only explicitly placed on one axis are more loosly anchored. They participate in the grid flow on the remaining axis.

Items using a single `span` value will still flow like the others, but they’ll be restricted by their own explicit size. An item with a span of 2 will flow onto the next row if there are less than 2 grid columns available.

![Image]()

In the previous example (Fig. xx?) we placed an item explicitly on the column and row axis, and instead of being placed _after_ the item, succeeding items were placed before it. If we only place the item on the column axis, something different happens: The succeeding items _are_ placed after it. In this example, we have enough items to fill the grid exactly – but rather than filling the first grid cell, the eighth item creates an implicit track.

![Image]()

However, if we only place the item on the row axis only, the items will behave as before – they will fill all the available grid cells, including the ones preceeding the item we are placing.

![Image]()

Why is this?

In [part 1]() of this series we touched upon the [grid placement algorithm](https://www.w3.org/TR/css-grid-1/#auto-placement-algo). According to the algorithm, the browser will process items locked to a given row, then determine the columns in the implicit grid, followed by placing any remaining items. This gives us a clue that items explicitly placed on the row axis will be treated differently from those placed on only the column axis.

## Changing the flow of your grid

We can use the `grid-auto-flow` property to change the direction of flow, and therefore how items will be auto placed. Possible values are `row` (default), `column`, `row dense` and `column dense`.

By changing the value from `row` to `column`, we can see in the second section in this demo that the behaviour has now reversed: Items placed on the column axis are now resolved ahead of those on the row axis. Placing an item on the column axis no longer generates an implicit grid track, as items are packed into every cell, but placing an item on the row axis _does_.

<iframe height="397" style="width: 100%;" scrolling="no" title="Auto flow and distribution" src="//codepen.io/michellebarker/embed/MMqLdK/?height=397&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/MMqLdK/'>Auto flow and distribution</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Order

### Writing modes / direction

### Overlapping cells
