import React from "react";
// react plugin used to create charts
import LineWrapper from "components/Charts/LineWrapper";

// reactstrap components
import { Row, Col } from "reactstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12" md="6" sm="6" lg="6">
              <LineWrapper
                url="/sensorData?name=hall_one"
                name="Главный зал"
                data="Температура помещения"
              />
            </Col>
            <Col xs="12" md="6" sm="6" lg="6">
              <LineWrapper
                url="/sensorData?name=server_room_one"
                name="Серверная"
                data="Температура помещения"
              />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
