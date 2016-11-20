# Névjegyek - Dokumentáció
*Varga Máté István*

1.Követelményanalízis

1.1.  Alkalmazás célja
  Az alkamazás egy névjegyeket kezelő és kereső alkalmazás, ahol könnyedén találhatunk magunknak szakembert ha a háztartásunkban elromlik valamink.
  
1.2.  Funkcionális követelmények
  - Regisztráció
  - Bejelentkezés
  - Új névjegy felvétele
  - A meglévő névjegy szerkesztése
  - A meglévő névjegy törlése
  - Névjegy keresése
  - Kedvencekhez adás
  - Kedvencekből törlés
  - Komment írása

1.3.  Nem funkcionális követelmények
  - Könnyű átekintés
  - Megbizható müködés
  - Karbantarthatóság
  - Biztonságos
  
1.4.  Szakterületi fogalomjegyzés
  Névjegy: A névjegykártya első sorban egy üzleti információs kártyácska, mely egy vállalkozás vagy egy személy adatait / elérhetőségeit tartalmazza. Mindezzel téve kényelmesebbé a személy bemutatkozást is. A kártyán a klasszikus adatok (név, beosztás, cégnév, elérhetőségek, etc.) mellett ma már megjelenhetnek weblapok és közösségi oldalak elérhetőségei is. 

1.5.  Szerepkörök
  - Vendék
    - Főoldal
    - Bejelentkezés/Regisztráció
  - Felhasználó
    - Új névjegy felvétele
    - Meglévő névjegy szerkeztése
    - Meglévő névjegy törlés
    - Kedvencekhez adás
    - Kedvencekből törlés
    - Komment írása névjegyhez
    ![Esetdiagram](https://github.com/vargamateistvan/Contacts/blob/master/docs/images/esetdiagram.png)

Design terv
Főoldal
![Főoldal](https://github.com/vargamateistvan/Contacts/blob/master/docs/images/main.png)
Regisztráció
![Regisztráció](https://github.com/vargamateistvan/Contacts/blob/master/docs/images/singin.png)
Bejelentkezés
![Bejelentkezés](https://github.com/vargamateistvan/Contacts/blob/master/docs/images/singup.png)
Felhasználó
![Felhasználó](https://github.com/vargamateistvan/Contacts/blob/master/docs/images/user.png)
Névjegy
![Névjegy](https://github.com/vargamateistvan/Contacts/blob/master/docs/images/contact.png)

A https://github.com/vargamateistvan/Contacts/tree/master/design oldalon HTML formátumban is megtalálhatóak.

2.Tervezés

2.1 Komponens diagram
![MVC](https://github.com/vargamateistvan/Contacts/blob/master/docs/images/mvc.png)

2.2 Oldaltérkép
- Publikus
    - Főoldal
    - Regisztráció
    - Belépés
- Bejelentkezett Felhasználó
    - Főoldal
    - Új névjegy
    - Névjegy törlése
    - Kedvencekhez adás
    - Kedvencek törlése
    - Kommentelés

2.3 Végpontok
- GET / főoldal
- GET /login bejelentkező oldal
- POST /login bejelentkező adatok felküldése
- GET /register regisztrációs oldal
- POST /register regisztrációs adatok felküldése
- GET /logout kijelentkező oldal
- GET /contacts koktéllista oldal
- GET /contacts/create új koktél felvétele
- POST /contacts/create új koktél felvételéhez szükséges adatok felküldése
- GET /contacts/:id koktél adatok
- POST /contacts/:id új megjegyzés felvitele
- GET /contacts/:id/delete koktél recept törlése
- GET /contacts/:id/edit koktél módosítása
- POST /contacts/:id/edit koktél módosítása, adatok felküldése
- GET /users/:id saját oldal
- GET /users/:id Kedvencek törlése

2.4 Modellek
![MODEL](https://github.com/vargamateistvan/Contacts/blob/master/docs/images/model.png)

3.Implementáció

[Adonis.js](http://www.adonisjs.com/)

- Modellek
  - Category.js
  - Comment.js
  - Contact.js
  - Favourites.js
  - User.js
- Controllerek
  - CommentController.js
  - ContactController.js
  - FavouritesController.js
  - UserController.js
- Nézetek
  - layout.njk
  - main.njk
  - register.njk
  - login.njk
  - contactCreate.njk
  - contactEdit.njk
  - contactSearch.njk
  - contactShow.njk
  - userShow.njk
