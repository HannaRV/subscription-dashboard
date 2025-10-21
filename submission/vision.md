# Vision - Subscription Dashboard

**Student:** Hanna Rubio Vretby (hr222sy)  
**Kurs:** 1dv610  
**Projekt:** Subscription Dashboard  
**Teknologier:** JavaScript, Node.js, Express, HTML/CSS, npm-modul

---

## Bakgrund och problembeskrivning

I en tid där allt fler tjänster kräver prenumeration hanterar vi konsumenter i genomsnitt flera återkommande tjänster inom streaming, programvara, träning och andra kategorier. Detta skapar flera utmaningar:

**Problemet:**
- **Rörigt** - För många tjänster att hålla koll på manuellt
- **Dolda kostnader** - Svårt att förstå total månads-/årskostnad
- **Glömda prenumerationer** - Betalar för oanvända tjänster som ackumuleras över tid
- **Brist på överblick** - Ingen central plats för att se alla prenumerationer och kostnader

Många försöker hantera prenumerationer med:
- **Kalkylblad** manuellt som är tidskrävande
- **Kontoutdrag** där det är svårt att finna rätt post och få överblick
- **Flera appar** för olika tjänster - Fragmenterad information

Detta leder till ineffektiv prenumerationshantering där värdefulla pengar slösas på glömda tjänster och tydlig bild av återkommande utgifter saknas.

---

## Syfte

Subscription Dashboard hjälper användare ta kontroll över sina prenumerationskostnader genom att samla alla tjänster på ett ställe, automatiskt beräkna totalkostnader och visualisera utgifter i olika 
perspektiv.

---

## Målgrupp

**Individer från 18 års ålder** med flera digitala prenumerationer som vill:
- Ta kontroll över sina utgifter
- Identifiera och avsluta oanvända prenumerationer
- Få en tydlig överblick av återkommande kostnader
- Fatta välavvägda beslut om vilka tjänster som ska behållas

**Typiska egenskaper:**
- Har flera aktiva prenumerationer
- Använder streamingtjänster, programvaruverktyg, gymmedlemskap m.m.
- Vill budgetera och minska onödiga utgifter
- Bekväm med att använda webbapplikationer
- Värderar enkelhet över komplexa funktioner

---

## Marknad och konkurrerande lösningar

### Befintliga lösningar:

**1. Kalkylblad (Excel/Google Sheets)**
- **Styrkor:** Flexibla, anpassningsbara
- **Svagheter:** Manuell datainmatning, ingen automatisering, tidskrävande
- **Målgrupp:** DIY-användare villiga att underhålla manuellt

**2. Bankappar**
- **Styrkor:** Automatisk transaktionsspårning
- **Svagheter:** Reaktiv, ingen kategorisering, ingen proaktiv hantering
- **Målgrupp:** Allmänna bankkunder

**3. Antecknings-/Todo-appar**
- **Styrkor:** Enkla, snabba anteckningar
- **Svagheter:** Inga beräkningar, ingen struktur, ingen analys
- **Målgrupp:** Allmän anteckningshantering

### Nuvarande användarmetod:
De flesta kombinerar flera verktyg (eller inga alls) vilket skapar:
- Fragmenterad information
- Risk att missa prenumerationer
- Ingen tydlig totalkostnadsöverblick

**Gap på marknaden:**  
Få lösningar är specifikt utformade för svenska användare som vill ha ett enkelt, fokuserat verktyg för prenumerationshantering utan komplexitet.

---

## Projektvärde och funktionalitet

Subscription Dashboard levererar:

### Centraliserad prenumerationsöversikt
Samla alla återkommande kostnader på ett ställe. Ingen prenumeration glömd, ingen kostnad dold. Få äntligen full kontroll över dina prenumerationsutgifter med en enkel, tydlig överblick som alltid är uppdaterad.

### Snabb och smart kostnadsöversikt
Visa dina totala utgifter i det perspektiv som passar dig bäst: per vecka, månad eller år. Förstå hur små återkommande kostnader ackumuleras över tid och fatta informerade beslut om vilka tjänster som verkligen är värda pengarna.

### Flexibel frekvensvisualisering
Oavsett om en tjänst fakturerar veckovis, månadsvis eller årligen visas alla kostnader i den frekvens man önskar. Växla mellan veckovis, månadsvis och årligt perspektiv med ett klick för att få den insikt du behöver just nu.

### Enkel och snabb hantering
Minimalistiskt gränssnitt utan onödig komplexitet. Lägg till eller ta bort prenumerationer på sekunder utan inlärningskurva. Perfekt för dig som vill ha kontroll utan att lägga tid på administration.

### Mobil-responsiv design
Hantera dina prenumerationer var du än är, hemma vid datorn eller på resande fot med mobilen. Responsiv design som fungerar lika bra på alla enheter.

### Säker och tillförlitlig
Byggd med säkerhet i fokus, så du kan lita på att din information hanteras korrekt.

### Unika fördelar

**För svenska användare:**
- Svensk valuta (SEK) som standard
- Inget behov av bankkontokoppling

---

## Teknisk kontext

### Teknikstack

**Backend:**
- **Node.js (≥20.6.0)** - JavaScript runtime-miljö
- **Express 5** - Lättviktig och flexibel webbramverk
- **@hr222sy/subscription-tracker (v1.0.0)** - Anpassad npm-modul för prenumerationslogik
- **helmet** - Säkerhetshuvuden
- **express-rate-limit** - Rate limiting-skydd

**Frontend:**
- **Vanilla JavaScript (ES6+)** - Inga ramverksberoenden
- **HTML5** - Semantisk markup
- **CSS3** - Responsiv styling

**Arkitektur:**
- **MVC-inspirerad arkitektur** - Tydlig separation av Model, View och Controller-ansvar
- **Repository Pattern** - Dataåtkomstabstraktion som isolerar modulen
- **Objektorienterad design** - Klasser med enskilda ansvar
- **Clean Code-principer** - Läsbar, underhållbar kod enligt Martins riktlinjer

### Varför dessa val?

**Vanilla JavaScript** - Demonstrerar grundläggande programmeringskunskaper utan ramverksmagin, håller applikationen lättviktig och snabb.

**Express** - Branschstandard webbramverk som är väldokumenterat och tillräckligt flexibelt för utbildningsändamål samtidigt som det är produktionsklart.

**Anpassad npm-modul** - Visar den kompletta utvecklingscykeln från modulskapande till integration, demonstrerar beroendehantering och API-design.

**Objektorienterad design** - Ger tydlig struktur och demonstrerar designmönster, med avsikt att göra koden underhållbar.

**Ingen databas (MVP)** - Förenklar deployment och tillåter fokus på kodkvalitet och arkitektur snarare än infrastrukturuppsättning. Avsiktlig begränsning för detta akademiska projekt.

---

## Projektomfattning

### MVP-omfattning (Nuvarande)
Projektet fokuserar på **grundläggande prenumerationshantering**:
- Centraliserad överblick av alla prenumerationer
- Automatisk kostnadsberäkning och konvertering
- Flexibel frekvensvisualisering
- Säker input-validering och skydd

### Medvetna begränsningar (MVP)

**Tekniska begränsningar (Avsiktliga):**

Detta är en **single-user applikation utan autentisering eller datapersistens**, specifikt utformad för att demonstrera Clean Code-principer och mjukvarudesignmönster i ett akademiskt sammanhang.

- **Inga användarkonton** - Applikationen tar en användare
- **Inget autentiseringssystem** - Ingen login/logout-funktionalitet
- **Endast minneslagring** - Data lagras i serverns minne under körning
- **Ingen datapersistens** - Alla prenumerationer går förlorade vid sidladdning eller serveromstart
- **Design för en session** - Varje användarsession startar från början


**Funktionella begränsningar:**
- **Ingen redigeringsfunktion** - Användare måste ta bort och återskapa för att ändra prenumerationer
- **Ingen användningsanalys** - UsageAnalyzer från modulen inte implementerad i denna version
- **Ingen kategorigruppering** - Prenumerationer inte grupperade eller filtrerade efter kategori
- **Inga prenumerationspåminnelser** - Inget notifikationssystem för kommande förnyelser

### Framtida utveckling
Planerade förbättringar för produktionsversion:
- **Användarautentisering och konton** - Säkert login-system med sessioner
- **Databasintegration** - Persistent lagring (MongoDB/PostgreSQL)
- **Flermanvändarstöd** - Varje användare upprätthåller sin egen prenumerationslista
- **Redigeringsfunktion** för prenumerationer
- **LocalStorage fallback** - Client-side persistens för en-användarscenarier
- **Användningsanalys** - Kostnad per användaretimme, identifiera oanvända tjänster
- **Kategoriuppdelning** - Visuella diagram och utgifter per kategori
- **Exportmöjligheter** - PDF-rapporter och dataexport
- **Utgiftstrender** - Spåra förändringar över tid
- **Prenumerationspåminnelser** - Notifikationer för kommande förnyelser

---

## Akademiskt syfte

Projektet skapades för kursen **1dv610** vid Linnéuniversitetet. 
Modulen @hr222sy/subscription-tracker utvecklades i Uppgift 2 (L2).