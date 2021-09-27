import React, { Component } from 'react';
class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '首页',
            hotWord: [
                "万事如意",
                "事事如意 ",
                "万事亨通",
                "一帆风顺",
                "万事大吉",
                "吉祥如意",
                "步步高升",
                "步步登高",
                "三羊开泰",
                "得心应手",
                "财源广进",
                "陶未媲美",
                "阖家安康",
                "龙马精神",
            ],
            color: [
                "#a18cd1",
                "#fad0c4",
                "#ff8177",
                "#fecfef",
                "#fda085",
                "#f5576c",
                "#330867",
                "#30cfd0",
                "#38f9d7",
            ],
            wordArr: [],
            timer: null,
            resetTime: 0,
            ContainerSize: {
                leftPos: {
                    x: 0,
                    y: 0,
                },
                rightPos: {
                    x: 0,
                    y: 0,
                }
            }
        };
    }
    myRef = React.createRef();
    cloudRef = (el) => this.myRef = el;
    componentDidMount() {
        this.setState({
            wordArr: this.dealSpan(),
            ContainerSize: this.getContainerSize()
        }, () => {
            this.startFly();
        })
    }
    componentWillUnmount() {
        cancelAnimationFrame(this.state.timer);
    }
    dealSpan = () => {
        const wordArr = [];
        this.state.hotWord.forEach((value) => {
            const spanDom = document.createElement("span");
            spanDom.style.position = "relative";
            spanDom.style.display = "inline-block";
            spanDom.style.color = this.randomColor();
            spanDom.style.fontSize = this.randomNumber(15, 25) + "px";
            spanDom.innerHTML = value;
            spanDom.local = {
                position: {
                    x: 0,
                    y: 0,
                },
                direction: {
                    x: 1,
                    y: 1,
                },
                velocity: {
                    x: -0.5 + Math.random(),
                    y: -0.5 + Math.random(),
                },
            };
            this.myRef.appendChild(spanDom);
            wordArr.push(spanDom);
        });
        wordArr.forEach((value) => {
            value.local.realPos = {
                minx: value.offsetLeft,
                maxx: value.offsetLeft + value.offsetWidth,
                miny: value.offsetTop,
                maxy: value.offsetTop + value.offsetHeight,
            };
        });
        return wordArr;
    }
    startFly = () => {
        if (this.state.resetTime < 100) {
            this.setState({
                resetTime: this.state.resetTime + 1,
                timer: requestAnimationFrame(this.startFly.bind(this)),
                // eslint-disable-next-line no-dupe-keys
                resetTime: 0
            });
        }
        this.wordFly();
    }
    wordFly = () => {
        this.state.wordArr.forEach((value) => {
            if (
                value.local.realPos.minx + value.local.position.x <
                this.state.ContainerSize.leftPos.x
            ) {
                value.local.direction.x = -value.local.direction.x;
            }
            if (
                value.local.realPos.maxx + value.local.position.x >
                this.state.ContainerSize.rightPos.x
            ) {
                value.local.direction.x = -value.local.direction.x;
            }
            if (
                value.local.realPos.miny + value.local.position.y <
                this.state.ContainerSize.leftPos.y
            ) {
                value.local.direction.y = -value.local.direction.y;
            }
            if (
                value.local.realPos.maxy + value.local.position.y >
                this.state.ContainerSize.rightPos.y
            ) {
                value.local.direction.y = -value.local.direction.y;
            }
            value.local.position.x +=
                value.local.velocity.x * value.local.direction.x;
            value.local.position.y +=
                value.local.velocity.y * value.local.direction.y;
            value.style.transform =
                "translate(" +
                value.local.position.x +
                "px," +
                value.local.position.y +
                "px)";
        });
    }
    randomColor = () => {
        var colorIndex = Math.floor(this.state.color.length * Math.random());
        return this.state.color[colorIndex];
    }
    randomNumber(lowerInteger, upperInteger) {
        const choices = upperInteger - lowerInteger + 1;
        return Math.floor(Math.random() * choices + lowerInteger);
    }
    getContainerSize = () => {
        const el = this.myRef;
        return {
            leftPos: {
                x: el.offsetLeft,
                y: el.offsetTop,
            },
            rightPos: {
                x: el.offsetLeft + el.offsetWidth,
                y: el.offsetTop + el.offsetHeight,
            },
        };
    }
    render() {
        const cloudCss = {
            width: '400px',
            height: '400px',
            display: 'inline-block',
            backgroundColor: '#272020',
            opacity: ' 0.8'
        };
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <div style={cloudCss} ref={this.cloudRef}></div>
            </div>
        );
    }
}

export default home;
