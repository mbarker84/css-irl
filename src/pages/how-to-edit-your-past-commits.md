---
title: 'How to edit your past commits with Git'
date: '2019-04-01'
---

Have you ever pushed some code with a bad commit message and wished you could go back in time and edit it? Perhaps you got two different commits mixed up, or maybe your commit message was insufficiently descriptive. Either way, bad commit messages are no good to anyone – you never know when you might need to check out a commit, and hunting through past commits for an elusive chunk of code can be a nightmare. Your future self won’t thank you for it!

If your commit hasn’t yet been pushed, and the message you want to change is for the very last commit you made, editing the commit message is very simple. Just type:

```
git commit --amend
```

If you run this with the `-m` flag, you can edit your commit message in the terminal at the same time:

```
git commit --amend -m "Edited commit message"
```

Then edit your commit message, save the commit, and push! You can also add or remove files before amending the commit. Perhaps you forgot to include one of your changes in the last commit. Just add or remove those files _before_ executing the _amend_ command:

```
git add README.md
git rm bad-file.md
git commit --amend -m "Edited commit message"
```

You could also make changes to your last commit (such as adding or removing files) _without_ changing the commit message:

```
git add README.md
git rm bad-file.md
git commit --amend --no-edit
```

But what if you’ve already pushed your commit, or even if it’s a few commits back? Happily, there’s a fairly straightforward way to edit your past commit messages – assuming you know which commit the one you want to edit is.

## Travelling through time

Using Git is a bit like having access to our own time machine. We can move backwards and forwards on our timeline by checking out different commits. If we’re working in a team we might have lots of people working on their own separate timelines ([Git branches](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)), and sometimes their timelines might converge with our own ([merging](https://www.atlassian.com/git/tutorials/using-branches/git-merge)), but time is basically linear. If you commit some bad code you can always go back in time to before it happened. Even if you take some code from a past commit from the past and merge it into the present, if something goes wrong you’ll still be able access the commits that happened in between. You’re simply adding some more steps to the timeline – so you haven’t lost all that great work you did. Pretty cool!

![Illustration]()

## Rebasing

Rebasing opens up some other dimensions for us. Time is no longer linear – rebasing takes us into the world of the multiverse. We can actually change history. That is to say, we can go back, change (or remove) a commit and it’s like it never happened. Our past, present and future will be like that commit never existed at all. If you haven’t watched the Netflix series [Russian Doll](https://www.netflix.com/gb/title/80211627), go and do it now. Done? Good. Let’s look at how this great and terrible superpower can be useful.

You might think it’s great to have a linear timeline where everything that has ever happened is recorded and set in stone. And it is...most of the time. But there are a few exceptions, which become especially apparent if you’re working on a large project.

Keeping a clean Git history can make it much quicker and easier to look back and see e

## Editing the timeline

To edit our past commits we have to do an [interactive rebase](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History). We’ll need to know how many commits back we need to go (relative to the _HEAD_, or current commit). Let’s say that the third from last commit is the one we want to edit. Type the following into your terminal:

```
git rebase -i HEAD~3
```

This will bring up a list of the last three commits. For example:

```
pick cd16d77 Adding .gitignore
pick 67c91dc Adding README.md
pick 1ba6af9 Removing unneccessary imports
```

Alternatively, if you know the commit ID, you could target that instead:

```
git rebase -i cd16d77
```

You’ll notice each commit has the word `pick` next to it. We need to change this to `reword`. Use the `i` key as a shortcut for insert mode, which will allow us to edit the text. Then you can change the actual text of the commit message alongside it.

If you want to change not only the commit message, but the content of the commit itself, you can use `edit` instead of `reword`. You’ll notice there are some other options too, including `drop` to remove a commit entirely. (These also have their short commands: `d` for _drop_, `r` for _reword_, etc.)

One you’re happy with your commit, hit _escape_ to exit insert mode, then type `:wq` to exit the Git editor.

If you haven’t yet pushed your bad commit, then we don’t need to do anything further. Otherwise, we’ll need to do a force push. If, like me, you’re a bit scared of Git, then force-pushing is just about the scariest thing you can do. You’re re-writing Git history. But lets face our fears together!

First of all, make sure no-one else is working on your branch or has pushed commits in the meantime. Otherwise they’ll need to bring their local branch into line with yours, and that could be a big headache. (This is why it’s a really good idea to work on separate branches!). Then run:

```
git push --force
```

When rebasing the HEAD will automatically be reset to the latest commit, so we’re done – we’ll already have the most up-to-date version of our project to continue working on.

So there you go, we’ve rewritten history and the world didn’t end! If you’re interested in learning more, this is a [useful tutorial](https://www.atlassian.com/git/tutorials/rewriting-history) from Atlassian about rebasing and rewriting history.
