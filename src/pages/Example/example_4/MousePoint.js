import React from 'react';
export default class MousePoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionX: 0,
      positionY: 0
    };
  }
  componentDidMount() {
    document.addEventListener('mousemove', e => {
      this.setState({
        positionX: e.clientX,
        positionY: e.clientY
      });
    });
  }

  render() {
    return <div>{this.props.render(this.state)}</div>;
  }
}
