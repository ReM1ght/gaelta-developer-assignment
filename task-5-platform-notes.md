# Zadanie 5 - Zlava v kosiku (platformove postupy)

## WordPress / WooCommerce

Najjednoduchsie je pouzit server-side logiku vo WooCommerce hooku na cart stranke. Pri kazdej cart polozke porovnam regular price a aktualnu cenu (`get_regular_price()` vs `get_price()`). Ak je aktualna cena nizsia, zobrazim upozornenie pri polozke alebo globalny notice v kosiku. Vhodne hooky su napriklad `woocommerce_before_cart` alebo custom render v cart item sablone. Toto je spolahlivejsie ako parsovanie HTML cez cisty JS.

## Shoptet

Najrychlejsie riesenie je vyuzit data, ktore su uz v DOM kosika (bezna cena vs akciova cena), a spravit porovnanie v custom JavaScripte. Ak sablona poskytuje datove atributy alebo JSON objekt poloziek, preferujem tie pred parsovanim textu. Skript treba spustat aj po AJAX update kosika. Ak v DOM chyba potrebny udaj, doplnim API volanie podla poloziek v kosiku. Ciel je minimalny zasah do sablony a rychla implementacia.

## Upgates

Postup je podobny: ziskam ceny z templatu alebo z JS objektu kosika, prebehnem polozky a zistim, ci je predajna cena nizsia nez povodna. Pri zlavnenych polozkach vypisem upozornenie v kosiku. Pri dynamickych zmenach kosika naviazem skript na udalosti refreshu. Ak data vo fronte chybaju, pouzijem dostupne API endpointy na dotiahnutie cien. Dolezite je otestovat kupony, mnozstevne zlavy a kombinovane promo akcie.
