define([
  'core/js/adapt',
  './gameView',
  'core/js/models/itemsGameModel'
], function(Adapt, GameView, ItemsGameModel) {

  return Adapt.register("game", {
    view: GameView,
    // Extend ItemsQuestionModel to distinguish McqModel in
    // the inheritance chain and allow targeted model extensions.
    model: ItemsGameModel.extend({})
  });

});
