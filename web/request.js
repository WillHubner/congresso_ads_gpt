async function enviarPergunta() {
      const input = document.getElementById("perguntaInput");
      const btn = document.getElementById("enviarBtn");
      const respostaContainer = document.getElementById("respostaContainer");
      const respostaTexto = document.getElementById("respostaTexto");
      const tabelaContainer = document.getElementById("tabelaContainer");

      const pergunta = input.value.trim();
      if (!pergunta) return;

      btn.disabled = true;
      respostaTexto.textContent = "Carregando...";
      respostaContainer.style.display = "block";
      tabelaContainer.innerHTML = "";

      try {
        const response = await fetch("http://localhost:3000/pergunta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "message": pergunta })
        });

        const data = await response.json();

        respostaTexto.textContent = data.response || "Sem resposta.";

        if (data.resultados && Array.isArray(data.resultados)) {        
          let table = `<table><thead><tr>`;

          for (let chave in data.resultados[0]) {
              table +=`<th>${chave}</th>`;
            }   
            
          table += '</tr></thead><tbody>';

          data.resultados.forEach(item => {
            table +='<tr>';
            for (let chave in item) {
              table +=`<td>${item[chave]}</td>`;
            }
            table +='</tr>';            
          });
          table += `</tbody></table>`;
          tabelaContainer.innerHTML = table;
        }

      } catch (err) {
        respostaTexto.textContent = "Erro ao buscar resposta.";
        console.error(err);
      }

      btn.disabled = false;
    }