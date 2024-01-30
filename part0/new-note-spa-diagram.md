sequenceDiagram
  participant user
  participant browser
  participant server

  user->>browser: Type note and click 'Save' button

  loop addingNote
    browser->>browser: prevent the default method to send the data
    browser->>browser: creates a new note and adds it to the notes list
  end

  browser->>user: re-renders the note list on the page

  browser->>server: POST send the new note to the server
  activate server
  server->>browser: 201 note created
  deactivate server