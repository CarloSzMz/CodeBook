document.addEventListener("DOMContentLoaded", function () {
  var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
      lineNumbers: true,
      mode: "text/javascript",  
      lineWrapping: true
  });

  var languageSelect = document.getElementById("languageSelect");
  var outputElement = document.getElementById("output");

  var runCodeButton = document.getElementById("runCode");
  runCodeButton.addEventListener("click", function () {
      var code = editor.getValue();
      var selectedMode = languageSelect.value;

      if (selectedMode === "text/javascript") {
          // Si es JavaScript, ejecútalo directamente en el cliente
          // Redirige la salida de console.log temporalmente
          var originalLog = console.log;
          var output = "";
          console.log = function () {
              output += Array.from(arguments).join(' ') + "\n";
          };

          try {
              eval(code);
              outputElement.innerText = output.trim() || "undefined";
          } catch (error) {
              outputElement.innerText = "Error: " + error.message;
          } finally {
              // Restaura la función original de console.log
              console.log = originalLog;
          }
      } else if (selectedMode === "application/x-httpd-php") {
          // Si es PHP, envíalo al servidor para ser ejecutado
          fetch('../PHP/ejecutar.php', {
              method: 'POST',
              body: JSON.stringify({ code: code }),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          .then(response => response.text())
          .then(result => {
              outputElement.innerText = result;
          })
          .catch(error => {
              outputElement.innerText = "Error al ejecutar PHP: " + error.message;
          });
      }
  });
});