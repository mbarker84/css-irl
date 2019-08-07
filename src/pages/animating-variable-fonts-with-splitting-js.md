---
title: 'Animating Variable Fonts with Splitting JS'
date: '2018-08-08'
tags: ['css', 'animation', 'typography', 'javascript']
---

Variable fonts are exciting new development for typography. Instead of multiple font files to load different variants of a particular font, variable fonts allow us to load all of the variations from a single file. In most cases this is a big performance win (although the file tends to be larger than a regular font file on its own, so it’s best to only use a variable font if you actually need it).

Instead of maybe three or four font weights being available (some fonts have more, others have fewer), which are only available in multiples of 100 (e.g. `font-weight: 600`), variable fonts provide a range of values. The weight can be varied anywhere within that range. So `font-weight: 372` is perfectly valid!

Weight is just one of the axes of variation (although probably the most common one). Variable fonts can come with other axes too. There are a number of standard axes, which correspond to a four-letter tag:

- weight (`wght`)
- width (`wdth`)
- italic (`ital`)
- slant (`slnt`)
- optical size (`opsz`)

These also correspond to CSS properties can values:

- `font-weight: 300`
- `font-stretch: 150%`
- `font-style: italic`
- `font-style: oblique 30deg`
- `font-optical-sizing: auto`

Not all variable fonts contain all of these axes of variation. Many contain just one or two.

They can also be accessed using the `font-variation-settings` property. This property enables us to not only adjust the standard axes, but custom axes as well.

```css
```

## Custom axes

Custom axes provide the type designer with infinite scope for creativity! A custom axis of variation could be literally anything – some, like _x-height_, might be fairly common for a typeface, but there are many more creative possibilities.

Custom axes
