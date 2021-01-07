import React from "react";

// import { Link } from "react-router-dom";
// reactstrap components
import { Card,CardHeader,CardBody,CardFooter,CardTitle,Row,Col} from "reactstrap";
import { MDBDataTable } from 'mdbreact';
import $ from 'jquery'

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import {sampleData, sampleDataTableColumn} from './../components/Shared/sampleData.js'
import Badge from "reactstrap/lib/Badge";

class ShowCards extends React.Component {
  render() { 
    return ( 
          <Row>
          
            {sampleData.map((item)=>{

              return (
                <Col lg="4" md="6" sm="6" key={item.id}>
                  <Card>

                    <CardHeader>
                      <CardTitle>
                        <h6>{item.id}.<hr /></h6>
                      </CardTitle>
                    </CardHeader>

                    <CardBody>
                      <p>Name:    {item.name}</p>
                      <p>Age:     {item.age}</p>
                      <p>Gender:  {item.gender}</p>
                      <p>Email:   {item.email}</p>
                      <p>Contact: {item.phoneNo}</p> 
                    </CardBody>

                    <CardFooter>
                    </CardFooter>

                  </Card>
                </Col>
                );
              
            })}

          </Row>
     );
  }
}

const ShowTable = (props) => {
  const [datatable, setDatatable] = React.useState({
    columns: props.columns,
    rows: props.rows,
  });
  // const [checkbox1, setCheckbox1] = React.useState('');

  // const showLogs2 = (e) => {
  //   setCheckbox1(e);
  //   props.handleSelect(e);
    
  // };

  $(document).ready(function () {
      $("thead:not([data-test*='datatable-head'])").remove()
  });
  
  return (
    <>
      <MDBDataTable
        hover
        entriesOptions={[10, 20, 25]}
        entries={10}
        pagesAmount={4}
        data={datatable}
      />

    </>
  );
}


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      table: true
    }
  }

  toggleTable = () => {
    this.setState({table: !this.state.table});
  }

  componentDidMount(){
    store.addNotification({
      title: "Welcome " + JSON.parse(localStorage.getItem('usr')).email ,
      message: "- by Abdulahad!",
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });

  }

  render() {
    return (
      <>
        <div className="content">
          <h4>Employees Data:</h4>
          <Badge color="primary">Card View</Badge> &nbsp; &nbsp;
          
            <span className='custom-control custom-switch' style={{display:"inline"}}>
                <input
                  type='checkbox'
                  className='custom-control-input'
                  id='customSwitchesChecked'
                  defaultChecked
                  onChange={this.toggleTable}
                  checked={this.state.table}
                />
                <label className='custom-control-label' htmlFor='customSwitchesChecked'>

                </label>
            </span>
          <Badge color="success">Tabular View</Badge>

          <hr />

            {this.state.table ?
              <ShowTable 
                rows={sampleData} 
                columns={sampleDataTableColumn}
              />
              :
              <ShowCards />
            }

        </div>
      </>
    );
  }
}

export default Dashboard;
