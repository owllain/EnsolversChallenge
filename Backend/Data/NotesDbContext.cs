using Microsoft.EntityFrameworkCore;
using Backend.Entities;
using System.Collections.Generic;

namespace Backend.Data
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }
    }
}
