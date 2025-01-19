import React, { useState, useEffect } from "react"
import "./FirstPage.css"
import { Chart } from "react-google-charts"
import { BiFile, BiUser } from "react-icons/bi"
import { fetchDemandasByUser, getDemandUrgency, getDemandByStatus, getDemandByWeek, getDemandByMonth } from "../../services/apiService"
import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import BotaoDemanda from "../../components/Botões/BotaoDemanda"

const FirstPage = ({ }) => {
  const [idUser, setIdUser] = useState(""); // id usuario
  const [novasDemandas, setNovasDemandas] = useState([]);
  const [demandasUrgentes, setDemandasUrgentes] = useState(0);
  const [demandasSemana, setDemandasSemana] = useState(0);
  const [demandasAtraso, setDemandasAtraso] = useState(0);
  const [demandasConcluidas, setDemandasConcluidas] = useState(0);
  const [demandasNaoIniciadas, setDemandasNaoIniciadas] = useState(0);
  const [demandasEmAndamento, setDemandasEmAndamento] = useState(0);
  const [mesJan, setMesJan] = useState(0);
  const [mesFev, setMesFev] = useState(0);
  const [mesMar, setMesMar] = useState(0);
  const [mesAbr, setMesAbr] = useState(0);
  const [mesMai, setMesMai] = useState(0);
  const [mesJun, setMesJun] = useState(0);
  const [mesJul, setMesJul] = useState(0);
  const [mesAgo, setMesAgo] = useState(0);
  const [mesSet, setMesSet] = useState(0);
  const [mesOut, setMesOut] = useState(0);
  const [mesNov, setMesNov] = useState(0);
  const [mesDez, setMesDez] = useState(0);
  

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

          const urgentes = await getDemandUrgency(idUser);
          const semana = await getDemandByWeek(idUser);
          const emAtraso = await getDemandByStatus("Em atraso");
          const concluidas = await getDemandByStatus("Concluído");
          const naoIniciadas = await getDemandByStatus("Não Iniciado");
          const emAndamento = await getDemandByStatus("Em Andamento");
          const mesJan = await getDemandByMonth("1", idUser);
          const mesFev = await getDemandByMonth("2", idUser);
          const mesMar = await getDemandByMonth("3", idUser);
          const mesAbr = await getDemandByMonth("4", idUser);
          const mesMai = await getDemandByMonth("5", idUser);
          const mesJun = await getDemandByMonth("6", idUser);
          const mesJul = await getDemandByMonth("7", idUser);
          const mesAgo = await getDemandByMonth("8", idUser);
          const mesSet = await getDemandByMonth("9", idUser);
          const mesOut = await getDemandByMonth("10", idUser);
          const mesNov = await getDemandByMonth("11", idUser);
          const mesDez = await getDemandByMonth("12", idUser);

          setDemandasUrgentes(urgentes.total_demandas);
          setDemandasSemana(semana.data.data.length);
          setDemandasAtraso(emAtraso.length);
          setDemandasConcluidas(concluidas.length);
          setDemandasNaoIniciadas(naoIniciadas.length);
          setDemandasEmAndamento(emAndamento.length);
          setMesJan(mesJan.data.length);
          setMesFev(mesFev.data.length);
          setMesMar(mesMar.data.length);
          setMesAbr(mesAbr.data.length);
          setMesMai(mesMai.data.length);
          setMesJun(mesJun.data.length);
          setMesJul(mesJul.data.length);
          setMesAgo(mesAgo.data.length);
          setMesSet(mesSet.data.length);
          setMesOut(mesOut.data.length);
          setMesNov(mesNov.data.length);
          setMesDez(mesDez.data.length);
        }
      } catch (error) {
        console.error("Erro ao carregar demandas:", error);
      }
    };
    carregarDemandas();
  }, [idUser]);

  const data = [
    ["Semanas", "Concluidas", "Atrasadas"],
    ["Dom", 3, 2],
    ["Seg", 4, 2],
    ["Ter", 3, 1],
    ["Qua", 3, 0],
    ["Qui", 4, 0],
    ["Sex", 1, 2],
    ["Sab", 2, 1],
  ];

  const diario = [
    ["Estado", "Quantidade"],
    ["Concluidas", demandasConcluidas],
    ["Em andamento", demandasEmAndamento],
    ["Não iniciadas", demandasNaoIniciadas],
    ["Em atraso", demandasAtraso],
  ];
  
  const mes = [
    ["Meses", "Quantidade"],
    ["Jan", mesJan],
    ["Fev", mesFev],
    ["Mar", mesMar],
    ["Abr", mesAbr],
    ["Mai", mesMai],
    ["Jun", mesJun],
    ["Jul", mesJul],
    ["Ago", mesAgo],
    ["Set", mesSet],
    ["Out", mesOut],
    ["Nov", mesNov],
    ["Dez", mesDez],
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
              <Chart chartType="ColumnChart" 
                data={mes} 
                options={optionsMes} 
                width="350px" 
                height="287px" 
              />
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