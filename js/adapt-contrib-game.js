define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class GraphicView extends ComponentView {

    preRender() {
      this.listenTo(Adapt, 'device:changed', this.resizeImage);

      this.checkIfResetOnRevisit();
       
    }

    postRender() {
      this.resizeImage(Adapt.device.screenSize, true);

      var button1 = document.querySelector(".button_1");
      var button2 = document.querySelector(".button_2");
      var count = document.querySelector(".count");
      var text = document.querySelector(".text_1");
      let i = 0;
      let set = ['Домашний театр','Гардероб официантов','Шубохранилище','Аквадискотека','Компьютерный клуб'];
      function game1() {
        i += 1;
        text.innerHTML = set[i];
        if (i == 0 or i == 1 or i == 3){
          count += 1;
        }
        count.innerHTML = count;
      };
      function game2() {
        i += 1;
        text.innerHTML = set[i];
        if (i == 2 or i == 4){
          count += 1;
        }
        count.innerHTML = count;
      };

      button1.addEventListener("click", game1);
      button2.addEventListener("click", game2);
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
  }

  GraphicView.template = 'game';

  return Adapt.register('game', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: GraphicView
  });
});
