var wrapper = document.createElement('div');
wrapper.style.width = '400px';
wrapper.style.margin = '0 auto';
wrapper.style.padding = '30px';
document.body.appendChild(wrapper);


var elem = document.createElement('p');
elem.style.fontSize = '34px';
elem.classList.add('text-center');

var elem2 = document.createElement('p');
elem2.style.fontSize = '24px';
elem2.classList.add('text-center');

var startBut = document.createElement('button');
startBut.innerHTML = 'Start';
startBut.classList.add('btn-success');
startBut.style.borderRadius = '5px';
startBut.style.width = '150px';
startBut.style.cssFloat = 'left';


var pauseBut = document.createElement('button');
pauseBut.innerHTML = 'Pause';
pauseBut.classList.add('btn-warning');
pauseBut.style.borderRadius = '5px';
pauseBut.style.width = '150px';
pauseBut.style.display = 'none';



var clearBut = document.createElement('button');
clearBut.innerHTML = 'Clear';
clearBut.classList.add('btn-danger');
clearBut.style.borderRadius = '5px';
clearBut.style.width = '150px';
clearBut.style.cssFloat = 'right';


wrapper.appendChild(elem);
wrapper.appendChild(elem2);
wrapper.appendChild(startBut);
// document.body.appendChild(contBut);
wrapper.appendChild(clearBut);
wrapper.appendChild(pauseBut);

// показать/спрятать кнопку


function showButton(button){
  button.style.display='block';
}

function hideButton(button){
  button.style.display='none';
}


// счетчик
function timerId() {
  // Объявляет внутри себя локальную переменную темп.
  // Переменная - локальная, вне функции ее не видно.
    var temp = 0;

  // Также, объявляется функция каунтер.
  // При вызове она увеличивает значение переменной темп на 1 и возвращает то что получилось.
  // Эта функция также локальна, снаружи ее не видно.
    function counter() {
        return temp++;
    }

  // К локальной функции каунтер объявляется и добавляется поле сет.
  // Ему присваивается значение: функция которая принимает параметром число и присваивает его в темп.
    counter.set = function(value) {
        temp = value;
    };

  // Затем, к локальной функции каунтер объявляется и добавляется еще одно поле - резет.
  // Ему присваивается значение: функция которая записывает 0 в темп.
    counter.reset = function() {
        temp = 0;
    };

  // Из ТаймерАйди возвращается функция каунтер.
  // Возврат функции ТаймерАйди - это каунтер.
  // Следовательно, при вызове функции ТаймерАйди в точку вызова будет возвраещна функция каунтер.
    return counter;
}

// инициализируем счетчик и выведем его в HTML
// Возвращенная функция каунтер записывается в переменную темпо.
var tempo = timerId();

// обновим текстовое значение в HTML при каждом вызове этой функции
function addElem(temp) {
    var hours = Math.floor(temp / 360000);
    hours = hours < 10 ? '0' + hours : hours;
    var min = Math.floor(temp / 6000) % 60;
    min = min < 10 ? '0' + min : min;
    var sec = Math.floor(temp / 100) % 60;
    sec = sec < 10 ? '0' + sec : sec;
    var mlsec = temp % 100;
    elem.innerHTML = hours + ':' + min + ':' + sec;
    elem2.innerHTML = mlsec;
}

// вызываем обновление текста каждые 100мск

  var timer;

  addElem(0);

startBut.onclick = function(){
    pauseBut.style.display = 'block';
    timer = setInterval(function() {
        addElem(tempo());
    }, 10);
    hideButton(startBut);
    startBut.innerHTML = 'Continue';
    showButton(pauseBut);
};


pauseBut.onclick = function(){
  clearInterval(timer);
  hideButton(pauseBut);
  showButton(startBut);
}

clearBut.onclick = function(){
  tempo.reset();
  addElem(tempo());
  hideButton(pauseBut);
  showButton(startBut);
  startBut.innerHTML = 'Start';
  clearInterval(timer);
}
