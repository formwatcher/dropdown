
# ## The Hint decorator
#
# This decorator puts a text over a label that fades out when the user selects the label, or edits the text.


Formwatcher = require "formwatcher"
$ = require "jquery"
Dropdown = require "dropdown"

Formwatcher.decorators.push class extends Formwatcher.Decorator

  name: "Dropdown"

  description: "Converts a select field to a dropdown."

  nodeNames: [ "select" ]

  classNames: [ "dropdown" ]

  defaultOptions:
    buttonClassName: ""

  accepts: -> yes
  decorate: (input) ->
    $input = $ input

    $button = $("""<button type="button" class="#{@options.buttonClassName}"></button>""")
    button = $button[0]

    dropdown = new Dropdown button,
      menu: yes
      noSelectable: no
      class: "button"

    # First create a hidden input field that will be used to post the data.
    $valueInput = $("""<input type="hidden" name="#{$input.attr("name")}" value="#{$input.val()}" />""")
    valueInput = $valueInput[0]


    selected = no
    $input.find("option").each ->

      option = this
      $option = $ option

      if !$input.hasClass("required") or $option.val()
        dropdown.add $option.val(), $option.html(), ->
          $valueInput.val $option.val()

      if not selected and $option.val() == $input.val()
        selected = yes
        if $input.hasClass("required") and !$option.val()
          $button.html $option.html()
        else
          dropdown.focus $option.val()

    $button.insertAfter $input
    $valueInput.insertAfter $input

    $input.remove()

    return {
      input: valueInput
      button: button
      list: dropdown.el[0]
    }

