import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';
import styles from './ChatInput.less';

export default class ChatInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
    };
  }
  componentDidMount() {
    this.inputElement.focus();
  }
  onKeyDown = (e) => {
    const { value } = this.state;
    if (e.nativeEvent.keyCode === 13) {
      e.preventDefault();
      if (value) {
        this.props.onSendMessage(value);
        this.setState({
          value: null,
        });
      }
    }
  }
  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    return <div className={styles.input}>
    <Input
      value={this.state.value}
      onChange={this.handleChange}
      ref={c => this.inputElement = c}
      onKeyDown={this.onKeyDown}
      type="textarea"
    />
    <span className={styles.suffix} >发送</span>
  </div>
  }
}
