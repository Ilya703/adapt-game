define([
  'core/js/adapt',
  './gameView',
  'core/js/models/itemsComponentModel'
], function(Adapt, GameView, ItemsComponentModel) {

  return Adapt.register('game', {
    model: ItemsComponentModel.extend({}),
    view: GamwView
  });

});

