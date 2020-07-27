console.log('Домашняя работа к уроку 6');
console.log('Задание 1-2');
// Задание 1 и 2 (вместе)

// Универсальная функция создания элемента разметки, так как это надо делать часто
const makeElement = function (tagName, className, text, tagAttribute, valueAttribute) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
        element.textContent = text;
    };
    if (tagAttribute && valueAttribute) {
        element.setAttribute(tagAttribute, valueAttribute);
    }
    return element;
};

// Создаем класс "Товар" у которого есть св-ва и метод добавления товара в сущность Продукты
class Item {
    constructor(id, article, name, description, manufacturer, price, model) {
        this.id = id;
        this.article = article;
        this.name = name;
        this.description = description;
        this.price = price;
        this.manufacturer = manufacturer;
        this.model = model;
    }
    addProduct() {
        product.items.push({ id: this.id, article: this.article, name: this.name, description: this.description, price: this.price, manufacturer: this.manufacturer, model: this.model });
    }
};
// массив массивов со списками src картинок для каталога
const listphoto = [['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg'], ['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg'], ['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg'], ['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg'], ['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg'], ['photo-mouse-1.jpg', 'photo-mouse-2.jpg', 'photo-mouse-3.jpg']];

// Создаем объект-сущность Продукты, в которой есть массив объектов с классом "Товар"
const product = {
    items: [],
    // метод отображения на странице 1 товара из каталога
    displayitem: function (item) {
        let listitem = makeElement('div', 'catalog__item');
        listitem.setAttribute("item_id", item.id);
        let descriptionitem = makeElement('div', 'catalog__description');
        listitem.appendChild(descriptionitem);
        //блок добавления картинки-ссылки
        link = makeElement('a', 'link_img');
        link.setAttribute('href', '#');
        descriptionitem.appendChild(link);
        img = makeElement('img', 'photo');
        link.appendChild(img);
        img.setAttribute('src', listphoto[item.id - 1][0]);
        img.setAttribute('width', '40px');
        img.setAttribute('height', '40px');
        link.addEventListener('click', function () {
            showimg(item.id);
        });
        //
        descriptionitem.appendChild(makeElement('h3', 'catalog__heading', item.name + ' ' + item.manufacturer + ' ' + item.model));
        descriptionitem.appendChild(makeElement('p', 'catalog__price', 'Цена: ' + item.price));
        let btnitem = makeElement('div', 'catalog__btn');
        listitem.appendChild(btnitem);
        let additeminbasket = makeElement('a', 'catalog__btnadd', 'купить', "href", '#');
        additeminbasket.setAttribute("btn_id", item.id);
        btnitem.appendChild(additeminbasket);
        return listitem;
    },
    // метод отображения на странице всего каталога
    displaycatalog: function () {
        let catalog = document.querySelector(".catalog");
        catalog.appendChild(makeElement('h2', 'catalog__head', 'Каталог товаров:'));
        for (let item of this.items) {
            catalog.appendChild(this.displayitem(item));
        };
    },
    // метод добавления товара из каталога в корзину
    addbasket: function (id) {
        for (let item of this.items) {
            if (item.id == id) {
                basket.items.push({ id: id, count: 1, name: item.name, price: item.price });
            };
        };
    },
};
// Создаем объект-сущность Корзина, в которой есть массив объектов с классом "Товар"
const basket = {
    items: [],
    // метод создания корзины при загрузке страницы
    createbasket: function () {
        let basket = document.querySelector(".basket");
        basket.appendChild(makeElement('h2', 'basket__head', 'Корзина:'));
        basket.appendChild(makeElement('p', 'basket__empty', 'Корзина пуста'));
    },
    // метод добавления на странице нового элемента в Корзину
    addbasket: function (id) {
        for (let item of this.items) {
            if (item.id == id) {
                let basket = document.querySelector('.basket');
                basket.appendChild(this.displayitem(item));
            }
        };
    },
    // метод удаления на странице элемента из Корзины
    delbasket: function (id) {
        let basket = document.querySelector('.basket');
        let basketitem = document.querySelectorAll('.basket__item');
        for (itemb of basketitem) {
            if (itemb.getAttribute('item_id') == id) {
                basket.removeChild(itemb);
            };
        };
        for (let item of this.items) {
            if (item.id == id) {
                let indexdel = this.items.indexOf(item);
                this.items.splice(indexdel, 1);
            };
        };
    },
    // метод увеличения кол-ва товара, уже добавленного в Корзину    
    addcountbasket: function (id) {
        var newcountadd = 0;
        for (let item of this.items) {
            if (item.id == id) {
                item.count += 1;
                newcountadd = item.count;
            };
        };
        let basketitem = document.querySelectorAll('.basket__count');
        for (let itemb of basketitem) {
            if (itemb.getAttribute('item_id') == id) {
                itemb.textContent = 'Количество: ' + newcountadd + ' шт.';
            };
        };
    },
    // метод уменьшения кол-ва товара, уже добавленного в Корзину    
    delcountbasket: function (id) {
        var newcountdel = 0;
        for (let item of this.items) {
            if (item.id == id) {
                item.count -= 1;
                newcountdel = item.count;
            };
        };
        let basketitem = document.querySelectorAll('.basket__count');
        for (let itemb of basketitem) {
            if (itemb.getAttribute('item_id') == id) {
                itemb.textContent = 'Количество: ' + newcountdel + ' шт.';
            };
        };
    },
    // метод подсчета суммы товаров в корзине
    sumbasket: function () {
        let sumbasket = 0;
        for (let item of this.items) {
            sumbasket += (item.price * item.count);
        };
        return sumbasket;
    },
    // метод подсчета кол-ва товаров в корзине    
    sumcountbasket: function () {
        let sumcountbasket = 0;
        for (let item of this.items) {
            sumcountbasket += item.count;
        };
        return sumcountbasket;
    },
    // метод удаления старой суммы товаров в корзине
    removesumbasket: function () {
        let basket = document.querySelector('.basket');
        let sumbasket = document.querySelector('.basket__sum');
        if (sumbasket) {
            basket.removeChild(sumbasket);
        };
    },
    // метод добавления новой суммы товаров в корзине
    displaysumbasket: function (id) {
        let basket = document.querySelector('.basket');
        let basket_itog = makeElement('p', 'basket__sum', 'Всего в корзине товаров: ' + this.sumcountbasket() + ' шт. на общую сумму: ' + this.sumbasket());
        basket.appendChild(basket_itog);
    },
    // метод добавления и убирания надписи Корзина Пуста
    emptybasket: function () {
        let basket = document.querySelector('.basket');
        let basketsearch = document.querySelector('.basket__item');
        if (basketsearch) {
            let emptyfind = document.querySelector('.basket__empty');
            if (emptyfind) {
                basket.removeChild(emptyfind);
            }
        }
        else {
            let basket = document.querySelector('.basket');
            let basketempty = makeElement('p', 'basket__empty', 'Корзина пуста');
            basket.appendChild(basketempty);
        };
    },
    displayitem: function (item) {
        let listitem = makeElement('div', 'basket__item');
        listitem.setAttribute("item_id", item.id);
        let descriptionitem = makeElement('div', 'basket__description');
        listitem.appendChild(descriptionitem);
        descriptionitem.appendChild(makeElement('h3', 'basket__heading', item.name));
        descriptionitem.appendChild(makeElement('p', 'basket__price', 'Цена: ' + item.price));
        descriptionitem.appendChild(makeElement('p', 'basket__count', 'Количество: ' + item.count + ' шт.', 'item_id', item.id));
        let btnitem = makeElement('div', 'basket__btn');
        listitem.appendChild(btnitem);
        let delinbasket = makeElement('a', 'basket__btndel', 'Удалить');
        delinbasket.setAttribute("btn_id", item.id);
        delinbasket.setAttribute("href", '#');
        delinbasket.addEventListener('click', function () {
            eventdel(item.id);
        });
        btnitem.appendChild(delinbasket);
        return listitem;
    },
};

//Создаем несколько разных товаров и добавляем их в сущность "Продукты"
let newitem = new Item(1, '000001', 'Компьютерная мышь', 'Супермышь', 'Logitech', 700, 'A100');
newitem.addProduct();
newitem = new Item(2, '000002', 'Клавиатура', 'Суперклава', 'Logitech', 1000, 'A500');
newitem.addProduct();
newitem = new Item(3, '000003', 'Монитор', 'Супермонитор', 'Philips', 5000, 'S350');
newitem.addProduct();
newitem = new Item(4, '000004', 'Видеокарта', 'Супервидео', 'Nvidia', 8000, 'GTX560');
newitem.addProduct();
newitem = new Item(5, '000005', 'Процессор', 'Суперпроц', 'AMD', 10000, 'Ryzen 3');
newitem.addProduct();
newitem = new Item(6, '000006', 'Оперативная память', 'Суперпамять', 'Hynix', 2000, 'Q100');
newitem.addProduct();

// Вывод стартовой страницы
product.displaycatalog();
basket.createbasket();

// Добавление обработчика на кнопки "Купить"
let buttonadd = document.querySelectorAll('.catalog__btnadd');
for (btn of buttonadd) {
    var newid = 0;
    btn.addEventListener('click', function () {
        newid = this.getAttribute('btn_id');
        let searchid = 0;
        for (let item of basket.items) {
            if (item.id == newid) {
                searchid = 1;
                basket.addcountbasket(newid);
                basket.removesumbasket();
                basket.displaysumbasket();
            }
        };
        if (searchid == 0) {
            product.addbasket(newid);
            basket.addbasket(newid);
            basket.emptybasket();
            let basketall = document.querySelector('.basket');
            let basketitem = document.querySelector('.basket__item');
            let sumbasket = document.querySelector('.basket__sum');
            if (basketitem) {
                basket.removesumbasket();
                basket.displaysumbasket();
            } else {
                basketall.removeChild(sumbasket);
            };
        };
    });
};

// функция - кнопки "Удалить" из Корзины
const eventdel = function (newid) {
    for (let item of basket.items) {
        console.log(item.id == newid && item.count > 1);
        if (item.id == newid && item.count > 1) {
            basket.delcountbasket(newid);
            let basketitem = document.querySelector('.basket__item');
            if (basketitem) {
                basket.removesumbasket();
                basket.displaysumbasket();
            };
        } else {
            if (item.id == newid && item.count == 1) {
                basket.delbasket(newid);
                basket.emptybasket();
                let basketall = document.querySelector('.basket');
                let basketitem = document.querySelector('.basket__item');
                let sumbasket = document.querySelector('.basket__sum');
                if (basketitem) {
                    basket.removesumbasket();
                    basket.displaysumbasket();
                } else {
                    basketall.removeChild(sumbasket);
                };
            };
        };
    };
};

// функция - кнопки "Закрыть" при перелистывании фото товара
const closeimg = function () {
    let catalog = document.querySelector('.container');
    let img_item = document.querySelector('.show');
    catalog.removeChild(img_item);
};

// функция - кнопки "Вперед" при перелистывании фото товара
const forwardimg = function (i) {
    let img = document.querySelector('.img');
    let number_img = Number.parseInt(img.getAttribute('number_photo')) + 1;
    if (number_img <= listphoto[i - 1].length) {
        img.setAttribute('src', listphoto[i - 1][number_img - 1]);
        img.setAttribute('number_photo', number_img);
    }
};

// функция - кнопки "Назад" при перелистывании фото товара
const backimg = function (i) {
    let img = document.querySelector('.img');
    let number_img = Number.parseInt(img.getAttribute('number_photo')) - 1;
    if (number_img > 0) {
        img.setAttribute('src', listphoto[i - 1][number_img - 1]);
        img.setAttribute('number_photo', number_img);
    }
};

// Функция показа большого фото товара
const showimg = function (newid) {
    let catalog = document.querySelector('.container');
    let img_item = makeElement('div', 'show');
    catalog.appendChild(img_item);
    let img = makeElement('img', 'img');
    img.setAttribute('src', listphoto[newid - 1][0]);
    img.setAttribute('number_photo', 1);
    img_item.appendChild(img);
    let imagemenu = makeElement('div', 'img__menu');
    img_item.appendChild(imagemenu);
    let backbtn = makeElement('a', 'backbtn', 'Назад');
    backbtn.setAttribute("href", '#');
    backbtn.addEventListener('click', function () {
        backimg(newid);
    });
    imagemenu.appendChild(backbtn);
    let btnclose = makeElement('a', 'btnclose', 'Закрыть');
    btnclose.setAttribute("href", '#');
    btnclose.addEventListener('click', function () {
        closeimg();
    });
    imagemenu.appendChild(btnclose);
    let fbtn = makeElement('a', 'fbtn', 'Вперед');
    fbtn.setAttribute("href", '#');
    fbtn.addEventListener('click', function () {
        forwardimg(newid);
    });
    imagemenu.appendChild(fbtn);

};

