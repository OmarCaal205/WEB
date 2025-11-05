function simularPDA() {
  const cadena = document.getElementById("cadena").value.trim();
  const resultado = document.getElementById("resultado");
  const pilaDiv = document.getElementById("pila");
  pilaDiv.innerHTML = "";
  resultado.textContent = "";

  if (cadena === "") {
    resultado.textContent = "❌ Ingrese una cadena.";
    return;
  }

  let pila = ["Z"];
  let estado = "q0";
  let pasos = `Inicio: (q0, ${cadena}, Z)\n`;

  function mostrarPila() {
    pilaDiv.innerHTML = "";
    pila.forEach(simbolo => {
      const item = document.createElement("div");
      item.className = "pila-item";
      item.textContent = simbolo;
      pilaDiv.appendChild(item);
    });
  }

  mostrarPila();

  for (let i = 0; i < cadena.length; i++) {
    const simbolo = cadena[i];
    const tope = pila[pila.length - 1];
    pasos += `( ${estado}, ${cadena.slice(i)}, ${pila.join("")} ) ⊢ `;

    switch (estado) {
      case "q0": // leer aⁿ bᵐ
        if (simbolo === "a") {
          pila.push("A");
        } else if (simbolo === "b" && pila.includes("A")) {
          estado = "q1";
          pila.push("B");
        } else {
          return (resultado.textContent = pasos + "\n❌ Error en q0.");
        }
        break;

      case "q1": // leer bᵐ y luego x
        if (simbolo === "b") {
          pila.push("B");
        } else if (simbolo === "x") {
          estado = "q2";
        } else {
          return (resultado.textContent = pasos + "\n❌ Error en q1.");
        }
        break;

      case "q2": // leer y* o empezar cᵐ
        if (simbolo === "y") {
          // no cambia pila
        } else if (simbolo === "c" && pila.includes("B")) {
          estado = "q3";
          pila.pop(); // saca un B
        } else {
          return (resultado.textContent = pasos + "\n❌ Error en q2.");
        }
        break;

      case "q3": // leer cᵐ y luego aⁿ finales
        if (simbolo === "c" && pila.includes("B")) {
          pila.pop(); // saca B
        } else if (simbolo === "a" && pila.includes("A")) {
          estado = "q4";
          pila.pop(); // saca A
        } else {
          return (resultado.textContent = pasos + "\n❌ Error en q3.");
        }
        break;

      case "q4": // leer aⁿ finales
        if (simbolo === "a" && pila.includes("A")) {
          pila.pop();
        } else {
          return (resultado.textContent = pasos + "\n❌ Error en q4.");
        }
        break;
    }

    mostrarPila();
    pasos += `( ${estado}, ${cadena.slice(i + 1)}, ${pila.join("")} )\n`;
  }

  // ✅ Aceptación más flexible
  if ((estado === "q4" || estado === "q3") && (pila.join("") === "Z" || pila.join("") === "ZA")) {
    resultado.textContent = pasos + "\n✅ Cadena aceptada por el PDA.";
  } else {
    resultado.textContent = pasos + "\n❌ Cadena no aceptada (final incorrecto).";
  }
}

//ACTUALIZACION DE SCRIPT.JSFUNCIONAL


