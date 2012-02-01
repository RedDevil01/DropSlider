(function () {


    var SliderControl;

    window.SliderControl = SliderControl = (function () {

        function SliderControl() { }

        SliderControl.prototype._create = function () {
            var SliderValue, dragValue, errorMsgTag, imageTag, inputTag, inputsmallTag, sliderInner;
            inputsmallTag = ($('<input/>')).attr({
                type: 'text'
            }).attr({
                type: 'hidden'
            }).attr({
                value: this.options.SelectedValue
            });
            dragValue = ($('<input/>')).attr({
                type: 'text'
            }).attr({
                readonly: 'readonly'
            }).attr({
                value: this.options.SelectedValue
            }).addClass(this.css.dragValue);
            sliderInner = ($('<div/>')).addClass(this.css.sliderInner).append(inputsmallTag).slider({
                animate: true,
                range: this.options.range,
                value: this.options.SelectedValue,
                min: this.options.min,
                max: this.options.max,
                step: this.options.step
            });
            SliderControl = ($('<div/>')).addClass(this.css.sliderControler).append(sliderInner).append(dragValue).hide();
            imageTag = ($('<div/>')).addClass(this.css.sliderImg);
            errorMsgTag = ($('<input/>')).attr({
                type: 'text'
            }).attr({
                readonly: 'readonly'
            }).addClass(this.css.errorMsg).hide();
            inputTag = ($('<input/>')).attr({
                type: 'text'
            }).attr({
                id: this.options.Name + '_Input'
            }).attr({
                value: this.options.SelectedValue
            });
            SliderValue = ($('<div/>')).addClass(this.css.sliderValue).append(inputTag).append(imageTag);
            return ($(this.element)).attr({
                id: this.options.Name
            }).append(SliderValue).append(SliderControl).append(errorMsgTag);
        };

        SliderControl.prototype._init = function () {
            var element, now, sliderControl, sliderControlInput, sliderValue, sliderValueInput,
      _this = this;
            element = $(this.element);
            sliderValue = element.children().eq(0);
            sliderControl = element.children().eq(1);
            sliderValueInput = $('#' + this.options.Name + '_Input', sliderValue);
            sliderControlInput = $('.' + this.css.dragValue, sliderControl);
            now = new Date();
            ($("#" + this.options.Name + " " + '.' + this.css.sliderImg)).click(function (event) {
                now = new Date() - now;
                if (now > 200) _this.OnValueChange(sliderValue, sliderControlInput);
                sliderValue.hide();
                return sliderControl.show();
            });
            sliderValueInput.change(function (event) {
                now = new Date();
                return _this.OnValueChange(sliderValue, sliderControl);
            });
            return ($('.' + this.css.sliderInner, sliderControl)).slider({
                change: function (e, ui) {
                    sliderValue.show();
                    sliderControl.hide();
                    sliderControlInput.val(ui.value);
                    return sliderValueInput.val(ui.value);
                },
                slide: function (e, ui) {
                    return sliderControlInput.val(ui.value);
                }
            });
        };

        SliderControl.prototype.OnValueChange = function (sliderValue, sliderControl) {
            var error, msg, sliderControlInput, sliderValueInput;
            msg = "";
            sliderControlInput = $('.' + this.css.dragValue, sliderControl);
            sliderValueInput = $('#' + this.options.Name + '_Input', sliderValue);
            if (isNaN(sliderValueInput.val())) {
                msg = sliderValueInput.val() + ' was not a number.';
            } else if (sliderValueInput.val() < this.options.min) {
                msg = sliderValueInput.val() + ' was below minumum value.';
            } else if (sliderValueInput.val() > this.options.max) {
                msg = sliderValueInput.val() + ' was above maximum value.';
            }
            if (msg !== "") sliderValueInput.val(sliderControlInput.val());
            error = $('.' + this.css.errorMsg, this.element);
            error.val(msg);
            $('.' + this.css.sliderInner, sliderControl).slider('option', 'value', sliderValueInput.val());
            error.show();
            return error.delay(this.options.msgDelay).fadeOut(this.options.msgFadeTime);
        };

        SliderControl.prototype.options = {
            Name: "Default",
            range: "min",
            min: 0,
            max: 100,
            SelectedValue: 50,
            msgDelay: 800,
            msgFadeTime: 1600
        };

        SliderControl.prototype.css = {
            sliderValue: 'sliderValue',
            sliderImg: 'sliderImg',
            sliderInner: 'slider',
            sliderControler: 'sliderControl',
            dragValue: 'result',
            errorMsg: 'errorMsg'
        };

        return SliderControl;

    })();

    $.widget("vdms.dropSlider", new SliderControl);

}).call(this);


