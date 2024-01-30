sequenceDiagram
  participant user
  participant browser
  participant server

  loop
    user->>user: Type the note into 'input' field
  end
  user->>browser: Click on 'Save' to send the note
  
  browser->>server: POST /new-note
  activate server
  server-->>browser: 302 Redirect /exampleapp/notes
  deactivate server
  
  loop 
    browser->>browser: Reloads the page
  end
  activate browser
  browser->>user: Display new note at the end
  deactivate browser