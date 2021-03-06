// Generated by CoffeeScript 1.3.3
(function() {
  var $, Dropdown, Formwatcher,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Formwatcher = require("formwatcher");

  $ = require("jquery");

  Dropdown = require("dropdown");

  Formwatcher.decorators.push((function(_super) {

    __extends(_Class, _super);

    function _Class() {
      return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.name = "Dropdown";

    _Class.prototype.description = "Converts a select field to a dropdown.";

    _Class.prototype.nodeNames = ["select"];

    _Class.prototype.classNames = ["dropdown"];

    _Class.prototype.defaultOptions = {
      buttonClassName: ""
    };

    _Class.prototype.accepts = function() {
      return true;
    };

    _Class.prototype.decorate = function(input) {
      var $button, $input, $valueInput, button, dropdown, selected, valueInput;
      $input = $(input);
      $button = $("<button type=\"button\" class=\"" + this.options.buttonClassName + "\"></button>");
      button = $button[0];
      dropdown = new Dropdown(button, {
        menu: true,
        noSelectable: false,
        "class": "button"
      });
      $valueInput = $("<input type=\"hidden\" name=\"" + ($input.attr("name")) + "\" value=\"" + ($input.val()) + "\" />");
      valueInput = $valueInput[0];
      selected = false;
      $input.find("option").each(function() {
        var $option, option;
        option = this;
        $option = $(option);
        if (!$input.hasClass("required") || $option.val()) {
          dropdown.add($option.val(), $option.html(), function() {
            return $valueInput.val($option.val());
          });
        }
        if (!selected && $option.val() === $input.val()) {
          selected = true;
          if ($input.hasClass("required") && !$option.val()) {
            return $button.html($option.html());
          } else {
            return dropdown.focus($option.val());
          }
        }
      });
      $button.insertAfter($input);
      $valueInput.insertAfter($input);
      $input.remove();
      return {
        input: valueInput,
        button: button,
        list: dropdown.el[0]
      };
    };

    return _Class;

  })(Formwatcher.Decorator));

}).call(this);
