import logo from './logo.svg';
import './App.css';
import { TextField, Button, Container, Card, Icon, IconButton, Autocomplete } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Component } from 'react';
import { SpreadSheet } from './excel/SpreadSheet';
import Download, { ExportToExcel } from './excel/ExcelExport';
import { DummyJSON } from './excel/DummyJsonData';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker, StaticDatePicker } from '@mui/lab';
import api from './network/Api';
import ControlledAccordions from './ui/Accordion';

const GUID = '278be75a-a08d-40f3-9650-d0a8ef3ab987'
const URL = 'http://abr.business.gov.au/ABRXMLSearch/ABRSearchByABN'
const HOST = 'abr.business.gov.au'

const searchData = {
  name: "THE TRUSTEE FOR PSS FUND",
  postcode: "",
  legalName: "Y",
  tradingName: "Y",
  businessName: "Y",
  NSW: "Y",
  SA: "Y",
  ACT: "Y",
  VIC: "Y",
  WA: "Y",
  NT: "Y",
  QLD: "Y",
  TAS: "Y",
  authenticationGuid: "278be75a-a08d-40f3-9650-d0a8ef3ab987",
  searchWidth: "Typical",
  minimumScore: "0",
  maxSearchResults: "0"
}




export default class Home extends Component {


  constructor(props) {
    super(props)

    this.state = ({
      value: new Date(),
      searchValue: "",
      abn: 50616294781,
      name: "THE TRUSTEE FOR PSS FUND",
      yes: "Y",
      postcode: '',
      legalName: "Y",
      tradingName: "Y",
      businessName: "Y",
      searchWidth: "Typical",
      minLength: "0",
      maxLength: "0",
      isAccordion: true,
      abns: [
        50616294781,
        18108001191,
        67582329284,
        87904367991,
        26318413037,
        55349275107,
        64648617581,
        59707128173,
        77752196292,
        61970632495,
        21550383180,
        43558944801,
        25549421334,
      ]
    })

    this.clickBackButton = false;
    this.clickRefreshButton = false;


  }

  componentDidMount() {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    window.addEventListener("popstate", this.onClickBackButton);

    api.get(`/AbrXmlSearch.asmx/ABRSearchByNameAdvancedSimpleProtocol2012?name="THE TRUSTEE FOR PSS FUND"&postcode=""&legalName="Y"&tradingName="Y"&businessName="Y"&NSW="Y"&SA="Y"&ACT="Y"&VIC="Y"&WA="Y"&NT="Y"&QLD="Y"&TAS="Y"&authenticationGuid="278be75a-a08d-40f3-9650-d0a8ef3ab987"&searchWidth="Typical"&minimumScore="0"&maxSearchResults="0" HTTP/1.1`)
      .then(res => {
        console.log(res)
      })

  }


  onClickBackButton = (e) => {
    e.preventDefault();
    if (!this.clickBackButton) {
      if (window.confirm("Do you want to go back without submitting details?")) {
        this.clickBackButton = true;
      } else {
        window.history.pushState(null, null, window.location.pathname);
        this.clickBackButton = false;
      }
    }
  }

  handleBeforeUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
    return "";
  };


  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    window.removeEventListener('popstate', this.onClickBackButton);
  }


  postRequest = (e) => {
    e.preventDefault()
    api({
      method: 'post',
      url: "/AbrXmlSearch.asmx/ABRSearchByNameAdvancedSimpleProtocol2012",
      data: searchData
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  getRequest = () => {
    api({
      method: 'get',
      url: HOST + "/AbrXmlSearch.asmx/ABRSearchByNameAdvancedSimpleProtocol2012",
      withCredentials: false,
      data: searchData
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  render() {
    return (
      <Container style={{ display: 'flex', flexDirection: 'column' }}>
        {this.state.isAccordion && (<ControlledAccordions></ControlledAccordions>)}

        <h2 style={{ margin: 10, alignSelf: 'center' }}>
          DLL Demo App
        </h2>
        <Card
          style={{ alignSelf: 'center', display: 'flex', width: '100%' }}
        >
          <Card
            variant='outlined'
            style={{
              width: '50px', height: '50px', borderRadius: 10,
              alignSelf: 'center'
            }}
          >
            <IconButton
              size='large'
            >
              <ArrowBack></ArrowBack>
            </IconButton>
          </Card>


          <Container style={{
            margin: 10, padding: 10, display: 'flex',
            flexDirection: 'column'
          }}>

            <Autocomplete
              style={{ marginBottom: 10 }}
              disablePortal
              id="combo-box-demo"
              options={this.state.abns}
              renderInput={(params) => <TextField {...params} label="ABN Number" />}
            />


            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                label="Select Date"
                openTo="day"
                views={['year', 'month', 'day']}
                value={this.state.value}
                onChange={(newValue) => {
                  this.setState({
                    value: newValue
                  })
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              required
              margin='normal'
              variant='outlined'
              label='User Name'></TextField>

            <TextField
              className="Text-border"
              margin='normal'
              variant='standard'
              label='Email'></TextField>

            <TextField
              margin='normal'
              variant='filled'
              label='Password'></TextField>
            <div style={{
              margin: '5px',
              display: 'flex',
              flexDirection: 'row-reverse'
            }} >
              <div style={{ margin: '5px' }}>
                <Button
                  variant='contained'
                  onClick={this.getRequest}
                >Submit</Button>
              </div>
              <div style={{ margin: '5px' }}>
                <Button variant='contained' color='error'>Cancel</Button>
              </div>



            </div>
          </Container>


          <Card
            zIndex='fab'
            variant='outlined'
            style={{
              width: '50px', height: '50px', borderRadius: 10,
              alignSelf: 'center'
            }}
          >
            <IconButton
              size='large'
            >
              <ArrowForward></ArrowForward>
            </IconButton>
          </Card>
        </Card>

        {/* Enable this code to see spread sheet */}
        {/* <SpreadSheet></SpreadSheet> */}
        {/*Enable below code to download excel*/}
        <ExportToExcel apiData={DummyJSON} fileName={"dummyJSON"} />



      </Container>
    );
  }
}

