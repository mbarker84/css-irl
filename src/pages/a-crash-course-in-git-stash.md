---
title: 'A Crash Course in Git Stash'
date: '2019-05-20'
---

When juggling with multiple branches in Git, it’s easy to accidentally start working on the wrong branch, before realising you need to switch to another. Or sometimes you might be working on a feature and you’re not ready to commit your changes yet, when someone asks you to fix an urgent bug and you need to jump onto another branch. This is where Git’s `stash` command comes in useful.

## Creating and applying a stash

Stashing allows us to save a copy of our uncommited changes on the current working branch. In its simplest form, the `git stash` command does this – it creates a stash! To reapply our stashed changes at a later point, we can use `git stash apply`.

We can apply the stash to a different branch – it doesn’t have to be the branch that we created the stash from.

### Stashing untracked files

By default, `git stash` will only stash the _tracked_ files. If we want to stage _untracked_ files (that have not yet been staged, or files that are ignored), we should use `git stash -u`. To apply a stash including untracked files, use <!--**CHECK** --> `git apply -u`.

## Multiple stashes

`git stash apply` will apply the last stash you created to your current working branch. But it’s possible to have multiple stashes at the same time, and to apply them individually. To list all the stashes, use `git stash list`. This will bring up a list that looks something like this:

```
$git stash list
```

By default, stashes are named WIP (Work in Progress), followed by the branch and commit the stash was created from. This might not be very useful if we have multiple stashes – it’s not very easy to see what changes we’ll be applying! Instead, we could give our stash a custom message, so it’s easier to see what it relates to:

```
git stash save 'my brand new stash'
```

Now, when we list our stashes, we’ll see our custom message instead of the generic one.

To apply a particular stash from our list, we can use `git stash apply stash@{2}` (replacing the last part with whichever stash reference we wish to use).

## Applying vs. popping

Applying a stash will keep a copy in the stash list – so we could apply the same stash to multiple branches. If we run `git stash list` after applying the stash, we’ll see the stash we applied is still there. If we want to remove it from the list when we apply it, we could use `git stash pop` instead. This works in a similar way to `apply`, where it will pop the last stash by default, or we could instead pop an individual stash (using `git pop stash@{2}`, for example). Popping is probably a good idea if you know you don’t need to apply your stash on any other branches, and you want to keep your stash list nice and clean.

## Removing stashes

We can remove individual stashes from the stash list by using the `drop` command and passing it the stash reference:

```
git stash drop stash@{2}
```

Alternatively we can clear all our stashes at once using `git stash clear`.
