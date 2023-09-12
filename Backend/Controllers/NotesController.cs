using Backend.Data;
using Backend.Entities;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly NotesRepository _notesRepository;

        public NotesController(NotesRepository notesRepository)
        {
            _notesRepository = notesRepository;
        }

        // GET: api/Notes
        [HttpGet]
        public ActionResult<IEnumerable<Note>> GetNotes()
        {
            var notes = _notesRepository.GetAllNotes();
            return Ok(notes);
        }

        // GET: api/Notes/5
        [HttpGet("{id}")]
        public ActionResult<Note> GetNote(int id)
        {
            var note = _notesRepository.GetNoteById(id);

            if (note == null)
            {
                return NotFound("Nota no encontrada");
            }

            return Ok(note);
        }

        // POST: api/Notes
        [HttpPost]
        public ActionResult<Note> AddNote([FromBody] Note note)
        {
            _notesRepository.InsertNote(note);
            return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
        }

        // PUT: api/Notes/5
        [HttpPut("{id}")]
        public IActionResult UpdateNote(int id, [FromBody] Note note)
        {
            var existingNote = _notesRepository.GetNoteById(id);

            if (existingNote == null)
            {
                return NotFound("Nota no encontrada");
            }

            existingNote.Categoria = note.Categoria;
            existingNote.Titulo = note.Titulo;
            existingNote.Texto = note.Texto;
            existingNote.Estado = note.Estado;

            _notesRepository.UpdateNote(existingNote);

            return NoContent();
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public IActionResult DeleteNote(int id)
        {
            _notesRepository.DeleteNote(id);

            return Ok();
        }

      
    }
}
