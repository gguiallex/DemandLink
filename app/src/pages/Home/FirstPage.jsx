import React from "react"
import "./FirstPage.css"
import { Chart } from "react-google-charts"
import { BiFile, BiUser } from "react-icons/bi"

import SideMenu from "../../components/Menu/SidebarMenu"
import InfoTop from "../../components/InfoTop/InfoTop"
import BotaoDemanda from "../../components/Botões/BotaoDemanda"

const FirstPage = ({ }) => {

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
              <Chart chartType="ColumnChart" options={optionsMes} width="350px" height="287px" data={mes} />
            </div>

            <div className="demandasNovas">
              <p className="TituloNovasDemandas">Novas Demandas</p>

              <div className="demanda">
                <BiUser className="icon" />
                <div className="infoUser">
                  <p className="username">Usuário 1</p>
                  <p className="projeto">Nome do Projeto</p>
                </div>
                <p className="urgencia vermelho">Urgência</p>
              </div>

              <div className="demanda">
                <BiUser className="icon" />
                <div className="infoUser">
                  <p className="username">Usuário 2</p>
                  <p className="projeto">Nome do Projeto</p>
                </div>
                <p className="urgencia verde">Urgência</p>
              </div>

              <div className="demanda">
                <BiUser className="icon" />
                <div className="infoUser">
                  <p className="username">Usuário 3</p>
                  <p className="projeto">Nome do Projeto</p>
                </div>
                <p className="urgencia laranja">Urgência</p>
              </div>
            </div>

          </div>

          <div className="principalBaixo">
            <Chart
              chartType="Bar"
              data={data}
              options={options}
              width={"100%"}
              height={"260px"}
            />

            <div className="demandada">
              
              <div className="infoDireita1">
                <div className="escrito">
                <p className="titulo">Demandas Da Semana</p>
                <p className="dados">15 Demandas</p>
                </div>
                <BiFile />
              </div>

              <div className="infoDireita2">
                <div className="escrito">
                  <p className="titulo">Demandas Urgentes</p>
                  <p className="dados">5 Demandas</p>
                </div>
                <BiFile />
              </div>

              <div className="infoDireita3">
              <div className="escrito">
                <p className="titulo">Demandas Em Atraso</p>
                <p className="dados">2 Demandas</p>
                </div>
                <BiFile />
              </div>
            </div>
          </div>

          <div className="botoesInferioresGrade" >
            <div className="botoesInferiores">
              <BotaoDemanda />
              <button>Atualizar Informações</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}

export default FirstPage