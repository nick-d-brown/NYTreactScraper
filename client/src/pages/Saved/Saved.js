import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { List, ListItem } from "../../components/List";
import { FormBtn } from "../../components/Form";
import API from "../../utils/API";

class Saved extends Component {
  state = {
    articles: []
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getSavedArticles()
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
  }

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.setState({ articles: this.state.articles.filter(article => article._id !== id)}))
  }

  render() {
    return <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            {/* api call to search for all saved articles */}
            {this.state.articles.length ? <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <div className="article-card">
                      {/* <img src={"https://static01.nyt.com/"+article.multimedia[1].url} alt=""/> */}
                      <div>
                        <h3>{article.title}</h3>
                        <p>Published: {article.date}</p>
                        <p>
                          <a href={article.url} target="_blank">{article.url}</a>
                        </p>
                        <p>Date Saved: {article.currentDate}</p>
                      </div>
                    </div>

                    <FormBtn
                      onClick={() =>
                        this.deleteArticle(
                          article._id,
                        )
                      }
                    >
                      Delete Article
                    </FormBtn>
                    {/* <SaveButton /> */}
                  </ListItem>
                ))}
              </List> : <h3>No Results to Display</h3>}
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Article Search</Link>
          </Col>
        </Row>
      </Container>;
  }
}

export default Saved;
