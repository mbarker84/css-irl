---
title: 'A Modern Front End Workflow'
date: '2019-10-13'
tags: ['workflow', 'tooling']
---

When it comes to building a simple front-end project, how do you get started? What are the tools you need? I suspect everyone will have a different answer. Do you start with a (JS or CSS) framework, or off-the-shelf boilerplate starter kit? Perhaps you use a task runner (like [Gulp]() or [Grunt]()) to orchestrate your project’s needs. Maybe you use NPM scripts? Or do you start simple, with just HTML and a CSS file? In this article we’ll walk through setting up and configuring a simple project starter repository, using [Parcel](https://parceljs.org/) – a minimal-config application bundler – which we’ll come to in a moment.

## Why do we need a project starter repository?

I’ve written previously on this blog about [keeping things simple](/building-a-dependency-free-site/) and building dependency-free — and for a basic, minimal site, this approach has a lot to recommend it. But the vast majority of my projects would benefit from a bit more tooling. In any given project, it’s likely that at the very least I’ll want to:

- Run a local server
- Compile SCSS to CSS, and minify the output
- Hot reload (show changes in the browser without the need for manual refresh)
- Optimise images
- Create SVG icon sprites

In larger projects, there are plenty more tooling options we could add into the mix to help us build performant, accessible websites. We might want to bundle and transpile our Javascript, split our code. On the CSS side, perhaps we’d like to inline our critical CSS, or purge unused selectors. If you don’t know what some of these words mean, you’re not alone! Front-end development has got a lot more complex in recent years, and it can be hard to keep abreast of the constant changes to best practices. One article that has really helped me understand the vast tooling landscape that these days falls into the realm of front-end development is [Modern Javascript Explained For Dinosaurs](https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70). Although a couple of years old, this article is still extremely relevant, and explains succinctly how Javascript has evolved to become such a vital part of our workflow.

All this takes time to set up and configure, and to do it from scratch every time we start a new project wouldn’t be ideal. Which is why it’s useful to have a starter repository that we can download and boot up with everything we need to start coding straight away.

## Choosing our tools

If you’re a regular reader of this blog you’ll know that I love writing HTML and CSS. I’m not a person who loves spending time setting up complex tooling. I want my tools to demand as little time from me as possible, so that I can concentrate on the things I love doing! While I’ve used Gulp in the past, it now seems a less necessary part of the toolchain: virtually all dependencies can be installed via NPM and configuring them with NPM scripts is no more difficult than configuring them with Gulp. So using a task runner seems a bit redundant, and would only add an extra dependency to the project. [This article](https://css-tricks.com/why-npm-scripts/) explains some of the advantages of using NPM scripts, and how to get started – but be warned, one or two or the plugins it recommends are now inactive.

Let’s begin building our project starter, and learn about the tools we’ll be using along the way. Feel free to skip over any parts you’re already familiar with.

## Installing Node.js

The very first thing we need to do to get our project set up to work with NPM scripts is to make sure we have [Node.js](https://nodejs.org) installed globally. This sounds simple enough, but already things start to get a little more complicated when we realise there are a number of different ways to do this:

- [Download the latest version from the website](https://nodejs.org) and follow the instructions for installation
- With a package manager like [Homebrew](https://brew.sh/) for Mac, which allows us to update our node version with a simple command: `brew upgrade node`.
- Using [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm).

NVM is my preferred option, as it allows us to easily upgrade our node version, see which version we’re currently running, list other installed versions or switch to another version using single commands. But it requires additional steps to install depending on your setup, which is beyond the scope of this particular article.

Once you have Node installed (by whichever method suits you), you can check the currently installed version by running `node -v`. (You might want to upgrade to the latest version.)

## NPM

Installing Node also installs [NPM](https://www.npmjs.com/) (Node Package Manager). This is basically a huge library of open source Javascript development tools that anyone can publish to. We have direct access to this library of tools and (for better or worse!) can install any of them in our projects to help us with development tasks.

First, let’s create a new project folder. Open the terminal, and inside that folder run:

```
npm init
```

Running this command brings up several steps for initialising our project in the command line, such as adding a name and description. You can hit <kbd>Enter</kbd> to skip through each of these if you don’t want to complete them right away – we’ll be able to edit them later on. You’ll then see that a folder called `node_modules` has been created in the project, along with a _package.json_ file. This file is where we’ll configure the scripts that will build and run our project.
