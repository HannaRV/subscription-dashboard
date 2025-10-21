# Reflektion - Subscription Dashboard

**Namn:** Hanna Rubio Vretby  
**Användarnamn:** hr222sy  
**Kurs:** 1dv610  
**Projekt:** Subscription Dashboard  

## Intro
Denna reflektion täcker två kodbaser: npm-modulen @hr222sy/subscription-tracker och webbapplikationen Subscription Dashboard. Vissa designval skiljer sig mellan dem där modulen prioriterar API-stabilitet och återanvändbarhet medan appen prioriterar pragmatisk enkelhet för MVP-scope.


## Kapitel 2: Meaningful Names
Både modulen och applikationen följer Clean Codes namngivningsprinciper konsekvent med substantivnamn för klasser och verbnamn för metoder. Jag har arbetat med att använda solution domain names ('Controller', 'Repository', 'Collection') respektive problem domain names ('Subscription', 'underutilized') baserat på kontext. Constants används för searchable names (WEEKS_PER_YEAR, HTTP_STATUS.BAD_REQUEST, VALID_FREQUENCIES) istället för magic numbers.  

I appens SubscriptionRepository uppstår en trade-off med getAllSubscriptionsAsPlainObjects() där namnet avslöjar returtypen (plain objects för JSON-serialisering), vilket bryter mot Information Hiding. Skadan är dock begränsad då implementationsdetaljerna förblir dolda. Jag prioriterade meaningful distinction här mot modulens getAllSubscriptions() som returnerar domain objects, där samma namn hade varit disinformation.


### Screenshots
![Exempel från modulen på privata fält och konstanter](../submission/images/module_subscription_class_kap2.png)
Exempel från modulen på privata fält och konstanter  

![Exempel från modulen på verb metoder och naming patterns](../submission/images/module_subscriptioncollection_kap2.png)
Exempel från modulen på verb metoder och naming patterns  

![Exempel från appen på samlade gemensamma konstanter, searchable names](../submission/images/app_config_constants.png)
Exempel från appen på samlade gemensamma konstanter, searchable names  

![Exempel från appen på solution domain name och tydliga verb-metoder](../submission/images/app_securityhandler_kap2.png)
Exempel från appen på solution domain name och tydliga verb-metoder



## Kapitel 3: Functions
Funktioner är överlag små och gör en sak enligt 'Do One Thing'-principen. ExpressApplication är ett exempel på  hur jag tillämpar 'One Level of Abstraction' i appen där constructor delegerar till private methods (#configureRoutes(), #configureSecurityMiddleware()) vilket håller abstraktionsnivån konsekvent medan SubscriptionFieldValidator visar decomposition med varje validering i egen metod. Jag har arbetat med att hålla nere antal argument vilket följer bokens rekommendation att minimera "conceptual power" som argument kräver.  

Command Query Separation följs genom koden förutom i removeSubscription() som både tar bort och returnerar boolean. Detta är en medveten trade-off där jag valde användarvänlighet över strikt CQS då 'subscription not found' är expected business logic som bör hanteras enkelt utan try-catch. Alternativet att kasta exception hade följt CQS men gjort API:et svårare att använda i vanliga scenarion. 

### Screenshots
![Exempel från modulen på små metoder, Do One Thing, CQS](../submission/images/module_subscription_class_kap3.png)  

![Exempel från appen på ExpressApplication med decomposition och små funktioner](../submission/images/app_express_kap3.png)  
![Exempel från appen på naming patterns med konsekvent verb-användning](../submission/images/app_subscriptionvalidation_kap3.png)



## Kapitel 4: Comments
Jag har strävat efter att hålla koden så självdokumenterande som möjligt för att minska behovet av kommentarer. Min kommentarstrategi följer 'Explain Yourself in Code' genom att dokumentera vad läsaren behöver veta, exempelvis parametrarnas struktur när den inte är självklar (req.body: { name, price, frequency, category }) men inte standardparametrar som målgruppen känner till. Constants får förklarande kommentarer när det är motiverat (HOURS_PER_MONTH = 30.44 // Average month length) vilket följer 'Informative Comments' för icke-uppenbara värden.   

Det har varit en knepig balansgång att undvika redundant JSDoc samtidigt som JSDoc ger IntelliSense och type hints, vilket ställer bokens ideal om self-documenting code mot praktisk nytta av developer tools för API-kontrakt. Jag upplever att det har varit svårt att hålla mig konsekvent i dokumentationsnivån genom all kod men jobbat aktivt med detta.

### Screenshots
![Exempel från modulen på konstanter med informativa kommentarer när värden inte är uppenbara](../submission/images/module_costcalculator_kap4.png)  
![Exempel från modulen på JSDoc med endast type hints, undviker redundant beskrivning](../submission/images/module_costcalculator2_kap4.png)  

![Exempel från appen där JSDoc förklarar req.body struktur som inte är självklar från signaturen](../submission/images/app_subscriptioncontroller_kap4.png)  
![Exempel från appen där Class-level JSDoc förklarar syfte, method JSDoc förklarar return struktur](../submission/images/app_errorhandler_kap4.png)



## Kapitel 5: Formatting
I modulen och appens backend-filer följer jag Clean Codes princip om små filer (typiskt < 200 rader) med newspaper structure där kod läses från hög till låg abstraktion, och 'caller above callee' tillämpas med private helpers placerade direkt efter metoden som anropar dem. Vertical openness separerar koncept medan nära relaterad kod grupperas tillsammans.  

I frontend har jag dock main.js som är på 262 rader vilket överskrider rekommendationen, men där varje klass är individuellt liten och tillsammans bildar en cohesive modul. En trade-off där jag prioriterade pragmatisk enkelhet (alla frontend-klasser tillsammans utan imports) över att strikt följa rekommendationen, vilket underlättar utveckling och förståelse av frontend-flödet som helhet.

### Screenshots
![Exempel från modulen på caller above callee, public metod följd av private helper](../submission/images/module_subscriptioncollection_kap5.png)  
![Exempel från modulen på class organization, member variable, constructor och grupperade metoder](../submission/images/module_subscriptioncollection2_kap5.png)  

![Exempel från appen](../submission/images/app_subscriptionrouter_kap5.png)  
![Exempel från appen på Main coordinator-klass med hela applikationsflödet i samma fil](../submission/images/app_main_kap5.png)



## Kapitel 6: Objects and Data Structures
Koden separerar strikt mellan objects (private data + methods) och data structures (public data, no methods) utan hybrids enligt bokens 'Object/Data Structure Anti-Symmetry'. getAllSubscriptionsAsPlainObjects() visar boundary-transformation där Subscription-objekt konverteras explicit till plain objects eftersom privata fält inte serialiseras automatiskt och frontend inte behöver objektets beteende. Clean Code rekommenderar att använda data structures för data transfer.  

Ett alternativ hade varit toJSON() i Subscription-klassen för att behålla objekt-tänket hela vägen, men explicit konvertering i Repository gör boundary-transformationen tydligare och håller domain-objektet oberoende av serialization concerns. Repositorys transformation anropar flera getters på Subscription (getName(), getPrice(), getFrequency(), getCategory()) vilket tekniskt bryter Law of Demeter, men är motiverat då Repository fungerar som adapter vars ansvar är att översätta mellan modulens domain objects och appens data structures.  

Controller däremot pratar endast med Repository och undviker train wrecks genom att aldrig direkt accessa Subscription-objekt, vilket följer Law of Demeter på applikationsnivå.


### Screenshots
![Exempel från modulen på Object med private data och public methods](../submission/images/module_subscription_class_kap6.png)  

![Exempel från appen där controller använder Repository, returnerar plain object (Data Structure)](../submission/images/app_subscriptioncontroller_kap6.png)  
![Exempel från appen där repository transformerar domain objects till plain objects vid boundary](../submission/images/app_subscriptionrepository_kap6.png)



## Kapitel 7: Error Handling
Jag använder exceptions konsekvent genom koden istället för return codes vilket separerar felhantering från business logic, med en centraliserad ErrorHandler som delegerar till Logger, Classifier och Responder. ErrorClassifier använder keyword-matching för att klassificera modulens standard Error-objekt.  

Detta är en medveten trade-off där custom error classes hade gett type-safety men brutit mot boundary-principen genom att exponera modulens interna struktur och skapa tight coupling mellan modul och app. Keyword-matching är fragilt men pragmatiskt för detta MVP där modulens felmeddelanden är stabila och projekttiden begränsad. Alternativet re-wrapping hade behållit loose coupling men krävt mer utvecklingstid och tillfört komplexitet.  

Constructor validation säkerställer fail-fast där objekt aldrig kan vara i ogiltigt tillstånd. Inga null-returns används utan metoder returnerar tomma arrays eller kastar exceptions enligt Clean Code.


### Screenshots
![Exempel från modulen på constructor validation med fail-fast, exceptions kastas innan assignment](../submission/images/module_subscription_class_kap7.png)  
![Exempel från modulen där metoder alltid returnerar array, aldrig null](../submission/images/module_subscription_class2_kap7.png)  

![Exempel från appen på centraliserad ErrorHandler som delegerar](../submission/images/app_errorhandler2_kap7.png)  
![Exempel från appen där ErrorClassifier använder keyword-matching för att klassificera standard Error-objekt](../submission/images/app_errorhandler_kap7.png)


## Kapitel 8: Boundaries
SubscriptionRepository isolerar npm-modulen där Controller inte känner till Subscription-klassen utan använder repositorys interface med appens vocabulär, vilket följer Clean Codes 'raise abstraction level by defining your own interface'. SecurityHandler wrapprar helmet och express-rate-limit för centraliserad säkerhetskonfiguration och utbytbarhet vid ändringar i externa bibliotek.  

En central trade-off är Controllers tight coupling till Express (req, res, next). Wrapping hade gett bättre isolation men för MVP har jag valt denna approach då Express är stabilt, sällan ändras och cost/benefit-ratio inte motiverar den extra abstraktionen. Frontend minimerar externa beroenden genom fetch API.


### Screenshots
![Exempel från appen där SubscriptionRepository isolerar modulen från Controller](../submission/images/app_subscriptionrepository_kap6.png)  
![Exempel från appen där SecurityHandler wrapprar third-party libraries (helmet, express-rate-limit)](../submission/images/app_securityhandler_kap2.png)



## Kapitel 9: Unit Tests
Modulen testas via test-app där varje test-sektion har expected behavior-beskrivningar följt av console output för manuell verifiering, vilket följer Clean Codes princip om descriptive test names och self-documenting tests. Appen testas via testspecifikation och testrapport med UI-testning.  

F.I.R.S.T-principerna följs delvis där testerna är Fast, Independent, Repeatable och Timely (skrivna under utveckling), men Self-Validating kräver manuell jämförelse av output mot expected behavior istället för automatiska assertions. Detta var en medveten trade-off där manuell testning valdes över automatiserat framework som hade gett Self-Validating genom boolean assertions, men för MVP med tidsbegränsning var denna approach mer pragmatisk. Testerna täcker normal flow, edge cases och error handling med descriptive error messages.


### Screenshots
![Exempel från modulen på console output](../submission/images/module_console_output_kap9.png)  
![Exempel från modulen på console output](../submission/images/module_console_output2_kap9.png)  

![Exempel från appen från testspecifikation](../submission/images/app_testspecifikation_kap9.png)  
![Exempel från appen från testrapport](../submission/images/app_testrapport_kap9.png)  
![Exempel från appen från UI](../submission/images/app_UI_kap9.png)



## Kapitel 10: Classes
Jag har arbetat aktivt med SRP där varje klass har ett ansvarsområde och en reason to change. ErrorHandler delegerar till Logger, Classifier och Responder istället för att bära allt ansvar internt. Klasserna visar hög cohesion där metoder konsekvent använder instance variables (activate/deactivate/isActive använder #activeStatus, Repository-metoder använder #collection).  

De är designade enligt Open/Closed Principle där Repository använder map (#frequencyCalculators) istället för switch statements för frequency-hantering och SubscriptionElementFactory encapsulerar DOM-creation, vilket gör att ny funktionalitet kan läggas till utan att modifiera existerande kod.  

Class organization följer Clean Code med member variables först, constructor, public methods och private methods sist vilket skapar konsekvent läsbarhet genom kodbasen. Systemet är 'organized for change' där varje klass har ett tydligt ansvar och ändringar isoleras till specifika klasser vilket minimerar ripple effects.


### Screenshots
![Exempel från modulen på class organization med cohesion, alla metoder använder #subscriptions](../submission/images/module_subscriptioncollection_kap10.png)  

![Exempel från appen på factory pattern med delegerade create-metoder](../submission/images/app_main_kap10.png)  
![Exempel från appen med map istället för switch, Open/Closed Principle](../submission/images/app_subscriptionrepository_kap10.png)



## Kapitel 11: Systems
Applikationen separerar construction från use enligt 'Separation of Main' där ExpressApplication koordinerar system-startup medan Controllers och Repository hanterar runtime-logik genom tre-lagers arkitektur (Presentation, Data Access, Domain) som kommunicerar via clean boundaries. SubscriptionRepository fungerar som adapter mellan Controller och npm-modul där Controller pratar appens språk utan att känna till modulens domain objects, vilket ger loose coupling och gör modulen återanvändbar oberoende av appens infrastruktur.  

Configuration management följer 'keep configurable data at high levels' där domain layer exporterar delade konstanter (FREQUENCY), frontend-specifika grupperas i config.js (API_ENDPOINTS), och class-specifika hålls private (#VALIDATION_KEYWORDS). Cross-cutting concerns (security, error handling, validation) hanteras genom middleware vilket undviker kod-duplicering enligt DRY-principen.  

Dependency injection implementerades i backend med default parameters som gör klasserna testbara med mock objects, men för MVP:ns tidsbegränsning användes manuell testning istället. Frontend använder direct instantiation då dess cohesive klasser saknar alternativa implementationer vilket gör DI till över-engineering enligt YAGNI.  

Systemet är strukturerat för incremental growth där nya komponenter kan läggas till utan att påverka existerande kod.


### Screenshots
![Exempel från appen på main entry point med minimal startup logic](../submission/images/app_server_kap11.png)  
![Exempel från appen på system coordination och middleware configuration](../submission/images/app_express_kap11.png)  
![Exempel från appen på dependency injection pattern för testability](../submission/images/app_subscriptionrouter_kap11.png)

