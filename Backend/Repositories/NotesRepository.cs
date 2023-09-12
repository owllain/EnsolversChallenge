using System.Collections.Generic;
using System.Linq;
using Backend.Data;
using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class NotesRepository
    {
        private readonly NotesDbContext _context;

        public NotesRepository(NotesDbContext context)
        {
            _context = context;
        }

        public List<Note> GetAllNotes()
        {
            return _context.Notes.ToList();
        }

        public Note GetNoteById(int id)
        {
            return _context.Notes.FirstOrDefault(n => n.Id == id);
        }

        public void InsertNote(Note note)
        {
            _context.Notes.Add(note);
            _context.SaveChanges();
        }

        public void UpdateNote(Note note)
        {
            _context.Entry(note).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void DeleteNote(int id)
        {
            var noteToDelete = _context.Notes.FirstOrDefault(n => n.Id == id);
            if (noteToDelete != null)
            {
                _context.Notes.Remove(noteToDelete);
                _context.SaveChanges();
            }
        }
    }
}
