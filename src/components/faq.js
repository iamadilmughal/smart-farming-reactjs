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
            <p className="question">What is Smart Farming?</p>
            <p className="answer">
              Smart Farming is the latest addition to the efforts of modernizing
              agriculture so that more food can be produced through less effort
            </p>
          </div>

          <div className="qDiv">
            <p className="question">What Can I do with Smart Farming?</p>
            <p className="answer">
              Through our Service, you can share your knowledge and help the
              farmers in solving their problems. You can keep track of the
              Diseases detected in various areas and provide solution to these
              problems.
            </p>
          </div>
          <div className="qDiv">
            <p className="question">Will Smart Farming Pay me? </p>
            <p className="answer">
              Currently, we don't pay the experts and we are trying to join
              those experts who are willing to help others voluntarily. However,
              we do have plans to start paid services for experts in the near
              future.
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
              You can start using our services by just download the app and
              registering yourselves.
            </p>
          </div>
          <div className="qDiv">
            <p className="question">Is it free?</p>
            <p>Smart Farming is Free to use for everyone. </p>
          </div>
          <div className="qDiv">
            <p className="question">Which phones are supported?</p>
            <p>
              Smart Farming application is available on both Apple iOS and
              Android Phones
            </p>
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
          onChange={(tabId) => this.setState({ activeTab: tabId })}
          ripple
        >
          <Tab>FAQs for Experts</Tab>
          <Tab>FAQs for Users</Tab>
        </Tabs>
        <section className="faqs">{this.toggleCategories()}</section>
      </div>
    );
  }
}

export default faq;
