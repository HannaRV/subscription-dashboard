# Testspecifikation - Subscription Dashboard

**Projektnamn:** Subscription Dashboard  
**Student:** Hanna Rubio Vretby (hr222sy)  
**Kurs:** 1dv610

För testresultat, se [testrapport.md](testrapport.md).

---

## Komplett testdokumentation

Detta dokument innehåller alla testfall för Subscription Dashboard MVP. Alla tester utförs manuellt via webbgränssnitt då applikationen är en enkel MVP utan databas eller användarautentisering. Se [kravspecifikation.md](kravspecifikation.md) för fullständiga kravdefinitioner.

---

## Testmetod

**Testtyp:** Manuell testning via webbgränssnitt

**Testmiljö:**
- **Webbläsare:** Chrome/Firefox (senaste versionen)
- **Språk:** Svenska. Applikationen använder browser native validation. 
Felmeddelanden visas på svenska och kan variera mellan webbläsare.
- **Enhet:** Desktop och mobil
- **Plattform:** Windows/macOS

---

## Testförutsättningar

**Viktigt:** Applikationen har INGEN datapersistens. Data sparas endast i minnet under aktiv session.

**Varje testfall ska kunna testas individuellt.** Om testfall körs efter varandra, gör en sidladdning mellan testfall för att återställa till tomt tillstånd.

---

## Testfall

### Testsvit: F1.1 - Prenumerationshantering

#### TF-1.1 Lägga till prenumeration - lyckad tilläggning

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.1.1 - Användare ska kunna lägga till nya prenumerationer |
| **Scenario** | Lyckad tilläggning av giltig prenumeration |
| **Beskrivning** | Testar huvudscenariot där användare lägger till en ny prenumeration med all giltig information. |

**Förutsättning:**
- Inga befintliga prenumerationer

**Teststeg:**
1. Navigera till applikationen
2. Fyll i **Name:** "Netflix"
3. Fyll i **Price (kr):** 139
4. Välj **Frequency:** "Monthly"
5. Fyll i **Category:** "streaming"
6. Klicka på knappen "Add Subscription"

**Förväntat resultat:**
- Sidan laddas om
- Netflix visas i prenumerationslistan med:
  - Namn: "Netflix"
  - Kategori: "streaming"
  - Ursprunglig betalningsfrekvens: "monthly • 139kr"
  - Display cost: "139.00 kr/monthly"
- Total cost uppdateras till: "Total monthly cost: 139.00 kr"
- Formuläret töms för nästa inmatning

---

#### TF-1.2 Lägga till flera prenumerationer

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.1.1, F1.1.3 - Lägga till och visa flera prenumerationer |
| **Scenario** | Lägga till tre prenumerationer med olika frekvenser |
| **Beskrivning** | Testar att flera prenumerationer kan läggas till och visas korrekt samtidigt. |

**Förutsättning:**
- Inga befintliga prenumerationer

**Teststeg:**
1. Lägg till prenumeration 1 (Netflix)
2. Lägg till prenumeration 2 (Spotify)
3. Lägg till prenumeration 3 (SATS)
4. Observera listan

**Förväntat resultat:**
- Alla tre prenumerationer visas i listan
- Total monthly cost: "888.50 kr" (139 + 100 + 649.50)
- Varje prenumeration visar korrekt ursprunglig betalningsfrekvens och konverterad kostnad

---

#### TF-1.3 Ta bort prenumeration

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.1.2 - Användare ska kunna ta bort prenumerationer |
| **Scenario** | Ta bort en specifik prenumeration |
| **Beskrivning** | Testar att prenumerationer kan tas bort via Remove-knapp. |

**Förutsättning:**
- Netflix (139 kr/monthly) finns i listan
- Spotify (1200 kr/yearly) finns i listan

**Teststeg:**
1. Identifiera Netflix i listan
2. Klicka på "Remove"-knappen för Netflix
3. Observera listan

**Förväntat resultat:**
- Sidan laddas om
- Netflix försvinner från listan
- Spotify finns kvar
- Total cost uppdateras (exkluderar Netflix)

---

#### TF-1.4 Ta bort sista prenumerationen

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.1.2, F1.3.1 - Ta bort prenumeration och visa tomt tillstånd |
| **Scenario** | Ta bort sista prenumerationen och se tomt tillstånd |
| **Beskrivning** | Testar att tomt tillstånd visas när alla prenumerationer tas bort. |

**Förutsättning:**
- Endast en prenumeration finns

**Teststeg:**
1. Klicka på "Remove" för Netflix
2. Observera vad som visas

**Förväntat resultat:**
- Meddelande visas: "No subscriptions yet. Add your first one!"
- Total cost: "Total monthly cost: 0.00 kr"
- Ingen prenumerationslista visas

---

### Testsvit: F1.2 - Kostnadsberäkning

#### TF-2.1 Byta visningsfrekvens - Monthly till Yearly

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.2.2 - Användare ska kunna växla visningsfrekvens |
| **Scenario** | Byta från monthly till yearly vy |
| **Beskrivning** | Testar att alla prenumerationer omräknas korrekt vid byte av visningsfrekvens. |

**Förutsättning:**
- Netflix (139 kr monthly) finns i listan
- View frequency är "Monthly" (default)

**Teststeg:**
1. Observera Netflix display cost: "139.00 kr/monthly"
2. Observera total cost: "Total monthly cost: 139.00 kr"
3. Öppna "View as:"-dropdown
4. Välj "Yearly"
5. Observera ändringar

**Förväntat resultat:**
- Netflix display cost ändras till: "1668.00 kr/yearly" (139 × 12)
- Total cost ändras till: "Total yearly cost: 1668.00 kr"
- Ursprunglig betalningsfrekvens visas fortfarande: "monthly • 139kr"
- Sidan laddas om

---

#### TF-2.2 Byta visningsfrekvens - Yearly till Weekly

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.2.2, F1.2.3 - Växla frekvens och korrekt konvertering |
| **Scenario** | Byta från yearly till weekly och verifiera beräkning |
| **Beskrivning** | Testar konvertering från yearly till weekly med modulens beräkningar. |

**Förutsättning:**
- Spotify (1200 kr yearly) finns i listan
- View frequency är "Monthly"

**Teststeg:**
1. Observera Spotify i monthly view: "100.00 kr/monthly"
2. Byt till "Yearly" view
3. Observera Spotify: "1200.00 kr/yearly"
4. Byt till "Weekly" view
5. Observera Spotify

**Förväntat resultat:**
- Spotify display cost i weekly: "~23.00 kr/weekly" (1200 / 52.18)
- Total cost uppdateras korrekt
- Ursprunglig betalningsfrekvens: "yearly • 1200kr" (oförändrad)

---

#### TF-2.3 Totalkostnad uppdateras automatiskt

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.2.1 - Systemet ska automatiskt beräkna totalkostnad |
| **Scenario** | Verifiera att total uppdateras vid alla ändringar |
| **Beskrivning** | Testar att total cost räknas om automatiskt vid tillägg, borttagning och frekvensändring. |

**Förutsättning:**
- Inga befintliga prenumerationer

**Teststeg:**
1. Observera initial total: "0.00 kr"
2. Lägg till Netflix (139 monthly) → Observera total
3. Lägg till Spotify (1200 yearly) → Observera total
4. Byt till yearly view → Observera total
5. Ta bort Netflix → Observera total

**Förväntat resultat:**
1. Efter Netflix: "139.00 kr"
2. Efter Spotify: "239.00 kr" (139 + 100)
3. Efter yearly: "2868.00 kr" (1668 + 1200)
4. Efter remove Netflix: "1200.00 kr"

---

### Testsvit: F1.3 - Felhantering och validation

#### TF-3.1 Tomt namn - Frontend validation

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.3.2.1 - Tomt namn ska ge felmeddelande |
| **Scenario** | Försök lägga till prenumeration utan namn |
| **Beskrivning** | Testar att required-validering fungerar för name field. |

**Teststeg:**
1. Lämna **Name**-fältet tomt
2. Fyll i **Price:** 100
3. Välj **Frequency:** "Monthly"
4. Fyll i **Category:** "test"
5. Klicka "Add Subscription"

**Förväntat resultat:**
- Browser native validation triggas
- Felmeddelande visas: "Fyll i det här fältet"
- Formuläret skickas INTE
- Användaren stannar på sidan

---

#### TF-3.2 Namn längre än 20 tecken - Frontend prevention

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.1.1.1 - Prenumerationsnamn max 20 tecken |
| **Scenario** | Försök skriva mer än 20 tecken i name field |
| **Beskrivning** | Testar att maxlength-attributet preventerar för lång input. |

**Teststeg:**
1. Klicka i **Name**-fältet
2. Försök skriva över 20 tecken
3. Observera vad som visas i fältet

**Förväntat resultat:**
- Browser stoppar input vid tecken 20
- Användaren kan inte skriva fler tecken

---

#### TF-3.3 Negativt pris - Frontend validation

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.3.2.2 - Negativt pris ska ge felmeddelande |
| **Scenario** | Försök ange negativt pris |
| **Beskrivning** | Testar att min="0" attributet validerar pris. |

**Teststeg:**
1. Fyll i **Name:** "Test"
2. Fyll i **Price:** -100
3. Välj **Frequency:** "Monthly"
4. Fyll i **Category:** "test"
5. Klicka "Add Subscription"

**Förväntat resultat:**
- Browser native validation triggas
- Felmeddelande visas: "Välj ett värde som inte är mindre än 0"
- Formuläret skickas INTE
- Användaren stannar på sidan

---

#### TF-3.4 Tomt pris - Frontend validation

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.3.2.2 - Ogiltigt pris ska ge felmeddelande |
| **Scenario** | Försök lägga till prenumeration utan pris |
| **Beskrivning** | Testar att required-validering fungerar för price field. |

**Teststeg:**
1. Fyll i **Name:** "Test"
2. **Lämna Price tomt**
3. Välj **Frequency:** "Monthly"
4. Fyll i **Category:** "test"
5. Klicka "Add Subscription"

**Förväntat resultat:**
- Browser native validation triggas
- Felmeddelande visas: "Skriv in ett nummer"
- Formuläret skickas INTE
- Användaren stannar på sidan

---

#### TF-3.5 Pris med decimaler - Accepteras

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.1.1.2 - Pris kan vara decimaltal |
| **Scenario** | Lägga till prenumeration med decimalpris |
| **Beskrivning** | Testar att step="0.01" tillåter decimaler. |

**Förutsättning:**
- Inga befintliga prenumerationer

**Teststeg:**
1. Fyll i **Name:** "Test"
2. Fyll i **Price:** 99.50
3. Välj **Frequency:** "Monthly"
4. Fyll i **Category:** "test"
5. Klicka "Add Subscription"

**Förväntat resultat:**
- Prenumeration läggs till
- Display cost visar: "99.50 kr/monthly"
- Inga felmeddelanden

---

#### TF-3.6 Ingen frekvens vald - Frontend validation

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.3.2.3 - Ogiltig frekvens ska ge felmeddelande |
| **Scenario** | Försök skicka utan att välja frekvens |
| **Beskrivning** | Testar required på select field med tom default option. |

**Teststeg:**
1. Fyll i **Name:** "Test"
2. Fyll i **Price:** 100
3. Lämna **Frequency:** "Select frequency"
4. Fyll i **Category:** "test"
5. Klicka "Add Subscription"

**Förväntat resultat:**
- Browser native validation triggas på select
- Felmeddelande visas: "Välj en post i listan"
- Formuläret skickas INTE

---

#### TF-3.7 Tom kategori - Frontend validation

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.3.2.4 - Ogiltig kategori ska ge felmeddelande |
| **Scenario** | Försök lägga till utan kategori |
| **Beskrivning** | Testar required-validering för category field. |

**Teststeg:**
1. Fyll i **Name:** "Test"
2. Fyll i **Price:** 100
3. Välj **Frequency:** "Monthly"
4. Lämna **Category** tomt
5. Klicka "Add Subscription"

**Förväntat resultat:**
- Browser native validation triggas
- Felmeddelande: "Fyll i det här fältet"
- Formuläret skickas INTE

---

#### TF-3.8 Kategori längre än 20 tecken - Frontend prevention

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | F1.1.1.4 - Kategori max 20 tecken |
| **Scenario** | Försök skriva mer än 20 tecken i category |
| **Beskrivning** | Testar maxlength-attributet för category. |

**Teststeg:**
1. Klicka i **Category**-fältet
2. Försök skriva över 20 tecken
3. Observera fältet

**Förväntat resultat:**
- Browser stoppar vid tecken 20
- Användaren kan inte skriva fler tecken

---

### Testsvit: Edge Cases

#### TF-4.1 Pris = 0 - Accepteras

| Aspekt | Beskrivning |
|--------|-------------|
| **Scenario** | Lägga till prenumeration med pris 0 |
| **Beskrivning** | Testar att noll är ett giltigt värde (min="0"). |

**Teststeg:**
1. Fyll i Name: "Free Trial"
2. Fyll i Price: 0
3. Välj Frequency: "Monthly"
4. Fyll i Category: "streaming"
5. Klicka "Add Subscription"

**Förväntat resultat:**
- Prenumeration läggs till
- Display cost: "0.00 kr/monthly"
- Total cost inkluderar 0 kr korrekt

---

#### TF-4.2 Specialtecken i namn - Accepteras

| Aspekt | Beskrivning |
|--------|-------------|
| **Scenario** | Namn med specialtecken |
| **Beskrivning** | Testar att specialtecken tillåts i name. |

**Teststeg:**
1. Fyll i Name: "AT&T"
2. Fyll i Price: 100
3. Välj Frequency: "Monthly"
4. Fyll i Category: "telecom"
5. Klicka "Add Subscription"
6. Klicka "Remove" för AT&T

**Förväntat resultat:**
- Prenumeration läggs till med namn "AT&T"
- Visas korrekt i listan
- Remove fungerar

---

#### TF-4.3 Många prenumerationer - Performance

| Aspekt | Beskrivning |
|--------|-------------|
| **Krav** | NF2.2.1 - Hantera flera prenumerationer utan prestandaförsämring |
| **Scenario** | Lägga till 20+ prenumerationer |
| **Beskrivning** | Testar att applikationen hanterar många prenumerationer. |

**Teststeg:**
1. Lägg till 25 olika prenumerationer
2. Byt visningsfrekvens flera gånger
3. Observera responstider

**Förväntat resultat:**
- Alla 25 prenumerationer visas
- Ingen märkbar prestandaförsämring
- Total cost beräknas korrekt
- Frekvensändringar sker snabbt

---

#### TF-4.4 Samma namn flera gånger - Tillåtet

| Aspekt | Beskrivning |
|--------|-------------|
| **Scenario** | Lägga till flera prenumerationer med samma namn |
| **Beskrivning** | Testar att duplicerade namn tillåts (olika priser/frekvenser). |

**Teststeg:**
1. Lägg till: Netflix, 139 kr, Monthly, streaming
2. Lägg till: Netflix, 169 kr, Monthly, streaming
3. Lägg till: Netflix, 99 kr, Monthly, streaming

**Förväntat resultat:**
- Alla tre "Netflix" visas separat i listan
- Varje har sitt eget pris
- Total cost: 407 kr
- Remove fungerar på individuella prenumerationer

---

#### TF-4.5 Mycket högt pris - Hanteras korrekt

| Aspekt | Beskrivning |
|--------|-------------|
| **Scenario** | Högt pris |
| **Beskrivning** | Testar att stora tal hanteras. |

**Teststeg:**
1. Fyll i Name: "Enterprise"
2. Fyll i Price: 999999
3. Välj Frequency: "Yearly"
4. Fyll i Category: "software"
5. Klicka "Add Subscription"
6. Byt till monthly view

**Förväntat resultat:**
- Prenumeration läggs till
- Display cost i monthly: "83333.25 kr/monthly"
- Beräkningar korrekta (999999 / 12)
- Inga overflow-problem

---

**Kända begränsningar (medvetna val):** Se [vision.md](vision.md#projektomfattning).