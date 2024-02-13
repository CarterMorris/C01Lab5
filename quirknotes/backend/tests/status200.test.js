test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

const SERVER_URL = "http://localhost:4000";

describe('generating note tests', () => {
    afterEach(async () => {
        await fetch(`http://localhost:4000/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
      })
    })

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
      
        const postNoteBody = await postNoteRes.json();
      
        expect(postNoteRes.status).toBe(200);
        expect(postNoteBody.response).toBe("Note added succesfully.");
      });

      test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
        const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
    
        const notes = await getAllNotesRes.json()
    
        expect(getAllNotesRes.status).toBe(200);
        expect(notes.response.length).toBe(0);
    });
      
    test("/getAllNotes - Return list of two notes for getAllNotes", async () => {
        const title = "NoteTitleTest1";
        const content = "NoteTitleContent1";
    
        const title2 = "NoteTitleTest2";
        const content2 = "NoteTitleContent2";
    
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
    
        const postNoteRes2 = await fetch(`${SERVER_URL}/postNote`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title: title2,
            content: content2,
            }),
        });
    
        const getAllNotesRes = await fetch(`${SERVER_URL}/getAllNotes`);
    
        const notes = await getAllNotesRes.json()
    
        expect(getAllNotesRes.status).toBe(200);
        expect(notes.response.length).toBe(2);
    });
})


describe('need one note all tests', () => {
    let noteID = ''

    beforeAll(async () => {
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

        const postNoteBody = await postNoteRes.json();
        noteID = postNoteBody.insertedId
    })

    afterAll(async () => {
        await fetch(`http://localhost:4000/deleteAllNotes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
      })
    })

    test("/patchNote - Patch with content and title", async () => {
        const note = {title: 'newTitle', content: 'newContent', _id: noteID}

        const patchNoteRes = await fetch(`http://localhost:4000/patchNote/${note._id}`,
            {method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: note.title, content: note.content}
        )})

        const patchNoteBody = await patchNoteRes.json()

        expect(patchNoteRes.status).toBe(200)
        expect(patchNoteBody.response).toBe(`Document with ID ${noteID} patched.`)
    });

    test("/patchNote - Patch with just title", async () => {
        const note = {title: 'newTitle', _id: noteID}

        const patchNoteRes = await fetch(`http://localhost:4000/patchNote/${note._id}`,
            {method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: note.title}
        )})

        const patchNoteBody = await patchNoteRes.json()

        expect(patchNoteRes.status).toBe(200)
        expect(patchNoteBody.response).toBe(`Document with ID ${noteID} patched.`)
    });

    test("/patchNote - Patch with just content", async () => {
        const note = {content: 'newContent', _id: noteID}

        const patchNoteRes = await fetch(`http://localhost:4000/patchNote/${note._id}`,
            {method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({content: note.content}
        )})

        const patchNoteBody = await patchNoteRes.json()

        expect(patchNoteRes.status).toBe(200)
        expect(patchNoteBody.response).toBe(`Document with ID ${noteID} patched.`)
    });

    test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
        const updateColorRes = await fetch(`http://localhost:4000/updateNoteColor/${noteID}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ color: '#FF0000' }),
        })

        const updateColorBody = await updateColorRes.json()

        expect(updateColorRes.status).toBe(200)
        expect(updateColorBody.response).toBe('Note color updated successfully.')
    });
})


describe('need one note each tests', () => {
    let noteID = ''

    beforeEach(async () => {
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

        const postNoteBody = await postNoteRes.json();
        noteID = postNoteBody.insertedId
    })

    test("/deleteNote - Delete a note", async () => {
        const deleteNoteRes = await fetch(`http://localhost:4000/deleteNote/${noteID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const deleteNoteBody = await deleteNoteRes.json()

        expect(deleteNoteRes.status).toBe(200)
        expect(deleteNoteBody.response).toBe(`Document with ID ${noteID} deleted.`)
    });

    test("/deleteAllNotes - Delete one note", async () => {
        const deleteAllNotesRes = await fetch(`http://localhost:4000/deleteAllNotes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const deleteAllNotesBody = await deleteAllNotesRes.json()

        expect(deleteAllNotesRes.status).toBe(200)
        expect(deleteAllNotesBody.response).toBe(`1 note(s) deleted.`)
    });
})


describe('need 3 notes', () => {
    beforeAll(async () => {
        const title = "NoteTitleTest";
        const content = "NoteTitleContent";
    
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




