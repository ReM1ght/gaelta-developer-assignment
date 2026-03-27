# Zadanie 4 - Kratke odpovede

## 1) Migracia zo Shoptetu na Shopify: prve 3 technicke priority

Najprv vyriesim migraciu dat: produkty, varianty, kategorie, zakaznici, objednavky a mapovanie URL. Druha klucova vec je SEO kontinuita, najma 301 redirecty, metadata a kontrola indexacie. Tretia oblast je funkcna parita pred spustenim: dopravy, platby, dane, feedy a merania. Bez tychto troch blokov je riziko vypadku predaja aj SEO straty vysoke. Nasadenie robim s presnym cutover planom a rollbackom.

## 2) LCP je na cerveno - co skontrolujem ako prve

Najprv identifikujem skutocny LCP element (najcastejsie hero obrazok alebo hlavny produktovy obrazok). Potom skontrolujem velkost suboru, format (WebP/AVIF), lazy-load pravidla a prioritu nacitania. Dalej preverim blokujuci CSS/JS a tretie strany, ktore zdrzuju render. Nakoniec porovnam lab data (Lighthouse) a field data (CrUX). Ciel je zrychlit vykreslenie prveho velkeho prvku nad zlomom.

## 3) Kedy poviem, ze nativne to nejde a treba doplnok/custom

Toto poviem vtedy, ked poziadavka ide mimo standardnej logiky platformy alebo zasahuje checkout proces nestandardnym sposobom. Priklad je automaticke rozdelenie jednej objednavky do viac skladov s odlisnou logikou expedicie. Ak to platforma nativne nepodporuje, navrhnem doplnok alebo middleware. Klientovi vysvetlim dopad na rozpocet, SLA a buducu udrzbu. Dolezite je mat jasne zadefinovany scope a limity.

## 4) Skryt ceny na kategoriach, ale nie na detaile produktu

Najcistejsie to riesim upravou sablony vypisu produktov, kde cenu v listingu nerenderujem. Na detaile produktu cenu ponecham bez zmeny. CSS/JS skryvanie je len fallback, pretoze cena ostava v DOM a moze sa stale objavit v niektorych miestach. Po zmene skontrolujem kategorie, vyhladavanie a modul odporucanych produktov. Zaroven overim, ze schema a feedy zostanu konzistentne.

## 5) Vlastny kod pri kliknuti na "Pridat do kosika" v Shoptete

Pouzijem delegovany event listener na tlacidla pridania do kosika alebo sa napojim na existujuci JS event sablony. Ak je pridanie realizovane AJAXom, doplnim reakciu aj na uspesnu odpoved a prekreslenie kosika. Pri merani konverzii je vhodne odlisit click event od realne uspesneho pridania. Kod testujem pre listing, detail produktu aj mobil. Dolezita je odolnost po update sablony.

## 6) API endpointy pre stavy objednavok, platby a krajiny

Pouzijem endpointy pre objednavky a suvisiace ciselniky (lookups), aby som mapoval identifikatory na citatelne nazvy. Objednavky beriem z endpointu objednavok, stavy/platby/krajiny z prislusnych referencnych endpointov podla aktualnej API dokumentacie Shoptetu. Takto viem datovy model drzat konzistentny aj pre reporting. Ciselniky cacheujem, objednavky taham inkrementalne. Ziska sa tym stabilita a menej API volani.

## 7) SK/CZ/HU, jeden admin, tri frontendy, odlisne ceny a jazyky

Na Shopify je bezna cesta cez Markets, lokalizacie a cenove pravidla pre trhy, s moznostou doplnkov pri zlozitejsom pricingu. V Shoptete je viacjazycnost a meny mozne, ale pri velmi rozdielnej cenotvorbe/sortimente sa casto ide na viac shopov. Upgates to vie podobne, treba vsak overit limity cien a dostupne doplnky pre konkretne scenare. WooCommerce je najflexibilnejsi, ale aj najnarocnejsi na prevadzku, bezpecnost a udrzbu. Vyber platformy robi kombinacia budgetu, complexity a internych kapacit.
