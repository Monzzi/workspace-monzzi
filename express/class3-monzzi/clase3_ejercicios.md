# Clase 3 - Ejercicios 1 y 2
## Ejercicio 1.

**Revisar la documentación de los métodos del objeto response, en concreto de: download, json, redirect, render y sendStatus. ¿Qué devuelve cada uno?**

### Método: res.download

#### **res.download(path [, filename] [, options] [, fn])**

Este método permite transferir un archivo desde el servidor al cliente como un “attachment” (archivo adjunto). Esto significa que el navegador del cliente solicitará la descarga del archivo en lugar de abrirlo directamente.

Permite transferir archivos al cliente para que los descargue.
Puedes personalizar el nombre del archivo y configurar encabezados HTTP adicionales.
Maneja errores o eventos mediante un callback.

**Parámetros**

**path (obligatorio):**
- Es la ruta del archivo que se desea transferir.
- Si la ruta es relativa, estará basada en el directorio de trabajo actual del proceso o en la opción root si se proporciona.

Ejemplo:

``` javascript
res.download('./files/report.pdf');
```

**filename (opcional):**
- Permite especificar un nombre personalizado para el archivo que verá el cliente al descargarlo.
- Por defecto, el nombre será el mismo que el del archivo en el servidor.

Ejemplo:

``` javascript
res.download('./files/report.pdf', 'reporte_cliente.pdf');
```

**options (opcional):**
- Es un objeto con configuraciones avanzadas para personalizar el comportamiento del método.

Ejemplo:

``` javascript
res.download('./files/report.pdf', 'reporte_cliente.pdf', { headers: { 'X-Custom-Header': 'value' } });
```

**fn (opcional):**
- Es un callback que se ejecuta cuando:
    - La transferencia del archivo se completa.
    - Ocurre un error durante la transferencia.

Ejemplo con callback:

``` javascript
res.download('./files/report.pdf', 'reporte_cliente.pdf', function (err) {
  if (err) {
    console.error("Error al transferir el archivo:", err);
  } else {
    console.log("Descarga completada");
  }
});
```

### Método: res.json

#### **res.json([body])**

Es un método que envía una respuesta en formato JSON al cliente. Es muy útil para APIs que necesitan devolver datos estructurados.

**Qué hace:**
- Convierte el parámetro que recibe a una cadena JSON usando JSON.stringify().
- Establece automáticamente el encabezado Content-Type como application/json.

**Qué puedes enviar:**
Cualquier valor JSON válido:
- Objetos: { user: 'tobi' }
- Arreglos: [1, 2, 3]
- Valores primitivos: cadenas, números, true, false o null.

**Nota:** el ejemplo en app.js muestra la respuesta en la página, al usar res.json(), Express establece automáticamente el encabezado Content-Type: application/json, y el navegador muestra el contenido JSON como si fuera texto en pantalla.


### Método: res.redirect

#### **res.redirect([status,] path)**

Envía una respuesta HTTP que indica al cliente que debe redirigir a otra URL. Esta puede ser:

- Una URL absoluta: Redirigir a otro dominio (por ejemplo, http://google.com).
- Una ruta relativa al servidor actual: Cambiar de página dentro de tu aplicación (por ejemplo, /admin o ../login).

**Parámetros**

**status (opcional):**
- Es el código de estado HTTP de la redirección.
- Si no lo especificas, el código predeterminado es 302 Found (redirección temporal).
- Ejemplos:
- 301 (redirección permanente).
- 302 (redirección temporal).

**path (obligatorio):**
- Es la URL a la que se debe redirigir.
- Puede ser una:
- URL absoluta: http://example.com.
- Ruta relativa al servidor: /admin.
- Ruta relativa a la URL actual: ../login.

### Método: res.render

#### **res.render(view [, locals] [, callback])**

Renderiza una vista (archivo de plantilla o HTML) utilizando el motor de plantillas configurado en tu aplicación Express.
Devuelve el HTML generado y, por defecto, lo envía al cliente automáticamente.

**¿Qué devuelve res.render()?**

- Por defecto (sin callback):
- Renderiza la vista y envía el HTML generado como respuesta al cliente.

- Con un callback:
- Devuelve el HTML renderizado como una cadena de texto. El HTML generado no se envía automáticamente, debes enviarlo manualmente (usando, por ejemplo, res.send()).
- También devuelve un error (si ocurre alguno) que puedes manejar manualmente.

**Parámetros**
- view: Nombre del archivo de vista que se renderiza.
- locals: Variables locales que se pasan a la vista.
- callback: Si se especifica, devuelve tanto el posible error como el HTML renderizado, pero no envía automáticamente la respuesta.


### Método: res.sendStatus

#### **res.sendStatus(StatusCode)**

- Establece el código de estado HTTP de la respuesta.
- Envía un mensaje asociado al código de estado como cuerpo de la respuesta.

**Parámetros**

**statusCode (obligatorio):**
- Es el código de estado HTTP que deseas enviar.
- Debe estar dentro del rango válido (100-599).

## Ejercicio 2.

**Revisar las propiedades del objeto request**

### **¿Qué devuelven las propiedades hostname, ip, params y route en nuestro ejemplo de /book/:id?**

Accediendo a la ruta (localhost:3000/book/55), se devuelven en consola las siguientes propiedades:

``` Bash
req.params: { id: '55' }
req.route: Route {
  path: '/book/:id',
  stack: [ // pila de middleware y funciones que manejan la solicitud.
    Layer {
      handle: [Function (anonymous)],
      name: '<anonymous>',
      params: undefined,
      path: undefined,
      keys: [],
      regexp: /^\/?$/i,
      method: 'get'
    }
  ],
  methods: { get: true }
}
req.hostname: localhost
req.ip: ::ffff:127.0.0.1 // forma expandida.
```



