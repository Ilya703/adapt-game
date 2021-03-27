define([
  'core/js/adapt',
  './gameModel',
  './gamenView'
], function(Adapt, GameModel, GameView) {

  return Adapt.register('game', {
    model: GameModel,
    view: GameView
  });

});
