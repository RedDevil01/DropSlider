(function () {

    var SliderControl;
    window.SliderControl = SliderControl = (function () {


        function SliderControl() { }

        SliderControl.prototype._create = function () {
            var SliderValue, sliderControl, image, input, sliderInner, inputsmall, dragValue;
            image = ($('<div/>')).addClass(this.css.sliderImg);
            input = ($('<input/>')).attr({type: 'text'})
								   .attr({id: this.options.Name + "_Input"})
								   .attr({value: this.options.SelectedValue});
								
            SliderValue = ($('<div/>')).addClass(this.css.sliderValue)
									   .append(input)
									   .append(image);
            sliderInner = ($('<div/>')).addClass(this.css.sliderInner);

            inputsmall = ($('<input/>')).attr({type: 'text'})
										.attr({type: "hidden"})
										.attr({value: this.options.SelectedValue});

            dragValue = ($('<input/>')).attr({type: 'text'})
									   .addClass(this.css.dragValue);

            sliderControl = ($('<div/>')).addClass(this.css.sliderControler).hide();

            ($(sliderControl)).append(sliderInner)
							  .append(inputsmall)
							  .append(dragValue);
            $(sliderInner).append(inputsmall);

            sliderInner.slider({
                animate: true,
                range: "min",
                value: this.options.SelectedValue,
                min: this.options.min,
                max: this.options.max,
                step: this.options.step
            });

            ($(this.element)).attr({ id: this.options.Name });
            return ($(this.element)).append(SliderValue)
								    .append(sliderControl);

        };

        SliderControl.prototype._init = function () {
            var that = this;
            var divControl1 = that.element[0].firstChild;
            var divControl2 = that.element[0].children[1];
            ($('.' + this.css.sliderImg, divControl1)).click(function () {
                return that.clicked();
            });

            ($("#" + this.options.Name + "_Input", divControl1)).change(function () {
                that.clicked();
            });

            ($("." + this.css.sliderInner, divControl2)).slider({
                change: function (e, ui) {
                    $("#" + that.options.Name).find('.' + that.css.sliderValue).show();
                    $("#" + that.options.Name).find('.' + that.css.sliderControler).hide();
                    $("#" + that.options.Name + "_Input").val($("." + that.css.sliderInner, that.element[0]).slider("value"));
                    $('.' + that.css.dragValue, that.element[0]).val($("." + that.css.sliderInner, that.element[0]).slider("value"));
                },
                slide: function (e, ui) {
                    $('.' + that.css.dragValue, that.element[0]).val(ui.value);
                }

            });
        };

        SliderControl.prototype.clicked = function () {
            var val = ($("#" + this.options.Name + "_Input").val());
            if (isNaN(val)) {
                alert("Please enter number only");
                ($("#" + this.options.Name + "_Input")).val((this.options.min + this.options.max) / 2);
            }
            else if (val < this.options.min)
                alert("Minimum value is " + this.options.min);

            else if (val > this.options.max)
                alert("Maximum value is " + this.options.max);

            $('#' + this.options.Name).find('.' + this.css.sliderInner).slider('option', 'value', ($('#' + this.options.Name + "_Input").val()));
            $('#' + this.options.Name).find('.' + this.css.sliderValue).hide();
            $('#' + this.options.Name).find('.' + this.css.sliderControler).show();
        };

		// Widget Options that can be passed in at initiation time.
        SliderControl.prototype.options = {
            Name: "Default",
            range: "min",
            min: 0,
            max: 100,
            SelectedValue: 50,
            step: 1
        };

		// This are the CSS style Names used by the JavaScript.
        SliderControl.prototype.css = {
            sliderValue: 'sliderValue',
            sliderImg: 'sliderImg',
            sliderInner: 'slider',
            sliderControler: 'sliderControl',
            dragValue: 'result'
        };

        return SliderControl;

    })();

    $.widget("vdms.dropSlider", new SliderControl);

}).call(this);
