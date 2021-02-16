# Weather widget

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn jest`

##

Hice este proyecto en ReactJs + Typescript, usando Create React App. Usé Jest y React testing library para testear y styled components para los estilos de los componentes.
Traté de mantener el proyecto lo mas ordenado/limpio posible, asi que separé las interfaces y los types de Typescript que usé en varios componentes en un archivo separado y aislé la lógica de la llamada a la API para pedir los datos del clima y el pronóstico en el hook de `useApi`. En este hook, si bien podría haberlo hecho con solo una, hice 2 llamadas a la API. Decidí esto porque leyendo la documentación de la API noté que,si bien tenía un endpoint del cual podía sacar toda la información que necesitaba (`/onecall`), sólo podía usar las coordenadas de la ciudad deseada como query param para hacer la request. Esto, de sólo hacer el Select, no hubiera sido un problema porque simplemente podría haber hardcodeado las coordenadas de las ciudades que elegí, pero como me interesaba tener también una barra de búsqueda en la que el usuario pudiera buscar la ciudad que quisiera, decidí buscarle otra vuelta. Decidí usar el endpoint de `/weather` que si bien sólo brinda el clima del día actual, ahi sí podía usar directamente el nombre de la ciudad como query param para fetchear la información que necesitaba y eso me solucionaba el tema de la barra de búsqueda, y luego sacar de la response de esa primera request los parametros que necesitaba (lon y lat) para buscar el resto del pronóstico en el endpoint de `/onecall`.
Otra cosa que hice es separar en una carpeta de `utils` las funciones con las que doy formato a las fechas y tambien las respuestas mockeadas que usé para testear las requests así los componentes no quedaban con tantas líneas que no hacían a la funcionalidad del componente en sí.
Una cosa que podría haber usado es Redux/Saga, pero me pareció innecesariamente complejo agregarlo siendo que es una app bastante pequeña en la que en definitiva sólo hay un estado que se utiliza.
Espero su feedback y que les haya gustado mi trabajo :D
