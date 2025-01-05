import React from "react"
import "./FirstPage.css"
import SideMenu from "../../components/Menu/SidebarMenu" 
import { Chart } from "react-google-charts";

const FirstPage = ({}) => {

    /*const dataBase = {
        semanas: ["seg", "ter", "qua", "qui", "sex", "sab", "dom"],
        concluidas: [480, 320, 310, 480, 150, 390, 390],
        atraso: [220, 110, 250, 380, 230, 230, 310]
    };*/

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

      const options = {
        chart: {
          title: "Resumo Semanal",
          subtitle: "Sales and Expenses over the Years",
        },
      };

    return (
        <div className="container">
            <SideMenu/>

            <Chart
            chartType="Bar"
            data={data}
            options={options}
            />
        </div>
    )

}

export default FirstPage