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
      var text1 = document.querySelector(".text_1");
      var inner = document.querySelector(".block_in");
      var num = document.querySelector(".num");
      var phrase = document.querySelector(".phrase");
      var once_more = document.querySelector(".once_more");
      let i = 0;
      let counter = 0;
      let set1 = ['Домашний театр','Гардероб официантов','Шубохранилище','Аквадискотека','Компьютерный клуб'];
      function game1() {
        if (i == 0 || i == 1 || i == 3){
          counter += 1;
        }
        count.innerHTML = counter;
        text1.classList.add("is_hide");
        i += 1;
        if (i == 5){
        	text1.classList.add("is_hide");
          text.innerHTML = '';
          if (counter < 3){
            phrase.innerHTML = 'Мне удалось заблудиться во «дворце Путина». Ищите меня на складе грязи!';
          } else {
            phrase.innerHTML = 'Я знаю, как устроен «дворец Путина». Ищите меня в spa-капсуле';
          }
          inner.classList.add("show");
          num.innerHTML = `${counter} из 5`;
        }
      };
      function game2() {
        if (i == 2 || i == 4){
          counter += 1;
        }
        count.innerHTML = counter;
        text1.classList.add("is_hide");
        i += 1;
        if (i == 5){
          text.innerHTML = '';
          text1.classList.add("is_hide");
          if (counter < 3){
            phrase.innerHTML = 'Мне удалось заблудиться во «дворце Путина». Ищите меня на складе грязи!';
          } else {
            phrase.innerHTML = 'Я знаю, как устроен «дворец Путина». Ищите меня в spa-капсуле';
          }
          inner.classList.add("show");
          num.innerHTML = `${counter} из 5`;
        }
      };
      function more(){
        inner.classList.remove("show");
        i = 0;
        counter = 0;
        text.innerHTML = set[i].classList.remove("is_hide");
        count.innerHTML = counter;
      };

      button1.addEventListener("click", game1);
      button2.addEventListener("click", game2);
      once_more.addEventListener("click", more);
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
