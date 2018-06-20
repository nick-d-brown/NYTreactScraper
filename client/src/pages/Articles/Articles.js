import React, { Component } from "react";
import axios from "axios";
import "./Articles.css";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";


class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: "",
    headline: "",
    pubDate: "",
    webURL: "",
    liKey: "",
    searchProcessed: false
  };

  saveArticle = (key, headline, pubDate, url) => {

    let article = {
      title: headline,
      date: pubDate,
      url:url,
      key: key
    }
    console.log(article);
    
    API.saveArticle(article)
     
      .then(res => {
        this.setState({ articles: this.state.articles.filter(article => article._id !== key)});
        console.log(this.state);
        
      })
      // .then(res => this.loadArticles())
      .catch(err => console.log("EEERRRROOOOORRRR: "+err))
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      let topic = this.state.topic;
      let url =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=4f47dc3cd94943cd9deaf8eef0d9a714&q=" +
        topic;
      if (this.state.startYear) {
        let startYear = this.state.startYear;
        url += "&begin_date=" + startYear + "0101";
      }
      if (this.state.endYear) {
        let endYear = this.state.endYear;
        url += "&end_date=" + endYear + "1230";
      }
      //search the NYT api
      console.log(url);
      
      axios
        .get(url)
        .then(res => {
          this.setState({ articles: res.data.response.docs, searchProcessed: true});
          console.log(res.data.response.docs);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      < Container fluid>
        <Row>
          {this.state.searchProcessed !== true ? (
          <Col size="md-12">
            <Jumbotron>
              <h1>Search for any article</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start year"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="End Year"
              />
              <FormBtn
                disabled={!this.state.topic}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col> ) : (
          <Col size="md-12">
            <Jumbotron>
              <h1>Article Results</h1>
            </Jumbotron>
            <a className="navbar-brand" href="/">← Back to Article Search</a>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <div className="article-card">
                      {/* <img src={"https://static01.nyt.com/"+article.multimedia[1].url} alt=""/> */}
                      <div>
                        <h3>{article.headline.main}</h3>
                        {/* <h4>{article.byline.original}</h4> */}
                        <p>Published: {article.pub_date}</p>
                        {/* <p>{article.snippet}</p> */}
                        <a href={article.web_url} target="_blank">
                          <p>{article.web_url}</p>
                        </a>
                      </div>
                    </div>

                    <FormBtn
                      onClick={() =>
                        this.saveArticle(
                          article._id,
                          article.headline.main,
                          article.pub_date,
                          article.web_url
                        )
                      }
                    >
                      Save Article
                    </FormBtn>
                    {/* <SaveButton /> */}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            
          </Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default Articles;
