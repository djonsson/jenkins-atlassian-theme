# Jenkins Atlassian Theme

<img src="http://danieljonsson.net/jenkins_beard.png" alt="" />

So you want Bamboo but you can´t afford it? Well, you´re in luck! Introducing **Jenkins Atlassian Theme** - Bamboo for the poor. It's the perfect middle ground - not Bamboo, but looks like it could be! 

In just *seven* easy steps this camouflage will make Jenkins look just like a product from Atlassian and blend in with the rest of your Atlassian development environment like Stash, Jira and Confluence. 

*The project is not affiliated or endorsed by Atlassian*

## Live Demo 
A live demo with the latest changes is available at [test.do][livedemo]. It also doubles as a staging area for testing in develop. 

## Installation 

1. Install the [JQuery Plugin][jquery]

1. Install the [Simple Theme Plugin][simple]

1. Upload `script.js`, `style.css` and `jenkins_logo.png` to your web server

1. Click `Manage Jenkins`

1. Click `Configure System` and scroll down to `Theme`

1. Specify the URL for `script.js` and `style.css`. 

1. Click `Save`

## Hosted installation
Skip step 3 and use these URLs in step 6:

**Master (Stable)**
- Hosted CSS: `http://master.source.test.do/src/style.css`
- Hosted Javascript: `http://master.source.test.do/src/script.js`

**Develop (Latest)**
- Hosted CSS: `http://develop.source.test.do/src/style.css`
- Hosted Javascript: `http://develop.source.test.do/src/script.js`


## Compatibility
- JQuery plugin 1.7.2-1
- Simple Theme plugin 0.3
- Jenkins 1.551

If you are experiencing issues please let me know! Also, feel free to contribute!

##Thanks to
- [JQuery Plugin][jquery] for the jQuery plugin
- [Simple Theme Plugin][simple] for the Simple Theme plugin
- [Atlassian][atlassian] for the the design inspiration and for making awesome products
- [Doony][doony] for inspiration and javascript
- [ProgressCircle.js][progresscircle] for the spinning progress circles that replace the orbs 

[jquery]: https://wiki.jenkins-ci.org/display/JENKINS/jQuery+Plugin
[simple]: https://wiki.jenkins-ci.org/display/JENKINS/Simple+Theme+Plugin
[doony]: https://github.com/kevinburke/doony
[progresscircle]: https://github.com/qiao/ProgressCircle.js
[atlassian]: http://atlassian.com
[livedemo]: http://test.do
