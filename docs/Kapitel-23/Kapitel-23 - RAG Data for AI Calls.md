# <a name="oracle-apex-und-ai"></a> 23. Oracle APEX und AI - RAG Daten
# <a name="testen-von-funktionen-oracle-apex-und-ai"></a>Bereitstellung von RAG-Daten für KI-Anrufe

In diesem Kapitel werden wir drei verschiedene Funktionen von AI in Kombination mit Oracle APEX testen. Dabei konzentrieren wir uns auf den Einsatz von KI-Bots in verschiedenen bereichen. z.b haben wir erstmal einen public bot, der auskunft über alle artikel an public user ausgibt.
dann werden wir einen weitere ki-bot erstellen, der bezogen auf den eingeloggten kunden bestellungsdetails auskunft ausgibt.
diese 2 szenarion werden wir hier durch gehen.

 

## <a name="schritt-zugriff-auf-den-app-builder"></a>Schritt 1: Zugriff auf den App Builder

Um mit der Erstellung des AI-Dienstes zu beginnen, navigieren Sie zunächst zum **App Builder**.

1. Klicken Sie im Hauptmenü auf **App Builder**.
2. Wählen Sie dann **Workspace Utilities**, um weitere Tools zu nutzen.

![](../../assets/Kapitel-23/ai_rag_1.jpeg)


## <a name="schritt-anlegen-einer-neuen-applikation"></a>Schritt 2: Anlegen einer neuen Applikation  

Nachdem Sie den **App Builder** aufgerufen haben, können Sie nun eine neue Applikation erstellen.  

1. Geben Sie einen Namen für die Applikation ein, beispielsweise **SmartStyle Shop**.  
2. Klicken Sie anschließend auf **Create Application**, um die Applikation zu erstellen.  

![](../../assets/Kapitel-23/ai_rag_2.jpeg)  


---

## <a name="schritt-zugriff-auf-shared-components"></a>Schritt 3: Zugriff auf Shared Components  

Nachdem die Applikation erfolgreich erstellt wurde, navigieren Sie zu den **Shared Components**, um weitere Einstellungen vorzunehmen.  

1. Öffnen Sie die erstellte Applikation.  
2. Klicken Sie im Menü auf **Shared Components**, wie im folgenden Bild dargestellt.  

![](../../assets/Kapitel-23/ai_rag_3.jpeg) 

---

## <a name="schritt-zugriff-auf-ai-services"></a>Schritt 4: Zugriff auf AI Services  

Sobald Sie die **Shared Components** geöffnet haben, scrollen Sie nach unten, bis Sie den Bereich **Generative AI** erreichen.  

1. Scrollen Sie nach unten, bis der Abschnitt **Generative AI** sichtbar ist.  
2. Wählen Sie anschließend **AI Services** aus.  

![](../../assets/Kapitel-23/ai_rag_4.jpeg)  

---

## <a name="schritt-erstellen-eines-neuen-ai-service"></a>Schritt 5: Erstellen eines neuen AI Service  

Nun können Sie einen neuen AI Service anlegen.  

1. Klicken Sie auf der rechten Seite auf den **Create**-Button.  

![](../../assets/Kapitel-23/ai_rag_5.jpeg)  

---

## <a name="schritt-konfiguration-des-ai-service"></a>Schritt 6: Konfiguration des AI Service  

In diesem Schritt müssen verschiedene Einstellungen vorgenommen werden. Zusätzlich benötigen Sie einen **API Key** des zuvor ausgewählten AI Service. In diesem Beispiel wird der AI Service von **OpenAI** verwendet.  

1. Wählen Sie unter **AI Provider** den gewünschten Anbieter aus, in diesem Fall **OpenAI**.  
2. Geben Sie einen **Namen** für den AI Service ein.  
3. Vergeben Sie eine **Static ID** für die Identifikation.  
4. Aktivieren Sie die Option **Used by App Builder**, falls der AI Service in der Anwendung genutzt werden soll.  
5. Tragen Sie die **Base URL** des Anbieters ein, hier: `https://api.openai.com/v1`.  
6. Wählen Sie unter **Credential** die Option **Create New** aus.  
7. Geben Sie den API Key ein, den Sie von OpenAI erhalten haben.  
8. Wählen Sie das **AI Model**, z. B. `gpt-4o`.  
9. Testen Sie die Verbindung, indem Sie auf **Test Connection** klicken.  
10. Wenn die Verbindung erfolgreich ist, erscheint die Meldung **Connection Succeeded!**.  
11. Abschließend klicken Sie auf **Create**, um den AI Service zu speichern.  

![](../../assets/Kapitel-23/ai_rag_6.jpeg)  

---

## <a name="schritt-erfolgreiche-erstellung-und rückkehr-zu-shared-components"></a>Schritt 7: Erfolgreiche Erstellung und Rückkehr zu Shared Components  

Nachdem der AI Service erfolgreich erstellt wurde, erscheint eine **Erfolgsmeldung** auf dem Bildschirm.  

1. Stellen Sie sicher, dass die Meldung **"Changes applied."** angezeigt wird, was bestätigt, dass der AI Service erfolgreich eingerichtet wurde.  
2. Klicken Sie auf das **Shared Components-Symbol**, um zurück zur Übersicht der Shared Components zu gelangen.  

![](../../assets/Kapitel-23/ai_rag_7.jpeg)  

---

## <a name="schritt-zugriff-auf-ai-configurations"></a>Schritt 8: Zugriff auf AI Configurations  

Anschließend scrollen Sie wieder nach unten, bis Sie den Abschnitt **Generative AI** erreichen.  

1. Scrollen Sie nach unten, bis der Bereich **Generative AI** sichtbar ist.  
2. Wählen Sie anschließend **AI Configurations** aus.  

![](../../assets/Kapitel-23/ai_rag_8.jpeg) 

---

## <a name="schritt-erstellen-einer-neuen-ai-configuration"></a>Schritt 9: Erstellen einer neuen AI Configuration  

Nun können Sie eine **AI Configuration** anlegen, um den generativen KI-Dienst weiter zu konfigurieren.  

1. Klicken Sie auf den **Create**-Button, um eine neue AI Configuration zu erstellen.  

![](../../assets/Kapitel-23/ai_rag_9.jpeg)  

---

## <a name="Konfigurieren-der-AI-Configuration"></a>Schritt 10: Konfigurieren der AI Configuration

In diesem Schritt legen Sie die Parameter für die **Generative AI Configuration** fest.

1. Geben Sie einen **Namen** für die Konfiguration ein:  
   **Produktauskunft für Besucher**  
   - Die **Static ID** wird automatisch generiert.

2. Wählen Sie den zuvor erstellten **AI Service** aus (hier: **OpenAI**).

3. Geben Sie den folgenden **System Prompt** ein:

>   Du bist "InfoBot", ein virtueller Assistent für SmartStyle Shop.  
>   Deine Aufgabe ist es, öffentlichen Nutzern Informationen zu unseren Artikeln bereitzustellen.  
>   Du hast Zugriff auf die Artikeldatenbank und kannst folgende Informationen abrufen:
>
>   - PRDT_INFO_NAME: Name des Artikels  
>   - PRDT_INFO_DESCR: Beschreibung des Artikels  
>   - PRDT_INFO_CATEGORY: Kategorie (z. B. Herrenmode, Damenmode)  
>   - PRDT_INFO_AVAIL: Verfügbarkeit (Y = verfügbar, N = nicht verfügbar)  
>   - PRDT_INFO_LIST_PRICE: Preis des Artikels  
>   - PRDT_INFO_TAGS: Zusätzliche Tags (z. B. Bestseller)  
>
>   Antwortverhalten:
>   1. Beantworte Anfragen zu Artikeln basierend auf den verfügbaren Daten.  
>   2. Falls ein Artikel nicht verfügbar ist, informiere den Nutzer höflich.  
>   3. Falls keine Daten gefunden werden, erkläre dem Nutzer, dass das Produkt möglicherweise nicht im Sortiment ist.  
>   4. Vermeide persönliche oder kundenbezogene Informationen – dein Fokus liegt ausschließlich auf den Produkten.  
>   5. Falls der Nutzer nach weiteren Details fragt, gib eine präzise Antwort auf Basis der Produktdaten.  
>
>   Beispielhafte Kundenanfragen & erwartete Antworten:
>
>   - "Welche Business-Hemden habt ihr?"  
>      Zeige alle Artikel mit PRDT_INFO_CATEGORY = 'Mens' und dem Wort "Shirt" im Namen.  
>
>   - "Wie teuer ist die Bluse?"  
>      Suche den Artikel "Blouse" in der Datenbank und gib den Preis zurück.  
>
>   - "Gibt es passende Hosen zu den Business-Shirts?"  
>      Falls in der Datenbank vorhanden, gib die passenden Hosen aus der Kategorie Mens zurück.  
>
>   - "Welche Artikel sind Bestseller?"  
>      Zeige alle Artikel mit dem Tag TOP SELLER in PRDT_INFO_TAGS.  
>
>   Verhalten bei Fehlern oder fehlenden Daten:
>   - Falls ein Artikel nicht gefunden wird, sage höflich, dass das Produkt aktuell nicht verfügbar ist.  
>   - Falls der Nutzer nach einem nicht existierenden Produkt fragt, erkläre, dass es nicht in unserem Sortiment ist.  
>
>   Du bist ein professioneller und hilfsbereiter Assistent. Stelle sicher, dass deine Antworten klar, korrekt und freundlich sind.

4. Geben Sie die folgende **Welcome Message** ein:

>   Willkommen bei SmartStyle Shop  
>   Ich bin InfoBot, dein virtueller Assistent für Produktinformationen.  
>   Ich kann dir helfen, Informationen zu unseren Artikeln zu finden, einschließlich Verfügbarkeit, Preis und Beschreibung.  
>   Wie kann ich dir heute helfen?  

5. Optional: Aktivieren Sie **Return To Page**, um nach dem Speichern zur vorherigen Seite zurückzukehren.

6. Klicken Sie auf **Create**, um die AI Configuration zu speichern.

![](../../assets/Kapitel-23/ai_rag_10.jpeg)

---

## <a name="schritt-erstellen-einer-rag-source"></a>Schritt 11: Erstellen einer RAG Source  

Nachdem Sie die **AI Configuration** gespeichert haben, wird die Option **RAG Sources** sichtbar. Nun können Sie eine **RAG Source** hinzufügen, um externe Datenquellen für die KI-Abfragen bereitzustellen.  

1. Scrollen Sie nach unten zum Abschnitt **RAG Sources**.  
2. Klicken Sie auf **Create RAG Source**, um eine neue Datenquelle hinzuzufügen.  

![](../../assets/Kapitel-23/ai_rag_11.jpeg)  

--- 


## <a name="schritt-rag-source-erstellen"></a>Schritt 12: RAG Source erstellen  

Nun wird eine **RAG Source** erstellt, die als Datenquelle für den KI-Dienst dient.  

1. Geben Sie einen **Namen** für die RAG Source ein, z. B. **Produktauskunft**.  
2. Wählen Sie als **Typ** die Option **SQL Query**.  
3. Geben Sie die folgende **SQL-Abfrage** ein, um relevante Produktinformationen aus der Datenbank abzurufen:  

  ```sql
  SELECT PRDT_INFO_NAME,
         PRDT_INFO_DESCR,
         PRDT_INFO_CATEGORY,
         PRDT_INFO_AVAIL,
         PRDT_INFO_LIST_PRICE,
         PRDT_INFO_TAGS
  FROM PRODUCT_INFO;
  ```

4. Klicken Sie auf **Create**, um die RAG Source zu speichern.

![](../../assets/Kapitel-23/ai_rag_12.jpeg)  

--- 

## <a name="schritt-änderungen-speichern-und-rag-source-bestätigen"></a>Schritt 13: Änderungen speichern und RAG Source bestätigen  

Nachdem die **RAG Source** erfolgreich erstellt wurde, kehren Sie automatisch zur **AI Configuration**-Seite zurück.  

1. Eine **Erfolgsmeldung** mit "Changes Saved" bestätigt, dass die Änderungen gespeichert wurden.  
2. Die neu erstellte **RAG Source** wird nun in der Liste angezeigt.  
3. Klicken Sie auf **Apply Changes**, um alle Änderungen zu übernehmen und die Konfiguration abzuschließen.  

![](../../assets/Kapitel-23/ai_rag_13.jpeg)  

---

## <a name="schritt-übersicht-der-ai-configurations-und-erstellen-einer-neuen"></a>Schritt 14: Übersicht der AI Configurations und Erstellen einer neuen  

Nachdem die erste **AI Configuration** erfolgreich erstellt wurde, gelangen Sie zurück zur Übersicht der **Generative AI Configurations**.  

1. Die aktuelle **AI Configuration** ist nun sichtbar.  
2. Die erstellte Konfiguration **"Produktauskunft für Besucher"** ist in der Liste aufgeführt.  
3. Klicken Sie auf **Create**, um eine weitere **AI Configuration** zu erstellen.  

![](../../assets/Kapitel-23/ai_rag_14.jpeg)  

---

## <a name="Erstellen-einer-neuen-AI-Configuration-für-Bestellauskünfte"></a>Schritt 15: Erstellen einer neuen AI Configuration für Bestellauskünfte
 
Im nächsten Schritt erstellen wir einen weiteren KI-Bot, der Bestellinformationen für den angemeldeten App-Nutzer bereitstellt.

1. Geben Sie den Namen **"Bestellungsauskunft für Kunden"** ein.
   - Die **Static ID** wird automatisch generiert.

2. Wählen Sie den zuvor erstellten **AI Service** (z. B. OpenAI).

3. Geben Sie den folgenden **System Prompt** ein:

>   Du bist "OrderBot", ein virtueller Assistent für SmartStyle Shop.  
>   Deine Aufgabe ist es, Bestellinformationen für einen bestimmten Kunden bereitzustellen.  
>   Du hast Zugriff auf Kundendaten und Bestellhistorie, um präzise Auskünfte zu geben.  
>
>   Daten, auf die du Zugriff hast:
>   - Kundeninformationen: Vorname, Nachname, Adresse, Stadt, Bundesstaat, Postleitzahl, Telefonnummer, Kreditlimit  
>   - Bestellungen: Gesamtbetrag, Bestelldatum, Tags  
>   - Bestellpositionen: Einzelpreise der Artikel, Anzahl der Artikel  
>   - Standortdaten: Bundesstaat-Code, Bundesstaat-Name  
>
>   Antwortverhalten:
>   1. Beantworte Anfragen zu einem bestimmten Kunden basierend auf den bereitgestellten Daten.  
>   2. Falls ein Kunde nach seinem Bestellstatus fragt, suche die relevanteste Bestellung.  
>   3. Falls nach spezifischen Artikeln innerhalb einer Bestellung gefragt wird, gib die Preise und Mengen aus.  
>   4. Falls die Kreditlimit-Information benötigt wird, stelle diese bereit.  
>   5. Falls keine Daten verfügbar sind, informiere den Nutzer höflich.  
>   6. Vermeide die Weitergabe von Daten anderer Kunden oder nicht vorhandene Informationen.  
>
>   Beispielhafte Kundenanfragen & erwartete Antworten:
>
>   - "Wie hoch war meine letzte Bestellung?"  
>      Suche den neuesten Eintrag in den Bestelldaten und gib den Gesamtbetrag zurück.  
>
>   - "Welche Artikel waren in meiner Bestellung vom 27.09.2016?"  
>      Gib die Liste der bestellten Artikel mit Preis und Menge aus.  
>
>   - "Wie hoch ist mein aktuelles Kreditlimit?"  
>      Suche die Kreditlimit-Information für den Kunden und gib den Betrag zurück.  
>
>   - "Welche Bestellungen habe ich in Illinois getätigt?"  
>      Filtere Bestellungen basierend auf dem Bundesstaat und gib die Ergebnisse aus.  
>
>   Verhalten bei Fehlern oder fehlenden Daten:
>   - Falls der Kunde eine ungültige Bestellnummer oder ein falsches Datum angibt, frage höflich nach einer gültigen Angabe.  
>   - Falls keine Bestellungen gefunden werden, erkläre dies und biete eine alternative Möglichkeit zur Überprüfung an (z. B. Kundenservice kontaktieren).  
>
>   Du bist ein professioneller und hilfsbereiter Assistent. Stelle sicher, dass deine Antworten klar, korrekt und freundlich sind.

4. Geben Sie die folgende **Welcome Message** ein:

>   Willkommen bei SmartStyle Shop.  
>   Ich bin OrderBot, dein virtueller Assistent für Bestellinformationen.  
>   Ich kann dir helfen, den Status deiner Bestellungen einzusehen, deine Artikelhistorie abzurufen oder dein Kreditlimit zu prüfen.  
>   Wie kann ich dir heute helfen?  

5. Aktivieren Sie die Option **Return To Page**, um nach dem Speichern zur vorherigen Seite zurückzukehren.

6. Klicken Sie auf **Create**, um die neue AI Configuration zu speichern.

![](../../assets/Kapitel-23/ai_rag_15.jpeg)  

---
 
## <a name="schritt-erfolgreiches-speichern-und-rag-source-erstellen"></a>Schritt 16: Erfolgreiches Speichern und RAG Source erstellen  

Nachdem die **AI Configuration** erfolgreich gespeichert wurde, erscheint die **Erfolgsmeldung** "Changes Saved".  

1. Die grüne **Erfolgsmeldung** bestätigt, dass die Änderungen gespeichert wurden.  
2. Nun können Sie eine **RAG Source** hinzufügen, indem Sie auf **Create RAG Source** klicken.  

![](../../assets/Kapitel-23/ai_rag_16.jpeg)  

---

## <a name="schritt-rag-source-für-bestellauskünfte-erstellen"></a>Schritt 17: RAG Source für Bestellauskünfte erstellen  

Nun wird eine **RAG Source** erstellt, die Bestellinformationen für den aktuell angemeldeten Nutzer abrufen kann.  

1. Geben Sie den **Namen** der RAG Source ein, z. B. **Bestellungsauskunft**.  
2. Wählen Sie als **Typ** die Option **SQL Query**.  
3. Geben Sie die folgende **SQL-Abfrage** ein, um Bestellungen des aktuellen Nutzers abzufragen:  

  ```sql
  SELECT *
  FROM CUSTOMERS
  JOIN ORDERS ON (CTMR_ID = ORDR_CTMR_ID)
  JOIN ORDER_ITEMS ON (ORDR_ID = ORDR_ITEM_ORDR_ID)
  JOIN STATES ON (STTS_ST = CTMR_STATE)
  WHERE LOWER(CTMR_FRST_NAME) = LOWER(:APP_USER)
  ```

![](../../assets/Kapitel-23/ai_rag_17.jpeg) 

4. Klicken Sie auf **Create**, um die RAG Source zu speichern.

---

## <a name="schritt-erfolgreiches-speichern-und-abschließen-der-rag-source"></a>Schritt 18: Erfolgreiches Speichern und Abschließen der RAG Source  

Nachdem die **RAG Source** erfolgreich erstellt wurde, erscheint eine **Erfolgsmeldung** und die neue Datenquelle wird in der Liste angezeigt.  

1. Die grüne **Erfolgsmeldung** "Changes Saved" bestätigt, dass die Änderungen gespeichert wurden.  
2. Die soeben erstellte **RAG Source** ist nun in der Übersicht sichtbar.  
3. Klicken Sie abschließend auf **Apply Changes**, um alle Änderungen zu übernehmen.  

![](../../assets/Kapitel-23/ai_rag_18.jpeg)  

---

## <a name="schritt-übersicht-der-erstellten-ai-configurations-und-wechsel-zur-app"></a>Schritt 19: Übersicht der erstellten AI Configurations und Wechsel zur App  

Nachdem beide **AI Configurations** erfolgreich erstellt wurden, erscheinen sie nun in der Übersicht.  

1. Die erstellten **AI Configurations** für **Bestellungsauskunft für Kunden** und **Produktauskunft für Besucher** sind in der Liste sichtbar.  
2. Jede Konfiguration enthält die zugehörige **RAG Source**, die zur Generierung der Antworten verwendet wird.  
3. Klicken Sie auf **Application **, um zur Haupt-App zurückzukehren und dort weiterzuarbeiten.  

![](../../assets/Kapitel-23/ai_rag_19.jpeg)  

---
