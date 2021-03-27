define([
  'core/js/views/componentView'
], function(ComponentView) {

  class GameView extends ComponentView {

    events() {
      return {
        'click .js-toggle-item': 'onClick'
      };
    }

    preRender() {
      this.checkIfResetOnRevisit();

      this.model.resetActiveItems();

      this.listenTo(this.model.get('_children'), {
        'change:_isActive': this.onItemsActiveChange,
        'change:_isVisited': this.onItemsVisitedChange
      });
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
      var inner = document.querySelector(".block_in");
      var inner1 = document.querySelector(".block_in1");
      var num = document.querySelector(".num");
      var phrase = document.querySelector(".phrase");
      var once_more = document.querySelector(".once_more");
      let i = 0;
      let counter = 0;
      el.classList.remove("is_hide");
      function game1() {
        el = document.querySelectorAll(".text_")[i];
        el.classList.add("is_hide");
        if (el.dataset.istrue == "true"){
          counter += 1;
        }
        count.innerHTML = counter;
        i += 1;
        if (i == 5){
          inner.classList.add("show");
          inner1.classList.add("show");
            if (counter < 3){
              phrase.innerHTML = 'Мне удалось заблудиться во «дворце Путина». Ищите меня на складе грязи!';
            } else {
              phrase.innerHTML = 'Я знаю, как устроен «дворец Путина». Ищите меня в spa-капсуле';
            };
            num.innerHTML = `${counter} из 5`;
            el = document.querySelectorAll(".text_")[i];
            el.classList.add("is_hide");
        };
        if (i < 5){
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
        if (i == 5){
          inner.classList.add("show");
          inner1.classList.add("show");
            if (counter < 3){
              phrase.innerHTML = 'Мне удалось заблудиться во «дворце Путина». Ищите меня на складе грязи!';
            } else {
              phrase.innerHTML = 'Я знаю, как устроен «дворец Путина». Ищите меня в spa-капсуле';
            };
            num.innerHTML = `${counter} из 5`;
            el = document.querySelectorAll(".text_")[i];
            el.classList.add("is_hide");
        };
        if (i < 5){
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

      button1.addEventListener("click", game1);
      button2.addEventListener("click", game2);
      once_more.addEventListener("click", more);
    }

    checkIfResetOnRevisit() {
      const isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    }

    onClick(event) {
      this.model.toggleItemsState($(event.currentTarget).parent().data('index'));
    }

    onItemsActiveChange(item, isActive) {
      this.toggleItem(item, isActive);
    }

    onItemsVisitedChange(item, isVisited) {
      if (!isVisited) return;

      const $item = this.getItemElement(item);

      $item.children('.text_').addClass('is-visited');
    }

    toggleItem(item, shouldExpand) {
      const $item = this.getItemElement(item);
      const $body = $item.children('.text_').stop(true, true);

      $item.children('.text_')
        .toggleClass('is-selected is-open', shouldExpand)
        .toggleClass('is-closed', !shouldExpand)
        .attr('aria-expanded', shouldExpand);

      if (!shouldExpand) {
        $body.slideUp(this.model.get('_toggleSpeed'));
        return;
      }

      $body.slideDown(this.model.get('_toggleSpeed'));
    }

    getItemElement(item) {
      const index = item.get('_index');

      return this.$('.text_').filter(`[data-index="${index}"]`);
    }

  }

  AccordionView.template = 'game';

  return GameView;

});
