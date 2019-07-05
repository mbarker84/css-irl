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

But it’s not always clear where the next available grid cell is. If we have some items that are explicitly placed, and others that we want to be auto placed, how do we identify the cells they will be placed into?

## Knowing when to use each method

It’s when using a mixture of explicit and implicit (auto) placement that I most commonly see confusion around this. That’s usually a result of not fully understanding the rules of auto placement. In [Part 1]() of this series we touched upon the grid placment algorithm, which tells the browser where to place grid items, and the order in which to do so. [This post]() by [Hui-Jing Chen]() explains the grid placment algorithm really well.

A good way to think about this is to think of your grid as a flowing river. Any explicitly placed items are boats anchored in the river. Auto placed items flow around these.

![Image]()

Grid items than are only semi-explicitly placed – either placed on a single axis, or using the span keyword instead of definite lines – are more loosly anchored. Items that use only `span` will still flow like the others, but they’ll be restricted by their own explicit size. An item with a span of 2 will flow onto the next row if there are less than 2 grid columns available.

![Image]()

Conversely, if the same item is explicitly placed by grid line, it will be firmly anchored, even if the grid row does not contain enough columns. It will create implicit tracks instead, and other items will flow around it.

![Image]()

## Changing the flow of your grid

### Auto flow

### Order

### Writing modes / direction

### Anonymous grid items

### Overlapping cells
