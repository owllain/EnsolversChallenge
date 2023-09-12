using System;
namespace Backend.Entities
{
    public class Note
    {
        public int Id { get; set; }
        public string Categoria { get; set; }
        public string Titulo { get; set; }
        public string Texto { get; set; }
        public string Estado { get; set; }
    }

}
