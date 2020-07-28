
/* This software is licensed under a BSD license; see the LICENSE file for details. */

//
// TODO: Replace this controller with something that's not such a horrible mess!
//

/* This software is licensed under a BSD license; see the LICENSE file for details. */

define_ibex_controller({
name: "SliderQuestion",

jqueryWidget: {
    _init: function () {

        var self = this;

        this.cssPrefix = this.options._cssPrefix;
        this.finishedCallback = this.options._finishedCallback;
        this.utils = this.options._utils;
        this.leftComment = dget(this.options, "leftComment", false);
        this.rightComment = dget(this.options, "rightComment", false);
        this.continueOnReturn = dget(this.options, "continueOnReturn", false);
        this.continueMessage = dget(this.options, "continueMessage", "Continue");
        this.range = dget(this.options, "range", 5.0)

        // this.buttonMessage = this.options.buttonMessage || "Continue";

        this.html = dget(this.options, "html");
        this.$html = htmlCodeToDOM(this.html);
        this.element.append($("<div>").addClass(this.cssPrefix + 'html').css('text-align', conf_centerItems ? 'center' : 'left').append(this.$html));
       
        var sliderdiv = document.createElement('div');
        sliderdiv.setAttribute('id','slider');
        sliderdiv.setAttribute('class',this.cssPrefix + 'slider');
        //sliderdiv.setAttribute('style','width:300px');MILICA: added a fixed width so that it aligns nicely with labels (added widths in the css file)
        sliderdiv.setAttribute('style','width:450px');
        sliderdiv.setAttribute('position','center');
        this.element.append(sliderdiv);
        if (this.leftComment && this.rightComment) {
          this.element.append($("<div>").addClass(this.cssPrefix + "labels").append($("<span>").append(this.leftComment)).append($("<span>").css('float', 'right').append(this.rightComment)));

        }

        this.slider = document.getElementById('slider');

        noUiSlider.create(this.slider, {
           //start: [ this.range * 0.5 ],
           start: [ 2.5 ],
            
           connect: 'lower',
           range: {
             'min': [  0 ],
             'max': [ 5 ]
             //'max': [ this.range ]
           }
        });

      if (this.continueMessage) {
            this.element.append($("<p>").append($("<a>").attr('href', '').text(this.continueMessage)
                                                .addClass(ibex_controller_name_to_css_prefix("NewMessage") + "continue-link")
                                                .click( function (e) {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                  self.handler(e);
                                                })));
      }

      // this.$button = $("<div>").addClass(this.cssPrefix + 'button');
      // this.$button.text(this.buttonMessage);
      // this.element.append(this.$button);
      // self.safeBind(this.$button, 'click', function (e) {
      //     e.preventDefault();
      //     e.stopPropagation();
      //     self.handler(e);
      // });

      if (this.continueOnReturn) {
        self.safeBind($(document), 'keydown', function (e) { if (e.keyCode == 13) {
          e.preventDefault();
          e.stopPropagation();
          self.handler(e);
        }});
      }

    },
    handler: function () {
        var val = this.slider.noUiSlider.get();
        this.finishedCallback([[
            ["html", csv_url_encode(this.$html.innerHTML)],
            ["value", val]
        ]]);
    },
},

properties: {
    obligatory: ["html"],
    countsForProgressBar: true,
    htmlDescription: function (opts) {
        return htmlCodeToDOM(opts.html);
    }
}
});
