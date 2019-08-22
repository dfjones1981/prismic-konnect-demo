import React from 'react';
import PrismicReact from 'prismic-reactjs';

// Declare your component
export default class Task extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      doc: null,
      notFound: false,
    }
    if (props.prismicCtx) {
      this.fetchTask(props);
    }
  }

  componentDidUpdate(prevProps) {
    this.props.prismicCtx.toolbar();
    // We fetch the page only after it's ready to query the api
    if (!prevProps.prismicCtx) {
      this.fetchTask(this.props);
    }
  }

  fetchTask(props) {
    if (props.prismicCtx) {
      // We are using the function to get a document by its uid
      return props.prismicCtx.api.getByUID('task', props.match.params.uid, {}, (err, doc) => {
        if (doc) {
          // We put the retrieved content in the state as a doc variable
          this.setState({ doc });
        } else {
          // We changed the state to display error not found if no matched doc
          this.setState({ notFound: !doc });
        }
      });
    }
    return null;
  }

  render() {
    if (this.state.doc) {
       console.log(this.state.doc);
        return (
            <div data-wio-id={this.state.doc.id}>
            {/* This is how to insert a Rich Text field as plain text */}
            <h1>{PrismicReact.RichText.asText(this.state.doc.data.task_title)}</h1>
            <h2>{PrismicReact.RichText.asText(this.state.doc.data.task_intro)}</h2>
            {/* This is how to insert a Rich Text field into your template as html */}
            {PrismicReact.RichText.render(this.state.doc.data.task_body, this.props.prismicCtx.linkResolver)}

            <a href={PrismicReact.Link.url(this.state.doc.data.related_links, this.props.prismicCtx.linkResolver)}>See also</a>
          </div>
        );
      } else if (this.state.notFound) {
        return "Not Found";
      }
      return <h1>Loading</h1>;
  }
}