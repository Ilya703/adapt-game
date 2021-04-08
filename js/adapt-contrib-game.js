define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class GraphicView extends ComponentView {

    preRender() {
    }

    postRender() {
      this.resizeImage(Adapt.device.screenSize, true);

      var button1 = document.querySelector(".button_1");
      var button2 = document.querySelector(".button_2");
      var count = document.querySelector(".count");
      var el = document.querySelectorAll(".text_")[0];
      var el1 = document.querySelectorAll(".text_");
      var inner = document.querySelector(".block_in");
      var inner1 = document.querySelector(".block_in1");
      var num = document.querySelector(".num");
      var phrase = document.querySelector(".phrase");
      var once_more = document.querySelector(".once_more");
      var button_p = document.querySelector(".nav__pagelevelprogress-btn");
      var progress = document.querySelector(".game__title .pagelevelprogress__indicator .pagelevelprogress__indicator-inner .pagelevelprogress__indicator-bar");
      let i = 0;
      let m = 0;
      let counter = 0;
      let p = el1.length;
      el.classList.remove("is_hide");
      progress.classList.add("w");
      function game1() {
        el = document.querySelectorAll(".text_")[i];
        el.classList.add("is_hide");
        if (el.dataset.istrue == "true"){
          counter += 1;
        }
        count.innerHTML = counter;
        i += 1;
        if (i == p){
        	inner.classList.add("show");
        	inner1.classList.add("show");
          progress.classList.add("w1");
          m += 1;
          	if (counter < p/2){
              phrase.innerHTML = "{{_answer1.text}}";
            } else {
              phrase.innerHTML = "{{_answer2.text}}";
            };
          	num.innerHTML = `${counter} из ${p}`;
          	el.classList.add("is_hide");
        };
        if (i < p){
        	el = document.querySelectorAll(".text_")[i];
        	el.classList.remove("is_hide");
        }
      };
      function game2() {
        el = document.querySelectorAll(".text_")[i];
        el.classList.add("is_hide");
        if (el.dataset.istrue == "false"){
          counter += 1;
        }
        count.innerHTML = counter;
        i += 1;
        if (i == p){
        	inner.classList.add("show");
        	inner1.classList.add("show");
          progress.classList.add("w1");
          m += 1;
          	if (counter < p/2){
              phrase.innerHTML = "{{_answer1.text}}";
            } else {
              phrase.innerHTML = "{{_answer2.text}}";
            };
          	num.innerHTML = `${counter} из ${p}`;
          	el.classList.add("is_hide");
        };
        if (i < p){
        	el = document.querySelectorAll(".text_")[i];
        	el.classList.remove("is_hide");
        }
      };
      function more(){
        inner.classList.remove("show");
        inner1.classList.remove("show");
        i = 0;
        el = document.querySelectorAll(".text_")[i];
        counter = 0;
        el.classList.remove("is_hide");
        count.innerHTML = counter;
      };
      function progress1(){
        if (m == 1){
          console.log(document.querySelector('[aria-label=" Completed. Game"] .pagelevelprogress__indicator .pagelevelprogress__indicator-inner .pagelevelprogress__indicator-bar').classList.add('w1'));
        } else {
          if (document.querySelector('[aria-label=" Incomplete. Game"] .pagelevelprogress__indicator .pagelevelprogress__indicator-inner .pagelevelprogress__indicator-bar') == null){
            console.log(document.querySelector('[aria-label=" Completed. Game"] .pagelevelprogress__indicator .pagelevelprogress__indicator-inner .pagelevelprogress__indicator-bar').classList.add('w'));
          } else {
            console.log(document.querySelector('[aria-label=" Incomplete. Game"] .pagelevelprogress__indicator .pagelevelprogress__indicator-inner .pagelevelprogress__indicator-bar').classList.add('w'));
          }
        }
      };

      button1.addEventListener("click", game1);
      button2.addEventListener("click", game2);
      once_more.addEventListener("click", more);
      button_p.addEventListener("click", progress1);
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
