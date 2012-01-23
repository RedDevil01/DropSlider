window.SliderControl = class SliderControl
	_create: ->
    # Build up sliderControl Elements
		inputsmallTag = ($ '<input/>')
    	.attr(type: 'text')
			.attr(type: 'hidden')
			.attr(value: @options.SelectedValue)

		dragValue = ($ '<input/>')
			.attr(type: 'text')
			.attr(readonly: 'readonly')
			.attr(value: @options.SelectedValue)
			.addClass(@css.dragValue)

		sliderInner = ($ '<div/>')
			.addClass(@css.sliderInner)
			.append(inputsmallTag)
			.slider  #Initiate the Slider Widget!
				animate: true
				range: @options.range
				value: @options.SelectedValue
				min: @options.min
				max: @options.max
				step: @options.step
			
		SliderControl = ($ '<div/>')
			.addClass(@css.sliderControler).hide()
			.append(sliderInner)
			.append(dragValue)
		
		# Build up the sliderValue Elements
		imageTag = ($ '<div/>')
			.addClass(@css.sliderImg)
			
		errorMsgTag = ($ '<input/>')
    	.attr(type: 'text')
      .attr(readonly: 'readonly')
      .addClass(@css.errorMsg)
    
		inputTag = ($ '<input/>')
			.attr(type: 'text')
			.attr(id: @options.Name + '_Input')
			.attr(value: @options.SelectedValue)
			
		SliderValue = ($ '<div/>')
			.addClass(@css.sliderValue)
			.append(inputTag)
			.append(imageTag)
			.append(errorMsgTag)  
			
		($ this.element)
    	.attr(id: @options.Name )
    	.append(SliderValue)
    	.append(SliderControl)
                
	_init: ->
		element = ($ this.element)
		sliderValue = element.children().eq(0)
		sliderControl = element.children().eq(1)
		sliderValueInput = ($ '#' + @options.Name + '_Input', sliderValue)
		sliderControlInput = ($ '.' + @css.dragValue, sliderControl)

		# Hook up the sliderValue DropDown Image Click Event
		($ "#"+this.options.Name+" "+'.' + this.css.sliderImg ).click (event) =>
			@OnValueChange(sliderValue, sliderControlInput)
			sliderValue.hide()
			sliderControl.show()

		# Hook up the sliderValue OnChange Event
		sliderValueInput.change (event) =>  
			@OnValueChange(sliderValue, sliderControl)
		
		# Hook up the JQuery Slider Widget Change and Slide Events
		($ '.' + @css.sliderInner, sliderControl).slider
			change: (e, ui) =>
				sliderValue.show()
				sliderControl.hide()
				sliderControlInput.val ui.value
				sliderValueInput.val ui.value
			slide: (e, ui) =>
				sliderControlInput.val ui.value

	# Validate the value and ensure JQuery Slider Widget values are updated.
	OnValueChange: (sliderValue, sliderControl) ->
		msg = ""
		sliderControlInput = ($ '.' + @css.dragValue, sliderControl)
		sliderValueInput = ($ '#' + @options.Name + '_Input', sliderValue)

		# Validation Rule Checks
		if isNaN sliderValueInput.val()
			msg = sliderValueInput.val() + ' was not a number.'
		else if sliderValueInput.val() < @options.min
			msg = sliderValueInput.val() + ' was below minumum value.'
		else if sliderValueInput.val() > @options.max
			msg = sliderValueInput.val() + ' was above maximum value.'
		
		# Activate/Deactivate Error Message
		if msg != ""
			sliderValueInput.val sliderControlInput.val()

		error = ($ '.' + @css.errorMsg, sliderValue)
		error.val msg  # Set Error Message
		sliderControl.slider('option', 'value', sliderValueInput.val) # Update Slider Widget Value
		error.show()
		error.delay(@options.msgDelay).fadeOut(@options.msgFadeTime)


  # Widget Options
	options:
		Name: "Default"
		range: "min"
		min: 0
		max: 100
		SelectedValue: 50
		step: 1
		msgDelay: 800
		msgFadeTime: 1600
  
  # CSS Style Names              
	css:
		sliderValue: 'sliderValue'
		sliderImg: 'sliderImg'
		sliderInner: 'slider'
		sliderControler: 'sliderControl'
		dragValue: 'result'
		errorMsg: 'errorMsg'
		error: 'error'

$.widget "vdms.dropSlider", new SliderControl