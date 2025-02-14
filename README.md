
# Базовые требования:

- [x] Создан github-репозиторий, в нём есть README, gitignore;

- [x] Проект запускается;

- [x] Вёрстка соответствует дизайн-макетам (допускаются минимальные отхождения, адаптив не требуется);

# Функциональные требования:

## Шапка:

- [x] Позиционируется липко (стики);

## Авторизация:

- [x] Для реализации модального окна используется портал;

- [x] После успешной авторизации кнопка «Войти» меняется на заглушку иконки пользователя и кнопку «Выйти»;

- [x] Сохраняем авторизационный токен из ответа ручки бэка /login (например, в localStorage);

- [x] С токеном стоит работать через thunk;

- [x] По клику на кнопку «Выйти» удаляем токен и снимаем авторизацию;

- [x] При инициализации приложения проверяем авторизационный токен;

## Реализована страница списка фильмов:

### Поиск:

- [x] Поиск происходит во время ввода пользователем символов. Дёргаем ручку /search;

### Фильтры:

- [x] Реализованы фильтры с dropdown;

- [x] Фильтры сохраняются в query-params; (забыл, а в последствии не успел сделать заполнение из query при иниациализации...) 

- [x] Реализован список фильмов с пагинацией;

## Страница фильма:

### Реализована работа с получением данных:

- [x] Дёргаем ручку /movie:id;

- [x] Соответствующие данные отрисованы;

### Возможность поставить оценку:

- [x] Оценку для фильма достаём из ручки /movie/:id;

- [x] Если пользователь авторизован, даём возможность поставить оценку — запрос мутации;

- [] После выставления оценки обновляем кеш запроса /movie/:id;

## Общий функционал:

- [ ] Реализовать единообразную обработку ошибок для запросов;

- [x] Реализован лоадер;

- [ ] Используем debounce для поиска фильма и выставления оценки;

## Стор:

- [x] Используется rtk и rtk-query;

- [x] Данные корректно разбиты на модули (пример — авторизация, searchParams из фильтров);

- [x] Селекторы написаны оптимально (нет переизбытка дублирования); (хз честно))))

## Миграция на Next:

- [ ] Реализована миграция с использованием SSR;

- [ ] Для картинок используется Image некста. Скрины фильма, которые вне вьюпорта грузятся лениво;

- [ ] Фильтры реализованы с помощью сегментов вместо query-параметров.