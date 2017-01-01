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
    ![Esetdiagram](https://github.com/vargamateistvan/Contacts/blob/master/doc/images/esetdiagram.png)

Design terv
Főoldal
![Főoldal](https://github.com/vargamateistvan/Contacts/blob/master/doc/images/main.png)
Regisztráció
![Regisztráció](https://github.com/vargamateistvan/Contacts/blob/master/doc/images/singin.png)
Bejelentkezés
![Bejelentkezés](https://github.com/vargamateistvan/Contacts/blob/master/doc/images/singup.png)
Felhasználó
![Felhasználó](https://github.com/vargamateistvan/Contacts/blob/master/doc/images/user.png)
Névjegy
![Névjegy](https://github.com/vargamateistvan/Contacts/blob/master/doc/images/contact.png)

A https://github.com/vargamateistvan/Contacts/tree/master/design oldalon HTML formátumban is megtalálhatóak.

2.Tervezés

2.1 Komponens diagram
![MVC](https://github.com/vargamateistvan/Contacts/blob/master/doc/images/mvc.png)

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
- GET /                       főoldal
- GET /login                  bejelentkező oldal
- POST /login                 bejelentkező adatok felküldése
- GET /register               regisztrációs oldal
- POST /register              regisztrációs adatok felküldése
- GET /logout                 kijelentkező oldal
- GET /contacts               névjegyek oldal
- GET /contacts/create        új névjegy felvétele
- POST /contacts/create       új névjegy felvételéhez szükséges adatok felküldése
- GET /contacts/:id           névjegy adatok
- POST /contacts/:id          új megjegyzés felvitele
- GET /contacts/:id/delete    névjegy törlése
- GET /contacts/:id/edit      névjegy módosítása
- POST /contacts/:id/edit     névjegy módosítása, adatok felküldése
- GET /users/:id              saját oldal
- GET /users/:id              kedvencek törlése

2.4 Modellek
![MODEL](https://github.com/vargamateistvan/Contacts/blob/master/doc/images/model.png)

2.5 MVC

- Modellek
  - Category.js
  - Comment.js
  - Contact.js
  - Favourites.js
  - User.js
- Controllerek
  - ContactController.js
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

3.Implementáció

- [Adonis.js](http://www.adonisjs.com/)
- Böngésző
- Telepítés
  1. Kód letöltése
    
      a. ZIP letöltése

      b. horvathgyozo/alkfejl-recept-1 klónozása

      c. horvathgyozo/alkfejl-recept-1 forkolása és a saját repo klónozása

  2. `npm install`
  3. `.env.example` fájl átnevezése `.env`-re
  4. `npm run dev` paranccsal futtatni
  5. `localhost:3333` megnyitása
  6. Express admin

      a. `node_modules\.bin\admin config/express-admin`

      b. Első futtatáskor a paraméterek beállítása

          1. `sqlite` adatbázis

          2. 4444-es port pl.

          3. username és password beállítása

4.Kliens oldali Javascript 

1. popup_login.js: A felhasználó egy felugró ablakban jelentkezhet be
2. delete.js: Ha a felhasználó a névjegy oldalon akarja törölni a névjegyet akkor egy felugró ablakban rákérdez, hogy biztosan akarja e

5.Tesztelés

Tesztelés Selenium segitségével (Contacts - Test Suite).

Tesztesetek: 

1. registration: Felhasználó regisztrálása
2. login_logout: Bejelentkezés majd kilépés
3. login: Bejelentkezés
4. create: Új névjegy létrehozása
5. edit: Névjegy szerkeztése
6. delete: Névjegy törlése
7. logout: kilépés
8. wrong_create: Névjegy létrehozása hibás/hiányzó adatokkal
9. delete_logout: Névjegy törlése, majd kilépés