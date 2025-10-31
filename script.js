function simularPDA() {
  const cadena = document.getElementById("cadena").value.trim();
  const resultado = document.getElementById("resultado");
  const pilaDiv = document.getElementById("pila");
  pilaDiv.innerHTML = "";
  resultado.textContent = "";

  let pila = ["Z"]; // símbolo inicial de pila
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
      case "q0":
        if (simbolo === "a") pila.push("A");
        else if (simbolo === "b" && pila.includes("A")) estado = "q1", pila.push("B");
        else return (resultado.textContent = pasos + "\n❌ Cadena no aceptada.");
        break;

      case "q1":
        if (simbolo === "b") pila.push("B");
        else if (simbolo === "x") estado = "q2";
        else return (resultado.textContent = pasos + "\n❌ Cadena no aceptada.");
        break;

      case "q2":
        if (simbolo === "y") continue;
        else if (simbolo === "c") estado = "q4";
        else return (resultado.textContent = pasos + "\n❌ Cadena no aceptada.");
        break;

      case "q4":
        if (simbolo === "c" && tope === "B") pila.pop();
        else if (simbolo === "a" && tope === "A") estado = "q5", pila.pop();
        else return (resultado.textContent = pasos + "\n❌ Cadena no aceptada.");
        break;

      case "q5":
        if (simbolo === "a" && tope === "A") pila.pop();
        else return (resultado.textContent = pasos + "\n❌ Cadena no aceptada.");
        break;
    }

    mostrarPila();
    pasos += `( ${estado}, ${cadena.slice(i + 1)}, ${pila.join("")} )\n`;
  }

  if (estado === "q5" && pila.join("") === "Z") {
    resultado.textContent = pasos + "\n✅ Cadena aceptada por el PDA.";
  } else {
    resultado.textContent = pasos + "\n❌ Cadena no aceptada.";
  }
}
