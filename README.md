## Task

SCHEMA:

CREATE TABLE users (id INTEGER, name STRING);
CREATE TABLE groups (id INTEGER, name STRING);
CREATE TABLE members (uid INTEGER, gid INTEGER);
CREATE TABLE payments (id INTEGER, uid INTEGER, amount INTEGER, created TIMESTAMP );

Написать запрос:
Показывающий, среднее значение (по amount) платежей за день, для пользователей, состоящих в группах ( name = «member» и «premium_member» ) на протяжении последних 7ми дней c преведущего дня.

Пример:
date; amount;
2023-06-18; 500;
2023-05-18; 800;
2023-04-18; 850;
…

Идеальный вариант: Решить одним запросом. Приемлемый: Несколькими.
Синтаксис: предпочитетелен PostgreSQL >= 11. Можно другой

***Solution***
```
SELECT DATE_TRUNC('day', p.created) AS date, AVG(p.amount) AS amount
FROM payments p
JOIN users u ON p.uid = u.id
JOIN members m ON u.id = m.uid
JOIN groups g ON m.gid = g.id
WHERE g.name IN ('member', 'premium_member')
AND p.created >= NOW() - INTERVAL '8 days'
GROUP BY date
ORDER BY date DESC;
```
---------

## Task 2

Реализовать на базе (на выбор) nodejs/nextjs/nest простую демонстрационную реализацию
oAuth сервера.
• Authorization code flow
• User Info Endpoint

Варианты реализации:
• Псевдокод
• Детальное описание или спецификация в вольной форме
• Репозиторий с кодом

Приветствуется:
• Typescript
• Любые сторонние библиотеки
• Декларативный код

Критерии приемки соискатель определяет самостоятельно.

***Solution***

Для реализации выбираю nest js + typescript

Во внутренней памяти зарегистрировано 2 пользователя
```
     {
      userId: 1,
      username: 'admin',
      password: 'admin',
    },
    {
      userId: 2,
      username: 'manager',
      password: 'manager',
    }
```
Для удобства проверки, приложение открывается сразу через сваггер
Для запуска приложения нужно перейти в папку auth-task , написать в терминале npm i, потом написать npm start, приложение запустится на порту 3000

1. Для того чтобы проверить, что ендпоинт auth/profile защищен, можно попробовать нажать на ендпоинт
   и нажать на execute. Приложение выдаст ошибку авторизации.

2. Для того чтобы проверить, что ендпоинт auth/login работает, сначала нажимаем на ендпоинт и наживаем
   execute либо с пустым body, либо с username, password которых заведомо нет в базе данных.
   Приложение выдаст ошибку авторизации.

3. После этого можно ввести корректные username и password в ендпоинт auth/login, ответом придет
   access token, который нужно вставить в графу authorize в верхнем правом углу.

4. После того как access token будет подтвержден, можно попробовать нажатьна auth/login ендпоинт
   и нажать execute. Приложение должно вернуть id и username пользователя.

- Приложение нуждается в дополнительной валидации логина и пароля.
- Приложение нуждается во внедрении refresh токена на случай если пользователь зашел в приложение давно
- Приложение нуждается в регистрации пользователя. (Можно добавить метод который будет регистрировать пользователя во внутренней памяти, но лучше сразу все перенести на базу данных)
