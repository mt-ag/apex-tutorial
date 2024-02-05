# 21. APEX Workflow

Mit APEX 23.2 werden Workflows direkt in APEX integriert. Mit **APEX Workflow** lassen sich Business-Prozesse mittels der grafischen Spezifikationssprache **Busines Process Model and Notation (BPMN)** darstellen und ausführen. Workflows basiert auf der Erweiterung **Flows for APEX** zu der Sie weitere Informationen unter dem Link https://flowsforapex.org/ erhalten. 

In dem folgenden Kapitel nutzen wir Workflows um eine Demoversion einer vereinfachten Reservierung eines Restauranttisches zu erstellen. Die Demo lehnt sich an den Blog-Beitrag **Simplify Business Process Management Using APEX Workflow** von Ananya Chatterjee an.

## 21.1. Ausgangspunkt Use Case und Flow-Chart

Als Ausgangspunkt für die Aufgabe in diesem Kapitel nehmen wir an, dass ein Restaurant ein einfaches Buchungsformular über die Website realisieren möchte. In dem Formular können Gäste eine Reservierungsanfrage für einen Tisch übermitteln. Es wird im nächsten Schritt zunächst vom System geprüft, ob zu dem gewünschten Zeitraum ein Tisch für die gewünschte Anzahl an Personen frei ist. Falls nicht, kommt es sofort zu einer E-Mail an den Gast mit einer Absage des Termins. Wenn ein Tisch frei ist, wird die Anfrage an einen Restaurant-Mitarbeitenden übergeben. Der Mitarbeitende entscheidet, ob die Reservierung angenommen wird. Wird sie abgelehnt, erfolgt wieder eine Absage per E-Mail, wird sie angenommen, wird die Reservierung gespeichert und der Gast über die erfolgreiche Reservierung per E-Mail informiert. 

- Im folgenden **Flow-Chart** wird dieser Use Case visualisiert.

![](../../assets/Kapitel-21/APEX_Workflows_01.png)

## 21.2. Einrichtung der benötigten Elemente

- Installieren Sie die beigefügten Skripts **install_workflow_tables.sql**, **install_workflow_package_specification.sql** und **install_workflow_package_body.sql** über den **SQL Workshop** in APEX.

- Erstellen Sie dann eine neue APP über den **App Builder** und **Create**. Geben Sie der App den Titel **MT Tutorial - Dinner Reservation**. 

![](../../assets/Kapitel-21/APEX_Workflows_02.jpg)

- Für die APP benötigen Sie einen Nutzer mit dem Namen **KOCH**, der später für die Bearbeitung der Reservierungsanfragen zuständig sein soll. Legen Sie einen entsprechenden Nutzer an.

- Klicken Sie dazu oben rechts auf das **Administration** Icon und wählen dort den Eintrag **Manage Users and Groups**.

- Klicken Sie hier auf **Create User**.

- Geben Sie hier folgendes ein:
  - Name: KOCH
  - Email Address: test@abc.com
  - Password: 12345678
  - Confirm Password: 12345678
  - Require Change of Password on First Use: No

## 21.3. Erstellen des Workflows

- Im nächsten Schritt geht es an die eigentliche Arbeitsaufgabe. Dazu erstellen wir zunächst einen **Workflow**.

- Wechseln Sie dazu wieder in den **Application Builder** der neuen App und klicken Sie auf **Shared Components**.

![](../../assets/Kapitel-21/APEX_Workflows_03.jpg)

- In den Shared Components wählen Sie **Workflows** im Punkt **Workflows and Automations**. 

![](../../assets/Kapitel-21/APEX_Workflows_04.jpg)

- Erstellen Sie hier einen neuen Workflow, indem Sie auf **Create** klicken. Sie werden anschließend zum **Workflow Editor** weitergeleitet. Ein erster Grundsätzlicher Workflow ist bereits mittig im **Diagram Builder** zu sehen.

![](../../assets/Kapitel-21/APEX_Workflows_05.jpg)

- Setzen Sie den Namen des Workflows auf **Dinner Reservation** und die **Static ID** auf **DINNERRSVRT**. Den Title legen Sie fest auf: **Workflow for Guest &GUEST_NAME. &GUEST_LAST_NAME.**. 

![](../../assets/Kapitel-21/APEX_Workflows_06.jpg)

- Legen Sie die **Workflow Version** auf **1.0** fest.

![](../../assets/Kapitel-21/APEX_Workflows_07.jpg)

- Derzeit kommt es noch zu einem Fehler, weil die automatisch angelegte Aktivität noch nicht festgelegt wurde. Um Speichern zu können, löschen Sie die Aktivität. Klicken Sie dazu mit einem Rechtsklick auf die **Activity** in der linken Spalte und wählen Sie **Delete**. Alternativ können Sie auch die Aktivität im Editor auswählen und auf das Symbol mit den drei Punkten klicken. 

![](../../assets/Kapitel-21/APEX_Workflows_08.jpg)

- Es bleiben der **Start der Aktivität**, der **Pfeil** und der **Endpunkt** übrig. Ziehen Sie die **Pfeilspitze** im Editor auf den **Endpunkt** und dann speichern Sie.

![](../../assets/Kapitel-21/APEX_Workflows_09.jpg)

- Im nächsten Schritt erstellen Sie eine Reihe von **Input-Parametern**, die dem Wokflow als Daten bereitgestellt werden. Klicken Sie dazu mit rechts auf den Workflow und wählen Sie **Create Parameter**. 

![](../../assets/Kapitel-21/APEX_Workflows_10.jpg)

- Geben Sie dem ersten Parameter die **Static ID: GUEST_NAME**, das **Label: Guest Name**. Es handelt sich dabei um den **Data Type: VARCHAR2**. 

![](../../assets/Kapitel-21/APEX_Workflows_11.jpg)

- Legen Sie die folgenden weiteren Parameter an: 

  | | |  
  |--|--|
  | **GUEST_LAST_NAME** | *VARCHAR2*|
  | **GUEST_EMAIL** | *VARCHAR2* | 
  | **GUEST_COUNT** | *NUMBER*|  
  | **REQUEST_START_DATE** | *TIMESTAMP*|
  | **REQUEST_END_DATE** | *TIMESTAMP*|
  | | |

- Die Parameter **REQUEST_START_DATE** und **REQUEST_END_DATE** erhalten die Formatmaske **DD.MM.YYYY HH24:MI** unter **Session State Format Mask**.

![](../../assets/Kapitel-21/APEX_Workflows_12.jpg)

- Nun verknüpfen Sie im Workflow 1.0 unter **Additional Data** die Tabelle **T_RESTAURANT_STAFF**. Dies stellt später sicher, dass die erstellen Aufgaben (Tasks) entsprechenden Bearbeitenden zugeordnet werden können. Daneben stehen dadurch die Spalten der Tabelle als Bindvariablen für den Workflow zur Verfügung. Wählen Sie als **Primary Key Column** die Spalte **ID**.

![](../../assets/Kapitel-21/APEX_Workflows_13.jpg)

- Neben den Input-Parametern braucht brauchen Sie in dem Workflow auch veränderliche Variablen, die im Prozess genutzt werden können. Dazu erstellen Sie im nächsten Schritt **Workflow Variables**. Dazu rechtsklicken Sie wieder auf den Workflow 1.0 und wähle **Create Variable**.

![](../../assets/Kapitel-21/APEX_Workflows_14.jpg)

- Geben Sie der erste Variable die **Static ID: RESERVATION_ID** und das **Label: Reservation ID**. Der **Data Type** ist **NUMBER**. Der Variable wird erst zu einem späteren Zeitpunkt ein Wert zugewiesen, der **Value** ist deshalb zunächst **Null**.

![](../../assets/Kapitel-21/APEX_Workflows_15.jpg)

- Legen Sie die nun die Variable **TABLE_ID** nach dem gleichen Schema an: **Static ID: TABLE_ID**, **Label: Table ID** und **Data Type** ist **NUMBER**. Auch hier setzen Sie **Value** auf **Null**.

![](../../assets/Kapitel-21/APEX_Workflows_16.jpg)

- Als nächste Variable erstellen Sie **AVAILABILITY**. Sie ist vom Typ **BOOLEAN**. Unter **True Value** tragen Sie **AVAIL** ein und unter **False Value** darunter **UNAVAIL**. Dies sind die beiden möglichen Rückgabewerte einer Funktion, die später in den Workflow eingebunden wird. Danach speichern Sie den Workflow üner **Save**.

![](../../assets/Kapitel-21/APEX_Workflows_17.jpg)

- Im nächsten Schritt erstellen Sie den Task zu Bestätigung (oder Ablehnung) der Reservierungsanfrage. Wechseln Sie dazu in die **Shared Components** und zu den **Task Definitions**. Klicken Sie auf **Create** um einen neuen Task zu erstellen.

![](../../assets/Kapitel-21/APEX_Workflows_18.jpg)

- Im Dialogfenster zum Erstellen der **Task Definition** geben Sie der Task den Namen **Reservation Request** und das **Subject: Reservation for Guest &GUEST_NAME. &GUEST_LAST_NAME.**. Die **Static ID** lautet **RESERVATION REQUEST**. Klicken Sie danach auf **Create**.

![](../../assets/Kapitel-21/APEX_Workflows_19.jpg)

- Im nächsten Schritt setzen Sie die **Action Source** auf **SQL Query**. In das Feld für die Query tragen Sie die folgende Query ein:

```sql
  select * from t_restaurant_staff where id = :APEX$TASK_PK
  ```

![](../../assets/Kapitel-21/APEX_Workflows_20.jpg)

- Erstellen Sie eine neue Zeile in der Tabelle **Participants**. Der **Participant Type** ist **Potential Owner**, der **Value Type** ist **Expression** und der **Value** ist **:NAME**. Dies bezieht sich auf die entsprechende Spalte in der Mitarbeitertabelle **T_RESTAURANT_STAFF** die dadurch jeweils Tasks bearbeiten dürfen.

![](../../assets/Kapitel-21/APEX_Workflows_21.jpg)

- Auch für den Task werden **Parameter** bereitgestellt. Fügen Sie jeweils die folgenden Reihen zur Parameter-Tabelle hinzu:

  | | | |  
  |--|--|--|
  | **NAME_GUEST** | Name Guest | *Sting*|
  | **LAST_NAME_GUEST** | Last Name Guest | *Sting*| 
  | **COUNT_GUEST** | Count Guest | *Sting*|  
  | **RESERVATION_DATE_START** | Reservation Date Start | *Sting*|
  | **RESERVATION_DATE_END** | Reservation Date End | *Sting*|
  | | | |

![](../../assets/Kapitel-21/APEX_Workflows_22.jpg)

- Bestätigen Sie die Ergänzungen an der Task über den Button **Apply Changes**.

- Im nächsten Schritt geht es mit der Arbeit am Workflow weiter. Wechseln Sie dafür wieder in die **Workflows** in den **Shared Components** und klicken Sie auf **Dinner Reservation**. 

![](../../assets/Kapitel-21/APEX_Workflows_23.jpg)