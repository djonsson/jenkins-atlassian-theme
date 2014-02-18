# Jenkins Atlassian Theme v0.1

<img src="http://danieljonsson.net/jenkins_beard.png" alt="" />

So you want Bamboo but you can´t afford it? Well, you´re in luck! Introducing **Jenkins Atlassian Theme** - Bamboo for the poor. It's the perfect middle ground - not Bamboo, but looks like it could be! 

In just *seven* easy steps this camouflage will make Jenkins look just like a product from Atlassian and blend in with the rest of your Atlassian development environment like Stash, Jira and Confluence. 

*The project is not affiliated or endorsed by Atlassian*

## Installation 

1. Install the [JQuery Plugin][jquery]

1. Install the [Simple Theme Plugin][simple]

1. Upload `script.js`, `style.css` and `jenkins_logo.png` to your web server or use the hosted version (see step 6).

1. Click `Manage Jenkins`

1. Click `Configure System` and scroll down to `Theme`

1. Specify the CSS and Javascript URL for the theme
    - Hosted CSS: `http://git.test.do/src/style.css`
    - Hosted Javascript: `http://git.test.do/src/script.js`

1. Click `Save`!


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

## Examples
<img src="http://danieljonsson.net/atlassian_theme/full_view.png" />
***
<img src="http://danieljonsson.net/atlassian_theme/console_output.png" />
***
<img src="http://danieljonsson.net/atlassian_theme/build_executors.png" />

[jquery]: https://wiki.jenkins-ci.org/display/JENKINS/jQuery+Plugin
[simple]: https://wiki.jenkins-ci.org/display/JENKINS/Simple+Theme+Plugin
[doony]: https://github.com/kevinburke/doony
[progresscircle]: https://github.com/qiao/ProgressCircle.js
[atlassian]: http://atlassian.com
