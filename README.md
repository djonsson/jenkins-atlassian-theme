# Jenkins Atlassian Theme

<img src="http://danieljonsson.net/jenkins_beard.png" alt="" />

So you want Bamboo but you can´t afford it? Well, you´re in luck! Introducing **Jenkins Atlassian Theme** - Bamboo for the poor. It's the perfect middle ground - not Bamboo, but looks like it could be! 

In just *seven* easy steps this camouflage will make Jenkins look just like a product from Atlassian and blend in with the rest of your Atlassian development environment like Stash, Jira and Confluence. 

*The project is not affiliated or endorsed by Atlassian*

## Preview

https://jenkins-atlassian-theme.herokuapp.com/

This is a limited-access demo running on heroku with a couple test jobs that can be built to show their output. It's pulling the latest compiled for the CDN. A default install can been seen at https://jenkins-demo.herokuapp.com.

*Note:* These are running on single dynos, so the intial view could take up to a minute to load while the Dyno starts and Jenkins loads.

## Installation 

1. Install the [JQuery Plugin][jquery]

1. Install the [Simple Theme Plugin][simple]

1. Install the [Gravatar Plugin][gravatar]

1. Upload [theme.js][themejs], [theme-min.css][theme-min] and [jenkins_logo.png][logo] to your web server

1. Click `Manage Jenkins`

1. Click `Configure System` and scroll down to `Theme`

1. Specify the URL for `theme.js` and `theme-min.css`. 

1. Click `Save`

## Hosted installation

Skip step 4 and use these URLs in step 7:

```
https://cdn.rawgit.com/djonsson/jenkins-atlassian-theme/gh-pages/theme-min.css
https://cdn.rawgit.com/djonsson/jenkins-atlassian-theme/gh-pages/theme.js
```

## Development

CSS & JS files are minified and compressed with Grunt. To prepare the environment:

```
npm install
grunt
```

This will generate the following files:
```
dist/theme.css
dist/theme-min.css
dist/theme.js
```

You can publish the files on gh-pages with the following command:

```
grunt deploy
```

And you can find the files at:

- `http://YOURUSER.github.io/jenkins-atlassian-theme/theme.css`
- `http://YOURUSER.github.io/jenkins-atlassian-theme/theme.js`

## Compatibility
- Jenkins 2.2 and backwards
- JQuery plugin 1.7.2-1
- Simple Theme plugin 0.3
- Gravatar plugin 2.1

If you are experiencing issues please let me know! Also, feel free to contribute!

##Thanks to
- [JQuery Plugin][jquery] for the jQuery plugin
- [Simple Theme Plugin][simple] for the Simple Theme plugin
- [Atlassian][atlassian] for the the design inspiration and for making awesome products
- [Doony][doony] for inspiration and javascript
- [ProgressCircle.js][progresscircle] for the spinning progress circles that replace the orbs 

[jquery]: https://wiki.jenkins-ci.org/display/JENKINS/jQuery+Plugin
[simple]: https://wiki.jenkins-ci.org/display/JENKINS/Simple+Theme+Plugin
[gravatar]: https://wiki.jenkins-ci.org/display/JENKINS/Gravatar+plugin

[theme-min]: https://cdn.rawgit.com/djonsson/jenkins-atlassian-theme/gh-pages/theme-min.css
[themejs]: https://cdn.rawgit.com/djonsson/jenkins-atlassian-theme/gh-pages/theme.js
[logo]: https://cdn.rawgit.com/djonsson/jenkins-atlassian-theme/gh-pages/jenkins_logo.png

[doony]: https://github.com/kevinburke/doony
[progresscircle]: https://github.com/qiao/ProgressCircle.js
[atlassian]: http://atlassian.com
[livedemo]: http://test.do
