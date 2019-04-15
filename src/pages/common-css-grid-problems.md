---
title: 'Common CSS Grid problems (and how to avoid them)'
date: '2019-04-15'
---

When observing people getting to grips with CSS Grid, I’ve noticed a couple of issues that seem to come up regularly. Let’s dive into these common problems and look at how we can avoid them in the future.

## Implicit tracks

The biggest issue I’ve seen people struggle with is accidentally creating extra grid tracks, which can throw an entire layout into disarray. These extra tracks are known as _implicit_ tracks, and they are often created by placing an item outside of the _explicit_ grid’s boundary, or by expecting an item to be auto-placed when in fact it needs to be explicitly placed on your Grid. To get the most out of Grid, it’s a good idea to understand the concepts of the _explicit_ and _implicit_ grid, and their relationship to each other.

### The explicit grid

The explicit grid is defined using the `grid-template-rows` and `grid-template-columns` properties (or shorthand `grid-template` if you prefer):

```css
.grid {
	grid-template-rows: repeat(4, 150px);
	grid-template-columns: repeat(4, 1fr);
}
```

Here we’re defining a grid with four rows and four columns, and we can know that our grid will have _at least_ four rows and four columns, no matter what. Even if we don’t have any grid children to place, so that our grid is completely empty, it will still take up the space of four rows and four columns that we’ve defined above.

If we omitted the `grid-template-rows` property, our grid rows would all have a height of `auto` – so if we had no grid children then our rows would still exist, they would just collapse down to a height of `0` without any content to fill them. If we added a row gap (e.g. `row-gap: 40px`) then the combined height of the gaps between the rows would make up the height of our grid – so without any content it might look like an extra large margin or padding value somewhere that was breaking your layout!

I thoroughly recommend the Firefox dev tools for inspecting and debugging problems with CSS Grid. The grid inspector allows you to switch on line numbers, so even if your implicit tracks have collapsed right down to zero you will still be able to see that they have been created.
