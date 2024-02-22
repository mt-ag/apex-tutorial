# 17. <a name="application-search-suchregionen-und-suchkonfigurationen-erstellen"></a>Application Search: Suchregionen und Suchkonfigurationen erstellen

In dieser Aufgabe werden Sie eine Suchregion und Suchkonfigurationen erstellen, die in mehreren Datenquellen nach Ergebnissen sucht. Dazu benötigen Sie die in Kapitel 13 beschriebenen Kenntnisse.  

Ziel ist es, Ihren Benutzern eine leistungsstarke Funktion im Stil einer Suchmaschine zur Verfügung stellen, die in Minutenschnelle mehrere Datenquellen nach Ergebnissen durchsucht und diese in einer einzigen einheitlichen Suchergebnisregion anzeigt.  

## <a name="erstellen-eine-suchkonfiguration"></a>17.1 Erstellen eine Suchkonfiguration 

Diese neue gemeinsame Komponente definiert die zu durchsuchenden Datenquellen und die Anzeige der Ergebnisse. Die Suche kann auf lokalen Daten, APEX-Listen, REST-fähigen SQL-Services oder REST-Services basieren.  

In den folgenden zwei Beispielen wird die Suche einmal in den lokalen Daten und einmal mit einer REST-Datenquelle durchgeführt.  

### <a name="lokalen-daten-datenquelle"></a>17.1.1 Lokalen Daten Datenquelle

- Für die Bearbeitung dieser Aufgabe wird eine **View** benötigt.  

- Geben Sie Ihrer **View** den Namen ***TUTO_P0081_VW***:  
  Query:  
  ```sql
  select prdt_info_id,
         prdt_info_name,
         prdt_info_descr,
         prdt_info_category,
         prdt_info_avail,
         prdt_info_list_price,
         prdt_info_product_image,
         prdt_info_mimetype,
         prdt_info_filename,
         prdt_info_image_last_update,
         prdt_info_tags
    from product_info
  ```

- Öffnen Sie den **App Builder**, wählen Sie Ihre Anwendung (siehe Kapitel 2) und klicken Sie auf **Shared Components**.  

- Klicken Sie auf den Eintrag **Search Configurations** unter **Navigation and Search**.  

![](../../assets/Kapitel-17/search_config_01.jpg)  

- Klicken Sie auf **Create**.  

![](../../assets/Kapitel-17/search_config_02.jpg)  

- Geben Sie hier folgende Werte ein und klicken Sie auf **Next**:  

  | | |  
  |--|--|
  | **Name** | *Product_Search* | 
  | **Search Type** | *Standard*| 
  | | |

![](../../assets/Kapitel-17/search_config_03.jpg)  

- Wählen Sie hier folgende Werte aus klicken Sie dann auf **Next**:  

  | | |  
  |--|--|
  | **Data Source** | *Local Database* | 
  | **Source Type** | *Table*| 
  | **Table / View Name** | *TUTO_P0081_VW*| 
  | | |  

![](../../assets/Kapitel-17/search_config_04.jpg)  

- Wählen Sie hier folgende Werte aus, klicken Sie anschließend auf **Create Search Configuration**:  

  | | |  
  |--|--|
  | **Primary Key Column** | *PRDT_INFO_ID* | 
  | **Title Column** | *PRDT_INFO_NAME*| 
  | **Description Column** | *PRDT_INFO_DESCR*| 
  | **Icon Source** | *Initials*| 
  | | |  

![](../../assets/Kapitel-17/search_config_05.jpg)  

  Beachten Sie, dass die durchsuchbare(n) Spalte(n) varchar-Spalten sein müssen.  

![](../../assets/Kapitel-17/search_config_07.jpg)

  Das **Column Mapping** stellt die Spalten dar, die in der Benutzeroberfläche angezeigt werden:
  Eine Zahlenspalte (z.B. Spalte **PRDT_INFO_LIST_PRICE**) kann für die **Score Column** verwendet werden, die zur Bewertung des Suchergebnisses dient.  

![](../../assets/Kapitel-17/search_config_08.jpg)  

- Wählen Sie unter **Icon and Display** folgende Werte aus:  

  | | |  
  |--|--|
  | **Icon Source** | *Image BLOB Column* | 
  | **Icon BLOB Column Name** | *PRDT_INFO_PRODUCT_IMAGE*| 
  | **Icon Mime Type Column Name** | *PRDT_INFO_MIMETYPE*| 
  | | |  

  Weiter unten kann ebenfall eine **No Results Found Message** hinzugefügt werden.  

![](../../assets/Kapitel-17/search_config_09.jpg)  

- Klicken Sie abschließend den Button **Apply Changes** um die Änderungen zu speichern.  

![](../../assets/Kapitel-17/search_config_10.jpg)  
    
### <a name="suche-rest-datenquelle"></a>17.1.2 REST-Datenquelle

Über den in Kapitel 13 erstellten RESTful Service und die REST-Datenquelle erstellen wir eine Suchkonfiguration, die auf der REST-Datenquelle **Departments** basiert.  

- Klicken Sie auf **Shared Components**  

- Klicken Sie auf den Eintrag **Search Configurations** unter **Navigation and Search**.  

- Klicken Sie auf **Create**.  

- Geben Sie hier folgende Werte ein und klicken Sie auf **Next**:  

  | | |  
  |--|--|
  | **Name** | *Department_Search* | 
  | **Search Type** | *Standard*| 
  | | |  

![](../../assets/Kapitel-17/search_config_11.jpg)  

- Wählen Sie hier folgende Werte aus, dann klicken Sie auf **Next**:  

  | | |  
  |--|--|
  | **Data Source** | *REST Data Source* | 
  | **REST Data Source** | *Departments*| 
  | | |  

![](../../assets/Kapitel-17/search_config_12.jpg)  

- Wählen Sie hier folgende Werte aus. Anschließend klicken Sie auf **Create Search Configuration**:  

  | | |  
  |--|--|
  | **Primary Key Column** | *DEPT_ID* | 
  | **Title Column** | *DEPT_NAME*| 
  | **Description Column** | *DEPT_LOCATION*| 
  | **Icon Source** | *Icon Class*| 
  | **Icon CSS Classes** | *fa-sitemap*| 
  | | |  

![](../../assets/Kapitel-17/search_config_13.jpg)  

## <a name="suchkonfigurationen-in-der-anwendung-verwenden"></a>17.2 Suchkonfigurationen in der Anwendung verwenden  

Um die Suchkonfigurationen zu verwenden, erstellen Sie eine Seite, auf der die Suchergebnisse angezeigt werden und ein Suchfeld, in das Sie den Suchbegriff eingeben können.  

### <a name="suchseite-erstellen"></a>17.2.1 Suchseite erstellen 

- Im **App Builder** klicken Sie auf **Create Page**.  
- Wählen Sie den Seitentypen **Component** aus.  
- Wählen Sie den Bereichstypen **Search Page** aus.  

![](../../assets/Kapitel-17/search_config_14.jpg)  

- Geben Sie als **Page Number**: **81** ein und als **Page Name**: **My Search Results**. 
Eine Suchkonfigurationsliste ist bereits verfügbar. Wählen Sie die Suchkonfigurationen **Department_Search** und **Product_Search** aus. Die Seite kann mehrere Konfigurationen durchsuchen. 

- Unter **Navigation** schalten Sie **Use Breadcrumb** und **Use Navigation** aus und klicken Sie anschließend auf **Create Page**. Die Seite wird erstellt.  
  
![](../../assets/Kapitel-17/search_config_15.jpg)  

- Unter **Body** klicken Sie auf **Search Results** Region, und dann auf **Attributes**.  
- Geben Sie als **No Results Found Message** *No Results found* ein.  
- Klicken Sie auf **Save und Run Page**.  

![](../../assets/Kapitel-17/search_config_16.jpg)  

- Geben Sie **shoe** in das Suchfeld ein. Das Suchergebnis wird direkt auf der **My Search Results** Seite angezeigt.  

![](../../assets/Kapitel-17/search_config_17.jpg)  


## <a name="suchfeld-in-die-navigationsleiste-einbauen"></a>17.3 Suchfeld in die Navigationsleiste einbauen