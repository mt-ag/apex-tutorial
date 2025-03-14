# <a name="oracle-apex-und-ai"></a> 23. Oracle APEX und AI - RAG Daten  

## <a name="einleitung"></a>Einleitung  

In diesem Kapitel befassen wir uns mit der Integration von **Retrieval-Augmented Generation (RAG)** in **Oracle APEX**, um eine KI-gestützte Assistenz für Benutzer bereitzustellen. Der Fokus liegt darauf, wie KI-Anfragen mit **strukturieren Daten aus der Datenbank** kombiniert werden können, um gezielte und relevante Antworten zu liefern.  

Das Tutorial gliedert sich in zwei zentrale Szenarien:  

1. **Teil 1: Öffentliche Produktanfragen (Public Bot)**  
   - Ein **KI-gestützter Assistent**, der **nicht angemeldeten Benutzern** Produktinformationen bereitstellt.  
   - Besucher erhalten Auskunft über **Produktnamen, Beschreibungen, Preise und Verfügbarkeit**, ohne sich registrieren oder anmelden zu müssen.  

2. **Teil 2: Personalisierte Bestellinformationen für Kunden (Kunden-Bot)**  
   - Ein **KI-gestützter Assistent**, der **angemeldeten Kunden** detaillierte Informationen zu ihren **Bestellungen und Bestellstatus** bereitstellt.  
   - Die KI greift auf **kundenbezogene Daten** zu, wie z. B. **Bestelldatum, Gesamtbetrag, enthaltene Artikel und Kreditlimit**.  

Im ersten Teil des Tutorials konzentrieren wir uns auf die Umsetzung des **Public Bots**, mit dem **nicht angemeldete Nutzer** durch eine KI-Produktauskunft Informationen zu Artikeln abrufen können. Im zweiten Teil wird ein **kundenindividueller Bestellassistent** implementiert, der nur für angemeldete Benutzer relevante Bestelldetails bereitstellt.  







## <a name="schritt-sql-workshop-json"></a>Schritt 1: SQL Workshop öffnen und JSON-Daten vorbereiten

Um JSON-Daten in Oracle APEX zu verwenden, müssen wir zunächst eine JSON-Spalte in der `CUSTOMERS`-Tabelle erstellen und Daten einfügen.

### 1. SQL Workshop öffnen
1. Navigiere in **Oracle APEX** zum **SQL Workshop**.
2. Klicke auf **SQL Commands**, um eine neue SQL-Abfrage einzugeben.

### 2. SQL-Befehle vorbereiten und ausführen
Füge die folgenden SQL-Befehle in das SQL Commands-Fenster ein und führe die ersten beiden Befehle aus:

#### **Befehl 1: JSON-Spalte zur Tabelle hinzufügen**
```sql
ALTER TABLE CUSTOMERS ADD (CTMR_JSON_DATA CLOB CHECK (CTMR_JSON_DATA IS JSON));  -- 1
```
Dieser Befehl fügt eine neue Spalte `CTMR_JSON_DATA` zur `CUSTOMERS`-Tabelle hinzu, die JSON-Daten speichert.

#### **Befehl 2: JSON-Daten generieren und einfügen**
```sql
UPDATE CUSTOMERS                                                                 -- 2
SET CTMR_JSON_DATA = JSON_OBJECT(
    'customer_id' VALUE CTMR_ID,
    'first_name' VALUE CTMR_FRST_NAME,
    'last_name' VALUE CTMR_LAST_NAME,
    'address' VALUE JSON_OBJECT(
        'street' VALUE CTMR_STREET_ADDRESS1,
        'city' VALUE CTMR_CITY,
        'state' VALUE CTMR_STATE,
        'postal_code' VALUE CTMR_POSTAL_CODE
    )
) ;
```
Dieser Befehl generiert JSON-Daten aus den vorhandenen Spalten der `CUSTOMERS`-Tabelle und speichert sie in `CTMR_JSON_DATA`.

#### **Befehl 3: JSON-Daten anzeigen**
```sql
select CTMR_JSON_DATA from CUSTOMERS;                                            -- 3
```
Hiermit können wir überprüfen, ob die Daten erfolgreich gespeichert wurden.

#### **Befehl 4: JSON-Werte extrahieren**
```sql
SELECT 
    JSON_VALUE(CTMR_JSON_DATA, '$.first_name') AS first_name,                    -- 4
    JSON_VALUE(CTMR_JSON_DATA, '$.address.city') AS city
FROM CUSTOMERS;
```
Dieser Befehl extrahiert gezielt JSON-Werte aus der `CTMR_JSON_DATA`-Spalte.

### 3. SQL-Befehle ausführen
1. Füge die **Befehle 1 und 2** in das **SQL Commands**-Fenster ein.
2. Klicke auf **Run**, um sie auszuführen.
3. Danach kannst du die **Befehle 3 und 4** ausführen, um die Ergebnisse zu überprüfen.

![](../../assets/json_1.jpeg)

 