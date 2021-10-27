
# Clínica Online

Se puede probar el funcionamiento en: https://clinicaonlinebustosgilfelipe.herokuapp.com/
#
## Al ingresar a la clinica se encontrará con la bienvenida:
![Alt text](./src/assets/screenshots/bienvenido.png?raw=true)
Esta le indicará sobre la barra superior, que a partir de los botones en ella se accederá a las diferentes secciones de la clínica.

#
## Secciones:
### Login
Si desea logearse hará click sobre Login en la barra superior

![Alt text](./src/assets/screenshots/loginBoton.png?raw=true)

Una vez hecho esto le mostrará el siguiente formulario

![Alt text](./src/assets/screenshots/loginForm.png?raw=true)

Una vez logeado podrá acceder a ciertas secciones de la clinica dependiendo si es administrador, paciente o especialista, Pero eso se detallará más adelante.
### Registro
En esta sección se podrá registrar a un paciente o a un especialista, para eso antes de completar el form tendrá dos botones, que según cual toque registrará uno u otro.

![Alt text](./src/assets/screenshots/registroBotones.png?raw=true)

Si seleccionó paciente le mostrara el siguiente formulario

![Alt text](./src/assets/screenshots/registroPaciente.png?raw=true)

Si seleccionó especialista le mostrará el siguiente formulario.

![Alt text](./src/assets/screenshots/registroEspecialista.png?raw=true)

En ambos para poder registrar van a tener que completar el capcha correctamente, esto se lo indicará el tilde o la cruz a la derecha del campo.
### Solicitar turno
A esta seccion solo puede ingresar un administrador o un paciente.
Esto lo llevará a una página en al que primero debera elegir si quiere buscar por especialidad o por especialista, todo esto suponiendo que usted no sea administrador, porque si lo fuera debería primero seleccionar el paciente del turno a partir del boton Pacientes que desplegará una lista con los pacientes.

![Alt text](./src/assets/screenshots/solicitarTurnoAdministrador.png?raw=true)

Ahora si usted es paciente tendrá dos botones uno con especialidades que le cargará una lista con todas las especialidades de la clínica y según que especialidad seleccione le cargará una lista de especialistas que tengan esa especialidad.
Si selecciona buscar por especialista le cargará una lista de especialistas mostrandose varias veces pero con sus diferentes especialidades.

![Alt text](./src/assets/screenshots/solicitarTurnoPaciente.png?raw=true)

### Perfil
Para acceder a esta sección debe hacer click en su nombre y apellido en al esquina superior derecha.

![Alt text](./src/assets/screenshots/perfilBoton.png?raw=true)

Esto le mostrará dos botones uno Mi Perfil que lo llevará a una página donde verá sus datos, en la cuál si es especialista podrá cargar sus horarios de atención. Y el otro dirá turnos si administrador o mis turnos si es paciente o especialista.
### Turnos
A esta sección solo podrá acceder un administrador en la que vera todos los turnos de la clínica y podrá buscar por nombre del especialista y/o por especialidad.
Es esta sección el administrador podrá cancelar turnos, para hacer eso deberá dejar un comentario con el motivo de la cancelación o ver la encuesta completada por el paciente.
### Mis turnos
A esta sección solo podrá acceder un paciente o un especialista. Aqui se listaran sus turnos, y podran buscar por especialista y/o especialidad, si es apciente, y si es especialista por especialidad y/o paciente.
Si es paciente podrá cancelar un turno, ver la reseña, calificar la atención del especialista o completar una encuesta sobre el servicio.
Si es especialista podrá cancelar un turno, rechazarlo, realizarlo, aceptarlo o ver la reseña.
### Usuarios
A esta sección solo tendrá acceso un administrador, en ella se mostraran a los pacientes, especialistas y administradores registrados dependiendo que boton seleccione. Si desea ver los administradores, a parte de ver la lista, tendrá la opción de registrar uno.

![Alt text](./src/assets/screenshots/usuariosBotones.png?raw=true)