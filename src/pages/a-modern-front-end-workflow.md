---
title: 'Building a Project Starter'
series: 'A Modern Front End Workflow'
date: '2019-10-23'
tags: ['workflow', 'tooling', 'javascript']
---

When it comes to building a simple front-end project, how do you get started? What are the tools you need? I suspect everyone will have a different answer. Do you start with a (JS or CSS) framework, or off-the-shelf boilerplate starter kit? Perhaps you use a task runner (like [Gulp]() or [Grunt]()) to orchestrate your project’s needs. Maybe you use NPM scripts? Or do you start simple, with just HTML and a CSS file?

The front-end tooling landscape can be confusing, and at times overwhelming – and when you’re dedicating your time to learning HTML, CSS and Javascript, adding tooling into the mix as yet another thing to learn can be a challenge. That’s why I want to help developers get up and running as easily as possible with building maintainable sites, and understand some of the tooling options available.

In this article we’ll walk through building and configuring a simple project starter (or boilerplate) repository, using NPM scripts and [Parcel](https://parceljs.org/) – a minimal-config application bundler – which we’ll come to in a moment.

## Why do we need a project starter repository?

I’ve written previously on this blog about [keeping things simple](/building-a-dependency-free-site/) and building dependency-free — and for a basic, minimal site, this approach has a lot to recommend it. But the vast majority of my projects would benefit from a bit more tooling. In any given project, it’s likely that at the very least I’ll want to:

- Run a local server
- Compile SCSS to CSS, and minify the output
- Live reload (show changes in the browser without the need for manual refresh)
- Optimise images
- Create SVG icon sprites

In larger projects, there are plenty more tooling options we could add into the mix to help us build performant, accessible websites. We might want to bundle and transpile our Javascript, split our code. On the CSS side, perhaps we’d like to inline our critical CSS, or purge unused selectors. If you don’t know what some of these words mean, you’re not alone! Front-end development has got a lot more complex in recent years, and it can be hard to keep abreast of the constant changes to best practices. One article that has really helped me understand the vast tooling landscape that these days falls into the realm of front-end development is [Modern Javascript Explained For Dinosaurs](https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70). Although a couple of years old, this article is still extremely relevant, and explains succinctly how Javascript has evolved to become such a vital part of our workflow.

All this takes time to set up and configure, and to do it from scratch every time we start a new project wouldn’t be ideal. Which is why it’s useful to have a starter repository that we can download and boot up with everything we need to start coding straight away.

## Choosing our tools

If you’re a regular reader of this blog you’ll know that I love writing HTML and CSS. I’m not a person who loves spending time setting up complex tooling. I want my tools to demand as little time from me as possible, so that I can concentrate on the things I love doing! While I’ve used Gulp in the past, it now seems a less necessary part of the toolchain: virtually all dependencies can be installed via NPM and configuring them with NPM scripts is no more difficult than configuring them with Gulp. So using a task runner seems a bit redundant, and would only add an extra dependency to the project. [This article](https://css-tricks.com/why-npm-scripts/) explains some of the advantages of using NPM scripts, and how to get started – but be warned, one or two or the plugins it recommends are now inactive.

The tools I’ve chosen here are a personal preference, and suit the kind of projects I like to build. They’re not necessarily everyone’s choice, and there are plenty of different ways to do things. But I hope this tutorial will help you get a bit more familiar with some of the tools that have become popular among developers, so that you can make your own choices.

With that in mind, let’s begin building our project starter, and learn about the tools we’ll be using along the way. Feel free to skip over any parts you’re already familiar with.

## Installing Node.js

The very first thing we need to do to get our project set up to work with NPM scripts is to make sure we have [Node.js](https://nodejs.org) installed globally. This sounds simple enough, but already things start to get a little more complicated when we realise there are a number of different ways to do this:

- [Download the latest version from the website](https://nodejs.org) and follow the instructions for installation
- With a package manager like [Homebrew](https://brew.sh/) for Mac, which allows us to update our node version with a simple command: `brew upgrade node`.
- Using [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm).

NVM is my preferred option, as it allows us to easily upgrade our node version, see which version we’re currently running, list other installed versions or switch to another version using single commands. But it requires additional steps to install depending on your setup, which is beyond the scope of this particular article.

Once you have Node installed (by whichever method suits you), you can check the currently installed version by running `node -v`. (You might want to upgrade to the latest version.) If you’re using NVM you could (optionally) create a _.nvmrc_ config file to ensure you always run the correct Node version for your project.

## NPM

Installing Node also installs [NPM](https://www.npmjs.com/) (Node Package Manager). This is basically a huge library of open source Javascript development tools (or packages) that anyone can publish to. We have direct access to this library of tools and (for better or worse!) can install any of them in our projects to help us with development tasks.

### NPM or Yarn?

[Yarn](https://yarnpkg.com/lang/en/) is an alternative package manager, similar to NPM, and almost as popular. In fact, many people consider it an improvement. It can be used in the same way, to install dependencies. If you prefer to use Yarn over NPM, you can safely substitute the `npm` command with `yarn` anywhere I’m using it in this article.

### Initialising the project

First, let’s create a new project folder, which we’ll call _my-awesome_project_. Open the terminal, and inside that folder run:

```
npm init
```

Running this command brings up several steps for initialising our project in the command line, such as adding a name and description. You can hit <kbd>Enter</kbd> to skip through each of these if you don’t want to complete them right away – we’ll be able to edit them later on. You’ll then see that a _package.json_ file has been created, which should look something like this:

```json
{
	"name": "project-starter",
	"version": "1.0.0",
	"description": "",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "",
	"license": "ISC"
}
```

This file contains all the information about our project, and is where we can edit the details that we just skipped through.

Any packages that we install from NPM will be automatically listed in the _package.json_ file. It’s also where we’ll configure the scripts that will build and run our project. We’ll install some packages and configure these shortly, but first we’ll need a basic project architecture, and some files to work with.

## Project structure

We’ll start with a folder structure that looks like this:

```
my-awesome-project
  src
    icons
    images
    js
    scss
    index.html
  node_modules
  package.json
```

We’ve already generated the _node_modules_ directory and _package.json_ in the root of the project. We just need to create a directory called _src_, containing directories for images, JS, SCSS and icons, plus an _index.html_ file.

### Creating our folder structure from the command line

You could create the above folder structure manually, either in your text editor of choice or in your computer’s file system. But if you want to save time, you could do it from the terminal instead. In the root of the project, you could run:

```
mkdir src
cd src
mkdir js scss images icons && touch index.html
cd ../
```

Line by line, this code:

1. Creates a new _src_ directory
2. Moves us into the newly-created directory
3. Creates directories inside _src_ called _js_, _scss_, _images_ and _icons_, and a file called _index.html_.
4. Brings us back up to the project root.

Now let’s add the following to our _index.html_ file so that we can see our site in the browser:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Project starter</title>
		<link rel="stylesheet" type="text/css" href="dist/css/styles.css" />
	</head>
	<body>
		<h1>Hello world!</h1>
	</body>
</html>
```

In _package.json_, let’s change the value of `“main”` from `index.js` to `src/index.html`, as that’s where our entry point will be:

```json
{
	"name": "project-starter",
	"version": "1.0.0",
	"description": "",
	"main": "src/index.html",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "",
	"license": "ISC"
}
```

## Installing dependencies

Now that we have our basic folder structure, we can start to install some packages and write some NPM scripts that will let us build and view our website. The scripts we’re going to write will:

1. Run a local server
2. Compile Sass to CSS
3. Watch for changes and reload the page whenever we update our HTML or CSS

Let’s install the [node-sass](https://www.npmjs.com/package/node-sass) package from NPM, which compiles _.scss_ files to CSS. In the terminal run:

```
npm install node-sass --save-dev
```

Once this command has finished running, you should see a couple of new things:

1. A directory called _node_modules_ has been created
2. In the _package.json_ file, `node-sass` is now listed in “devDependencies”.
3. Adds a _package-lock.json_ file. This isn’t something we should ever need to touch.

### Adding a .gitignore

The _node_modules_ directory is where the code for all of our project dependencies will live. The contents of this folder should _not_ be committed to Github, as installing just a few dependencies could result in hundreds of thousands of files! So the next thing we should do is add a _.gitignore_ file in the project root:

```
touch .gitignore && echo "node_modules" >> .gitignore
```

This command creates the _.gitignore_ file and adds _node_modules_ to it. (Again, you can do this manually if you prefer.) Now we are safe in the knowledge that our packages will not be committed.

If we’re not committing these files, then how can we share our dependencies with other users? Well, this is where _package.json_ helps us. It tells us the name and version number of any dependencies we have installed. Anyone who clones or forks the project (including us, when we use it as a project starter!) can simply run `npm install` and all the associated dependencies will be fetched and downloaded from NPM!

### Types of dependencies

When we installed _node-sass_ we ran the install command with the `--save-dev` flag. This installs the project as a “dev dependency”. Other packages may not require this command, and save a package under “dependencies” instead. The difference is that regular dependencies are _runtime_ dependencies, whereas dev dependencies are _buildtime_ dependencies. _node-sass_ is required to build your project, but something like, say, a carousel plugin, or a client-side JS framework like React would need to be a regular dependency.

Now we’ll also install [Browsersync](https://www.npmjs.com/package/browser-sync) as a dev dependency. Browsersync will run a local server and reload the browser when our files change.

```
npm install browser-sync --save-dev
```

## Writing NPM scripts

Now it’s time to write some scripts to run our project. As previously mentioned, we’re going to write these in the “scripts” section of our _package.json_.

### Sass to CSS

NPM scripts consist of a key (the name of the script, which is what we would type in the terminal in order to run it) and a value – the script itself, which will be executed when we run the command. First we’ll write the script which compiles Sass to CSS. We’ll give it the name **scss** (we could name it anything we like) and add it to our “scripts” section:

```json
"scripts": {
  "scss": "node-sass --output-style compressed -o dist/css src/scss",
}
```

The _node-sass_ package contains some [options](https://github.com/sass/node-sass), some of which we’re defining here. We’re specifying the output style (“compressed”), the output directory (_dist/css_) and the source directory (_src/scss_), which is currently empty. Let’s create a source _.scss_ file from the terminal:

```
touch src/scss/styles.scss
```

Add a few styles to the newly-created file, then go back to the terminal and run:

```
npm run scss
```

You should then see a new directory called _dist_ has been created, containing your compiled CSS. Now, every time you make changes to your _styles.scss_ file, you can run the script and those changes will be compiled.

### Live reload with Browsersync

Our first script is working great, but it’s not very useful yet, as every time we make changes to our code we need to got back to the terminal and run the script again. What we would be much better it to run a local server and see our changes reflected instantaneously in the browser. In order to do that we’ll write a script that uses Browsersync, which we’ve already installed.

First, let’s write the script that runs the server, which we’ll call **serve**:

```json
"scripts": {
	"scss": "node-sass --output-style compressed -o dist/css src/scss",
	"serve": "browser-sync start --server --files 'dist/css/*.css, **/*.html'"
}
```

In the `--files` option we’re listing the files that Browsersync should monitor. It will reload the page when any of these change. If we run this script now (`npm run serve`), it will start a local server and we can preview our web page by going to [http://localhost:3000](http://localhost:3000) in the browser.

Currently we still need to run our **scss** script when we want to compile our Sass, so let’s automate that. We need to install an NPM package called _onchange_, to watch for changes to the source files:

```
npm install onchange --save-dev
```

We can write NPM scripts that run other scripts. Let’s add the script that watches for changes and triggers our **scss** command to run:

```json
"scripts": {
	"scss": "node-sass --output-style compressed -o dist/css src/scss",
	"serve": "browser-sync start --server --files 'dist/css/*.css, **/*.html'",
	"watch:css": "onchange 'src/scss' -- npm run scss",
}
```

The **watch:css** script watches for changes using the _onchange_ package (_src/scss_) and runs our **scss** script when changes occur.

### Combining scripts

Now we need to run two commands concurrently: The **serve** command to run our server, and the **watch:css** command to compile our Sass to CSS, which will trigger the page reload. Using NPM scripts we can easily run commands _consecutively_ using the _&&_ operator:

```json
"start": "npm run serve && npm run scss"
```

However, this won’t achieve what we want, as the script will wait until _after_ the **serve** script has finished running before it begins running the **scss** script. If we go ahead and write this script, then run it in the terminal (`npm start`), then `npm run scss` won’t be triggered until we’ve stopped the server.

To enable us to run consecutive commands, we need to install another package. NPM has several options to choose from. The one I’ve picked is [npm-run-all](https://www.npmjs.com/package/npm-run-all):

```
npm install npm-run-all --save-dev
```

The main options in this package (or at least, the ones we care about) are **run-s** and **run-p**. The former is for running sequentially, the latter is for running commands in parallel. Once we have installed this package, we can use it to write the script that runs both our **serve** and **watch:css** commands in parallel. (We’ll call it **start**.)

```json
"scripts": {
	"scss": "node-sass --output-style compressed -o dist/css src/scss",
	"serve": "browser-sync start --server --files 'dist/css/*.css, **/*.html'",
	"watch:css": "onchange 'src/scss' -- npm run scss",
	"start": "run-p serve watch:css"
}
```

We now have a very basic starter project. We’ve written some scripts that allow us to simply type the command `npm start` to run a server, watch for changes, compile Sass to CSS and reload the page.

We could now go ahead and install some packages and write scripts to automate some of our other tasks, such as optimising images, creating SVG sprites and building JS. [This CSS Tricks article](https://css-tricks.com/why-npm-scripts/) has a great rundown of a few more scripts you might like to add, as well as a [starter repository](https://github.com/damonbauer/npm-build-boilerplate). (Be aware, one or two of the packages included in the example have since been deprecated. You may need to search NPM for substitutes.)

We might also want to bundle and transpile our JS. We could end up writing many more scripts and installing plenty more dependencies! But to do some of the heavy lifting, we could instead use [Parcel](https://parceljs.org/).

## Module bundling with Parcel

Parcel purports to be a “zero-config” alternative to Webpack, a popular Javascript module bundler. A module bundler takes separate, reusable JS files (or modules) and “bundles” them into a single file to be served to the browser, as well as minifying the output. This can improve website performance, as the browser doesn’t need to load a bunch of files individually. This in itself is very useful, but Parcel also takes care of other tasks for us out of the box, including:

- Running a local server
- Building and minifying HTML, CSS and assets
- Transpiling Javascript
- Live reloading
- Code splitting

Using Parcel, we can do everything we already did in the first part of this tutorial (and much more!), while writing fewer scripts! In fact, we only need two scripts to achieve everything we want.

### Creating a Parcel project

Let’s create a new project structure, similar to the one we began with earlier (or you could delete the scripts and dependencies from _package.json_ and use the same project):

```
mkdir src
cd src
mkdir js scss images icons && touch index.html
cd ../
```

We’ll start by installing Parcel as a dependency, and we’ll also install _node-sass_ while we’re at it (multiple packages can be listed to install them at the same time):

```
npm install parcel-bundler node-sass --save-dev
```

(If you’re creating a new project, don’t forget to run `npm init` first.)

We’ll need to change the file path of our stylesheet in _index.html_. We only need to tell Parcel the relative path of our source file, as the actual path for use in production will be generated by Parcel at buildtime.

```html
<link rel="stylesheet" href="./scss/styles.scss" />
```

Now we need to write our two NPM scripts. The first (**start**) will run our project, the second (**build**) will build it for production:

```json
"scripts": {
	"start": "parcel src/index.html",
	"build": "parcel build src/index.html"
}
```

We could also (optionally) tell Parcel which port to use, and instruct it to open our website in a new browser tab whenever we start it up – let’s do that now:

```json
"scripts": {
	"start": "parcel src/index.html -p 3000 --open", // Uses port 3000
	"build": "parcel build src/index.html"
}
```

Now go ahead and run `npm start`. Parcel should open your site in the browser at [https://localhost:3000](https://localhost:3000) and reload the page when you make any changes to your SCSS or HTML. We don’t need Browsersync, and we don’t need to write any additional scripts.

### Adding plugins

We can add plugins (which are themselves NPM packages) to optimise images and create SVG sprites:

```
npm install parcel-plugin-imagemin parcel-plugin-svg-sprite
```

For the [parcel-plugin-imagemin]() package to take effect, we need to add a config file. Add the following to a file called _imagemin.config.js_ in the project root:

```js
module.exports = {
	gifsicle: { optimizationLevel: 2, interlaced: false, colors: 10 },
	jpegtran: { progressive: true, arithmetic: false },
	pngquant: { quality: [0.25, 0.5] },
	svgo: {
		plugins: [{ removeViewBox: false }, { cleanupIDs: true }]
	},
	webp: { quality: 10 }
}
```

You can adjust the options for the desired level optimisation ([see documentation]()). _parcel-plugin-svg-sprite_ should just work out-of-the-box – run the project and try adding some icons to see the result.

## Transpiling

I like to write my JS using ES2015 syntax. [Babel](), a transpiler, converts modern Javascript to a syntax that can be read by older browsers – meaning you can write the latest JS code and have it work everywhere. That’s a pretty useful thing to include in a project starter.

Babel has a lot of different plugins and configuration options, and wading through them can feel a bit daunting. But there’s a handy package called _preset-env_ that takes care of transforming all the features of ES2015 (think arrow functions, destructuring, spread operators), which suits me just fine, so let’s install that.

```
npm install @babel/core @babel/preset-env --save-dev
```

You can add other plugins if you want to configure Babel to suit your specific needs.

Now we need to add a config file in the project root:

```
touch .babelrc
```

If we’re happy using the [default config options]() then we don’t need to add much at all to our config file. The following will suffice:

```
{
	"presets": ["@babel/preset-env"]
}
```

Again, the Babel documentation has more information on [config options]() should you need it.

Parcel runs Babel for us automatically, so once we’ve installed it and created our config file we’re good to go – our code will be transpiled whenever we run `npm run build`.

## Sass architecture

I tend to employ more or less the same Sass architecture for every project, so I want my boilerplate to include the SCSS files and folders I need to get started writing code straight away. This is my preferred architecture, loosely based on [Harry Roberts’]() [ITCSS](https://www.hongkiat.com/blog/inverted-triangle-css-web-development/) (Inverted Triangle CSS), and our boilerplate at my previous agency, [Mud]():

1. **Config** This typically contains three files: This is where I define all the Sass variables, mixins and function for use throughout the project. I generally use a single file for my variables, covering breakpoints, colours, spacing and anything else. But there’s no reason the variables file couldn’t be broken up into several files, which might be a good idea for large projects.
2. **Base** Pretty much everything in here involves writing styles on element selectors, rather than classes. It includes any resets (e.g. `* { box-sizing: border-box; }`), and base styles for typography and form elements, some of which may be over-ridden at the component level later on.
3. **Objects** Any small, reusable pieces of UI, which could appear in multiple components, belong here. I start with a _buttons.scss_ file because, well, pretty much every project has buttons! But I only tend to add others when I need them.
4. **Globals** I like to keep any components that will be used on every page, such as the header and footer, in a separate folder from the rest of the components. I also add generic layout classes in here – if I have a grid that I want to use in a lot of places, for example. I prefer to use classes rather than mixins for those, as it’s one fewer level of abstraction.
5. **Components** This is for the larger chunks of UI, such as hero sections, cards, media objects and more. It’s where the bulk of my CSS will be written, but I leave it empty to begin with so that I can add individual component files as and when I need them.
6. **Utilities**

So, to finish off our project starter, I’m going to add the following file structure to the _src/scss_ directory:

```
01-config
	_variables.scss
	_functions.scss
	_mixins.scss
02-base
	_resets.scss
	_typography.scss
	_forms.scss
03-objects
	_buttons.scss
04-globals
	_header.scss
	_footer.scss
	_layout.scss
05-components
05-utilities
```

You might notice each folder has a numerical prefix – this is so that when viewed in the file system the visual order will reflect the import order. This will make it much quicker and easier to find the file I want, and will help avoid mistakes with the cascade.

## Creating a Github repository
