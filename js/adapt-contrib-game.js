define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  class GraphicView extends ComponentView {

    preRender() {
      // this.listenTo(Adapt, 'device:changed', this.resizeImage);

      this.checkIfResetOnRevisit();
    }

    postRender() {

      this.setReadyStatus();

      if (this.model.get('_setCompletionOn') === 'inview') {
        this.setupInviewCompletion();
      }

      var button1 = document.querySelector(".button_1");
      var button2 = document.querySelector(".button_2");
      var count = document.querySelector(".count");
      var el = document.querySelectorAll(".text_")[0];
      var el1 = document.querySelectorAll(".text_");
      var inner = document.querySelector(".block_in");
      var inner1 = document.querySelector(".block_in1");
      var num = document.querySelector(".num");
      var phrase1 = document.getElementById('phrase1');
      var phrase2 = document.getElementById('phrase2');
      var once_more = document.querySelector(".once_more");
      let i = 0;
      let m = 0;
      let l = 0;
      let counter = 0;
      let p = el1.length;
      el.classList.remove("is_hide");
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
          if (m == 0) {
            m += 1;
          };
          	if (counter < p/2){
              phrase1.classList.remove("is_hide");
              l = 1;
            } else {
              phrase2.classList.remove("is_hide");
              l = 2;
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
          if (m == 0) {
            m += 1;
          };
          	if (counter < p/2){
              phrase1.classList.remove("is_hide");
              l = 1;
            } else {
              phrase2.classList.remove("is_hide");
              l = 2;
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
        if (l == 1) {
          phrase1.classList.add("is_hide");
        } else  if (l == 2) {
          phrase2.classList.add("is_hide");
        };
        l = 0;
      };

      button1.addEventListener("click", game1);
      button2.addEventListener("click", game2);
      once_more.addEventListener("click", more);
    }

    resizeImage(setupInView) {

        if (setupInView) {
          this.setupInviewCompletion('.game__widget');
        }
    }

    checkIfResetOnRevisit() {
      const isResetOnRevisit = this.model.get('_isResetOnRevisit');

      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    }
    
  }
  GraphicView.template = 'game';

  return Adapt.register('game', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: GraphicView
  });
});
