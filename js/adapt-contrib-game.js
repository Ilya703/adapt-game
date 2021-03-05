define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class GraphicView extends ComponentView {

    preRender() {
      this.listenTo(Adapt, 'device:changed', this.resizeImage);

      this.checkIfResetOnRevisit();
      function Game(){
        alert("hi");
      }
    }

    postRender() {
      this.resizeImage(Adapt.device.screenSize, true);
    }

    checkIfResetOnRevisit() {
      const isResetOnRevisit = this.model.get('_isResetOnRevisit');

      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    }

    resizeImage(width, setupInView) {
      const imageWidth = width === 'medium' ? 'small' : width;
      const imageSrc = (this.model.get('_game')) ? this.model.get('_game')[imageWidth] : '';
      this.$('.js-game-set-image-src').attr('src', imageSrc);

      this.$('.game__widget').imageready(() => {
        this.setReadyStatus();

        if (setupInView) {
          this.setupInviewCompletion('.game__widget');
        }
      });
    }
    game() {
      const game = this.model.get('_game');
      let counter = 0;
      let i = 1;
      let set = [a1,a2,a3,a4,a5];
      let a1 = {
        title: 'Домашний театр',
        isTrue: true,
      }
      let a2 = {
        title: 'Гардероб официантов',
        isTrue: true,
      }
      let a3 = {
        title: 'Шубохранилище',
        isTrue: false,
      }
      let a4 = {
        title: 'Аквадискотека',
        isTrue: true,
      }
      let a5 = {
        title: 'Компьютерный клуб',
        isTrue: false,
      }
    }
  }

  GraphicView.template = 'game';

  return Adapt.register('game', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: GraphicView
  });
});
