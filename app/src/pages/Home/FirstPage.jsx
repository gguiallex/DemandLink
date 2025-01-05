import React, { useState } from "react"
import "./FirstPage.css"
import SideMenu from "../../components/Menu/SidebarMenu"
import { Chart } from "react-google-charts";
import { BiCalendarAlt, BiUser, BiBell } from "react-icons/bi";

const FirstPage = ({ }) => {

  /*const dataBase = {
      semanas: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
      concluidas: [480, 320, 310, 480, 150, 390, 390],
      atraso: [220, 110, 250, 380, 230, 230, 310]
  };*/

  const [date, setDate] = useState(new Date());

  const dataFormatada = date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  const usuario = "usuario1"

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
      subtitle: "Sales and Expenses over the Years",
    },
  };

  const optionsDiario = {
    title: "Resumo Diario",
  };

  const optionsMes = {
    title: "Demandas do Mês"
  }

  return (
    <div className="container-inicio">
      <div className="menuLateral">
        <SideMenu />
      </div>
      <div className="info">

        <div className="infosTop">

          <div className="TopEsquerda">
            <div className="data">
              <p><BiCalendarAlt />{dataFormatada}</p>
            </div>
          </div>

          <div className="TopDireita">
            <div className="botoesTop">
              <button><BiBell /></button>
              <button><BiUser /></button>
            </div>
            <div>
              <p>{usuario}</p>
              <div />
            </div>

          </div>

        </div>

        <div className="infosPrincipais">

          <div className="principalCima">
            
            <div className="GraficoDiario">
              <Chart className="GraficoDiario"
                chartType="PieChart"
                data={diario}
                options={optionsDiario}
                width={"100%"}
                height={"287px"}
                border-radius={"25%"}
              />
            </div>

            <div className="graficoMensal">
              <Chart chartType="ColumnChart" options={optionsMes} width="100%" height="100%" data={mes} />
            </div>

            <div className="demandasNovas">

            </div>
          </div>

          <div className="graficoSemanal">
            <Chart
              chartType="Bar"
              data={data}
              options={options}
              width={"100%"}
              height={"390px"}
            />
          </div>
        </div>
      </div>
    </div>

  )

}

export default FirstPage