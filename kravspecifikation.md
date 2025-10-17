# Kravspecifikation - Subscription Dashboard

**Projektnamn:** Subscription Dashboard  
**Student:** Hanna Rubio Vretby (hr222sy)  
**Kurs:** 1dv610 - Introduktion till mjukvarukvalitet  
**Teknologier:** Node.js, Express, Vanilla JavaScript, @hr222sy/subscription-tracker

---

## Förklaring av prefixsystem

I denna kravspecifikation används följande prefixsystem för att tydligt kategorisera olika typer av krav:

- **F** - Funktionella krav: Beskriver vad systemet ska göra och vilka funktioner det ska erbjuda
- **NF** - Ickefunktionella produktkrav: Beskriver egenskaper och kvaliteter som systemet ska ha
- **O** - Organisationskrav: Beskriver krav på utvecklingsprocessen och den tekniska miljön
- **E** - Externa krav: Beskriver krav som kommer från externa faktorer som standarder och akademiska krav

---

## 1. Funktionella krav

### 1.1 Prenumerationshantering

**F1.1.1:** Användare ska kunna lägga till nya prenumerationer
- **F1.1.1.1:** Användare ska kunna ange prenumerationsnamn (max 20 tecken)
- **F1.1.1.2:** Användare ska kunna ange pris i SEK (positiva tal)
- **F1.1.1.3:** Användare ska kunna välja betalningsfrekvens (weekly, monthly, yearly)
- **F1.1.1.4:** Användare ska kunna ange kategori (max 20 tecken)

**F1.1.2:** Användare ska kunna ta bort prenumerationer
- **F1.1.2.1:** Borttagning ska ske via klick på "Remove"-knapp
- **F1.1.2.2:** Prenumerationen ska tas bort omedelbart från listan

**F1.1.3:** Användare ska kunna se alla sina prenumerationer
- **F1.1.3.1:** Varje prenumeration ska visa namn och kategori
- **F1.1.3.2:** Varje prenumeration ska visa original pris och betalningsfrekvens
- **F1.1.3.3:** Varje prenumeration ska visa konverterad kostnad baserat på vald visningsfrekvens

### 1.2 Kostnadsberäkning

**F1.2.1:** Systemet ska automatiskt beräkna och visa totalkostnad
- **F1.2.1.1:** Totalkostnad ska baseras på vald visningsfrekvens
- **F1.2.1.2:** Totalkostnad ska uppdateras omedelbart vid ändringar

**F1.2.2:** Användare ska kunna växla visningsfrekvens
- **F1.2.2.1:** Användare ska kunna välja weekly, monthly eller yearly via dropdown
- **F1.2.2.2:** Alla prenumerationer ska omräknas automatiskt vid byte
- **F1.2.2.3:** Original betalningsfrekvens ska alltid visas oavsett vald vy

**F1.2.3:** Systemet ska konvertera kostnader mellan frekvenser korrekt
- **F1.2.3.1:** Konverteringar ska använda subscription-tracker modulens beräkningsmetoder
- **F1.2.3.2:** Konverteringar ska använda genomsnittliga värden (4.33 veckor/månad, 52.18 veckor/år)

### 1.3 Felhantering och användarfeedback

**F1.3.1:** Systemet ska visa tomt tillstånd när inga prenumerationer finns
- **F1.3.1.1:** Meddelande "No subscriptions yet. Add your first one!" ska visas

**F1.3.2:** Systemet ska validera all användarinput
- **F1.3.2.1:** Tomt namn ska ge felmeddelande
- **F1.3.2.2:** Negativt eller ogiltigt pris ska ge felmeddelande
- **F1.3.2.3:** Ogiltig frekvens ska ge felmeddelande
- **F1.3.2.4:** Ogiltig kategori ska ge felmeddelande

---

## 2. Ickefunktionella produktkrav

### 2.1 Användbarhet

**NF2.1.1:** Gränssnittet ska vara intuitivt och kräva minimal inlärning  
**NF2.1.2:** Applikationen ska vara responsiv och fungera på mobila enheter  
**NF2.1.3:** Formulär ska ha tydliga labels och placeholder-texter  
**NF2.1.4:** Felmeddelanden ska vara användarvänliga och beskrivande  

### 2.2 Prestanda

**NF2.2.1:** Systemet ska ha funktionalitet för att hantera ett rimligt antal prenumerationer utan betydande prestandaförsämring  
**NF2.2.2:** Kostnadsberäkningar ska uppdateras responsivt vid ändringar  
**NF2.2.3:** Generella responstider ska optimeras för användarvänlighet  

### 2.3 Tillförlitlighet

**NF2.3.1:** Kostnadsberäkningar ska vara matematiskt korrekta med två decimaler precision  
**NF2.3.2:** Applikationen ska hantera oväntat invalida data utan att krascha  

### 2.4 Säkerhet

**NF2.4.1:** Input validation ska ske både på frontend och backend  
**NF2.4.2:** Rate limiting ska skydda mot överbelastning (100 requests/minut)  
**NF2.4.3:** Security headers ska implementeras via helmet  
- **NF2.4.3.1:** Content Security Policy ska förhindra inline scripts  
**NF2.4.4:** Prenumerationsnamn ska URL-encodas för säker POST  

### 2.5 Underhållbarhet

**NF2.5.1:** Koden ska följa Clean Code-principer (kapitel 2-11)  
**NF2.5.2:** Systemet ska följa MVC-arkitektur med tydlig separation of concerns  
**NF2.5.3:** Modulen (@hr222sy/subscription-tracker) ska vara isolerad via Repository Pattern  
**NF2.5.4:** Alla publika metoder ska vara dokumenterade med JSDoc  

### 2.6 Testbarhet

**NF2.6.1:** Alla funktionella krav ska vara testbara manuellt via UI  
**NF2.6.2:** Testrapport ska dokumentera alla testfall och resultat  

---

## 3. Organisationskrav

### 3.1 Utvecklingsmiljö och tekniska plattformar

**O3.1.1:** Utveckling ska ske i Visual Studio Code  
**O3.1.2:** Systemet ska implementeras med följande teknologier:
- Frontend: Vanilla JavaScript (ES6+), HTML5, CSS3
- Backend: Node.js (≥20.6.0), Express 5
- npm-modul: @hr222sy/subscription-tracker (version 1.0.0)
- Säkerhet: helmet, express-rate-limit

**O3.1.3:** Systemet ska följa MVC-arkitektur  
**O3.1.4:** Systemet ska driftsättas publikt (Vercel, Render eller liknande)  

### 3.2 Versionshantering

**O3.2.1:** Projektet ska versionshantera all källkod med Git  
**O3.2.2:** GitHub ska användas som Git-värd  
**O3.2.3:** Huvudgrenen ska vara main (produktionskod för L3-inlämning)  
**O3.2.4:** Git-historik ska visa kontinuerlig utveckling  

### 3.3 Kodstandard

**O3.3.1:** JavaScript-kod ska följa ES6+ standard  
**O3.3.2:** Kod ska följa Clean Code-principer  
**O3.3.3:** Variabelnamn, funktionsnamn och kommentarer ska skrivas på engelska  
**O3.3.4:** Private fields ska användas konsekvent (#field)  
**O3.3.5:** Named constants ska användas för magic strings och numbers  

### 3.4 Koddokumentation

**O3.4.1:** README.md ska innehålla vision, installation och användningsinstruktioner  
**O3.4.2:** Kravspecifikation ska dokumenteras  
**O3.4.3:** Testrapport ska dokumenteras  
**O3.4.4:** Reflektion över Clean Code kapitel 2-11 ska dokumenteras  

---

## 4. Externa krav

### 4.1 Akademiska krav

**E4.1.1:** Projektet ska uppfylla 1dv610 L3-krav enligt kursbeskrivning  
**E4.1.2:** All kod ska vara självskriven (ingen AI-generering, ingen kopiering)  
**E4.1.3:** Modulen ska användas från npm (@hr222sy/subscription-tracker)  
**E4.1.4:** Kod ska demonstrera Clean Code-principer och objektorienterad design  

### 4.2 Etiska krav

**E4.2.1:** Inga personuppgifter ska samlas in  
**E4.2.2:** Ingen spårning eller analytics ska implementeras  
**E4.2.3:** Data ska inte lagras permanent (privacy-first approach för MVP)  

### 4.3 Standarder

**E4.3.1:** HTML ska vara semantiskt korrekt  
**E4.3.2:** Säkerhetsåtgärder ska följa grundläggande OWASP-riktlinjer  

---

## 5. Begränsningar och framtida utveckling

### 5.1 Kända begränsningar i MVP

**Ingen datapersistens:**  
Data sparas endast i minnet under aktiv session. Vid sidladdning försvinner all data.

**Ingen redigeringsfunktion:**  
Användare måste ta bort och återskapa prenumerationer för att ändra uppgifter.

**Ingen användningsanalys:**  
UsageAnalyzer från modulen används inte i denna version.

**Ingen kategorianalys:**  
Kostnad per kategori visas inte grupperat.

### 5.2 Planerade förbättringar (post-MVP)

**Fas 1:**
- LocalStorage för datapersistens mellan sessioner
- Edit-funktion för prenumerationer
- Kategori-gruppering med totalkostnad per kategori

**Fas 2:**
- Användningsanalys (lägga till usage hours)
- Identifiera oanvända/underutnyttjade prenumerationer
- Visuella diagram för kostnadsfördelning

**Fas 3:**
- Backend-databas
- Användarautentisering
- Multi-user support

---

**Senast uppdaterad:** 2025-10-17
