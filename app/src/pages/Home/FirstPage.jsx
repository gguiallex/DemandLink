import React, { useState, useEffect } from "react"
import "./FirstPage.css"
import { Chart } from "react-google-charts"
import { BiFile, BiUser } from "react-icons/bi"
import { fetchDemandasByUser } from "../../services/apiService"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import BotaoDemanda from "../../components/Botões/BotaoDemanda"

const FirstPage = ({ }) => {
  const [idUser, setIdUser] = useState(""); // id usuario
  const [novasDemandas, setNovasDemandas] = useState([]);
  const [demandasUrgentes, setDemandasUrgentes] = useState(0);
  const [demandasSemana, setDemandasSemana] = useState(0);
  const [demandasAtraso, setDemandasAtraso] = useState(0);
  const [demandasPorMes, setDemandasPorMes] = useState([]);

  useEffect(() => {
    const storedIdUser = localStorage.getItem("IdUsuario") || sessionStorage.getItem("IdUsuario");

    if (storedIdUser) setIdUser(storedIdUser);
  }, []);

  useEffect(() => {
    const carregarDemandas = async () => {
      try {
        if (idUser) {
          const demandas = await fetchDemandasByUser(idUser);
          // Ordena demandas pela data mais recente e seleciona as 3 primeiras
          const demandasRecentes = demandas
            .sort((a, b) => new Date(b.DataPedido) - new Date(a.DataPedido))
            .slice(0, 3);
          setNovasDemandas(demandasRecentes);

         // Calcular métricas
        const agora = new Date();
        const semanaPassada = new Date();
        semanaPassada.setDate(agora.getDate() - 7);

        const urgentes = demandas.filter((d) => d.urgencia.toLowerCase() === "alta");
        const semana = demandas.filter((d) => new Date(d.DataPedido) >= semanaPassada);
        const atrasadas = demandas.filter((d) => new Date(d.DataPrazo) < agora && d.status.toLowerCase() !== "concluída");

        setDemandasUrgentes(urgentes.length);
        setDemandasSemana(semana.length);
        setDemandasAtraso(atrasadas.length);

        // Determinar o semestre atual
        const dataAtual = new Date();
        const mesAtual = dataAtual.getMonth() + 1; // Janeiro = 0, então somamos 1
        const anoAtual = dataAtual.getFullYear();

        const semestreAtual = mesAtual <= 6 ? "primeiro" : "segundo";
        const mesesSemestre =
          semestreAtual === "primeiro" ? [1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12];

        // Filtrar demandas para o semestre atual
        const demandasSemestre = demandas.filter((demanda) => {
          const dataDemanda = new Date(demanda.DataPedido); // Converter para objeto Date
          const mesDemanda = dataDemanda.getMonth() + 1; // Extrair o mês (1 a 12)
          const anoDemanda = dataDemanda.getFullYear(); // Extrair o ano

          // Garantir que estamos no ano correto e no semestre correto
          return anoDemanda === anoAtual && mesesSemestre.includes(mesDemanda);
        });

        // Agrupar demandas por mês
        const demandasMensais = mesesSemestre.map((mes) => {
          const totalMes = demandasSemestre.filter(
            (demanda) => new Date(demanda.DataPedido).getMonth() + 1 === mes
          ).length;
          return [new Date(anoAtual, mes - 1).toLocaleString("default", { month: "short" }), totalMes];
        });

        const dadosGrafico = [["Meses", "Quantidade"], ...demandasMensais];
        setDemandasPorMes(dadosGrafico);

        console.log("Demandas por semestre:", dadosGrafico);
      }
    } catch (error) {
      console.error("Erro ao carregar demandas:", error);
    }
  };
  carregarDemandas();
}, [idUser]);

  const data = [
    ["Semanas", "Concluidas", "Atrasadas"],
    ["Seg", 480, 220],
    ["Ter", 320, 110],
    ["Qua", 310, 250],
    ["Qui", 480, 380],
    ["Sex", 150, 230],
    ["Sab", 390, 230],
    ["Dom", 390, 310],
  ];

  const diario = [
    ["Estado", "Quantidade"],
    ["Concluidas", 10],
    ["Em andamento", 12],
    ["Não iniciadas", 5],
    ["Em atraso", 8],
  ];

  const mes = [
    ["Meses", "Quantidade"],
    ["Jan", 30],
    ["Fev", 0],
    ["Mar", 0],
    ["Abr", 0],
    ["Mai", 0],
    ["Jun", 0],
  ];

  const options = {
    chart: {
      title: "Resumo Semanal",
    },
    colors: ["#10A064", "#C10707"], // Verde para concluídas, vermelho para atrasadas
    chartArea: {
      width: "80%",
      height: "70%",
    },
    hAxis: {
      title: "Quantidade",
      minValue: 0,
    },
    vAxis: {
      title: "Dias da Semana",
    },
  };

  const optionsDiario = {
    title: "Resumo Diario",
    slices: {
      0: { color: "#10A064" }, // Concluídas
      1: { color: "#1086A0" }, // Em andamento
      2: { color: "#57009B" }, // Não iniciadas
      3: { color: "#C10707" }, // Em atraso
    },
    chartArea: {
      width: "80%",
      height: "80%",
    },
  };

  const optionsMes = {
    title: "Demandas do Mês",
    colors: ["#6000AA"], // Cor das colunas
    legend: { position: "none" },
    chartArea: {
      width: "80%",
      height: "70%",
    },
    hAxis: {
      title: "Meses",
      textStyle: { fontSize: 12 },
    },
    vAxis: {
      title: "Quantidade",
      textStyle: { fontSize: 12 },
    },

  }

  return (
    <div className="container-inicio">
      <div className="menuLateral">
        <SideMenu />
      </div>

      <div className="info">

        <InfoTop />


        <div className="infosPrincipais">

          <div className="principalCima">

            <div className="GraficoDiario">
              <Chart className="GraficoDiario"
                chartType="PieChart"
                data={diario}
                options={optionsDiario}
                border-radius={"25%"}
                width={"300px"}
                height={"287px"}
              />
            </div>

            <div className="graficoMensal">
              <Chart chartType="ColumnChart" options={optionsMes} width="350px" height="287px" data={demandasPorMes} />
            </div>

            <div className="demandasNovas">
              <p className="TituloNovasDemandas">Novas Demandas</p>

              {novasDemandas.length > 0 ? (
                novasDemandas.map((demanda, index) => (
                  <div className="demanda" key={index}>
                    <div className="infoDemanda">
                      <p className="username">{demanda.titulo}</p>
                      <p className="projeto">{demanda.projeto}</p>
                    </div>
                    <p className={`urgencia ${getUrgenciaClass(demanda.urgencia)}`}>
                      {demanda.urgencia}
                    </p>
                  </div>
                ))
              ) : (
                <p>Sem novas demandas.</p>
              )}
            </div>

          </div>

          <div className="principalBaixo">
            <Chart
              chartType="Bar"
              data={data}
              options={options}
              width={"97%"}
              height={"260px"}
            />

            <div className="demandada">

              <div className="infoDireita1">
                <div className="escrito">
                  <p className="titulo">Demandas Da Semana</p>
                  <p className="dados">{demandasSemana} Demandas</p>
                </div>
                <BiFile />
              </div>

              <div className="infoDireita2">
                <div className="escrito">
                  <p className="titulo">Demandas Urgentes</p>
                  <p className="dados">{demandasUrgentes} Demandas</p>
                </div>
                <BiFile />
              </div>

              <div className="infoDireita3">
                <div className="escrito">
                  <p className="titulo">Demandas Em Atraso</p>
                  <p className="dados">{demandasAtraso} Demandas</p>
                </div>
                <BiFile />
              </div>
            </div>
          </div>

          <div className="botoesInferioresGrade" >
            <div className="botoesInferiores">
              <BotaoDemanda />
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}

const getUrgenciaClass = (urgencia) => {
  switch (urgencia.toLowerCase()) {
    case "alta":
      return "vermelho";
    case "média":
      return "laranja";
    case "baixa":
      return "verde";
    default:
      return "";
  }
};

export default FirstPage