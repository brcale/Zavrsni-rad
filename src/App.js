import React, { Component } from 'react';
import "./App.css";
import { getQuotes ,getLogo ,getNews ,getChart } from './api/iex';
import StockInfo from './StockInfo';
import ListOfNews from './ListOfNews';
import ChartGraph from './ChartGraph';
import ChartTable from './ChartTable';

class App extends Component {
  state = {
    enteredSymbol: "NFLX",
    quote: null,
    quoteHistory: [],
    showHistory: false,
    news: [],
    showAllNews: false,
    chart: [],
    showAllChart: false
  };
  componentDidMount() {
    this.getApi();
  }
  getApi = () => {
    const {enteredSymbol} = this.state;
    Promise.all([
      getQuotes(enteredSymbol),
      getLogo(enteredSymbol),
      getNews(enteredSymbol),
      getChart(enteredSymbol)
    ])
    .then(values => {
      const [quote, logo, news, chart] = values;
      this.setState(prevState => {
        const quoteWithLogo = { ...quote, logo: logo};
        const history = prevState.quoteHistory;
        history.push({...quoteWithLogo})
        return {
          quote: quoteWithLogo,
          error: null,
          quoteHistory: history,
          news: news,
          chart: chart
        };
      });
    })
    /*.catch(error => {
      if (error.response.status === 404) {
        error = new Error("There is a problem with that stock symbol. (${enteredSymbol}) Try something else.");
      }
      this.setState({error: error});
    })*/
  }
 
  onClickShowAllCharts = event => {
    this.setState(prevState => {
      const showAllChart = prevState.showAllChart;
      return {
        showAllChart: !showAllChart
      }
    })
  }

  onEnterPressLoadData = event => {
    if (event.keyCode === 13) {
      console.log("fucntin")
      this.getApi();
    }
  };

  render() {
    const {
      quote,
      enteredSymbol,
      news,
      showAllNews,
      chart,
      showAllChart,
    } = this.state;
  
    const chartReverse = [...chart].reverse();
    const chartReverseMin = chartReverse.slice (0,15);
    const newsMin = [...news].slice (0,4);
    const companyName = !!quote && quote.companyName;
    const chartCloses = [];
    const chartDates = [];
    chart.map(chartItem => {
      chartDates.push(chartItem.label);
      chartCloses.push(chartItem.close);
      return null;
    })
    return (
      <div className="bgcolor text-light">
      <div className="App pb-3">
        {/* Header - search bar */}
      <div className="jumbotron bgcolor">
        <div className="container">
          <h2 className="display-3 center">Stock Market</h2>
          <p>Get stock info here: </p>
        <div className="row">
          <div className="col input-group">
            <input maxLength="4"
                   type="text"
                   className="form-control"
                   placeholder="Put a stock symbol here (e.g. APPL)."
                   aria-label="Symbol"
                   onKeyDown={this.onEnterPressLoadData.bind(this)}
                   />
          <span className="input-group-btn input-but">
            <button className="btn btn-dark" type="button" onClick={this.getApi}>Get Data!</button>
          </span>
          {/* Modal for company symbols */}
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
            Company Symbols
          </button>
            <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-color" id="exampleModalLongTitle">Company's symbols</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p className="text-color">
                  Apple - <strong>AAPL</strong> <br />
                  Microsoft - <strong>MSFT</strong><br />
                  Amazon - <strong>AMZN</strong><br />
                  Google - <strong>GOOG</strong><br />
                  AliBaba - <strong>BABA</strong><br />
                  Tesla - <strong>TSLA</strong><br />
                  NVIDIA - <strong>NVDA</strong><br />
                  Intel - <strong>INTC</strong>
                  </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
        </div>
        <hr className="hrline"></hr>
        {/* latest info section */}

        <div className="row mt-3 ">
            <div className="col text-light">
              <h3 className="margin-left">Latest information about {companyName}</h3>
              {!!quote ? <StockInfo {...quote} /> : <p>Loading...</p>}
            </div>
          </div>
        {/* News section */}
        <div>
        <div className="mt-2 col-6 float-right">
              <h2 className="text-center">{!!companyName && "News about " + companyName}</h2>
              {!showAllNews && !!newsMin && <ListOfNews news={newsMin} />}
              {showAllNews && !!news && (
                <div className="mt-2"> <ListOfNews news={newsMin} /></div>
              )}
          </div>
        
        {/* div under search bar, latest news and info */}
        <div className="col-6">
                {!!chart && (
                  <div className="charts">
                    <h2 className="text-center"> {!!companyName&&companyName + " (Past month)"} </h2>
                    <ChartGraph title={enteredSymbol} chartLabels={chartDates} chartData={chartCloses} />
                    {console.log(chartCloses + chartDates)}
                    </div>
                )}
                <div className="mt-3">
                  {!showAllChart && !!chartReverseMin && (
                    <ChartTable chart={chartReverseMin} />
                  )}
                  {showAllChart && !!chartReverse && (
                    <ChartTable chart={chartReverse} />
                  )}
                  <button className="btn btn-dark btn-block" onClick={this.onClickShowAllCharts}>{showAllChart ? "Show Less" : "Show All"}</button>
                </div>
              </div>
        </div>
        </div>
        </div>
    )
  }
}

export default App