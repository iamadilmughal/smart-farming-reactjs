import React, { Component } from "react";
import { Tabs, Tab } from "react-mdl";
import "./faq.css";

class faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 1 };
  }
  toggleCategories() {
    if (this.state.activeTab === 0) {
      return (
        <div className="b">
          <div className="qDiv">
            <p className="question">
              How can I start using Digital Bites technology in my restaurant?
            </p>
            <p className="answer">
              Process is pretty easy, you can buy our photoshoot set and take
              360 pictures of your food or just book our photographer. Please
              contact us for inquiries.
            </p>
          </div>

          <div className="qDiv">
            <p className="question">Can I track campaign analytics?</p>
            <p className="answer">
              We are working hard to make it ready as soon as possible. Please
              subscribe and be the first to hear about.
            </p>
          </div>
          <div className="qDiv">
            <p className="question">How can I manage my menu?</p>
            <p className="answer">
              You can manage your menu items through, Digital Bites admin
              interface
            </p>
          </div>
        </div>
      );
    } else if (this.state.activeTab === 1) {
      return (
        <div className="u">
          <div className="qDiv">
            <p className="question">How do I use it?</p>
            <p className="answer">
              Can be done online when ordering takeout or delivery as well as in
              store
            </p>
          </div>
          <div className="qDiv">
            <p className="question">Is it free?</p>
            <p>Digital Bites is free to use</p>
          </div>
          <div className="qDiv">
            <p className="question">Which phones are supported?</p>
            <p>Digital Bites is available on Apple IOS</p>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="tabs">
        <Tabs
          activeTab={this.state.activeTab}
          onChange={tabId => this.setState({ activeTab: tabId })}
          ripple
        >
          <Tab>FAQs for Business</Tab>
          <Tab>FAQs for Users</Tab>
        </Tabs>
        <section className="faqs">{this.toggleCategories()}</section>
      </div>
    );
  }
}

export default faq;
