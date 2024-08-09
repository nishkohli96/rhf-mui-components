---
sidebar_position: 2
sidebar_label: Why Eslint?
description: What is eslint and why you should include it in your projects?
title: Why Eslint?
---

# Why should I use eslint in my projects ?

As per the official [eslint](https://eslint.org/) docs, 

> ESLint statically analyzes your code to quickly find problems. Problems can be anything from potential runtime bugs, to not following best practices, to styling issues.

Besides error catching, eslint rules are also capable of formatting your code which makes it feel consistent, especially when working with a large team. One such popular framework which is widely used for formatting the code is [prettier](https://prettier.io/).

However, in this config, we will be mainly using [eslint-stylistic](https://eslint.style/) over [prettier](https://prettier.io/) as it gives you additional options to format your code and hopefully avoid conflict of rules between `eslint` and `prettier` for which you additionally had to install [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier). I still use `prettier`, but to only format non `.js(x)` and `.ts(x)` files like `.html` and `.css`.  

On running `eslint .` some of the rules imported from this config will give you a warning ⚠️ indicating that the code issue may be ignored while the rules triggering an error ❌ will discourage you to avoid that coding practice. The `eslint --fix` command should hopefully fix most of the warnings or errors in your code. It's okay to have a few warnings when developing, but they should be taken care of when pushing your code for production. 

:::warning
Ignored eslint warnings or errors in code will likely cause your app build to fail, unless resolved or specified eslint to ignore using the `eslint-ignore` syntax.
:::
