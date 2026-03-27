# Zadanie 3 - Nalezyte chyby a opravy

## 1) `e.preventDefault;`

- Problem: funkcia sa iba referencovala, ale nevolala.
- Oprava: `e.preventDefault();`

## 2) `.val()` v native JavaScript

- Problem: `.val()` je jQuery metoda, nie nativny JS.
- Oprava: `document.querySelector(...).value`

## 3) `response.json` bez zatvoriek

- Problem: callback vracal odkaz na funkciu namiesto spracovania JSON.
- Oprava: `.then(response => response.json())`

## Drobne zlepsenia navyse

- Pridany `Content-Type: application/json`.
- Osetreny pripad, ked input pre mnozstvo neexistuje (`quantity = 1`).
- Pridany `.catch()` pre lepsi debugging.
