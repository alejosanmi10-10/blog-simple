import re

with open('frontend/src/components/Publicacion.vue', 'r') as f:
    content = f.read()

# Replace manejarEditar in Publicacion
old_edit = r'''const manejarEditar = \(\) => {
      const nuevoTitulo = prompt\("Edita el título de tu post:", props\.titulo\);
      if \(nuevoTitulo === null\) return;

      const nuevaCategoria = prompt\("Edita el programa/juego:", props\.categoria\);
      if \(nuevaCategoria === null\) return;

      const nuevoTexto = prompt\("Edita el texto:", props\.texto\);
      if \(nuevoTexto === null\) return;

      const nuevaImagenUrl = prompt\("Edita el enlace de la imagen \(opcional\):", props\.imagen_url\);
      if \(nuevaImagenUrl === null\) return;'''

new_edit = '''const manejarEditar = () => {
      const nuevoTitulo = prompt("Edita el título de tu post:", props.titulo);
      if (nuevoTitulo === null) return;

      const nuevaCategoria = prompt("Edita la serie:", props.categoria);
      if (nuevaCategoria === null) return;

      const nuevoTexto = prompt("Edita el texto:", props.texto);
      if (nuevoTexto === null) return;

      const nuevaImagenUrl = props.imagen_url;'''

content = re.sub(old_edit, new_edit, content)

with open('frontend/src/components/Publicacion.vue', 'w') as f:
    f.write(content)

