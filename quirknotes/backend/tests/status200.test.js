test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
    const title = "NoteTitleTest";
    const content = "NoteTitleContent";
    
    const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        title: title,
        content: content,
        }),
    });
    

      for(let i = 0; i < 3; i++){
          const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify({
              title: title,
              content: content,
              }),
          });
      }
        
  })

  test("/deleteAllNotes - Delete three notes", async () => {
      const deleteAllNotesRes = await fetch(`http://localhost:4000/deleteAllNotes`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          },
      });

      const deleteAllNotesBody = await deleteAllNotesRes.json()

      expect(deleteAllNotesRes.status).toBe(200)
      expect(deleteAllNotesBody.response).toBe(`3 note(s) deleted.`)
  });
})

