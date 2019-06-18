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
            <Col xs="12">
              <LineWrapper url="server_room" />
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
