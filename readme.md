
# This repo is now defunct.

If you're interested in a strong starter for MEAN applications, check out my [MEAN Coffee Starter](https://github.com/crueber/mean-coffee-starter). Even if you're not, that template is a great place to start building your node app from.

**This repository has only been left for historical sake. It will not be updated further.**


### This is a fairly simple basic set up for technologies mentioned in the name.

# Old Notes

## Rewritten on March 19th, 2014.

Why was it rewritten? Because I've learned a heck of a lot about NodeJS, Express, Mongoose, and Auth since I started writing NodeJS apps. This basic setup is the culmination of that knowledge.

Why not just use a yeoman template? Because I like to know the whole codebase intimately, and this way I do. I know exactly what is in it, and I know how all the pieces fit together perfectly. Sure, I could have used KrakenJS, but I don't like Dust. Or their policy based authorization. And the fact that routes are mixed with controllers. It's all to taste in here, and I think everything is nicely situated in such a way that it's very usable. Check it out, you may like it to.

### A few notes.

* /assets is for connect-assets only. If you have static assets, they belong in /public.
* /config is where all configuration files live; Presently that includes globals, express, routes, logger, and passport.
* /models is for all your mongoose models.
* /routes is where your routes will live.
* /views is where your jade templates belong.

### Getting started requires two steps:

1. type `npm install` in the root directory.
2. Replace info in the package.json file with your own app details, along with specifics in the config/globals.js file.

If everything went well, starting the server requires nothing more than typing 'grunt', which will bring up nodemon. You should be fully able to authenticate with google from the get-go.
