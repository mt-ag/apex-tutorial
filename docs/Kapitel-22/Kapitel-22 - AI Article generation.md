
# <a name="AI Integration"></a>22. Kapitel-22 - AI Artikelerstellung für den Webshop

In diesem Tutorial zeigen wir, wie man mit Hilfe von KI Artikel für einen Webshop generiert. Wir werden KI verwenden, um Folgendes für jedes Produkt zu generieren:

- **Article Name** 
- **Article Description** 
- **Article Price** 
- **Article Image (as URL)**

## 1. Create the View

```sql
CREATE VIEW TUTO_P0200_VW AS
SELECT AIGE_ID
     , AIGE_NAME
     , AIGE_DESCRIPTION
     , AIGE_PRICE
     , AIGE_URL
     , AIGE_IMAGE
     , AIGE_MIME_TYPE
  FROM AI_GENERATED_ARTICLE
;
```

1. Dann erstellen wir eine neue Seite mit **Cards**:

  
![](../../assets/Kapitel-22/AI_01.jpg)

## 2. Configure the Cards Layout

1. Erstelle die Seite mit der Nummer 200 und wähle die View `200` aus. Drücke **Next**:
  
![](../../assets/Kapitel-22/AI_02.jpg)

2. Auf der Seite wähle das **Grid** Layout für die Cards aus und definiere es wie folgt:
- **Title**: AIGE_NAME
- **Body**: AIGE_DESCRIPTION
- **Badge**: AIGE_PRICE

3. Dann drücke **Create Page**:
  
![](../../assets/Kapitel-22/AI_03.jpg)

## 3. Define a New Article Region

1. Erstelle eine neue Region mit dem Namen: **Define a new Article**:
  
![](../../assets/Kapitel-22/AI_04.jpg)

## 4. Create a Text Item and Button

1. Erstelle ein neues APEX **Text Item** mit dem Namen: `P200_NEW_ARTICLE`
  
![](../../assets/Kapitel-22/AI_05.jpg)

2. Erstelle einen neuen Button mit dem Namen: `P200_ADD_ARTICLE`
  
![](../../assets/Kapitel-22/AI_06.jpg)

3. Setze die folgenden Einstellungen für das Button-Aussehen:
  
![](../../assets/Kapitel-22/AI_07.jpg)

4. Speichere und öffne die Vorschau der Seite. Jetzt solltest du ein Sucheingabefeld und einen **Add** Button sehen, aber die **Card Report** Region ist leer. Das Ziel ist es, die Artikel über eine Funktion hinzuzufügen.
  
![](../../assets/Kapitel-22/AI_08.jpg)

## 5. Create a Package for AI Webshop

1. Als Nächstes erstellen wir ein Package, um die Funktionen und Prozeduren zur automatisierten Artikelerstellung zu speichern:
  
![](../../assets/Kapitel-22/AI_09.jpg)

### 5.1. Create the Package Specification

1. Hier ist der Code für die Specification, um die Funktionen und Prozeduren zu speichern:

```sql
create or replace PACKAGE AI_WEBSHOP AS

    -- Function to get a response from ChatGPT (returns text as CLOB)
    FUNCTION get_chatgpt_response(p_prompt IN VARCHAR2) 
    RETURN CLOB;

    -- Function to get an image URL from DALL·E (returns the image URL as VARCHAR2)
    FUNCTION get_dalle_image(p_prompt IN VARCHAR2) 
    RETURN VARCHAR2;

    -- Procedure to generate an article and store it in the database
    PROCEDURE generate_article(
        p_new_article IN VARCHAR2
    );

END AI_WEBSHOP;
/
```
2. Nachdem einfügen auf den Button "Save and Compile" drücken.
  
![](../../assets/Kapitel-22/AI_11.jpg)

### 5.2. Create the Package Body

1. Hier ist der Code für den Package Body:

```sql
create or replace PACKAGE BODY AI_WEBSHOP AS

    -- Function to get a response from ChatGPT (returns text as CLOB)
    FUNCTION get_chatgpt_response(p_prompt IN VARCHAR2) 
    RETURN CLOB
    IS
        l_response CLOB;
        l_url VARCHAR2(500) := 'https://api.openai.com/v1/chat/completions';
        l_body CLOB;
        l_chat_response CLOB; -- Variable to store the chat response
    BEGIN
        -- Set necessary headers for JSON Content-Type and Authorization
        apex_web_service.g_request_headers(1).name := 'Content-Type';
        apex_web_service.g_request_headers(1).value := 'application/json';
        apex_web_service.g_request_headers(2).name := 'Authorization';
        apex_web_service.g_request_headers(2).value := 'Bearer sk-proj-kOC3wyI3bqKQl2';
        
        -- Body for the POST request with the prompt, provided by the user
        l_body := '{
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": "' || p_prompt || '"}],
            "max_tokens": 100
        }';

        -- Execute the POST request
        l_response := apex_web_service.make_rest_request(
            p_url => l_url,
            p_http_method => 'POST',
            p_body => l_body
        );

        -- Parse the response using JSON_TABLE to extract the description
        FOR r IN (
            SELECT message_content
            FROM JSON_TABLE(
                l_response, '$'
                COLUMNS (
                    message_content CLOB PATH '$.choices[0].message.content'
                )
            )
        ) LOOP
            -- Store the chat response in the variable
            l_chat_response := r.message_content;
        END LOOP;

        -- Return the extracted response
        RETURN l_chat_response;

    EXCEPTION
        WHEN OTHERS THEN
            RETURN 'Error: ' || SQLERRM;
    END;


    -- Function to get an image URL from DALL·E (returns the image URL as VARCHAR2)
    FUNCTION get_dalle_image(p_prompt IN VARCHAR2) 
    RETURN VARCHAR2
    IS
        l_response CLOB;
        l_url VARCHAR2(500) := 'https://api.openai.com/v1/images/generations';
        l_body CLOB;
        l_image_url VARCHAR2(1000);  -- To store the image URL from the API response
        l_blob BLOB;                 -- To store the downloaded image as BLOB
    BEGIN
        -- Set necessary headers for JSON Content-Type and Authorization
        apex_web_service.g_request_headers(1).name := 'Content-Type';
        apex_web_service.g_request_headers(1).value := 'application/json';
        apex_web_service.g_request_headers(2).name := 'Authorization';
        apex_web_service.g_request_headers(2).value := 'Bearer sk-proj-kOC3wyI3bqKQl2';
        
        -- Body for the POST request with the prompt, provided by the user
        l_body := '{
            "prompt": "' || p_prompt || '",
            "n": 1,
            "size": "256x256"
        }';

        -- Execute the POST request to generate the image
        l_response := apex_web_service.make_rest_request(
            p_url => l_url,
            p_http_method => 'POST',
            p_body => l_body
        );

        -- Parse the response to extract the image URL
        FOR r IN (
            SELECT image_url
            FROM JSON_TABLE(
                l_response, '$'
                COLUMNS (
                    image_url VARCHAR2(1000) PATH '$.data[0].url'
                )
            )
        ) LOOP
            -- Store the image URL in the variable
            l_image_url := r.image_url;
        END LOOP;

        -- Return the URL containing the image
        RETURN l_image_url;

    EXCEPTION
        WHEN OTHERS THEN
            -- If an error occurs, return NULL or handle it accordingly
            RETURN NULL;
    END;


    -- Procedure to generate an article and store it in the database
    PROCEDURE generate_article(
        p_new_article IN VARCHAR2
    ) 
    IS
        v_article        CLOB;
        v_article_desc   CLOB;
        v_AIGE_URL       VARCHAR2(1000);
        v_AIGE_PRICE     CLOB;
        v_AIGE_PRICE_nr  NUMBER;
    BEGIN

        -- Get the article name from ChatGPT
        v_article := get_chatgpt_response(
            'I have an online shop. Please provide the perfect name for this product, limited to a maximum of 80 characters. The product is: ' || p_new_article
        );

        -- Get the article description from ChatGPT
        v_article_desc := get_chatgpt_response(
            'I have an online shop. Please provide the perfect description for this product, limited to a maximum of 4000 characters. The product is: ' || p_new_article
        );

        -- Get the image URL from DALL·E
        v_AIGE_URL := get_dalle_image(
            'I have an online shop. Please generate the perfect image for this product. The product is: ' || p_new_article
        );

        -- Get the price from ChatGPT
        v_AIGE_PRICE := get_chatgpt_response(
            'I have an online shop. Please provide the perfect price for this product as a number, formatted like 22.40 with no currency symbol. The product is: ' || p_new_article
        );


        -- Convert the price to a number
        v_AIGE_PRICE_nr := TO_NUMBER(v_AIGE_PRICE);

        -- Insert the generated article into the AI_GENERATED_ARTICLE table
        INSERT INTO AI_GENERATED_ARTICLE (AIGE_NAME, AIGE_DESCRIPTION, AIGE_URL, AIGE_PRICE)
        VALUES (v_article, v_article_desc, v_AIGE_URL, v_AIGE_PRICE_nr);

        -- Commit the transaction
        COMMIT;

        DBMS_OUTPUT.put_line('Article successfully generated and stored.');

    EXCEPTION
        WHEN OTHERS THEN
            DBMS_OUTPUT.put_line('Error: ' || SQLERRM);
            ROLLBACK;
    END generate_article;

END AI_WEBSHOP;
/
```
2. Nachdem einfügen auf den Button "Save and Compile" drücken.
  
![](../../assets/Kapitel-22/AI_12.jpg)

Zusammenfassung:
- **`get_chatgpt_response`** → Diese Funktion holt eine Antwort von der KI für den Artikelnamen und die Beschreibung.
- **`get_dalle_image`** → Diese Funktion holt eine URL für das KI-generierte Bild.
- **`generate_article`** → Diese Prozedur generiert den Artikel basierend auf dem Artikelnamen und speichert ihn in der Datenbank.

## 6. Create the Process for Adding an Article

1. Gehe nun zurück zum **Page Designer** auf Seite 200 und erstelle einen neuen Prozess mit den folgenden Einstellungen:
  
![](../../assets/Kapitel-22/AI_13.jpg)

2. Füge eine Erfolgsmeldung hinzu und setze den Prozess so, dass er nur ausgeführt wird, wenn der Button geklickt wird.
  
![](../../assets/Kapitel-22/AI_14.jpg)

## 7. Verify the `p_new_article` Parameter

1. Stelle sicher, dass der Parameter `p_new_article` korrekt mit dem Item verbunden ist. Ansonsten kann dies manuell erfolgen.
  
![](../../assets/Kapitel-22/AI_15.jpg)

## 8. Final Page Preview

1. Sobald die Benutzeroberfläche vollständig ist, sieht die Seite in etwa so aus. Du kannst nun einen Artikelnamen eingeben und auf den **Add Article** Button klicken.
  
![](../../assets/Kapitel-22/AI_16.jpg)

2. Nach ca. 5-10 Sekunden wird die KI den Artikel generieren, und du solltest den Artikel in der **Card** Ansicht sehen können, jedoch zunächst ohne Bild.
  
![](../../assets/Kapitel-22/AI_17.jpg)

## 9. Add the Image URL

1. Um das Bild als URL zu integrieren, setze folgende Einstellungen, speichere und lade die Seite neu.
  
![](../../assets/Kapitel-22/AI_18.jpg)

2. Jetzt kannst du weitere Artikel erstellen, und das Endergebnis sollte so aussehen:
  
![](../../assets/Kapitel-22/AI_19.jpg)
