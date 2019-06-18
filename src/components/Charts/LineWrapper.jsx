import React from "react";
import { Line } from "react-chartjs-2";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import instance from "../../utils/axiosConf";

let chartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    backgroundColor: "#f5f5f5",
    titleFontColor: "#333",
    bodyFontColor: "#666",
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent"
        },
        ticks: {
          suggestedMin: 20,
          suggestedMax: 23,
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ],
    xAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.1)",
          zeroLineColor: "transparent"
        },
        ticks: {
          padding: 20,
          fontColor: "#9a9a9a"
        }
      }
    ]
  }
};

class LineWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      time: "N/A",
      name: this.props.url,
      data: canvas => {
        let ctx = canvas.getContext("2d");

        let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

        gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
        gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
        gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

        return {
          labels: this.state.labels,
          datasets: [
            {
              label: "Server Room dataset",
              fill: true,
              backgroundColor: gradientStroke,
              borderColor: "#1f8ef1",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: "#1f8ef1",
              pointBorderColor: "rgba(255,255,255,0)",
              pointHoverBackgroundColor: "#1f8ef1",
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: this.state.dataArray
            }
          ]
        };
      },
      dataArray: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
      labels: [
        "--:--",
        "--:--",
        "--:--",
        "--:--",
        "--:--",
        "--:--",
        "--:--",
        "--:--",
        "--:--",
        "--:--",
        "--:--",
        "--:--"
      ]
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      let pdataArray = this.state.dataArray;
      let prevLabels = this.state.labels;

      //api call
      instance
        .get("/sensorData?name=server_room_one")
        .then(response => {
          console.log(response.data);
          //this.setState({ refreshing: false, data: response.data.fdataList });
          //push new data
          pdataArray.push(response.data.temp);
          let str = response.data.timestamp.substr(0, 5);
          prevLabels.push(str);
          if (prevLabels.length >= 17) {
            pdataArray.shift();
            prevLabels.shift();
          }
          this.setState({
            dataArray: pdataArray,
            labels: prevLabels,
            temp: response.data.temp,
            time: response.data.timestamp
          });
        })
        .catch(err => {
          console.log(err);
        });
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Card className="card-chart">
        <CardHeader>
          <Row>
            <Col className="text-left" sm="6">
              <h5 className="card-category">Серверная</h5>
              <CardTitle tag="h2">Температура помещения</CardTitle>
            </Col>
            <Col className="text-right" sm="6">
              <h5 className="card-category">
                Последнее обновление: {this.state.time}
              </h5>
              <CardTitle tag="h2">
                <b>{this.state.temp}</b>&#176;С
              </CardTitle>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <div className="chart-area">
            <Line data={this.state.data} options={chartOptions} />
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default LineWrapper;
