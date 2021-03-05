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
let counter = 0;
let i = 1;
let set = ['Домашний театр','Гардероб официантов','Шубохранилище','Аквадискотека','Компьютерный клуб'];
$('.button_1').on('click',function(){
  let a = document.getElementById('text').innerHTML;
  if (a == 'Домашний театр'){
    count += 1;
  } else if (a == 'Гардероб официантов'){
    count += 1;
  } else if (a == 'Шубохранилище'){
    count += 0;   
  } else if (a == 'Аквадискотека'){
    count += 1; 
  } else if (a == 'Компьютерный клуб'){
    count += 0;   
  };
  document.getElementById('text').innerHTML = set[i]
  document.getElementById('count').innerHTML = count
  i += 1
  if (i == 6){
  document.getElementById('text').innerHTML = ''
  $('.block_in').css({'opacity': 1,'z-index': 2});
  document.getElementById('num').innerHTML = `${count} из 5`;
  }
});