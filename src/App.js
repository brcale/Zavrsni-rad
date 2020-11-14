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
    .catch(error => {
      if (error.response.status === 404) {
        error = new Error("There is a problem with that stock symbol. (${enteredSymbol}) Try something else.");
      }
      this.setState({error: error});
    })
  }
  userInput = event =>{
    var value = event.target.value.toUpperCase();
    value = value.trim();
    this.setState({
      enteredSymbol: value
    });
  };
  onClickShowHistory = event =>{
    this.setState(prevState => {
      const showHistory = prevState.History;
      return {
        showHistory: !showHistory
      }
    })
  };
  onClickShowAllCharts = event => {
    this.setState(prevState => {
      const showAllChart = prevState.showAllChart;
      return {
        showAllChart: !showAllChart
      }
    })
  }

  onClickShowAllNews = event => {
    this.setState(prevState => {
      const showAllNews = prevState.showAllNews;
      return {
        showAllNews: !showAllNews
      }
    })
  }

  render() {
    const {
      quote,
      enteredSymbol,
      quoteHistory,
      showHistory,
      news,
      showAllNews,
      chart,
      showAllChart,
      error
    } = this.state;

    const chartReverse = [...chart].reverse();
    const chartReverseMin = chartReverse.slice (0,12);
    const quoteHistoryReverse = [...quoteHistory].reverse();
    const newsMin = [...news].slice (0,3);
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
                   onChange={this.userInput}
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
                  <h5 class="modal-title text-color" id="exampleModalLongTitle">Company's NASDAQ</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p className="text-color">
                  Apple - AAPL <br />
                  Microsoft - MSFT<br />
                  Amazon - AMZN<br />
                  Google - GOOG<br />
                  AliBaba - BABA<br />
                  Tesla - TSLA<br />
                  NVIDIA - NVDA<br />
                  Intel - INTC
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
        {/* div under search bar, latest news and info */}
          <div className="row mt-3">
            <div className="col">
              <h3>Latest info</h3>
              {!!quote ? <StockInfo {...quote} /> : <p>Loading...</p>}
              <div className="mt-3">
    <button className="btn btn-dark" onClick={this.onClickShowHistory}>{showHistory ? "Hide Previous Quotes" : "Show previous quotes"}</button>
              </div>
              <div className="mt-3">
                {showHistory && !!quoteHistory && (
                  <div>
                    <h3 className="text-center">Previous info</h3>
                {quoteHistoryReverse.map((quoteHistoryItem, index) =>{
                  return (
                    <div key={"quote" + index}>
                      <StockInfo {...quoteHistoryItem} />
                      <hr className="hrline"></hr>
                    </div>
                  );
                })}
              </div>
              )}
            </div>
            <div className="mt-5">
              <h2>{!!companyName && "News about " + companyName}</h2>
              {!showAllNews && !!newsMin && <ListOfNews news={newsMin} />}
              {showAllNews && !!news && (
                <div> <ListOfNews news={newsMin} /></div>
              )}
              <button className="btn btn-dark"> </button>
            </div>
          </div>
              <div className="col">
                {!!chart && (
                  <div className="charts">
                    <h2 className="text-center"> {!!companyName&&companyName + "(Past 3 months)"} </h2>
                    <ChartGraph title={enteredSymbol} chartLabels={chartDates} chartData={chartCloses} />
                    </div>
                )}
                <div className="mt-3">
                  {!showAllChart && !!chartReverseMin && (
                    <ChartTable chart={chartReverseMin} />
                  )}
                  {showAllChart && !!chartReverse && (
                    <ChartTable chart={chartReverse} />
                  )}
                  <button className="btn btn-dark" onClick={this.onClickShowAllCharts}>{showAllChart ? "Show Less" : "Show All"}</button>
                </div>
              </div>
        </div>
        </div>
        </div>
    )
  }
}

export default App