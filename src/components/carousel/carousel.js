import React from 'react';
import { Carousel } from 'antd-mobile';

class Carousels extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
        };
    };
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            console.log(this.props.bannerData);
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 1000);
    }
    render() {
        return (
          <Carousel
                    autoplay={false}
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
    >
        {this.props.bannerData.map(val => (
            <a
                key={val}
            href="http://www.alipay.com"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
        >
            <img
                src={val.url}
            alt=""
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'));
            this.setState({ imgHeight: 'auto' });
        }}
            />
            </a>
        ))}
        </Carousel>
    );
    }
}

export default Carousels;