# Reflektion - Subscription Dashboard

**Namn:** Hanna Rubio Vretby  
**Användarnamn:** hr222sy  
**Kurs:** 1dv610  
**Projekt:** Subscription Dashboard  

## Intro

### Kapitel 2: Meaningful Names
Både modulen och applikationen följer Clean Codes namngivningsprinciper konsekvent med substantivnamn för klasser och verbnamn för metoder. 
Solution domain names används från etablerade patterns, appens 'Controller' och 'Repository' liksom modulens 'Collection' och 'Calculator' gör koden begriplig för utvecklare. Constants används genomgående för searchable names (WEEKS_PER_YEAR, HTTP_STATUS.BAD_REQUEST, VALID_FREQUENCIES) istället för magic numbers i båda projekten. I appens SubscriptionRepository uppstår en trade-off med getAllSubscriptionsAsPlainObjects() där namnet avslöjar returtypen (plain objects för JSON-serialisering) vilket bryter mot information Hiding. Skadan är dock begränsad då implementations detaljerna förblir dolda. Jag prioriterade meaningful distinction här mot modulens redan befintliga getAllSubscriptions() som returnerar domain objects där samma namn hade varit disinformation.


**Exempel från modulen:**

**Exempel från appen:**

[Screenshot]


### Kapitel 3: Functions
Funktioner är genomgående små och gör en sak enligt ”Do One Thing"-principen. ExpressApplication visar 'One Level of Abstraction' där constructor delegerar till private methods (#configureRoutes(), 
#configureSecurityMiddleware()) vilket håller abstraktionsnivån konsekvent, medan SubscriptionFieldValidator visar decomposition med varje validering i egen metod. Argumenten hålls ner med mest 0-2 argument vilket följer bokens rekommendation att minimera "conceptual power" som 
argument kräver. Command Query Separation följs konsekvent genom koden förutom i removeSubscription() som både tar bort och returnerar boolean. Detta är en medveten trade-off där jag valde användarvänlighet över strikt CQS då "subscription not found" är expected business logic som bör hanteras enkelt utan try-catch. Alternativet att kasta exception hade följt CQS men gjort API:et svårare att använda i vanliga scenarion.


**Exempel från modulen:**

**Exempel från appen:**

[Screenshot]


### Kapitel 4: Comments
Jag har strävat efter att hålla koden så självdokumenterande som möjligt för att minska behovet av kommentarer. Min kommentarstrategi följer "Explain Yourself in Code" genom att dokumentera vad läsaren behöver veta, exempelvis parametrarnas struktur när den inte är självklar (req.body: { name, price, frequency, category }) men inte standardparametrar som målgruppen känner till. Constants får förklarande kommentarer när det är motiverat (HOURS_PER_MONTH = 30.44 // Average month length) vilket följer "Informative Comments" för icke-uppenbara värden. En medveten trade-off är att undvika redundant JSDoc som bara upprepar metodnamn (validateSubscription() behöver inte "Validates subscription") samtidigt som JSDoc ger IntelliSense och type hints. Detta balanserar bokens ideal om self-documenting code mot praktisk nytta av developer tools för API-kontrakt. Jag upplever att det har varit svårt att hålla mig konsekvent i dokumentations nivån genom all kod och jobbat aktivt med detta.

**Exempel från modulen:**

**Exempel från appen:**

[Screenshot]


### Kapitel 5: Formatting
[4-6 meningar]

**Exempel från modulen:**

**Exempel från appen:**

[Screenshot]


### Kapitel 6: Objects and Data Structures
[4-6 meningar]

**Exempel från modulen:**

**Exempel från appen:**

[Screenshot]


### Kapitel 7: Error Handling
[4-6 meningar]

**Exempel från modulen:**

**Exempel från appen:**

[Screenshot]


### Kapitel 8: Boundaries
[4-6 meningar]

**Exempel från modulen:**

**Exempel från appen:**

[Screenshot]


### Kapitel 9: Unit Tests
[4-6 meningar]

**Exempel från modulen:**

**Exempel från appen:**

[Screenshot]


### Kapitel 10: Classes
[4-6 meningar]

**Exempel från modulen:**

**Exempel från appen:**

[Screenshot]



### Kapitel 11: Systems
[4-6 meningar]

**Exempel från modulen:**

**Exempel från appen:**

[Screenshot]