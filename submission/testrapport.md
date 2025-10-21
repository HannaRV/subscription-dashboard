# Testrapport - Subscription Dashboard

**Projektnamn:** Subscription Dashboard  
**Student:** Hanna Rubio Vretby (hr222sy)  
**Kurs:** 1dv610  
**Testdatum:** 2025-10-17

---

## Testsammanfattning

Subscription Dashboard har genomgått omfattande manuell testning med **20 testfall som uppnått 100% success rate**. Applikationen uppfyller alla funktionella och ickefunktionella krav enligt [kravspecifikation.md](kravspecifikation.md).

---

**Testmetodik och detaljerade testfall:** Se [testspecifikation.md](testspecifikation.md)

---

## Testresultat

| Test-ID | Vad som testades | Testresultat |
|---------|------------------|--------------|
| TF-1.1 | Lägga till prenumeration - lyckad | ✅ PASS - Prenumeration tillagd och visas korrekt |
| TF-1.2 | Lägga till flera prenumerationer | ✅ PASS - Alla tre prenumerationer visas, total: 888.50 kr |
| TF-1.3 | Ta bort prenumeration | ✅ PASS - Netflix borttagen, Spotify kvarstår |
| TF-1.4 | Ta bort sista prenumerationen | ✅ PASS - Tomt tillstånd-meddelande visas |
| TF-2.1 | Byta frekvens Monthly→Yearly | ✅ PASS - Kostnad konverterar korrekt (139→1668 kr) |
| TF-2.2 | Byta frekvens Yearly→Weekly | ✅ PASS - Spotify konverteras till ~23 kr/weekly |
| TF-2.3 | Totalkostnad uppdateras automatiskt | ✅ PASS - Total räknas om vid alla ändringar |
| TF-3.1 | Tomt namn - validation | ✅ PASS - Browser validation triggas |
| TF-3.2 | Namn >20 tecken - prevention | ✅ PASS - Maxlength stoppar input vid 20 |
| TF-3.3 | Negativt pris - validation | ✅ PASS - Browser validation triggas |
| TF-3.4 | Tomt pris - validation | ✅ PASS - Browser validation triggas |
| TF-3.5 | Pris med decimaler - accepteras | ✅ PASS - 99.50 kr accepteras och visas |
| TF-3.6 | Ingen frekvens - validation | ✅ PASS - Browser validation triggas |
| TF-3.7 | Tom kategori - validation | ✅ PASS - Browser validation triggas |
| TF-3.8 | Kategori >20 tecken - prevention | ✅ PASS - Maxlength stoppar input vid 20 |
| TF-4.1 | Pris = 0 - accepteras | ✅ PASS - Nollpris hanteras korrekt |
| TF-4.2 | Specialtecken - hanteras | ✅ PASS - "AT&T" visas och tas bort korrekt |
| TF-4.3 | Många prenumerationer - performance | ✅ PASS - 25 prenumerationer, inga prestandaproblem |
| TF-4.4 | Duplicerade namn - tillåtet | ✅ PASS - Tre "Netflix" med olika priser |
| TF-4.5 | Mycket högt pris - hanteras | ✅ PASS - 999999 kr beräknas korrekt |

---

## Teststatistik

| Testsvit | Antal testfall | Pass | Fail | Success Rate |
|----------|----------------|------|------|--------------|
| Prenumerationshantering | 4 | 4 | 0 | 100% |
| Kostnadsberäkning | 3 | 3 | 0 | 100% |
| Felhantering och validation | 8 | 8 | 0 | 100% |
| Edge cases | 5 | 5 | 0 | 100% |
| **TOTALT** | **20** | **20** | **0** | **100%** |

**Kritiska buggar:** 0  
**Kända begränsningar (medvetna val):** Se [vision.md](vision.md#projektomfattning).

