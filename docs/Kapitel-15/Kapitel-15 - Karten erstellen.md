# 15. Karten erstellen 
In dieser Aufgabe werden Sie eine Anwendungsseite mit einer Weltkarte erstellen. Die nötigen Daten dafür erlangen wir über eine (in Kapitel 13.2 vorgestellte) REST Data Source.
Das Ziel ist es, alle Erdbeben auf der Erde, die in den letzten 24 Stunden stattfanden, auf einer Karte in APEX darzustellen.

## 15.1.	REST Data Source 
Um später die Erdbebendaten der Karte aktuell zu halten, richten Sie nun eine REST Data Source ein. Die detaillierten Schritte dieses Unterkapitels können Sie sich mit Screenshots bei Bedarf erneut in Kapitel 13.2 anschauen, im Folgenden werden die Schritte darum nur grob beschrieben.

Zu Beginn erstellen Sie im App-Builder eine neue Anwendung und nennen diese „Earthquakes“. Sie brauchen keine weiteren Einstellungen vorzunehmen. In der Anwendungsübersicht wählen Sie dann „Shared Components“ aus.

Dort angelangt klicken Sie unter der Kategorie „Data Sources“ die Option „REST Data Sources“ an.

Klicken Sie nun auf die „Create“ Schaltfläche, im Pop-Up Fenster lassen Sie die Auswahl bei „From Scratch“ und geben im nächsten Schritt als Name „EarthquakeData“ ein. Unter URL Endpoint fügen Sie folgende URL ein: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson.

Nun klicken Sie, ohne etwas zu verändern, so lange auf weiter, bis sich das Fenster wieder schließt und die REST Data Source erstellt wurde. 

Damit die Daten jeden Tag mit einer lokalen Tabelle aktualisiert werden, werden Sie nun eine Synchronisierung einrichten. Dazu wählen Sie die gerade erstellte REST Data Source aus. Klicken Sie jetzt auf das im Bild gezeigte Feld:

![](../../assets/Kapitel-15/Karten_01.jpg)

Nun ändern Sie bis auf den Namen nichts und tippen in dem Namensfeld „Table Name“ den Namen „EarthquakeData“ ein. Nachdem Sie zum Speichern auf „Save“ geklickt haben, werden Sie auf die im Bild zu sehenden Optionen stoßen. 
Klicken Sie auf das markierte Feld: 

![](../../assets/Kapitel-15/Karten_02.jpg)

Dadurch haben Sie nun eine Tabelle erstellt, in welche die Daten, die aus der zuvor eingegebenen URL abgerufen werden, zukünftig gespeichert werden. Jetzt stellen Sie die Synchronisierungszeiten der Daten ein. Dazu klicken Sie erneut auf die im nächsten Bild markierten Felder:

![](../../assets/Kapitel-15/Karten_03.jpg)

Nach dem Sie auf das zweite Feld geklickt haben, öffnet sich ein Pop-Up Fenster, in welchem Sie nun die Synchronisierung konfigurieren können. Da wir die Daten jeden Tag einmal auffrischen möchten, wählen Sie nun „daily“ aus. Die Felder „Execution Hour“ und „Execution Minute“ füllen Sie nun jeweils mit einer beliebigen Zeit auf. Nachdem Sie auf „Set Execution Interval“ geklickt haben, klicken Sie noch auf das Feld „Save and Run“, wodurch nun einmal die erstellte Tabelle mit Daten gefüllt wird. Jetzt wird die Tabelle jeden Tag aktualisiert.

Die Tabelle mitsamt der aktuellen Erdbebendaten ist nun im Object Browser vorzufinden.

 
## 15.2.	Erstellen der Karte auf einer neuen Anwendungsseite
Stellen Sie sicher, dass Sie nun auf die Anwendungsübersicht jener Anwendung navigieren, die Sie zu Beginn erstellt haben.

Dort wählen Sie „Create Page“.

Klicken Sie im geöffneten Pop-Up Fenster auf das **Map** und anschießend auf **Next**. 
  
![](../../assets/Kapitel-15/Karten_04.jpg)
 
In der daraufhin gezeigten Übersicht geben Sie einen beliebigen Seitennamen ein. Unter **„Local Database“** wählen Sie unter „Table / View Name“ die eben erstellte Tabelle **„EARTHQUAKEDATA“** aus. Deaktivieren Sie im Bereich Navigation die Breadcrumb und klicken auf **Next**. 

![](../../assets/Kapitel-15/Karten_05.jpg) 
 
In der nächsten Übersicht, können Sie zwischen unterschiedlichen Anzeigemöglichkeiten wählen, wie die Orte Dargestellt werden sollen. Da Sie dabei sind, eine Übersicht über Erdbeben zu erstellen, wählen Sie nun nicht „Points“, wodurch nur die Orte der Erdbeben markiert werden würden, sondern wählen Sie **„Heat Map“**, um den Ort und ein gewissen Eindruck des Ausmaßes später auf der Karte erkennen zu können. Nun müssen Sie nur noch von den dort angezeigten Auswahlmöglichkeiten das Feld „Geometry-Column“ ändern. Dort wählen Sie die Spalte **„Geometry“** aus. 

![](../../assets/Kapitel-15/Karten_06.jpg) 

Nachdem Sie auf **„Create Page“** geklickt haben, können Sie die Anwendung starten und auf die erstellte Seite navigieren.

Dort sehen Sie nun alle gespeicherten Erdbeben und bekommen einen Eindruck über das Ausmaß derer vermittelt.

![](../../assets/Kapitel-15/Karten_07.jpg)