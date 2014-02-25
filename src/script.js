jQuery(function($){

    $('#footer').closest('table').css('border-spacing', 0);

    var userName = $('#login-field .model-link.inside').attr('href');
    var gravatarCookie = checkGravatarCookie();

    if(userName) {
        if(!gravatarCookie) {
            var host            = location.protocol + '//' + location.host;
            var gravatarPlugin  = '/pluginManager/plugin/gravatar/thirdPartyLicenses';
            var requestUrl      = host + gravatarPlugin;
            
            $.ajax({
                type: "GET",
                url: requestUrl,
                success: function() {
                    var gravatar = 'https://www.gravatar.com/avatar/';
                    var userApiUrl = '/api/json?pretty=true';
                    var request = userName + userApiUrl;

                    $.getJSON(request, function returnUserEmail(request) {
                        var propertyArray = request.property;

                        for (var i = 0; i < propertyArray.length; i++) {
                            var obj = propertyArray[i];
                            if (obj.address) {
                                var imgUrl = gravatar + MD5(obj.address);
                                writeCookie('gravatar', imgUrl, 3);
                                renderGravatar(imgUrl);
                                return;
                            }
                        }
                    });
                }
            });
        }
    }

function checkGravatarCookie() {
    if(~document.cookie.indexOf('gravatar=')) {
        var gravatarUrl = readCookie('gravatar');
        renderGravatar(gravatarUrl);
        return true;
    } else {
        return false;
    }
}
    
    function writeCookie(name,value,days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    function readCookie(name) {
        var i, c, ca, nameEQ = name + "=";
        ca = document.cookie.split(';');
        for(i=0;i < ca.length;i++) {
            c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return '';
    }

    function renderGravatar(imgUrl) {
        var img = $('<img>').attr({'src': imgUrl}).css({
            'height': '32px',
            'width': '32px',
            '-webkit-border-radius': '3px',
            '-moz-border-radius': '3px',
            '-border-radius': '3px',
            'margin-top': '4px'
        });
        $("#login-field").after(img.fadeIn(300));
    }

    var MD5 = function (string) {
     
        function RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }
     
        function AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                } else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            } else {
                return (lResult ^ lX8 ^ lY8);
            }
        }
     
        function F(x, y, z) {
            return (x & y) | ((~x) & z);
        }
     
        function G(x, y, z) {
            return (x & z) | (y & (~z));
        }
     
        function H(x, y, z) {
            return (x ^ y ^ z);
        }
     
        function I(x, y, z) {
            return (y ^ (x | (~z)));
        }
     
        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };
     
        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };
     
        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };
     
        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        };
     
        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };
     
        function WordToHex(lValue) {
            var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        };
     
        function Utf8Encode(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";
     
            for (var n = 0; n < string.length; n++) {
     
                var c = string.charCodeAt(n);
     
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
     
            }
     
            return utftext;
        };
     
        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9 , S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
     
        string = Utf8Encode(string);
     
        x = ConvertToWordArray(string);
     
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;
     
        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA);
            b = AddUnsigned(b, BB);
            c = AddUnsigned(c, CC);
            d = AddUnsigned(d, DD);
        }
     
        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
     
        return temp.toLowerCase();
    }
}); 


jQuery(function($){
 
    function stickyFooter() {
        var bodyHeight = $("body.yui-skin-sam").height();
        var vwptHeight = $(window).height();
        var footHeight = 45;
        var headerHeight = $("#header").height();
        $("#main-table").css("min-height",vwptHeight-footHeight-headerHeight);
    }
     
    stickyFooter();
     
    $(window).resize(function() {
        stickyFooter();
    });
     
    $(document).scroll(function() {
        stickyFooter();
    });

});


/*
 * ProgressCircle.js
 * http://qiao.github.io/ProgressCircle.js/
 *
 * © 2011-2013 Xueqiao Xu <xueqiaoxu@gmail.com>

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function(window, document, undefined) {

    /**
     * Find the absolute position of an element
     */
    var absPos = function(element) {
        var offsetLeft, offsetTop;
        offsetLeft = offsetTop = 0;
        if (element.offsetParent) {
            do {
                offsetLeft += element.offsetLeft;
                offsetTop += element.offsetTop;
            } while ((element = element.offsetParent) !== null);
        }
        return [offsetLeft, offsetTop];
    };

    /**
     * @constructor Progress Circle class
     * @param params.canvas Canvas on which the circles will be drawn.
     * @param params.minRadius Inner radius of the innermost circle, in px.
     * @param params.arcWidth Width of each circle(to be more accurate, ring).
     * @param params.gapWidth Space between each circle.
     * @param params.centerX X coordinate of the center of circles.
     * @param params.centerY Y coordinate of the center of circles.
     * @param params.infoLineBaseAngle Base angle of the info line.
     * @param params.infoLineAngleInterval Angles between the info lines.
     */
    var ProgressCircle = function(params) {
        this.canvas = params.canvas;
        this.minRadius = params.minRadius || 15;
        this.arcWidth = params.arcWidth || 5;
        this.gapWidth = params.gapWidth || 3;
        this.centerX = params.centerX || this.canvas.width / 2;
        this.centerY = params.centerY || this.canvas.height / 2;
        this.infoLineLength = params.infoLineLength || 60;
        this.horizLineLength = params.horizLineLength || 10;
        this.infoLineAngleInterval = params.infoLineAngleInterval || Math.PI / 8;
        this.infoLineBaseAngle = params.infoLineBaseAngle || Math.PI / 6;

        this.context = this.canvas.getContext('2d');

        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.circles = [];
        this.runningCount = 0;
    };

    ProgressCircle.prototype = {
        constructor: ProgressCircle,

        /**
         * @method Adds an progress monitor entry.
         * @param params.fillColor Color to fill in the circle.
         * @param params.outlineColor Color to outline the circle.
         * @param params.progressListener Callback function to fetch the progress.
         * @param params.infoListener Callback function to fetch the info.
         * @returns this
         */
        addEntry: function(params) {
            this.circles.push(new Circle({
                canvas: this.canvas,
                context: this.context,
                centerX: this.centerX,
                centerY: this.centerY,
                innerRadius: this.minRadius + this.circles.length *
                    (this.gapWidth + this.arcWidth),
                arcWidth: this.arcWidth,
                infoLineLength: this.infoLineLength,
                horizLineLength: this.horizLineLength,

                id: this.circles.length,
                fillColor: params.fillColor,
                outlineColor: params.outlineColor,
                progressListener: params.progressListener,
                infoListener: params.infoListener,
                infoLineAngle: this.infoLineBaseAngle +
                    this.circles.length * this.infoLineAngleInterval,
            }));

            return this;
        },

        /**
         * @method Starts the monitor and updates with the given interval.
         * @param interval Interval between updates, in millisecond.
         * @returns this
         */
        start: function(interval) {
            var self = this;
            this.timer = setInterval(function() {
                self._update();
            }, interval || 33);

            return this;
        },

        /**
         * @method Stop the animation.
         */
        stop: function() {
            clearTimeout(this.timer);
        },

        /**
         * @private
         * @method Call update on each circle and redraw them.
         * @returns this
         */
        _update: function() {
            this._clear();
            this.circles.forEach(function(circle) {
                circle.update();
            });

            return this;
        },

        /**
         * @private
         * @method Clear the canvas.
         * @returns this
         */
        _clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            return this;
        },

    };

    /**
     * @private
     * @class Individual progress circle.
     * @param params.canvas Canvas on which the circle will be drawn.
     * @param params.context Context of the canvas.
     * @param params.innerRadius Inner radius of the circle, in px.
     * @param params.arcWidth Width of each arc(circle).
     * @param params.gapWidth Distance between each arc.
     * @param params.centerX X coordinate of the center of circles.
     * @param params.centerY Y coordinate of the center of circles.
     * @param params.fillColor Color to fill in the circle.
     * @param params.outlineColor Color to outline the circle.
     * @param params.progressListener Callback function to fetch the progress.
     * @param params.infoListener Callback function to fetch the info.
     * @param params.infoLineAngle Angle of info line.
     */
    var Circle = function(params) {
        this.id = params.id;
        this.canvas = params.canvas;
        this.context = params.context;
        this.centerX = params.centerX;
        this.centerY = params.centerY;
        this.arcWidth = params.arcWidth;
        this.innerRadius = params.innerRadius || 0;
        this.fillColor = params.fillColor || '#fff';
        this.outlineColor = params.outlineColor || this.fillColor;
        this.progressListener = params.progressListener;
        this.infoLineLength = params.infoLineLength || 250;
        this.horizLineLength = params.horizLineLength || 50;
        this.infoListener = params.infoListener;
        this.infoLineAngle = params.infoLineAngle;

        this.outerRadius = this.innerRadius + this.arcWidth;

        // If the info listener is not registered, then don't calculate
        // the related coordinates
        if (!this.infoListener) return;

        // calculate the info-line turning points
        var angle = this.infoLineAngle,
            arcDistance = (this.innerRadius + this.outerRadius) / 2,

            sinA = Math.sin(angle),
            cosA = Math.cos(angle);

        this.infoLineStartX = this.centerX + sinA * arcDistance;
        this.infoLineStartY = this.centerY - cosA * arcDistance;

        this.infoLineMidX = this.centerX + sinA * this.infoLineLength;
        this.infoLineMidY = this.centerY - cosA * this.infoLineLength;

        this.infoLineEndX = this.infoLineMidX +
             (sinA < 0 ? -this.horizLineLength : this.horizLineLength);
        this.infoLineEndY = this.infoLineMidY;

        var infoText = document.createElement('div'),
            style = infoText.style;

        style.color = this.fillColor;
        style.position = 'absolute';
        style.left = this.infoLineEndX + absPos(this.canvas)[0] + 'px';
        // style.top will be calculated in the `drawInfo` method. Since
        // user may want to change the size of the font, so the top offset
        // must be updated in each loop.
        infoText.className = 'ProgressCircleInfo'; // For css styling
        infoText.id = 'progress_circle_info_' + this.id;
        document.body.appendChild(infoText);
        this.infoText = infoText;
    };

    Circle.prototype = {
        constructor: Circle,

        update: function() {
            this.progress = this.progressListener();
            this._draw();

            if (this.infoListener) {
                this.info = this.infoListener();
                this._drawInfo();
            }
        },

        /**
         * @private
         * @method Draw the circle on the canvas.
         * @returns this
         */
        _draw: function() {
            var ctx = this.context,

                ANGLE_OFFSET = -Math.PI / 2,

                startAngle = 0 + ANGLE_OFFSET,
                endAngle= startAngle + this.progress * Math.PI * 2,

                x = this.centerX,
                y = this.centerY,

                innerRadius = this.innerRadius,
                outerRadius = this.outerRadius;

            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.outlineColor;

            ctx.beginPath();
            ctx.arc(x, y, innerRadius, startAngle, endAngle, false);
            ctx.arc(x, y, outerRadius, endAngle, startAngle, true);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            return this;
        },

        /**
         * @private
         * @method Draw the info lines and info text.
         * @returns this
         */
        _drawInfo: function() {

            var pointList, lineHeight;

            pointList = [
                [this.infoLineStartX, this.infoLineStartY],
                [this.infoLineMidX, this.infoLineMidY],
                [this.infoLineEndX, this.infoLineEndY],
            ];
            this._drawSegments(pointList, false);

            this.infoText.innerHTML = this.info;

            lineHeight = this.infoText.offsetHeight;
            this.infoText.style.top = this.infoLineEndY +
                absPos(this.canvas)[1] - lineHeight / 2 + 'px';

            return this;
        },

        /**
         * @private
         * @method Helper function to draw the segments
         * @param pointList An array of points in the form of [x, y].
         * @param close Whether to connect the first and last point.
         */
        _drawSegments: function(pointList, close) {
            var ctx = this.context;

            ctx.beginPath();
            ctx.moveTo(pointList[0][0], pointList[0][1]);
            for (var i = 1; i < pointList.length; ++i) {
                ctx.lineTo(pointList[i][0], pointList[i][1]);
            }

            if (close) {
                ctx.closePath();
            }
            ctx.stroke();
        },
    };

    window.ProgressCircle = ProgressCircle;

})(window, document);

;jQuery(function($) {

    var colors = [
        '#C02942', // a red
        '#4ecdc4', // a bright green blue
        '#d95b43', // orange
        '#556270', // a slate color
        '#542437', // purple
        '#8fbe00', // lime yellow
    ];

    var getSubdomain = function(domain) {
        var parts = domain.split(".");
        if (parts.length <= 2) {
            return parts.join(".");
        } else {
            return parts.slice(0, -2).join(".");
        }
    };

    var hashCode = function(string) {
        var hash = 0, i, char;
        if (string.length === 0) return hash;
        for (i = 0, l = string.length; i < l; i++) {
            char  = string.charCodeAt(i);
            hash  = ((hash<<5)-hash)+char;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    var isJobPage = function(path) {
        return path.match(/^\/job\/.*?\//) !== null;
    };

    /**
     * This is a little tricky because it needs to match either the homepage or
     * a page with configuration. The configuration check is for an equals sign
     * in the 3rd part of the URL
     */
    var isJobHomepage = function(path) {
        return path.match(/^\/job\/.*?\/(.*?=.*?\/)?$/) !== null;
    };

    var isRootHomepage = function(path) {
        return path.match(/^\/job\/.*?\/$/) !== null;
    };

    var getRootJobUrl = function(path) {
        return path.match(/^\/job\/.*?\//)[0];
    };

    // note: this function assumes you're already on a job page
    var getJobUrl = function(path) {
        return path.match(/^\/job\/.*?\/(.*?=.*?\/)?/)[0];
    };

    var redirectForUrl = function(jobUrl, buildNumber) {
        $.getJSON(jobUrl + 'api/json?tree=builds[number]', function(data) {
            for (var i = 0; i < data.builds.length; i++) {
                var build = data.builds[i];
                if (build.number === buildNumber) {
                    window.location.href = jobUrl + buildNumber + '/consoleFull';
                }
            }
            // gone all the way through and it's not there, sleep for a minute
            // and try again.
            setTimeout(function() {
                redirectForUrl(jobUrl, buildNumber);
            }, 1000);
        });
    };

    var redirectToNewJobConsole = function(jobUrl, buildNumber) {
        if (isRootHomepage(jobUrl)) {
            $.getJSON(jobUrl + 'api/json?tree=activeConfigurations[name]', function(data) {
                if (JSON.stringify(data) !== "{}" && 'activeConfigurations' in data) {
                    // If its a multi configuration, just pick the first one.
                    // This works for us, might have to make this configurable
                    // somehow.
                    var downstreamUrl = jobUrl + data.activeConfigurations[0].name + '/';
                    return redirectForUrl(downstreamUrl, buildNumber);
                } else {
                    return redirectForUrl(jobUrl, buildNumber);
                }
            });
        } else {
            return redirectForUrl(jobUrl, buildNumber);
        }
    };

    var showButterBar = function(message) {
        var div = document.createElement('div');
        div.className = 'alert alert-warning doony-alert';
        div.innerHTML = message;
        $("#main-panel").prepend(div);
    };

    // build a callout
    var getCallout = function(message, href) {
        return "<div class='doony-callout doony-callout-info'><a " +
            (href === null ? "" : "href='" + href + "'") + ">" + message +
            "</a></div>";
    };

    // xxx combine this with the getCallout below
    var updateConfiguration = function(jobUrl, name) {
        $.getJSON(jobUrl + name + 'api/json?tree=lastBuild[number]', function(data) {
            if (data.lastBuild !== null && 'number' in data.lastBuild) {
                $("#matrix .model-link").each(function(idx, item) {
                    if (item.getAttribute('href') === name) {
                        var href = jobUrl + name + data.lastBuild.number + '/consoleFull';
                        $(item).next(".doony-callout").children("a").attr('href', href);
                    }
                });
            }
        });
    };

    if ($("#matrix").length) {
        // for some stupid reason jenkins fetches this with ajax so we need to
        // setinterval here to continue to retrieve it all the time
        setInterval(function() {
            var jobUrl = getJobUrl(window.location.pathname);
            if ($("#matrix .doony-downstream-link").length) {
                // already updated this matrix div
                return;
            }
            $("#matrix .model-link").wrap("<div class='doony-downstream-link'>");
            // Create the div, even though we don't have the HREF yet, so the
            // UI looks consistent
            $("#matrix .model-link").each(function(idx, item) {
                var message = "View console output for the latest build";
                $(item).after(getCallout(message, null));
            });
            $.getJSON(jobUrl + 'api/json?tree=activeConfigurations[name]', function(data) {
                for (var i = 0; i < data.activeConfigurations.length; i++) {
                    var config = data.activeConfigurations[i];
                    updateConfiguration(jobUrl, config.name + '/');
                }
            });
        }, 50);
    }

    // Replace the floaty ball with a better icon
    // XXX make the icon really good
    var replaceFloatyBall = function(selector, type) {
        $(selector).each(function() {
            var wrapper = document.createElement('div');
            wrapper.className = 'doony-circle doony-circle-' + type;
            wrapper.style.display = 'inline-block';
            var dimension;
            if (this.getAttribute('width') === "48" || this.getAttribute('width') === "24") {
                // an overly large ball is scary
                dimension = this.getAttribute('width') * 0.5 + 8;
                wrapper.style.marginRight = "15px";
                wrapper.style.verticalAlign = "middle";
            // XXX hack, this is for the main page job list
            } else if (this.classList.contains("icon32x32")) {
                dimension = 24;
                wrapper.style.marginTop = "4px";
                wrapper.style.marginLeft = "4px";
            } else {
                dimension = this.getAttribute('width') || 12;
            }
            $(wrapper).css('width', dimension);
            $(wrapper).css('height', dimension);

            $(this).after(wrapper).remove();
        });
    };

    var replaceBouncingFloatyBall = function(selector, color) {
        $(selector).each(function() {

            if ($(this).next(".doony-canvas").length) {
                return;
            }
            var canvas = document.createElement('canvas');
            canvas.className = 'doony-canvas';

            // 48 -> dimension 32.
            // radius should be 12, plus 4 width
            // 16 -> dimension 16, radius 4
            var dimension;
            if (this.getAttribute('width') === "48" || this.getAttribute('width') === "24") {
                // an overly large ball is scary
                dimension = this.getAttribute('width') * 0.5 + 8;
                canvas.style.marginRight = "15px";
                canvas.style.verticalAlign = "middle";
            // XXX hack, this is for the main page job list
            } else if (this.classList.contains("icon32x32")) {
                dimension = 24;
                canvas.style.marginTop = "4px";
                canvas.style.marginLeft = "4px";
            } else {
                dimension = this.getAttribute('width') || 12;
            }
            canvas.setAttribute('width', dimension);
            canvas.setAttribute('height', dimension);

            var circle = new ProgressCircle({
                canvas: canvas,
                minRadius: dimension * 3 / 8 - 2,
                arcWidth: dimension / 8 + 1
            });

            var x = 0;
            circle.addEntry({
                fillColor: color,
                progressListener: function() {
                    if (x >= 1) { x = 0; }
                    x = x + 0.005;
                    return x; // between 0 and 1
                },
            });
            // jenkins does ajax every 5 seconds, this should time it perfectly
            circle.start(24);
            $(this).after(canvas).css('display', 'none');
        });
    };

    var green = '#4f9f4f';
    setInterval(function() {
        replaceBouncingFloatyBall("img[src*='red_anime.gif']", '#d9534f');
        replaceBouncingFloatyBall("img[src*='blue_anime.gif']", green);
        replaceBouncingFloatyBall("img[src*='grey_anime.gif']", '#999');
        replaceBouncingFloatyBall("img[src*='yellow_anime.gif']", '#f0ad4e');
    }, 10);
    setInterval(function() {
        replaceFloatyBall("img[src*='/grey.png']", "aborted");
        replaceFloatyBall("img[src*='/blue.png']", "success");
        replaceFloatyBall("img[src*='/red.png']", "failure");
        replaceFloatyBall("img[src*='/yellow.png']", "warning");
    }, 10);

    if (isJobHomepage(window.location.pathname)) {
        var jobUrl = getJobUrl(window.location.pathname);
        $.getJSON(jobUrl + 'api/json?tree=lastBuild[number]', function(data) {
            if (!('lastBuild' in data) || data.lastBuild === null || !('number' in data.lastBuild)) {
                return;
            }
            var message = "View console output for the latest build";
            var href = jobUrl + data.lastBuild.number + '/consoleFull';
            var h2 = $("h2:contains('Permalinks')");
            h2.after(getCallout(message, href));
        });
    }

    if (isJobPage(window.location.pathname)) {
        var button = document.createElement('button');
        button.className = "btn btn-primary doony-build";
        button.innerHTML = "Build Now";
        $(button).click(function() {
            var jobUrl = getRootJobUrl(window.location.pathname);
            // The build post endpoint doesn't tell you the number of the next
            // build, so get it before we create a build.
            $.getJSON(jobUrl + 'api/json?depth=1&tree=nextBuildNumber,lastBuild[building]', function(data) {
                $.post(jobUrl + 'build', function() {
                    // in case there's an immediate redirect, don't show the
                    // bar.
                    var message = "Build #" + data.nextBuildNumber + " created, you will be redirected when it is ready.";
                    if (JSON.stringify(data) !== "{}" &&
                        'lastBuild' in data &&
                        data.lastBuild !== null &&
                        data.lastBuild.building
                    ) {
                        message += " <a href='#' id='doony-clear-build'>Cancel the current build</a>";
                    }
                    showButterBar(message);
                    redirectToNewJobConsole(getJobUrl(window.location.pathname),
                        data.nextBuildNumber);
                });
            });
        });

        $(document).on('click', '#doony-clear-build', function(e) {
            e.preventDefault();
            var jobUrl = getRootJobUrl(window.location.pathname);
            $.getJSON(jobUrl + 'api/json?tree=lastBuild[number]', function(data) {
                $.post(jobUrl + data.lastBuild.number + '/stop');
            });
        });

        var title = $("#main-panel h1").first();
        if (title.children("div").length) {
            title.append(button);
        } else {
            title.css('display', 'inline-block');
            title.after(button);
        }
    }

});


