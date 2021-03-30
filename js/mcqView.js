define([
  'core/js/adapt',
  'core/js/views/questionView'
], function(Adapt, QuestionView) {

  var McqView = QuestionView.extend({

    events: {
      'focus .js-item-input': 'onItemFocus',
      'blur .js-item-input': 'onItemBlur',
      'change .js-item-input': 'onItemSelect',
      'keyup .js-item-input': 'onKeyPress'
    },

     isCorrectAnswerShown: false,


    hideCorrectAnswer: function() {
      this.isCorrectAnswerShown = false;
      this.update();
    },

    update: function() {
      this.updateSelection();
      this.updateMarking();
    },

    updateSelection: function() {

      var isEnabled = this.model.get("_isEnabled");

      this.model.getChildren().each(function(itemModel) {

        var isSelected = this.isCorrectAnswerShown ?
            itemModel.get("_shouldBeSelected") :
            itemModel.get("_isActive");

        var index = itemModel.get('_index');
        this.$('.js-item-label').filter('[data-adapt-index="' + index + '"]')
            .toggleClass('is-selected', isSelected)
            .toggleClass('is-disabled', !isEnabled);

        this.$('.js-item-input').filter('[data-adapt-index="' + index + '"]')
            .prop('checked', isSelected)
            .prop('disabled', !isEnabled);

      }.bind(this));

    },

    updateMarking: function() {

      var isInteractive = this.model.isInteractive();
      var canShowMarking = this.model.get('_canShowMarking');
      var ariaLabels = Adapt.course.get('_globals')._accessibility._ariaLabels;

      this.model.getChildren().each(function(itemModel) {

        var index = itemModel.get('_index');
        var $itemInput = this.$('.js-item-input').filter('[data-adapt-index="' + index + '"]');
        var $item = $itemInput.parents('.js-mcq-item');

        if (isInteractive || !canShowMarking) {
          // Remove item marking
          $item.removeClass('is-correct is-incorrect');
          $itemInput.attr('aria-label', $.a11y_normalize(itemModel.get("text")));
          return;
        }

        // Mark item
        var shouldBeSelected = itemModel.get("_shouldBeSelected");
        var isCorrect = Boolean(itemModel.get("_isCorrect"));
        var isActive = Boolean(itemModel.get("_isActive"));

        $item
            .toggleClass('is-correct', isCorrect)
            .toggleClass('is-incorrect', !isCorrect);

        $itemInput.attr('aria-label', [
          (shouldBeSelected ? ariaLabels.correct : ariaLabels.incorrect),
          ", ",
          (isActive ? ariaLabels.selectedAnswer : ariaLabels.unselectedAnswer),
          ". ",
          $.a11y_normalize(itemModel.get("text"))
        ].join(""));

      }.bind(this));

    }

  });

  return McqView;

});
