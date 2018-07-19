import React from 'react';
import { connect } from 'react-redux';


import './rotator.css';
import List from '../../lib/linked-list.js';
import uuid from 'uuid';

/** Component to create and render the rotator for the challenges.  The rotator is
 *  comprised of a double linked list of the children of the component.  State 
 *  will always be the node in the linked list that is active.
 * @module Rotator
 */
export class Rotator extends React.Component {
  constructor(props) {
    super(props);

    let list = List.fromArray(this.props.children);

    let current = list.root;
    this.state = { list, current };
 
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.select = this.select.bind(this);
  }
   
  next() {
    let current = this.state.current.next
      ? this.state.current.next
      : this.state.list.root;

    this.setState({ current });
  }

  previous() {
    let current = this.state.current.prev
      ? this.state.current.prev
      : this.state.list.findLast();

    this.setState({ current });
  }

  select(e) {
    let idx = parseInt(e.target.dataset.idx, 10);
    let current = this.state.list.findNth(idx);
    this.setState({ current });
  }

  render() {
    let pips = [];
    let i = 0;
    let current = this.state.list.root;
    while (current) {
      pips.push(<li key={uuid()} data-idx={i++} onClick={this.select} />);
      current = current.next;
    }
    let currentValue = this.state.current && this.state.current.value;
   
    return (
      
      <div className="rotator deck">
        <nav>
          <ul>{pips}</ul>
        </nav>
        <div className="card">
          <button onClick={this.previous}>P</button>
          {currentValue}
          <button onClick={this.next}>N</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToprops = (dispatch, getState) => ({

});

export default connect(mapStateToProps, mapDispatchToprops)(Rotator);
